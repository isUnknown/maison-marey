        </div>
        <footer>
            <div class="first">
                <p><?= $site->title() ?><br />
                <?= $site->adress() ?><br />
                <?= $site->additional() ?><br />
                <?= $site->postalCode() ?> <?= $site->city() ?></p>
            </div>
            <div class="second">
                <p><?= $site->email() ?></p>

                <p>Instagram : <a href="<?= $site->instagram() ?>" rel="noopener noreferrer">@maisonmarey</a><br />
                Facebook : <a href="<?= $site->facebook() ?>" rel="noopener noreferrer">/maisonmarey</a></p>
            </div>
            <div class="third">
                <p>Contact</p>

                <p>Retours<br />
                Mentions légales</p>
            </div>
            <div class="fourth">
                <p>© 2021 Maison Marey.<br />
                Tous droits réservés.</p>

                <p>Design : <a href="https://www.hicetnunc-studio.fr/">Hic et Nunc studio</a><br />
                Developpement : Adrien Payet
                </p>                
            </div>
        </footer>
    </body>
</html>