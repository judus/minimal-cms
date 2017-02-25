<?php

// PHP 7.0 is required
if (version_compare(phpversion(), '7.0.0', '<')) {
    die('Requires PHP version > 7.0.0');
}

// Development mode
ini_set('error_reporting', E_ALL);
ini_set('display_errors', true);

// Load composer autoloader
require "../vendor/autoload.php";

// Development utilities
require "../helpers/common.php";

// Boot Eloquent
if (file_exists('../config/database.php')) {
    $database = require "../config/database.php";
    new \Maduser\Minimal\Db\Eloquent\EloquentBoot(
        $database['connections']['mysql']
    );
} else {
    die('Database connection not set');
}

// Start the benchmarker
$benchmark = new \Maduser\Minimal\Libraries\Benchmark\Benchmark();
$benchmark->mark('Start');

// Instantiate the Minimal Framework and let's roll
$minimal = new \Maduser\Minimal\Core\Minimal([
    'basepath' => realpath(__DIR__ . '/../'),
    'app' => 'app',
    'config' => 'config/config.php',
    'bindings' => 'config/bindings.php',
    'providers' => 'config/providers.php',
    'routes' => 'config/routes.php'
], true);

$benchmark->mark('Minimal instantiated');

$benchmark->mark('Registering configs');

$minimal->load();

$benchmark->mark('Ready');

/** @var \Maduser\Minimal\Core\Request $request */
$request = $minimal->getRequest();

/** @var \Maduser\Minimal\Core\Router $router */
$router = $minimal->getRouter();

$benchmark->mark('Resolving route');

/** @var \Maduser\Minimal\Core\Route $route */
$route = $router->getRoute($request->getUriString());
$benchmark->mark('Route resolved');

/** @var \Maduser\Minimal\Core\Middleware $middleware */
$middleware = $minimal->getMiddleware($route->getMiddlewares());

$benchmark->mark('Middleware before start');

/** @var mixed $result */
$result = $middleware->dispatch(function () use ($minimal, $route, $benchmark) {

    $benchmark->mark('Middleware before end');

    $benchmark->mark('FrontController start');

    $result = $minimal->getFrontController()->dispatch($route)->getResult();

    $benchmark->mark('FrontController end');

    $benchmark->mark('Middleware after start');

    return $result;
});

$benchmark->mark('Middleware after end');

$benchmark->mark('Preparing the response');

/** @var \Maduser\Minimal\Core\Response $response */
$response = $minimal->getResponse();

$response->prepare($result);

$benchmark->mark('Ready to send response');

$response->setContent(
    $benchmark->addBenchmarkInfo($response->getContent(), '{benchmark}')
);

$response->sendPrepared();

$minimal->exit();

// adios