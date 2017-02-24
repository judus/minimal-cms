<?php namespace Acme\Pages\Controllers;

use Collective\Html\FormBuilder;
use Collective\Html\HtmlBuilder;
use Maduser\Minimal\Interfaces\ConfigInterface;
use Maduser\Minimal\Interfaces\RequestInterface;
use Maduser\Minimal\Interfaces\RouterInterface;
use Maduser\Minimal\Interfaces\RouteInterface;
use Maduser\Minimal\Interfaces\ViewInterface;
use Maduser\Minimal\Interfaces\AssetsInterface;
use Maduser\Minimal\Interfaces\ResponseInterface;
use Maduser\Minimal\Interfaces\ModulesInterface;

use Acme\Pages\Entities\Page;
use Maduser\Minimal\Libraries\Content\Interfaces\ContentInterface;
use Maduser\Minimal\Libraries\Content\Interfaces\PageInterface;

/**
 * Class PagesController
 *
 * @package Acme\Pages\Controllers
 */
class PagesController
{
    /**
     * @var ConfigInterface
     */
    protected $config;

    /**
     * @var RequestInterface
     */
    protected $request;

    /**
     * @var RouterInterface
     */
    protected $router;

    /**
     * @var RouteInterface
     */
    protected $route;

    /**
     * @var ResponseInterface
     */
    protected $response;

    /**
     * @var ViewInterface
     */
    protected $view;

    /**
     * @var AssetsInterface
     */
    protected $assets;

    /**
     * @var ModulesInterface
     */
    protected $modules;

    /**
     * @var Content
     */
    protected $content;

    /**
     * @var \Maduser\Minimal\Libraries\Content\Models\Pages
     */
    protected $pages;

    /**
     * PageController constructor.
     *
     * @param ConfigInterface   $config
     * @param RequestInterface  $request
     * @param RouterInterface   $router
     * @param ResponseInterface $response
     * @param ViewInterface     $view
     * @param AssetsInterface   $assets
     * @param ModulesInterface  $modules
     * @param ContentInterface  $content
     * @param PageInterface     $pages
     */
    public function __construct(
        ConfigInterface $config,
        RequestInterface $request,
        RouterInterface $router,
        ResponseInterface $response,
        ViewInterface $view,
        AssetsInterface $assets,
        ModulesInterface $modules,
        ContentInterface $content,
        PageInterface $pages
    ) {
        /** @var \Maduser\Minimal\Core\Config $config */
        $this->config = $config;
        /** @var \Maduser\Minimal\Core\Request $request */
        $this->request = $request;
        /** @var \Maduser\Minimal\Core\Router $router */
        $this->router = $router;
        /** @var \Maduser\Minimal\Core\Response $response */
        $this->response = $response;
        /** @var \Maduser\Minimal\Libraries\View\View $view */
        $this->view = $view;
        /** @var \Maduser\Minimal\Libraries\Assets\Assets $assets */
        $this->assets = $assets;
        /** @var \Maduser\Minimal\Core\Modules $modules */
        $this->modules = $modules;
        /** @var \Maduser\Minimal\Libraries\Content\Models\Content $content */
        $this->content = $content;
        /** @var \Maduser\Minimal\Libraries\Content\Models\Pages $pages */
        $this->pages = $pages;
        //show($this->assets, 'assests');

        // Setup views
        $this->view->setBase('../app/Pages/resources/views');
        $this->view->setTheme('my-theme');
        $this->view->setLayout('layouts/my-layout');
        $this->view->share('title', 'My title');
        $this->view->share('content', $this->content);

        // Setup assets
        $this->assets->setSource('../app/Pages/public/build');
        $this->assets->setBase('assets/pages/public/build');
        $this->assets->setTheme('my-theme');
        $this->assets->setCssDir('css');
        $this->assets->setJsDir('js');
        $this->assets->setVendorDir('vendor');

        // Register assets
        $this->assets->addCss([
            'main.css', 'minimal.css'
        ], 'top');

        $this->assets->addVendorJs([
            'modernizr/modernizr.min.js'
        ], 'top');

        $this->assets->addVendorJs([
            'tether/js/tether.min.js',
            'bootstrap/js/bootstrap.min.js',
            'fastclick/lib/fastclick.js'
        ], 'bottom');

        $this->assets->addJs([
            'main.js',
            'cms.js',
            'fallback.js'
        ], 'bottom');

        $this->assets->addExternalJs([
            '//use.fontawesome.com/a5ef1ccf05.js'
        ], 'top');

        $this->assets->addExternalJs([
            '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
        ], 'bottom');

        $this->assets->addExternalJs([
            '//code.jquery.com/ui/1.12.1/jquery-ui.min.js'
        ], 'bottom');

        $this->assets->addInlineScripts('jQueryFallback', function () {
            return $this->view->render('scripts/jquery-fallback', [], true);
        });
    }

    /**
     * @param null $name
     *
     * @return string
     */
    public function welcome($name = null)
    {
        $name = $name ? ' ' . ucfirst($name) : '';

        return 'Welcome' . $name . '!';
    }

    /**
     * @return string
     */
    public function contact()
    {
        return 'Imagine a contact form here';
    }

    /**
     * @param $uri
     *
     * @return string
     */
    public function getStaticPage($uri)
    {
        return $this->view->render('pages/my-view', [
            'content' => 'Would load page ' . "'" . str_replace('/', '-',
                    $uri) . "'"
        ]);
    }

    /**
     * @param $id
     *
     * @return string
     */
    public function getById($id)
    {
        $page = new Page();
        $page = $page->find($id);
        $this->content->setParentId($page->id);

        $this->view->setLayout(null);

        return $this->view->render($page->view->path, [
            'content' => $this->content
        ]);

    }

    public function getBySegments($uri)
    {

        $page = new Page();
        //$page = $page->find(1113);
        //$page->delete();

        $this->pages->setView($this->view);
        return $this->pages->getByPathOrCreate($uri);
    }

    /**
     *
     */
    public function info()
    {
        ob_start();
        show($this->config, 'Config');
        show($this->request, 'Request');
        show($this->router, 'Router');
        show($this->router->getRoute(), 'Route');
        show($this->modules, 'Modules');
        show($this->response, 'Response');
        show($this->view, 'View');
        show($this->assets, 'Assets');
        $contents = ob_get_contents();
        ob_end_clean();

        return $this->view->render('pages/my-view', [
            'content' => $contents
        ]);

    }
}