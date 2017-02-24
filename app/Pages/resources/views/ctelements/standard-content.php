<?=$this->getEditTopBar()?>
<? if ($cte->getTitle()) : ?>
    <h2><?= $cte->getTitle() ?></h2>
<? endif ?>
<? if ($cte->getText()) : ?>
    <p><?= $cte->getText() ?></p>
<? endif ?>
<?= $this->getEditBottomBar() ?>