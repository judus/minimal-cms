<?php namespace Acme\Middlewares;

use Maduser\Minimal\Interfaces\ConfigInterface;
use Maduser\Minimal\Interfaces\MiddlewareInterface;
use Maduser\Minimal\Interfaces\RequestInterface;
use Maduser\Minimal\Interfaces\RouteInterface;

/**
 * Class Cache
 *
 * @package Maduser\Minimal\Middlewares
 */
class CmsCache implements MiddlewareInterface
{
    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var ConfigInterface
     */
    private $config;

    /**
     * @var
     */
    private $timeout;

    /**
     * @var
     */
    private $data;

    /**
     * @var
     */
    private $filename;

    /**
     * @var
     */
    private $enabled = true;

    /**
     * @return mixed
     */
    public function getTimeout()
    {
        return $this->timeout;
    }

    /**
     * @param mixed $timeout
     */
    public function setTimeout($timeout)
    {
        $this->timeout = $timeout;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param mixed $data
     */
    public function setData($data)
    {
        $this->data = $data;
    }

    /**
     * @return mixed
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * @param $uri
     */
    public function setFilename($uri)
    {
        $this->filename = PATH . rtrim($this->config->item('cache.path'), '/') .
            '/' . md5($uri) . '.cache';
    }

    public function enableCache($enabled)
    {
        $this->enabled = $enabled;
    }

    public function isEnabled()
    {
        return $this->enabled;
    }

    /**
     * Cache constructor.
     *
     * @param RequestInterface $request
     * @param ConfigInterface  $config
     * @param                  $timeout
     * @param                  $data
     */
    public function __construct(
        RequestInterface $request,
        ConfigInterface $config,
        $timeout,
        $data
    ) {
        $this->request = $request;
        $this->config = $config;

        $this->setTimeout($timeout);
        $this->setData($data);
        $this->setFilename($request->getUriString());


        if (session_status() != PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (isset($_SESSION['minimal']['editMode'])) {
            if ($_SESSION['minimal']['editMode'] === 0) {
                $this->enableCache(false);
            } else {
                $this->enableCache(true);
            }
        }
        if (!isset($_SESSION['minimal']['currentUser'])) {
            $this->enableCache(true);
        }

        die($_SESSION);

    }

    /**
     * @return string
     */
    public function before()
    {
        if ($this->isEnabled()) {
            $cache = $this->getCache($this->getFilename(), $this->getTimeout());
            if ($cache) {
                $cache = str_replace('</footer>',
                    '<p><small>Cached contents - FrontController was not executed</small></p></footer>', $cache);
            }

            return $cache;
        }
    }

    /**
     *
     */
    public function after()
    {
        if ($this->isEnabled()) {
            $this->deleteCache($this->getFilename());
            $this->setCache($this->getFilename(), $this->getData());
        }
    }

    /**
     * @param $filename
     */
    public function deleteCache($filename)
    {
        if (file_exists($filename)) {
            unlink($filename);
        }
    }

    /**
     * @param $filename
     * @param $data
     */
    public function setCache($filename, $data)
    {
        file_put_contents($filename, $data);
    }


    /**
     * @param $filename
     * @param $timeout
     *
     * @return string
     */
    public function getCache($filename, $timeout)
    {
        if (file_exists($filename)
            && (filemtime($filename) + $timeout) > time()
        ) {
            return file_get_contents($filename);
        }
    }

}