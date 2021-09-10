<?= snippet('header') ?>
    <div class="section">
        <h1 class="title green mgt2 mgb2">
            <?= $page->title() ?>
        </h1>
        <div class="modal__header">
            <div class="modal__header__images swiper-container">
                <div class="swiper-wrapper">
                    <?php foreach($page->images() as $image): ?>
                        <img class="swiper-slide" src="<?= $image->url() ?>" />
                    <?php endforeach ?>
                </div>
            </div>
            <div class="modal__header__details">
                <p class="initiation__author read green">Par <?= $page->author() ?></p>
                <p class="initiation__infos description">
                    <?= $page->schedule() ?><br />
                    <?= $page->place() ?>
                </p>
                <p class="initiation__price description">
                    <?= $page->price() ?> €
                </p>
                <p class="initiation__shortDescription description">
                    <?= $page->longDescription() ?>
                </p>
                <a href="<?= $page->url() ?>"><button class="see">réserver</button></a>
            </div>
        </div>
    </div>

<?php snippet('footer') ?>