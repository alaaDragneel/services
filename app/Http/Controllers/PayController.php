<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App;

use Auth;

use App\Pay;

use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;
use PayPal\Api\Amount;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
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
        /*
        NOTE Remember TO Make Project in Paypal Develpoers And take ClientId && ClientSecret
        Epsoid 121 && 122 && 123
        */
        $price = intval($request->price);

        /*
        | ----------------------------------------------------------------------
        | Set The Paypal Context
        | ----------------------------------------------------------------------
        */
        $this->contextPaypal();
        /*
        | ----------------------------------------------------------------------
        | Set Paypal Payments
        | ----------------------------------------------------------------------
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
        $redirectUrls->setReturnUrl($baseUrl)->setCancelUrl($baseUrl);
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

            /*
            | ----------------------------------------------------------------------
            | Save Payments To DB
            | ----------------------------------------------------------------------
            */

            $pay = new Pay();
            $pay->pay_id = $payment->id;
            $pay->user_id = Auth::user()->id;
            $pay->payment_method = $payment->payer->payment_method;
            $pay->state = $payment->state;
            $pay->price = $price;
            if ($pay->save()) {
                return 'done';
            } else {
                App::abort(403);
            }
        } catch (Exception $e) {
            App::abort(403);
        }
    }

    public function GetPaymentInfoById($id)
    {
        $pay = Payment::get($id, $this->_apiContext);
        return $pay;
    }
}
