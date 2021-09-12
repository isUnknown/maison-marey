<?= snippet('header') ?>

<h2 class="highlighted section section--first"><?= $site->initiationsCatch()->nl2br() ?></h2>

<section class="grid-3 section">
    <?php foreach($page->children() as $initiation): ?>
        <div class="initiations">
            <figure>
                <img class="initiation__cover" src="<?= $initiation->cover()->toFile()->crop(600, 800, 80)->url() ?>" alt="">
                <figcaption class="initiation__id grid__image__caption">
                    <h2 class="initiation__name green"><?= $initiation->title() ?></h1>
                    <p class="initiation__author read green">Par <?= $initiation->author() ?></p>
                </figcaption>
                <p class="initiation__infos description">
                    <?= $initiation->schedule() ?><br />
                    <?= $initiation->place() ?>
                </p>
                <p class="initiation__price description">
                    <?= $initiation->price() ?> €
                </p>
                <p class="initiation__shortDescription description">
                    <?= $initiation->shortDescription() ?>
                </p>
                <a href="<?= $initiation->url() ?>"><button class="see">réserver</button></a>
            </figure>
        </div>
    <?php endforeach ?>
</section>

<?= snippet('footer') ?>