<?php

namespace Controllers;

use Exception;
use Model\Detalle;
use MVC\Router;

class DetalleController
{
    public static function estadistica(Router $router)
    {
        if(isset($_SESSION['auth_user'])){
            $router->render('usuario/estadistica', []);
        }else{
            header('Location: /parcial_ramirez/');
        }
    }

    public static function detalleClientesAPI()
    {

        $sql = "SELECT * FROM usuario WHERE usu_situacion ='ACTIVO'; ";

        try {

            $detalles = Detalle::fetchArray($sql);

            echo json_encode($detalles);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrió un error',
                'codigo' => 0
            ]);
        }
    }
}