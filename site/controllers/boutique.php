<?php

return function ($site) {
    $products = [];
    $filters = [];
    $materials = [];
    $types = [];
    $authors = [];
    $craftmans = $site->children()->listed();
    
    foreach ($craftmans as $craftman) {
        $authors = [$craftman->title()->value()];
        $types = $craftman->types()->split();
        $materials = $craftman->materials()->split();

        $craftmanProducts = $craftman->children()->listed();
        foreach ($craftmanProducts as $product) {
            $products[] = $product;
        }
    }

    $filters = [
        [
            'name' => 'Matière',
            'tags' => $materials
        ],
        [
            'name' => 'Type',
            'tags' => $types
        ],
        [
            'name' => 'Artisan',
            'tags' => $authors
        ]
        ];


    return [
        'products' => $products,
        'filters' => json_encode($filters)
    ];
};