<?= snippet('header') ?>

<h2 class="claim">— Une sélection d'artisans<br />aux savoir-faire uniques.</h2>

<section class="authors">
    <?php foreach($authors = $kirby->collection('authors') as $author): ?>
        <div class="author">
            <figure>
                <img class="author__cover" src="<?= $author->cover()->toFile()->crop(600, 800, 80)->url() ?>" alt="">
                <figcaption class="author__id">
                    <h1 class="author__name"><?= $author->title() ?></h1>
                    <h2 class="author__job"><?= $author->job() ?></h2>
                </figcaption>
                <a href="<?= $author->url() ?>"><button class="see">portrait</button></a>
                <a href=""><button class="see">boutique</button></a>
            </figure>
        </div>
    <?php endforeach ?>
</section>

<?= snippet('footer') ?>