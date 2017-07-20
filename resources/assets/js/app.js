var Vue = require('vue');
// Vue Recource
var VueResource = require('vue-resource');
Vue.use(VueResource);
// Vue Router
var VueRouter = require('vue-router');
Vue.use(VueRouter);
// Vue Mement
var VueMoment = require('vue-moment');
Vue.use(VueMoment);
// Vue validator
var VueValidator = require('vue-validator');
Vue.use(VueValidator);
// Vue Spainner

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
// Register the component globally
Vue.component('spinner', Spinner);
// Vue Star Rating
var StarRating = require('./components/btns/rating.vue');
// Register the component globally
Vue.component('star-rating', StarRating);
// Vue navbar
var navbar = require('./components/header/navbar.vue');
// Register the component globally
Vue.component('navbar', navbar);

// Vue Recource init Headers With laravel csrf_token
Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').attr('value');

// Vue Router init

// Define some Components.
var MainPage = require('./components/pages/mainPage.vue');
var AddServices = require('./components/services/addServices.vue');
var MyServices = require('./components/services/myServices.vue');
var ServicesDetails = require('./components/services/service_details.vue');
var IncomingOrders = require('./components/orders/incomingOrders.vue');
var singleOrder = require('./components/orders/singleOrder.vue');
var PurchaseOrders = require('./components/orders/purchaseOrders.vue');
var UserServices = require('./components/users/UserServices.vue');
var SendMessage = require('./components/messages/send.vue');
var MySendMessages = require('./components/messages/sendMessage.vue');
var MyRecivedMessages = require('./components/messages/incomingMessage.vue');
var messageDetails = require('./components/messages/messageDetails.vue');
var unReadMessages = require('./components/messages/newMessage.vue');
var ReadMessages = require('./components/messages/oldMessage.vue');
var favorite = require('./components/favorite/favorite.vue');
var category = require('./components/category/category.vue');
var addCredit = require('./components/credit/add.vue');
var ShowAllCharge = require('./components/credit/allCharge.vue');
var ShowAllPayment = require('./components/credit/allPayment.vue');
var ShowAllProfit = require('./components/credit/allProfit.vue');
var ShowAllWaitingProfit = require('./components/credit/allWaitingProfits.vue');
var ShowAllBalance = require('./components/credit/allBalance.vue');
var ShowAllNotification = require('./components/notification/allNotifications.vue');
var ShowAllUnReadNotification = require('./components/notification/unReadNotifications.vue');
var login_errors = require('./components/errors/login.vue');

// The router needs a root component to render.
// For demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
// !! Note that the App is not a Vue instance.
var App = Vue.extend({});

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
var route = new VueRouter();


// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
route.map({
    '/': {
        component: MainPage
    },
    '/AddServices': {
        component: AddServices
    },
    '/MyServices': {
        component: MyServices
    },
    '/IncomingOrders': {
        component: IncomingOrders
    },
    '/PurchaseOrders': {
        component: PurchaseOrders
    },
    '/ServicesDetails/:serviceId/:serviceName': {
        name: '/ServicesDetails',
        component: ServicesDetails
    },
    '/User/:userId/:userName': {
        name: '/User',
        component: UserServices
    },
    '/Order/:orderId': {
        name: '/Order',
        component: singleOrder
    },
    '/SendMessage/:userId': {
        name: '/SendMessage',
        component: SendMessage
    },
    '/GetMySendMessages': {
        component: MySendMessages
    },
    '/GetMyRecivedMessages': {
        component: MyRecivedMessages
    },
    '/GetUnReadMessages': {
        component: unReadMessages
    },
    '/GetReadMessages': {
        component: ReadMessages
    },
    '/messageDetails/:message_id/:viewType': {
        name: '/messageDetails',
        component: messageDetails
    },
    '/GetMyFavorites': {
        component: favorite
    },
    '/Category/:catId/:catName': {
        name: '/Category',
        component: category
    },
    '/AddCredit': {
        component: addCredit
    },
    '/AllCharge': {
        component: ShowAllCharge
    },
    '/AllPayment': {
        component: ShowAllPayment
    },
    '/AllProfit': {
        component: ShowAllProfit
    },
    '/AllWaitingProfit': {
        component: ShowAllWaitingProfit
    },
    '/AllBalance': {
        component: ShowAllBalance
    },
    '/Notification': {
        component: ShowAllNotification
    },
    '/UnReadNotification': {
        component: ShowAllUnReadNotification
    },
    '/loginError': {
        component: login_errors
    },
});

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector body.
route.start(App, 'body');
