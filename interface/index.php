<?php
require_once __DIR__ . '/application/helper/patch.php';
require_once __DIR__ . '/application/config/test.php';
require_once __DIR__ . '/vendor/autoload.php';

use org\weemvc\core\Application;
use org\weemvc\Pager;
use Dotenv\Dotenv;
use Bramus\Router\Router;
use Auth0\SDK\Exception\CoreException;
use application\helper\Auth0Helper;
use application\router\Book;
use application\router\Auth0Order;

// start the application
// $app = Application::getInstance(true); // use default weemvc router
$app = Application::getInstance();

// Read .env
try {
  $dotenv = new Dotenv(__DIR__);
  $dotenv->load();
} catch(InvalidArgumentException $ex) {
  // Ignore if no dotenv
}

$auth = new Auth0Helper();
// var_dump($auth);

// Create Router instance
$router = new Router();

// Activate CORS
function sendCorsHeaders() {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Authorization");
  header("Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE");
}

$router->options('/.*', function() {
  sendCorsHeaders();
});

// Check JWT on /secured routes
// http://stackoverflow.com/questions/1065188/in-php-5-3-0-what-is-the-function-use-identifier
// NOTICE: be careful to set all request methods here, see also https://github.com/bramus/router
$router->before('GET|POST', '/secured/.*', function() use ($auth) {
  $requestHeaders = apache_request_headers();
  //
  if (!isset($requestHeaders['Authorization'])) {
    header('HTTP/1.0 401 Unauthorized');
    Pager::output(998, 'no token provided', null, $this);
    exit();
  }

  $authorizationHeader = $requestHeaders['Authorization'];
  // why check it again?
  if ($authorizationHeader == null) {
    header('HTTP/1.0 401 Unauthorized');
    Pager::output(998, 'no authorization header sent', null, $this);
    exit();
  }

  $token = str_replace('Bearer ', '', $authorizationHeader);
  try {
    $auth->setCurrentToken($token);
  }catch(CoreException $e) {
    header('HTTP/1.0 401 Unauthorized');
    Pager::output(998, 'invalid token', null, $this);
    exit();
  }
});

$router->set404(function() {
  header('HTTP/1.1 404 Not Found');
  Pager::output(998, 'page not found', null, $this);
});

// ------------ business ------------
$router->get('/book/get_by_id', function() use ($auth){
  $handle = new Book();
  $handle->getById();
});

$router->get('/book/get_latest', function() use ($auth){
  $handle = new Book();
  $handle->getLatest();
});

$router->get('/book/get', function() use ($auth){
  $handle = new Book();
  $handle->get();
});

$router->get('/book/search', function() use ($auth){
  $handle = new Book();
  $handle->search();
});

$router->get('/book/search_by_tag', function() use ($auth){
  $handle = new Book();
  $handle->searchByTag();
});

$router->get('/book/search_by_author', function() use ($auth){
  $handle = new Book();
  $handle->searchByAuthor();
});

$router->get('/secured/order/get_by_user', function() use ($auth){
  $userInfo = $auth->getUserInfo();
  $handle = new Auth0Order();
  $handle->getByUser($userInfo['user_id']);
});

$router->post('/secured/order/save', function() use ($auth){
  $userInfo = $auth->getUserInfo();
  $handle = new Auth0Order();
  $handle->save($userInfo['user_id']);
});



// Run the Router
sendCorsHeaders();
$router->run();
