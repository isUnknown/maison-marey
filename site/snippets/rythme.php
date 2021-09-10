<?php foreach ($layout->toLayouts() as $layout): $settings = $layout->attrs(); $layoutType = $settings->layout() ?>
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
    padding: <?php
        echo $settings->verticalPadding() . '% ' . $settings->horizontalPadding() . '%;';
    ?>
    margin-bottom: <?php
        echo $settings->space() . 'rem;';
    ?>
    margin-top: <?php
        echo '-' . $settings->translate() . '%;';
    ?>
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
                if ($settings->widthMode() == 'mono') {
                    if ($index == 1) {
                        echo $settings->leftColumnWidth() . '%';
                    }
                    if ($index == 2) {
                        echo (100 - $settings->leftColumnWidth()->toInt()) . '%';
                    }
                }
                if ($settings->widthMode() == 'duo') {
                    if ($index == 1)
                        echo $settings->soloLeftColumnWidth() . '% ';
                    if ($index == 2)
                        echo $settings->soloRightColumnWidth() . '%';
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
                            if ($index == 1)
                                echo $settings->leftPosition();
                            if ($index == 2)
                                echo $settings->rightPosition();
                        }
                    }
                ?>;
            "
            >
                <div class="block block-type-<?= $block->type() ?>"
                data-class="<?= $block->class() ?>"
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