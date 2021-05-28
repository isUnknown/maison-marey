<?php

require '../../vendor/autoload.php';
\Stripe\Stripe::setApiKey('sk_test_51ImEC4Lwp1JhIR6fzOyRfItlPh5H4tregwE90QRFGlaZSGP78ikCCfJLDLO3wpmzj9nbMzQc6wlTwLKySptYNQyf00igg8gm1L');

header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://localhost:8888/maison-marey';

$checkout_session = \Stripe\Checkout\Session::create([
'payment_method_types' => ['card'],
'line_items' => [[
    'price_data' => [
    'currency' => 'usd',
    'unit_amount' => 2000,
    'product_data' => [
        'name' => 'Stubborn Attachments',
        'images' => ["https://i.imgur.com/EHyR2nP.png"],
    ],
    ],
    'quantity' => 1,
]],
'mode' => 'payment',
'success_url' => $YOUR_DOMAIN . '/success',
'cancel_url' => $YOUR_DOMAIN . '/cancel',
]);

echo json_encode(['id' => $checkout_session->id]);