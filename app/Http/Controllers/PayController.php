<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App;
use Auth;
use Redirect;
use Session;

use App\Pay;
use App\Profit;
use App\User;
use App\Buy;

// For Charge
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;
use PayPal\Api\Amount;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Api\PaymentExecution;
use PayPal\Api\ExecutePayment;
use PayPal\Api\Details;

// For Payout
use PayPal\Api\Payout;
use PayPal\Api\PayoutSenderBatchHeader;
use PayPal\Api\PayoutItem;
use PayPal\Api\Currency;

class PayController extends Controller
{
    private $_apiContext;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function contextPaypal()
    {
        // config == Config files
        // Client Id
        $ClientId = config('paypal_payment.Account.ClientId');
        // Client Secret
        $ClientSecret = config('paypal_payment.Account.ClientSecret');
        // Came from Paypal SDK
        $OAuth = new OAuthTokenCredential($ClientId, $ClientSecret);
        // Came from Paypal SDK
        $this->_apiContext = new ApiContext($OAuth);
        // Account Connection && Log Setting
        $SetConfig = config('paypal_payment.Setting');
        // Set And Apply The Configration
        $this->_apiContext->setConfig($SetConfig);
    }

    public function AddCredit (Request $request)
    {
        $this->validate($request, [
            'price' => 'required|integer'
        ]);
        $price = intval($request->price);

        /*
        | ----------------------------------------------------------------------
        | Set The Paypal Context
        | ----------------------------------------------------------------------
        |
        */

        $this->contextPaypal();

        /*
        | ----------------------------------------------------------------------
        | Set Paypal Payments
        | ----------------------------------------------------------------------
        |
        */

        // set Payer
        $payer = new Payer();
        // set payment Method
        $payer->setPaymentMethod("paypal");
        // set Amount
        $amount = new Amount();
        // set Currency
        $amount->setCurrency("USD")->setTotal($price);
        // To Amount
        $transaction = new Transaction();
        // set Amount
        $transaction->setAmount($amount);
        // Base Url
        $baseUrl = url('/');
        // TO Redirect
        $redirectUrls = new RedirectUrls();
        // set setReturnUrl [success] && set setCancelUrl[Fail]
        $redirectUrls->setReturnUrl($baseUrl . '/successCharge?success=true')
                    ->setCancelUrl($baseUrl . '/errorCharge?success=false');
        // make New Payment
        $payment = new Payment();
        // config the info TO Make the new Payment
        $payment->setIntent("sale")
            // Set Payer
            ->setPayer($payer)
            // Set RedirectUrls
            ->setRedirectUrls($redirectUrls)
            // Set Transactions
            ->setTransactions(array($transaction));

        $request = clone $payment;
        $curl_info = curl_version();
        try {

            /*
            | ----------------------------------------------------------------------
            | Create The Payment
            | ----------------------------------------------------------------------
            */

            $payment->create($this->_apiContext);
            $redirect = null;

            foreach ($payment->getLinks() as $link) {
                if ($link->getRel() == 'approval_url') {
                    $redirect = $link->getHref();
                }
            }

            if ($redirect != null) {
                Session::put('price', $price);
                return Redirect::away($redirect);
            }

            return redirect('/')->with('error', 'Error Happend Try Again Again');

        } catch (Exception $e) {
            App::abort(403);
        }
    }

    public function GetPaymentInfoById($id)
    {
        $pay = Payment::get($id, $this->_apiContext);
        return $pay;
    }

    public function successCharge(Request $request)
    {
        if (
            $request->success == true && $request->success != '' &&
            isset($request->paymentId) && $request->paymentId != '' &&
            isset($request->token) && $request->token != '' &&
            isset($request->PayerID) && $request->PayerID != ''
        )
        {

            $this->contextPaypal();
            /*
            | ----------------------------------------------------------------------
            | Save Payments To DB && take the money from the user && add it to the website
            | ----------------------------------------------------------------------
            |
            */

            $price = Session::get('price');
            Session::forget('price');

            $paymentId = $request->paymentId;
            $payment = $this->GetPaymentInfoById($paymentId);

            $execution = new PaymentExecution();
            $execution->setPayerId($request->PayerID);

            $transaction = new Transaction();
            $amount = new Amount();
            $details = new Details();
            $details->setShipping(0)
            ->setTax(0)
            ->setSubtotal($price);

            $amount->setCurrency('USD');

            $amount->setTotal($price);

            $amount->setDetails($details);

            $transaction->setAmount($amount);

            try {
                $result = $payment->execute($execution, $this->_apiContext);

                if ($result->state == 'approved') {
                    $pay = new Pay();
                    $pay->user_id = Auth::user()->id;
                    $pay->payer_id = $request->PayerID;
                    $pay->pay_id = $result->id;
                    $pay->payment_method = $result->payer->payment_method;
                    $pay->state = $result->state;
                    $pay->price = $result->transactions[0]->amount->total;
                    if ($pay->save()) {
                        return redirect('/#!/AllCharge')->with('success', 'Your Charge Has Been Successfully');
                    } else {
                        return redirect('/')->with('error', 'Your Charge Does\'nt Been Successfully');
                    }
                }


            } catch (Exception $ex) {
                return redirect('/#!/AddCredit')->with('error', 'Your Charge Have Been Faild Error Code 2001');
            }
        } else {
            return redirect('/')->with('error', 'Error Happend Try Again Again');
        }
        return redirect('/')->with('error', 'Error Happend Try Again Again');

    }

    public function errorCharge(Request $request)
    {
        return redirect('/#!/AddCredit')->with('error', 'Your Charge Does\'nt Been Successfully');
    }

    public function adminSendProfit($id)
    {
        $profit = Profit::findOrFail($id);
        if ($profit) {
            $user = User::findOrFail($profit->user_id);
            if ($user) {

                $this->contextPaypal();

                $payouts = new Payout();
                $senderBatchHeader = new PayoutSenderBatchHeader();
                $senderBatchHeader->setSenderBatchId(uniqid())
                ->setEmailSubject("Alaa Dragneel Send Profit");
                $senderItem = new PayoutItem();
                $senderItem->setRecipientType('Email')
                ->setNote('Alaa Dragneel Send Profit')
                ->setReceiver($user->email)
                ->setSenderItemId("2014031400023")
                ->setAmount(new Currency('{
                    "value":"'. $profit->profit_price .'",
                    "currency":"USD"
                }'));
                $payouts->setSenderBatchHeader($senderBatchHeader)
                ->addItem($senderItem);

                $request = clone $payouts;

                try {
                    $output = $payouts->createSynchronous($this->_apiContext);
                } catch (Exception $ex) {
                    return redirect()->back()->with('error', 'Error In The Payout Code Error #1000');
                }

                $payoutItemId = $output->getItems()[0]->getPayoutItemId();

                try {
                    $output = PayoutItem::get($payoutItemId, $this->_apiContext);

                    if ($output->transaction_status == "SUCCESS") {
                        $profit->status = 1;
                        $profit->pay_id = $output->payout_item_id;

                        if ($profit->update()) {
                            return redirect()->back()->with('success', 'The Payout Success');
                        }
                        return redirect()->back()->with('error', 'Error In The Payout Code Error #1001');
                    }

                } catch (Exception $ex) {
                    return redirect()->back()->with('error', 'Error In The Payout Code Error #1002');
                }

            }

            return redirect()->back()->with('error', 'User Does\'not Exists');
        }
        return redirect()->back()->with('error', 'Profit Does\'not Exists');

    }
}
