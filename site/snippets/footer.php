        </div>
        <footer>
            <div class="first">
                <p class="description"><?= $site->title() ?><br />
                <?= $site->adress() ?><br />
                <?= $site->additional() ?><br />
                <?= $site->postalCode() ?> <?= $site->city() ?></p>
            </div>
            <div class="second">
                <p class="description"><?= $site->email() ?></p>

                <p class="description">Instagram : <a href="<?= $site->instagram() ?>" rel="noopener noreferrer">@maisonmarey</a><br />
                Facebook : <a href="<?= $site->facebook() ?>" rel="noopener noreferrer">/maisonmarey</a></p>
            </div>
            <div class="third">
                <p class="description">Contact</p>

                <p class="description">Retours<br />
                Mentions légales</p>
            </div>
            <div class="fourth">
                <p class="description">© 2021 Maison Marey.<br />
                Tous droits réservés.</p>

                <p class="description">Design : <a href="https://www.hicetnunc-studio.fr/">Hic et Nunc studio</a><br />
                Developpement : Adrien Payet
                </p>                
            </div>
        </footer>
    </body>
</html>