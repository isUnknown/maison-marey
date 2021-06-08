<?= snippet('header') ?>
    <div class="content">

        <section class="row presentation" class="row" data-styles="background-color: <?= $page->presentationBackground() ?>; padding: 4rem 0; margin-bottom: 3rem;">
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

        <?php foreach ($page->layout()->toLayouts() as $layout): $settings = $layout->attrs(); $layoutType = $settings->layout() ?>
        <section class="row"
        data-styles="
            column-gap: <?php
                if ($layoutType == 'duo')
                    echo $settings->gutter() . 'rem';
            ?>;
            background-color:<?php 
                if ($layoutType == 'mono' || $settings->colorMode() == 'mono')
                    echo $settings->backgroundColor();
            ?>;
            color:<?php
                if ($layoutType == 'mono' || $settings->colorMode() == 'mono')
                    echo $settings->textColor();
            ?>;
            margin-bottom: <?php
                echo $settings->space() . 'rem';
            ?>;
        "
        >
            <?php $index = 0; foreach ($layout->columns() as $column): $index++;?>
        
            <div class="column"

            data-styles="
                width: <?php 
                    if ($layoutType == 'mono') {
                        echo $settings->width() . '%';
                    }
                    if ($layoutType == 'duo') {
                        if ($settings->widthMode() == 'mono')
                            echo $settings->leftColumnWidth() . '%';
                        if ($settings->widthMode() == 'duo') {
                            if ($index == 1)
                                echo $settings->soloLeftColumnWidth() . '%';
                            if ($index == 2)
                                echo $settings->soloRightColumnWidth() . '%';
                        }
                    }
                ?>;
                padding: <?php 
                    if ($layoutType == 'mono') {
                        echo $settings->verticalPadding() . '% ' . $settings->horizontalPadding() . '%';
                    }
                    if ($layoutType == 'duo') {
                        if ($index == 1) {
                            echo $settings->leftVerticalPadding() . '% ' . $settings->leftHorizontalPadding() . '%';
                        }
                        if ($index == 2) {
                            echo $settings->rightVerticalPadding() . '% ' . $settings->rightHorizontalPadding() . '%';
                        }
                    }
                ?>;
                background-color: <?php
                    if ($layoutType == 'duo' && $settings->colorMode() == 'duo') {
                        if ($index == 1) {
                            echo $settings->leftBackgroundColor();
                        }
                        if ($index == 2) {
                            echo $settings->rightBackgroundColor();
                        }
                    }
                ?>;
            "
            >
                <div class="blocks">
                    <?php foreach ($column->blocks() as $block): ?>
                    <div class="wrapper"
                    data-styles="
                        align-items: <?php
                            if ($layoutType == 'mono')
                                echo $settings->globalPosition();
                            if ($layoutType == 'duo') {
                                if ($settings->positionMode() == 'mono')
                                    echo $settings->globalPosition();
                                if ($settings->positionMode() == 'duo') {
                                    if ($infex == 1)
                                        echo $settings->leftPosition();
                                    if ($index == 2)
                                        echo $settings->rightPosition();
                                }
                            }
                        ?>;
                    "
                    >
                        <div class="block block-type-<?= $block->type() ?>"
                        data-styles="
                            width: <?= $block->blockWidth() ?>%;
                            <?= $block->marginMode() ?>: <?= $block->marginTop() ?>% <?= $block->marginright() ?>% <?= $block->marginBottom() ?>% <?= $block->marginleft() ?>%;
                        "
                        >
                            <?= $block ?>
                        </div>
                    </div>
                    <?php endforeach ?>
                </div>
            </div>
            <?php endforeach ?>
        </section>
        <?php endforeach ?>

    </div>
</body>
</html>