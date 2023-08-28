<?php

namespace Controllers;
use Exception;
use Model\Usuario;
use MVC\Router;

class UsuarioController{
    public static function index(Router $router) {
         if(isset($_SESSION['auth_user'])){
            $router->render('usuario/index', []);
        }else{
            header('Location: /ramirez_parcial/');
        }
    }

    // public static function usuario(Router $router){
       
    // }
    public static function guardarApi(){
     
        try {
            $usuario = new Usuario($_POST);
            $resultado = $usuario->crear();

            if ($resultado['resultado'] == 1) {
                echo json_encode([
                    'mensaje' => 'Registro guardado correctamente',
                    'codigo' => 1
                ]);
            } else {
                echo json_encode([
                    'mensaje' => 'Ocurrió un error',
                    'codigo' => 0
                ]);
            }
            // echo json_encode($resultado);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrió un error',
                'codigo' => 0
            ]);
        }
    }

   
    public static function buscarApi()
    {
        // $usuario = Usuario::all();
        $usu_nombre = $_GET['usu_nombre'];
        $usu_catalogo = $_GET['usu_catalogo'];
       

        $sql = "SELECT * FROM usuario where usu_situacion = 'ACTIVO' ";
        if ($usu_nombre != '') {
            $sql .= " and usu_nombre like '%$usu_nombre%' ";
        }

        if ($usu_catalogo != '') {
            $sql .= " and usu_catalogo like '%$usu_catalogo%' ";
        }
        
        
        try {
            
            $usuario = Usuario::fetchArray($sql);
            header('Content-Type: application/json');

            echo json_encode($usuario);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrió un error',
                'codigo' => 0
            ]);
        }
    }

    public static function modificarApi(){
     
        try {
            $usuario = new Usuario($_POST);
            // $resultado = $producto->crear();

            $resultado = $usuario -> actualizar();

            if ($resultado['resultado'] == 1) {
                echo json_encode([
                    'mensaje' => 'Registro modificado correctamente',
                    'codigo' => 1
                ]);
            } else {
                echo json_encode([
                    'mensaje' => 'Ocurrió un error',
                    'codigo' => 0
                ]);
            }
            // echo json_encode($resultado);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrió un error',
                'codigo' => 0
            ]);
        }
    }


    public static function eliminarApi(){
     
        try {
            $usu_id = $_POST['usu_id'];
            $usuario=  Usuario::find($usu_id);
            $usuario ->usu_situacion = INACTIVO;
            $resultado = $usuario ->actualizar();

            if ($resultado['resultado'] == 1) {
                echo json_encode([
                    'mensaje' => 'Registro desactivado correctamente',
                    'codigo' => 1
                ]);
            } else {
                echo json_encode([
                    'mensaje' => 'Ocurrió un error',
                    'codigo' => 0
                ]);
            }
            // echo json_encode($resultado);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrió un error',
                'codigo' => 0
            ]);
        }
    }

}
 
?>