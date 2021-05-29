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
                $key => $value,
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
                  $product = [
                    'id' => $product->id(),
                    'slug' => $product->slug(),
                    'author' => $product->parent()->title()->value(),
                    'name' => $product->title()->value(),
                    'price' => $product->price()->toInt(),
                    'description' => $product->description()->value(),
                    'inputQuantity' => 1,
                    'quantity' => $product->quantity()->toInt(),
                    // 'selectedQuantity' => 0,
                    'cover' => $product->images()->first()->url()
                  ];
                  $products[] = $product;
                }
            }

            return $products;
          }
        ]
    ]
];