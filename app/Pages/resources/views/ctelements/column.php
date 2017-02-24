<div class="col-md-4">
    <?= $this->getEditTopBar() ?>
    <?= $this->area([
        'name' => 'contentArea',
        'label' => 'Column Area',
        'accept' => [
            'standardContent',
            'btn-primary',
            'hr',
            'benchmark'
        ]
    ]) ?>
    <?= $this->getEditBottomBar() ?>
</div>