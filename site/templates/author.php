<?= snippet('header') ?>
    <div class="content">

        <section 
        class="row presentation"
        data-styles="
            background-color: <?= $page->presentationBackground() ?>; 
            color: <?= $page->presentationText() ?>;
            padding: 4rem 0; 
            margin-bottom: 3rem;
        ">
            <div class="column presentation__text" data-styles="width: 50%;">
                <div class="wrapper">
                    <div class="block">
                        <p>
                            Matière(s): <?= $page->materials() ?><br />
                            Objet(s): <?= $page->items() ?>
                        </p>
                        <p><?= $page->pitch() ?></p>
                    </div>
                </div>
            </div>
            <div class="column presentation__image">
                <div class="wrapper" data-styles="align-items: flex-end">
                    <div class="block" data-styles="width: 70%">
                        <img src="<?= $page->cover()->toFile()->url() ?>" srcset="<?= $page->toFile()->srcset([400, 800, 1600, 2000]) ?>" alt="">
                    </div>
                </div>
            </div>
        </section>

        <?php snippet('rythme', ['layout' => $page->layoutsection()]) ?>

        <section class="author__products main-padding">
            <h2 class="highlighted mgb2 mgt2 upline">Les créations de <?= $page->title() ?></h2>
            <div class="grid-2">
                <?php foreach($page->children()->limit(2) as $product): ?>
                <div class="product">
                    <div class="product">
                        <div class="product__images">
                            <img src="<?= $product->image()->url() ?>" alt="">
                        </div>
                        <div class="product__infos">
                            <div class="product__header">
                                <h2 class="product__name"><?= $product->title() ?></h2>
                                <h4 class="product__price"><?= $product->price() ?> €</h4>
                            </div>
                            <a href="<?= url('boutique') ?>"><button class="see">Shop</button></a>
                        </div>
                    </div>
                </div>                
                <?php endforeach ?>
            </div>
        </section>

        <section class="authors section grid-4 upline mgt4">
            <?php foreach($authors = $kirby->collection('authors')->limit(4) as $author): ?>
                <div class="author">
                    <figure>
                        <img class="author__cover" src="<?= $author->cover()->toFile()->crop(600, 800, 80)->url() ?>" alt="">
                        <figcaption class="author__id">
                            <h2 class="author__name orange"><?= $author->title() ?></h1>
                            <p class="author__job description orange"><?= $author->job() ?></p>
                        </figcaption>
                        <a href="<?= $author->url() ?>"><button class="see">portrait</button></a>
                        <a href="<?= url('boutique') ?>"><button class="see">shop</button></a>
                    </figure>
                </div>
            <?php endforeach ?>
        </section>

    </div>
<?php snippet('footer') ?>