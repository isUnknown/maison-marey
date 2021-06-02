<?php

return [
    'debug' => true,
    'api' => [
      'basicAuth' => true,
      'allowInsecure' => true
    ],
    'routes' => [
        [
          'pattern' => 'update-data/(:any)/(:any)/(:all)',
          'action'  => function ($key, $value, $page) {
            $kirby = kirby();
            $kirby->impersonate('kirby');

            if ( $page = page($page) ) {
            try {
                $page->update([
                  $key => $value
                ]);
                return new Response('Page successfully updated', 'text/plain', 200);
            } catch( Exception $e) {
                return new Response($e->getMessage(), 'text/plain', 404);
            }
            } else {
            return new Response('Page does not exists', 'text/plain', 404);
            }
          }
        ],
        [
          'pattern' => 'products',
          'action' => function() {
            $site = site();
            $products = [];
            $craftmans = $site->children()->listed();
            
            foreach ($craftmans as $craftman) {
                $craftmanProducts = $craftman->children()->listed();
                foreach ($craftmanProducts as $product) {
                  $rawOptions = $product->options()->toStructure();
                  $preparedOptions = [];
                  foreach ($rawOptions as $option) {
                    $newOption = [
                      'name' => $option->name()->value(),
                      'values' => $option->entries()->split()
                    ];
                    $preparedOptions[] = $newOption;
                  }
                  
                  $product = [
                    'id' => $product->id(),
                    'slug' => $product->slug(),
                    'author' => $product->parent()->title()->value(),
                    'name' => $product->title()->value(),
                    'price' => $product->price()->toInt(),
                    'description' => $product->description()->value(),
                    'inputQuantity' => 1,
                    'maxQuantity' => $product->quantity()->toInt(),
                    'selectedQuantity' => 0,
                    'remainingQuantity' => $product->quantity()->toInt(),
                    'cover' => $product->images()->first()->url(),
                    'isVisible' => true,
                    'materials' => $product->materials()->split(),
                    'types' => $product->types()->split(),
                    'url' => $product->url(),
                    'options' => $preparedOptions
                  ];
                  $products[] = $product;
                }
            }

            return $products;
          }
        ]
    ]
];