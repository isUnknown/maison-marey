<?= snippet('header') ?>

    <div class="content visible">
        <div class="home">
            <button class="home__img">
                <video autoplay="true" loop="true" muted src="<?= $site->media()->toFile()->url() ?>" alt="">
                </video>
            </button>
            <h1 class="home__title">
                14 rue Etienne Marey <br />
                75020 Paris
            </h1>
            <h2 class="home__subtitle">
                Artisanat <br />
                Initiations <br />
                Démonstrations <br /> 
                Résidences <br />
            </h2>
            <h3 class="home__infos">
                Ouvert du mardi au samedi<br />
                11h-18h<br />
                Visite libre<br />
                <br />
                Démonstrations tournage sur bois<br />
                par Jérémy Dupont<br />
                jeudi et vendredi 18.08<br />
                <br />
                12 rue Étienne Marey<br />
                Côté rue du Lieutenant Chauré<br />
            </h3>
        </div>
    </div>

<?php snippet('footer') ?>