<?php

$entityBody = file_get_contents('php://input');
$products = json_decode($entityBody);

require '../../vendor/autoload.php';
\Stripe\Stripe::setApiKey('sk_test_51ImEC4Lwp1JhIR6fzOyRfItlPh5H4tregwE90QRFGlaZSGP78ikCCfJLDLO3wpmzj9nbMzQc6wlTwLKySptYNQyf00igg8gm1L');

header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://localhost:8888/maison-marey';

$checkout_session = \Stripe\Checkout\Session::create([
    'payment_method_types' => ['card'],
    'line_items' => [],
    'mode' => 'payment',
    'success_url' => $YOUR_DOMAIN . '/success',
    'cancel_url' => $YOUR_DOMAIN . '/cancel',
]);

// foreach ($products as $product) {
//     $checkout_session['line_items'][] = [
//         'price_data' => [
//             'currency' => 'eur',
//             'unit_amount' => $product->price,
//             'product_data' => [
//                 'name' => $product->name,
//                 'images' => [$product->image],
//             ],
//         ],
//         'quantity' => $product->quantity,
//     ];
// }

// echo json_encode(['id' => $checkout_session->id]);