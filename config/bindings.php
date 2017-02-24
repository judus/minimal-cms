<?php

return [
    // Core
    'Maduser\Minimal\Interfaces\ConfigInterface' =>
        Maduser\Minimal\Core\Config::class,

    'Maduser\Minimal\Interfaces\CollectionFactoryInterface' =>
        Maduser\Minimal\Factories\CollectionFactory::class,

    'Maduser\Minimal\Interfaces\CollectionInterface' =>
        Maduser\Minimal\Core\Collection::class,

    'Maduser\Minimal\Interfaces\ModulesInterface' =>
        Maduser\Minimal\Core\Modules::class,

    'Maduser\Minimal\Interfaces\ResponseInterface' =>
        Maduser\Minimal\Core\Response::class,

    'Maduser\Minimal\Interfaces\RequestInterface' =>
        Maduser\Minimal\Core\Request::class,

    'Maduser\Minimal\Interfaces\RouteInterface' =>
        Maduser\Minimal\Core\Route::class,

    'Maduser\Minimal\Interfaces\RouterInterface' =>
        Maduser\Minimal\Core\Router::class,

    // Libraries
    'Maduser\Minimal\Interfaces\AssetsInterface' =>
        Maduser\Minimal\Libraries\Assets\Assets::class,

    'Maduser\Minimal\Interfaces\ViewInterface' =>
        Maduser\Minimal\Libraries\View\View::class,

    // CMS-Module
    'Maduser\Minimal\Cms\Interfaces\NodesInterface' =>
        Maduser\Minimal\Cms\Models\Nodes::class,

    'Maduser\Minimal\Cms\Interfaces\ContentInterface' =>
        Maduser\Minimal\Cms\Models\Content::class,

    'Maduser\Minimal\Cms\Interfaces\PagesInterface' =>
        Maduser\Minimal\Cms\Models\Pages::class,

    // Auth-Module
    'Maduser\Minimal\Auth\Interfaces\AuthInterface' =>
        Maduser\Minimal\Auth\Models\Auth::class,


    // Trees-Module
    'Maduser\Minimal\Trees\Interfaces\NodeInterface' =>
        Maduser\Minimal\Trees\Eloquent\Node::class,

    'Maduser\Minimal\Trees\Interfaces\TreegridInterface' =>
        Maduser\Minimal\Trees\Models\Treegrid::class,


];
