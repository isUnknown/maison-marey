<?php

return function ($site) {
    $products = [];
    $craftmans = $site->children()->listed();
    
    foreach ($craftmans as $craftman) {
        $craftmanProducts = $craftman->children()->listed();
        foreach ($craftmanProducts as $product) {
            $products[] = $product;
        }
    }

    return [
        'products' => $products
    ];
};