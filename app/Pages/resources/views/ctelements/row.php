<div class="row">
    <?= $this->getEditTopBar() ?>
    <?= $this->area([
        'name' => 'rowArea',
        'label' => 'Row Area',
        'accept' => [
            'column'
        ]
    ]) ?>
    <?= $this->getEditBottomBar() ?>
</div>


