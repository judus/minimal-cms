<?= $this->getEditTopBar() ?>
<p>
    <a class="btn btn-primary"
       href="<?= $cte->getUrl() ?>"
       target="<?= $cte->getTarget()?>"
       role="button"><?= $cte->getText() ?> »</a>
</p>
<?= $this->getEditBottomBar() ?>