<?php
// This example sets up an endpoint using the Slim framework.
// Watch this video to get started: https://youtu.be/sGcNPFX1Ph4.

use Slim\Http\Request;
use Slim\Http\Response;
use Stripe\Stripe;

require 'vendor/autoload.php';

$app = new \Slim\App;

$app->add(function ($request, $response, $next) {
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/apikeys
  \Stripe\Stripe::setApiKey(

'sk_test_51ImEC4Lwp1JhIR6fzOyRfItlPh5H4tregwE90QRFGlaZSGP78ikCCfJLDLO3wpmzj9nbMzQc6wlTwLKySptYNQyf00igg8gm1L'
);

  return $next($request, $response);
});

$app->get('/order/success', function (Request $request, Response $response) {
  $session = \Stripe\Checkout\Session::retrieve($request->get('session_id'));
  $customer = \Stripe\Customer::retrieve($session->customer);

  return $response->write("<html><body><h1>Thanks for your order, $customer->name!</h1></body></html>");
});

$app->run();