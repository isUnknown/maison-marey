<?php

return function () {
    $models = [];

    $products = $site->index()->template('product');

    foreach ($products as $product) {
        $rawOptions = $product->options()->toStructure();
        $preparedOptions = [];
        
        foreach ($rawOptions as $option) {
            $option = [
                'name' => $option->name()->value(),
                'values' => $option->entries()->split()
            ];

            foreach ($option->values as $value) {
                $model;
            }
        }
    }

    return $models;
};