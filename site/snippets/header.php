<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $site->title() ?></title>
    
    <link rel="stylesheet" href="<?= url('assets') ?>/style.css?version-cache-prevent<?= rand(0, 1000)?>">
    
    <!--========== GSAP ==========-->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/CSSRulePlugin.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollToPlugin.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollTrigger.min.js" defer></script> -->
    
    <!--========== VUE ==========-->
    <script src="<?= url('assets') ?>/js/libraries/vue.js"></script>

    <!--========== SCRIPTS ==========-->   
    <script src="<?= url('assets') ?>/js/shop.js" type="module" defer></script>
    <script src="<?= url('assets') ?>/js/script.js" type="module" defer></script>

    <!--========== OPEN GRAPHS ==========-->
    <meta property='og:title' content='<?= $site->title() ?>' />
    <meta property='og:type' content='website' />
    <meta property='og:url' content='<?= $site->url() ?>' />
    <meta property='og:image' content='<?php
    if ($site->socialImg()->isNotEmpty()) {
        echo $site->socialImg()->toFile()->url();
    }
    ?>' />
    <meta property='og:description' content='<?= $site->desc() ?>' />
</head>
<body data-api-url="<?= $page->apiUrl() ?>" data-csrf=<?= csrf() ?> data-root-url="<?= $site->url() ?>">
    <div id="app" v-on:keyup.esc="closeModal">
        <!-- <svg width="100" height="100" class="cursor">
            <circle class="stroke" cx="25" cy="25" r="15" stroke="black" stroke-width="1" fill="none" />
            <circle class="fill" cx="25" cy="25" r="15" stroke="black" stroke-width="1" fill="none" />
            <circle class="fill" cx="25" cy="25" r="15" stroke="black" stroke-width="1" fill="none" />
        </svg> -->
        <header class="header">
            <div class="header__logo">
                <h1>
                    Maison<br />
                    Marey
                </h1>
            </div>
            <div class="header__filters filters">
                <vue-filter 
                    v-for="filter in filters.all"
                    :filter="filter"
                    :key="filter.name"
                    @update-filters="refreshActiveFilters"
                ></vue-filter>
            </div>
            <div class="header__right">
                <button class="cartBtn" @click="toggleCart">
                    <h1>Panier<sup v-if="totalQuantity > 0">{{ totalQuantity }}</sup></h1>
                </button>
                <button class="header__navBtn navBtn">
                    <span class="navBtn__bar"></span>
                    <span class="navBtn__bar"></span>
                </button>
            </div>
        </header>
