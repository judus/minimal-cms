<?= $this->getEditTopBar() ?>
<div class="row">
    <div class="col-md-6">
        <?= $this->area([
            'name' => 'contentAreaLeft',
            'label' => 'Column',
            'accept' => [
                'standardContent',
                'btn-primary',
                'hr'

            ]
        ]) ?>
    </div>
    <div class="col-md-6">
        <?= $this->area([
            'name' => 'contentAreaRight',
            'label' => 'Column',
            'accept' => [
                'standardContent',
                'btn-primary',
                'hr'
            ]
        ]) ?>
    </div>
</div>
<?= $this->getEditBottomBar() ?>
