<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?= ucFirst($page->name) ?></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" href="apple-touch-icon.png">

    <?= $this->assets->getVendorCss('top') ?>
    <?= $this->assets->getCss('top') ?>
    <?= $this->assets->getVendorJs('top') ?>
    <?= $this->assets->getExternalJs('top') ?>
    <?= $this->assets->getJs('top') ?>
</head>
<body>
    <!--[if lt IE 8]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser.
        Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve
        your experience.</p>
    <![endif]-->

    <?= $content->getMainBar() ?>

    <nav class="navbar navbar-static-top navbar-dark bg-inverse">
        <div class="container">
            <button class="navbar-toggler hidden-lg-up pull-right" type="button"
                    data-toggle="collapse" data-target="#exCollapsingNavbar">
                &#9776;
            </button>
            <div class="navbar-header">
                <a class="navbar-brand" href="/">Minimal</a>
            </div>
            <div class="collapse navbar-toggleable-md " id="exCollapsingNavbar">
                <ul class="nav navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <?
                        $currentPage = $page;
                        $root = $page->findByPath('/');

                    $pages = $root->children();
                    if (!$content->isEditMode()) {
                        $pages->active()->inTime();
                    }
                    $pages = $pages->isPage()->get();

                        //$pages = $root->children()->active()->where('node_type_id', '2')->get();
                    ?>
                    <? foreach ($pages as $page) : ?>

                        <? $children = $page->children()->where('node_type_id', '2')->get() ?>

                        <? if ($children->count() > 0) : ?>
                        <li class="nav-item dropdown">
                            <a href="/<?= $page->name ?>" class="nav-link dropdown-toggle"
                               data-toggle="dropdown" role="button"
                               aria-haspopup="true" aria-expanded="false"><?= ucFirst($page->name) ?>
                                <span class="caret"></span></a>
                        <? else : ?>
                        <li class="nav-item">
                            <a class="nav-link" href="/<?=$page->name?>"><?=ucFirst($page->name)?></a>
                        <? endif ?>
                        <? if ($children->count() > 0) : ?>
                            <div class="dropdown-menu">
                                <a class="dropdown-item"
                                   href="/<?= $page->name ?>">
                                    <?= ucFirst($page->name) ?>
                                </a>
                                <? foreach ($children as $childPage) : ?>
                                <a class="dropdown-item" href="/<?= $page->name ?>/<?= $childPage->name ?>">
                                    <?= ucFirst($childPage->name) ?>
                                </a>
                                <? endforeach ?>
                            </div>
                        <? endif ?>
                        </li>
                    <? endforeach ?>
                </ul>
            </div>
        </div>
    </nav>

    <?= $content->area([
        'name' => 'header',
        'label' => 'Header Area',
        'extend' => '/',
        'accept' => [
            'jumbotron',
        ]
    ]) ?>

    <?= $content->area([
        'name' => 'main',
        'label' => 'Main Area',
        'accept' => [
            'jumbotron',
            'container',
            'row',
            'standardContent',
            'twoColumnContent',
            'hr',
            'btn-primary'
        ]
    ]) ?>

    <footer>
        <?= $content->area([
            'name' => 'footer',
            'label' => 'Footer Area',
            'extend' => '/',
            'accept' => [
                'container',
                'standardContent',
                'twoColumnContent',
                'row',
                'benchmark'
            ]
        ]) ?>
    </footer>

    <div>
        <!-- Modal -->
        <div class="modal fade minimal-modal" id="modal-empty"
             tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header"></div>
                    <div class="modal-body"></div>
                    <div class="modal-footer"></div>
                </div>
            </div>
        </div>
    </div>

    <?= $this->assets->getExternalJs('bottom') ?>
    <?= $this->assets->getInlineScripts('jQueryFallback') ?>
    <?= $this->assets->getVendorJs('bottom') ?>
    <?= $this->assets->getJs('bottom') ?>
    <?= $this->assets->getInlineScripts() ?>
</body>
</html>