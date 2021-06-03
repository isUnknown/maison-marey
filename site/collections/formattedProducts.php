<?php

return function($kirby) {
    $products = $kirby->collections('products');
    $formattedProducts = [];

    // FORMAT PRODUCTS
    foreach ($products as $product) {

        // FORMAT OPTIONS
        $rawOptions = $product->options()->toStructure();
        $preparedOptions = [];

        foreach ($rawOptions as $rawOption) {
            $entries = [];
            foreach ($rawOption->entries()->toStructure() as $entry) {
                $formattedEntry = [
                    'name' => $entry->name()->value(),
                    'variable' => $entry->variable()->value()
                ]
                $entries[] = $formattedEntry;
            }

            $preparedOption = [
                'name' => $rawOption->name()->value(),
                'entries' => $entries
            ];
        }

        $formattedProduct = [
            'id' => $product->id(),
            'name' => $product->title()->value(),
            'author' => $product->author(),
            'price' => $product->price(),
            'description' => $product->description(),
            'maxQuantity' => $product->quantity()->toInt(),
            'selectedQuantity' => 0,
            'remainingQuantity' => $product->quantity()->toInt(),
            'cover' => $product->coverImage()->url(),
            'isVisible' => true,
            'materials' => $product->materials()->split(),
            'types' => $product->types()->split(),
            'url' => $product->url(),
            'options' => $preparedOptions,
            'stock' => $models,
            'selected' => []
        ];
    }

    return $formattedProducts;
}