<?php

namespace Acme\Eloquent;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;

class EloquentBoot
{
    public function __construct()
    {
        $capsule = new Capsule();
        $capsule->addConnection([
            'driver' => 'mysql',
            'host' => DB_HOST,
            'port' => DB_PORT,
            'database' => DB_NAME,
            'username' => DB_USER,
            'password' => DB_PASSWORD,
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
        ]);

        $capsule->setEventDispatcher(new Dispatcher);
        $capsule->bootEloquent();
        $capsule->setAsGlobal();
    }
}