<?php

return [
    'debug' => true,
    'api' => [
      'basicAuth' => true,
      'allowInsecure' => true
    ],
    'routes' => [
        // UPDATE DATA
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
        // RETURN PREPARED SHOP DATA
        [
          'pattern' => 'shop',
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
                      'extraCost' => $entry['extracost'],
                      'extraTime' => $entry['extratime']
                  ];
                  $preparedEntries[] = $preparedEntry;
                }

                $preparedOption = [
                    'name' => $rawOption->name()->value(),
                    'entries' => $preparedEntries
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
                  'orderType' => 'model',
                  'author' => $product->parent()->title()->value(),
                  'price' => $price,
                  'extraCost' => $extraCost,
                  'image' => $rawModel->cover()->toFile()->resize(300, null, 80)->url(),
                  'stock' => [
                    'maxQuantity' => $rawModel->quantity()->value(),
                    'selectedQuantity' => 0,
                    'remainingQuantity' => $rawModel->quantity()->value(),
                  ]
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
                'isDelivery' => (bool)$product->delivery()->toBool(),
                'isWithdrawal' => (bool)$product->withdrawal()->toBool(),
                'withdrawalMode' => null,
                'withdrawalModeFixed' => null,
                'withdrawalTime' =>(int)$product->withdrawalTime()->value(),
                'productionTime' => (int)$product->productionTime()->value(),
                'hasModels' => (bool)$product->stock()->toBool(),
                'hasOptions' => (bool)$product->order()->toBool(),
                'description' => $product->description()->value(),
                'images' => $preparedPics,
                'isVisible' => true,
                'materials' => $product->materials()->split(),
                'types' => $product->types()->split(),
                'url' => $product->url(),
                'selected' => []
              ];

              if ($preparedProduct['isDelivery'] && $preparedProduct['isWithdrawal']) {
                $preparedProduct['withdrawalMode'] = 'dual';
                $preparedProduct['withdrawalModeFixed'] = false;
              } else {
                $preparedProduct['withdrawalModeFixed'] = true;
                if ($preparedProduct['isDelivery']) {
                  $preparedProduct['withdrawalMode'] = 'delivery';
                } else {
                  $preparedProduct['withdrawalMode'] = 'withdrawal';
                }
              }

              if ($product->stock()->toBool() === true) {
                $preparedProduct['stock'] =  $preparedModels;
              } else {
                $preparedProduct['stock'] =  [];
              }
              
              if ($product->order()->toBool() === true && $product->options()->isNotEmpty()) {
                $preparedProduct['options'] =  $preparedOptions;
              } else {
                $preparedProduct['options'] =  [];
              }

              $preparedProducts[] = $preparedProduct;
            }

            $shop = [
              'products' => $preparedProducts,
              'delivery' => [
                'min' => (int)$site->minDeliveryTime()->value(),
                'max' => (int)$site->maxDeliveryTime()->value()
              ]
            ];

            return $shop;
          }
        ]
    ]
];