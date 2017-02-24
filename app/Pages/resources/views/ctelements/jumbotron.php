<?
$title = $cte->getTitle() ? $cte->getTitle() : '';
$text = $cte->getText() ? $cte->getText() : '';
?>

<?= $this->getEditTopBar() ?>
    <div class="jumbotron">
        <div class="container">
        <?= $this->area([
            'name' => 'contentArea',
            'label' => 'Container Area',
            'accept' => [
                'container',
                'standardContent',
                'twoColumnContent',
                'btn-primary',
                'row',
                'hr',
            ]
        ]) ?>
        <? /*
        <div class="container">
            <? if ($title) : ?>
                <h1><?= $title ?></h1>
            <? endif ?>
            <? if ($text) : ?>
                <p><?= $text ?></p>
            <? endif ?>
            <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn
                    more »</a></p>
        </div>
        */ ?>
        </div>
    </div>
<?= $this->getEditBottomBar() ?>


