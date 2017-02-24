<?php

/** @var \Maduser\Minimal\Core\Router $route */

$route->group([
    'uriPrefix' => 'minimal',
    'namespace' => 'Maduser\\Minimal\\Auth\\Controllers\\'
], function () use ($route) {

    $route->get('login', [
        'controller' => 'AuthController',
        'action' => 'loginForm' // Show the login form
    ]);

    $route->post('login', [
        'controller' => 'AuthController',
        'action' => 'login' // Login the user
    ]);
    /*
    $route->get('register', [
        'controller' => 'AuthController',
        'action' => 'registerForm'
    ]);

    $route->post('register', [
        'controller' => 'AuthController',
        'action' => 'register'
    ]);
    */

    $route->get('logout', [
        'controller' => 'AuthController',
        'action' => 'logout' // Logout the user
    ]);

    $route->group([
        'middlewares' => [
            'Maduser\\Minimal\\Auth\Middlewares\\CheckPermission',
        ]
    ], function () use ($route) {

        $route->get('users', [
            'controller' => 'UserController',
            'action' => 'list'
        ]);

        $route->get('users/create', [
            'controller' => 'UserController',
            'action' => 'createForm'
        ]);

        $route->get('users/edit/(:num)', [
            'controller' => 'UserController',
            'action' => 'editForm'
        ]);
    });
});


$route->group([
    'middlewares' => ['Maduser\\Minimal\\Auth\Middlewares\\CheckPermission']
    //'middlewares' => ['Acme\\Middlewares\\Cache' => [(10)]]
], function() use ($route) {
    /*
    $route->get('(:num)', [
        'controller' => 'Acme\\Pages\\Controllers\\PagesController',
        'action' => 'getById',
    ]);


    $route->get('(:any)', [
        'controller' => 'Acme\\Pages\\Controllers\\PagesController',
        'action' => 'getBySegments',
    ]);


*/
    /*
    $route->get('(:any)', [
        'controller' => 'Acme\\Pages\\Controllers\\PagesController',
        'action' => 'getStaticPage',
    ]);
    */

    $route->group([
        'namespace' => 'Maduser\\Minimal\\Cms\Controllers\\',
        'middlewares' => 'Maduser\\Minimal\\Auth\Middlewares\\CheckPermission'
    ], function () use ($route) {

        $route->group([
            'uriPrefix' => 'minimal/contents',
            'namespace' => 'Maduser\\Minimal\\Cms\Controllers\\',
        ], function () use ($route) {
            
            $route->post('page', 'PagesController@createFromUri');
            $route->delete('', 'ContentController@delete');

            $route->get('edit/(:num)', 'ContentController@edit');

            $route->post('', 'ContentController@save');
            $route->post('elements', 'ContentController@listElements');
            $route->post('element', 'ContentController@editElement');
            $route->post('editmode', 'ContentController@toggleEditMode');
            $route->post('move', 'ContentController@moveNode');
            $route->post('activate', 'ContentController@activateNode');
            $route->post('duplicate', 'ContentController@duplicateNode');

            $route->get('timer/(:num)', 'ContentController@timer');
            $route->post('timer', 'ContentController@saveTimer');

            $route->get('cache/(:num)', 'ContentController@cache');
            $route->post('cache', 'ContentController@saveCache');
        });


        $route->group([
            'uriPrefix' => 'minimal/nodes',
            'namespace' => 'Maduser\\Minimal\\Trees\Controllers\\',
            'middlewares' => 'Maduser\\Minimal\\Auth\Middlewares\\CheckPermission'
        ], function () use ($route) {

            // Navigation panel
            $route->get('', 'NodesController@index');
            $route->get('(:num)', 'NodesController@index');
            $route->get('json/(:num)', 'NodesController@json');
            $route->get('(:num)/nodes/json', 'NodesController@json');
            $route->get('(:num)/render', 'NodesController@render');
            $route->get('(:num)/node', 'NodesController@render');
            $route->get('seed', 'NodesController@seed');

            // create node
            $route->post('(:num)/append', 'NodesController@append');

            // update node
            $route->put('(:num)', 'NodesController@update');

            // moving, copying nodes
            $route->post('copy', 'NodesController@copyAndPaste');
            $route->post('cut', 'NodesController@cutAndPaste');
            $route->post('move', 'NodesController@move');

            // delete node
            $route->delete('(:num)', 'NodesController@destroy');

            // Main panel
            $route->get('(:num)/tabs', 'NodesController@tabs');
            $route->get('(:num)/overview', 'NodesController@overview');

            $route->get('(:num)/properties', 'NodesController@properties');
            $route->get('(:num)/properties/json',
                'NodesController@propertiesJson');

            $route->get('(:num)/dialog', 'NodesController@dialog');

            $route->get('(:num)/presenter', 'NodesController@presenter');

            $route->get('(:num)/view', 'NodesController@view');
            $route->post('(:num)/view', 'NodesController@storeViewFileContents');

            $route->get('(:num)/create', 'NodesController@create');
            $route->get('(:num)/edit', 'NodesController@edit');

            // Tool panel
            $route->get('ct-areas', 'NodesController@ctAreas');
            $route->get('ct-areas/json', 'NodesController@ctAreasJson');

            $route->get('ct-elements', 'NodesController@ctElements');
            $route->get('ct-elements/json', 'NodesController@ctElementsJson');

            $route->get('dialogs', 'NodesController@dialogs');
            $route->get('dialogs/json', 'NodesController@dialogsJson');

            $route->get('form-elements', 'NodesController@formElements');
            $route->get('form-elements/json',
                'NodesController@formElementsJson');

            $route->get('presenters', 'NodesController@presenters');
            $route->get('presenters/json', 'NodesController@presentersJson');

            $route->get('types', 'NodesController@types');
            $route->get('types/json', 'NodesController@typesJson');

            $route->get('views', 'NodesController@views');
            $route->get('views/json', 'NodesController@viewsJson');
            $route->get('views/select', 'NodesController@viewsSelect');

            $route->get('help', 'NodesController@help');
            $route->get('rebuild', 'NodesController@rebuild');
            $route->get('update/nodes', 'NodesController@updateNodes');
        });


        $route->group([
            'uriPrefix' => 'minimal/pages',
            'namespace' => 'Maduser\\Minimal\\Cms\Controllers\\',
            'middlewares' => 'Maduser\\Minimal\\Auth\Middlewares\\CheckPermission'
        ], function () use ($route) {
            $route->get('new', 'PagesController@showForm');
            $route->get('edit/(:num)', 'PagesController@edit');
            $route->get('settings/(:num)', 'PagesController@settings');
            $route->get('json', 'PagesController@jsonTree');
            $route->post('', 'PagesController@save');

            $route->post('activate', 'PagesController@activateNode');
            $route->post('duplicate', 'ContentController@duplicateNode');

            $route->get('timer/(:num)', 'ContentController@timer');
            $route->post('timer', 'ContentController@saveTimer');

            $route->get('cache/(:num)', 'ContentController@cache');
            $route->post('cache', 'ContentController@saveCache');

            $route->delete('', 'PagesController@delete');
        });

        $route->group([
            'uriPrefix' => 'minimal/user',
            'namespace' => 'Maduser\\Minimal\\Cms\Controllers\\',
            'middlewares' => 'Maduser\\Minimal\\Auth\Middlewares\\CheckPermission'
        ], function () use ($route) {
            $route->get('', 'UserController@index');
        });

    });

});


$route->get('(:any)', [
    'middlewares' => [
        'Maduser\\Minimal\\Libraries\\Content\\Middlewares\\CmsCache' => [(60)]
    ],
    'controller' => 'Maduser\\Minimal\\Cms\\Controllers\\PagesController',
    'action' => 'getBySegments',
]);





