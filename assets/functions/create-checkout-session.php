<?php

$entityBody = file_get_contents('php://input');
$rawProducts = json_decode($entityBody);

require '../../vendor/autoload.php';
\Stripe\Stripe::setApiKey('sk_test_51ImEC4Lwp1JhIR6fzOyRfItlPh5H4tregwE90QRFGlaZSGP78ikCCfJLDLO3wpmzj9nbMzQc6wlTwLKySptYNQyf00igg8gm1L');

header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://maisonmarey.fr/v2/';

$preparedProducts = [];

foreach ($rawProducts as $rawProduct) {
    $preparedProducts[] = [
        'price_data' => [
            'currency' => 'eur',
            'unit_amount' => $rawProduct->price * 100,
            'product_data' => [
                'name' => $rawProduct->name,
                'images' => [$rawProduct->image],
            ],
        ],
        'quantity' => $rawProduct->quantity,
    ];
}

$checkout_session = \Stripe\Checkout\Session::create([
  'payment_method_types' => ['card'],
  'line_items' => $preparedProducts,
  'mode' => 'payment',
  'success_url' => $YOUR_DOMAIN . '/success.html',
  'cancel_url' => $YOUR_DOMAIN . '/cancel.html',
]);

echo json_encode(['id' => $checkout_session->id]);