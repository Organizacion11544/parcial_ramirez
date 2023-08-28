<?php 
require_once __DIR__ . '/../includes/app.php';


use MVC\Router;
use Controllers\AppController;
use Controllers\UsuarioController;
use Controllers\DetalleController;
$router = new Router();
$router->setBaseURL('/' . $_ENV['APP_NAME']);

$router->get('/', [AppController::class,'index']);


//usuarios
$router->get('/usuario', [UsuarioController::class,'index']);
$router->get('/API/usuario/buscar', [UsuarioController::class,'buscarApi']);
$router->post('/API/usuario/guardar', [UsuarioController::class,'guardarApi']);
$router->post('/API/usuario/modificar', [UsuarioController::class,'modificarApi']);
$router->post('/API/usuario/eliminar', [UsuarioController::class,'eliminarApi']);

//estadistica

$router->get('/usuario/estadistica', [DetalleController::class,'estadistica']);
$router->get('/API/usuario/estadistica', [DetalleController::class,'detalleUsuarioAPI']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();
