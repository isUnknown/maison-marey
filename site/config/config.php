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
          
          // PREPARE PRODUCTS
          $site = site();
          $products = $site->index()->template('product');
          $preparedProducts = [];

          foreach ($products as $product) {

              // PREPARE OPTIONS
              $rawOptions = $product->options()->toStructure();
              $preparedOptions = [];

              foreach ($rawOptions as $rawOption) {
                // PREPARE OPTIONS ENTRIES
                $entries = $rawOption->entries()->value();
                $preparedEntries = [];
                foreach ($entries as $entry) {
                  $preparedEntry = [
                      'name' => $entry['name'],
                      'variable' => $entry['variable']
                  ];
                  $preparedEntries[] = $preparedEntry;
                }

                $preparedOption = [
                    'name' => $rawOption->name()->value(),
                    'entries' => $entries
                ];
                $preparedOptions[] = $preparedOption;
              }

              // PREPARE MODELS
              $rawModels = $product->models()->toStructure();
              $preparedModels = [];

              foreach ($rawModels as $rawModel) {
                $extraCost = $rawModel->extraCost()->isEmpty() ? false : $rawModel->extraCost()->value();
                $price = $extraCost ? $extraCost + $product->price()->value() : (int)$product->price()->value();

                $preparedModel = [
                  'name' => $product->title()->value(),
                  'modelName' => $rawModel->name()->value(),
                  'author' => $product->parent()->title()->value(),
                  'maxQuantity' => $rawModel->quantity()->value(),
                  'selectedQuantity' => 0,
                  'remainingQuantity' => $rawModel->quantity()->value(),
                  'price' => $price,
                  'extraCost' => $extraCost,
                  'image' => $rawModel->cover()->toFile()->resize(300, null, 80)->url()
                ];

                $preparedModels[] = $preparedModel;
              }

              //PREPARE IMAGES
              $rawPics = $product->pictures()->toFiles();
              $preparedPics = [];

              foreach ($rawPics as $rawPic) {
                $preparedPics[] = $rawPic->url();
              }

              $preparedProduct = [
                'id' => $product->id(),
                'name' => $product->title()->value(),
                'author' => $product->parent()->title()->value(),
                'price' => (int)$product->price()->value(),
                'description' => $product->description()->value(),
                'images' => $preparedPics,
                'isVisible' => true,
                'materials' => $product->materials()->split(),
                'types' => $product->types()->split(),
                'url' => $product->url(),
                'selected' => []
              ];

              if($product->stock()->toBool() === true) {
                $preparedProduct['stock'] =  $preparedModels;
              }
              if($product->order()->toBool() === true && $product->options()->isNotEmpty()) {
                $preparedProduct['options'] =  $preparedOptions;
              }

              $preparedProducts[] = $preparedProduct;
          }

          return $preparedProducts;
        }
      ]
    ]
];