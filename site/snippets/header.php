<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $site->title() ?> <?php e($page->url() !== $site->url(), ' - '. $page->title()) ?></title>
    
    <link rel="stylesheet" href="<?= url('assets') ?>/style.css?version-cache-prevent<?= rand(0, 1000)?>">
    
    <!--========== GSAP ==========-->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/CSSRulePlugin.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollToPlugin.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollTrigger.min.js" defer></script> -->
    
    <!--========== VUE ==========-->
    <script src="<?= url('assets') ?>/js/libraries/vue.js" type="module" defer></script>

    <!--========== SCRIPTS ==========-->   
    <script src="<?= url('assets') ?>/js/app.js" type="module" defer></script>
    <script src="<?= url('assets') ?>/js/script.js" type="module" defer></script>
    <script src="https://js.stripe.com/v3/" defer></script>

    <!--========== SWIPER ==========-->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js" defer></script>

    <!--========== OPEN GRAPHS ==========-->
    <meta property='og:title' content='<?= $site->title() ?> - <?= $page->title() ?>' />
    <meta property='og:type' content='website' />
    <meta property='og:url' content='<?= $site->url() ?>' />
    <meta property='og:image' content='<?php
    if ($site->socialImg()->isNotEmpty()) {
        echo $site->socialImg()->toFile()->url();
    }
    ?>' />
    <meta property='og:description' content='<?= $site->desc() ?>' />
</head>
<body 
    data-api-url="<?= $page->apiUrl() ?>"
    data-csrf=<?= csrf() ?>
    data-root-url="<?= $site->url() ?>"
    data-nav-pages="<?= $kirby->collection('nav-pages') ?>"
<?php if ($page->url() == $site->url()): ?>
    style="background-color: var(--color-main-bg);"
<?php endif ?>
>
    <div id="app" v-on:keyup.esc="closeModal">
        <!-- <svg width="100" height="100" class="cursor">
            <circle class="stroke" cx="25" cy="25" r="15" stroke="black" stroke-width="1" fill="none" />
            <circle class="fill" cx="25" cy="25" r="15" stroke="black" stroke-width="1" fill="none" />
            <circle class="fill" cx="25" cy="25" r="15" stroke="black" stroke-width="1" fill="none" />
        </svg> -->
        <vue-header
            :nav-pages="navPages"
            :root-url="rootUrl"
        ></vue-header>