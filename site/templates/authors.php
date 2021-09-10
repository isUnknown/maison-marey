<?= snippet('header') ?>

<h2 class="highlighted section section--first"><?= $site->authorsCatch()->nl2br() ?></h2>

<section class="authors section grid-3">
    <?php foreach($authors = $kirby->collection('authors') as $author): ?>
        <div class="author">
            <figure>
                <img class="author__cover" src="<?= $author->cover()->toFile()->crop(600, 800, 80)->url() ?>" alt="">
                <figcaption class="grid__image__caption author__id">
                    <h2 class="author__name orange"><?= $author->title() ?></h1>
                    <p class="author__job description orange"><?= $author->job() ?></p>
                </figcaption>
                <a href="<?= $author->url() ?>"><button class="see">portrait</button></a>
                <a href="<?= url('boutique') ?>"><button class="see">shop</button></a>
            </figure>
        </div>
    <?php endforeach ?>
</section><?php snippet('authors') ?>

<?= snippet('footer') ?>