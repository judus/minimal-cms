<div class="container">
    <?= $this->getEditTopBar() ?>

    <?= $this->area([
        'name' => 'contentArea',
        'label' => 'Container Area',
        'accept' => [
            'standardContent',
            'twoColumnContent',
            'btn-primary',
            'row',
            'hr',
        ]
    ]) ?>
    <?= $this->getEditBottomBar() ?>
</div>
