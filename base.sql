CREATE TABLE usuario (
    usu_id serial PRIMARY KEY,
    usu_nombre VARCHAR(255) UNIQUE NOT NULL,
    usu_catalogo VARCHAR(255) UNIQUE NOT NULL,
    usu_rol VARCHAR(20) DEFAULT 'CLIENTE' CHECK (usu_rol IN ('ADMINISTRADOR', 'VENDEDOR', 'CLIENTE')) NOT NULL,
    usu_password VARCHAR(255) NOT NULL,
    usu_situacion VARCHAR(20) DEFAULT 'PENDIENTE' CHECK (usu_situacion IN ('ACTIVO', 'INACTIVO', 'PENDIENTE')) NOT NULL
);
