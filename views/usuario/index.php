<nav class="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">
    <a class="navbar-brand" href="#"></a>
    <!-- Enlaces del menú -->
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="/parcial_ramirez/usuario">Administracion de Usuarios</a>
            </li>
            <li class="nav-item">
                    <a class="nav-link" href="/parcial_ramirez/usuario/estadistica">Estadistica</a>
            </li>
        </ul>
    </div>
    <a href="/parcial_ramirez/" class="btn btn-danger">Inicio</a>
</nav>
<br>
<h5 class="text-center">Registro de Usuarios</h5>
<div class="row justify-content-center mb-5">
    <form class="col-lg-8 border bg-light p-3" id="formularioUsuario">
        <input type="hidden" name="usu_id" id="usu_id">
        <div class="row mb-3">
            <div class="col">
                <label for="usu_nombre">Ingrese Nombre Completo del Usuario</label>
                <input type="text" name="usu_nombre" id="usu_nombre" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <label for="usu_catalogo">Ingrese el Catalogo</label>
                <input type="number" name="usu_catalogo" id="usu_catalogo" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <label for="usu_password">Ingrese la Contraseña</label>
                <input type="password" name="usu_password" id="usu_password" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <button type="submit" form="formularioUsuario" id="btnGuardar" data-saludo="hola" data-saludo2="hola2" class="btn btn-primary w-100">Guardar</button>
            </div>
            <div class="col">
                <button type="button" id="btnModificar" class="btn btn-warning w-100">Modificar</button>
            </div>
            <div class="col">
                <button type="button" id="btnBuscar" class="btn btn-info w-100">Buscar</button>
            </div>
            <div class="col">
                <button type="button" id="btnCancelar" class="btn btn-danger w-100">Cancelar</button>
            </div>
        </div>
    </form>
</div>

<div class="row justify-content-center">
    <div class="col table-responsive" style="max-width: 80%; padding: 10px;">
        <table id="tablaUsuario" class="table table-bordered table-hover">
        </table>
    </div>
</div>

<script src="<?= asset('./build/js/usuario/index.js')  ?>"></script>