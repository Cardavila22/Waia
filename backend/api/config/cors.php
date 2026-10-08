<?php

/**
 * ============================================================
 * WAIA
 * Plataforma Digital de Experiencias Turísticas de Nicaragua
 * ============================================================
 *
 * Archivo:
 * backend/api/config/cors.php
 *
 * Función:
 * Configurar CORS para permitir la comunicación entre:
 *
 * React/Vite
 *       ↓
 * API REST PHP
 *
 * Proyecto:
 * Hackathon Nicaragua 2026
 *
 * Equipo:
 * <CodeInfinity/>
 *
 * ============================================================
 */


/**
 * ============================================================
 * 1. ORIGEN DEL FRONTEND
 * ============================================================
 *
 * Durante el desarrollo con Vite normalmente utilizaremos:
 *
 * http://localhost:5173
 *
 * También se contempla:
 *
 * http://127.0.0.1:5173
 *
 * ============================================================
 */

$allowedOrigins = [

    'http://localhost:5173',

    'http://127.0.0.1:5173',

];


/**
 * ============================================================
 * 2. ORIGEN DE LA SOLICITUD
 * ============================================================
 */

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';


/**
 * ============================================================
 * 3. VALIDACIÓN DEL ORIGEN
 * ============================================================
 *
 * Si el origen enviado por el navegador está dentro de la
 * lista permitida, se habilita el acceso.
 *
 * ============================================================
 */

if (
    !empty($origin) &&
    in_array($origin, $allowedOrigins, true)
) {

    header(
        "Access-Control-Allow-Origin: {$origin}"
    );

}


/**
 * ============================================================
 * 4. CREDENCIALES
 * ============================================================
 *
 * Permite enviar:
 *
 * - Cookies
 * - Sesiones
 * - Credenciales
 *
 * Se deja preparado para futuras funcionalidades.
 *
 * ============================================================
 */

header(
    'Access-Control-Allow-Credentials: true'
);


/**
 * ============================================================
 * 5. MÉTODOS HTTP PERMITIDOS
 * ============================================================
 *
 * GET
 * POST
 * PUT
 * PATCH
 * DELETE
 * OPTIONS
 *
 * ============================================================
 */

header(
    'Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS'
);


/**
 * ============================================================
 * 6. HEADERS PERMITIDOS
 * ============================================================
 */

header(
    'Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept'
);


/**
 * ============================================================
 * 7. HEADERS EXPUESTOS
 * ============================================================
 *
 * Permite que el Frontend pueda acceder a ciertos headers
 * enviados por la API.
 *
 * ============================================================
 */

header(
    'Access-Control-Expose-Headers: Content-Type'
);


/**
 * ============================================================
 * 8. CACHE DE PREFLIGHT
 * ============================================================
 *
 * El navegador puede recordar la respuesta OPTIONS durante
 * cierto tiempo.
 *
 * 86400 segundos = 24 horas.
 *
 * ============================================================
 */

header(
    'Access-Control-Max-Age: 86400'
);


/**
 * ============================================================
 * 9. CONTENIDO JSON
 * ============================================================
 */

header(
    'Content-Type: application/json; charset=utf-8'
);


/**
 * ============================================================
 * 10. SOLICITUD OPTIONS
 * ============================================================
 *
 * Los navegadores realizan una solicitud OPTIONS antes de
 * ciertas solicitudes POST, PUT, PATCH o DELETE.
 *
 * Ejemplo:
 *
 * React
 *   ↓
 * OPTIONS
 *   ↓
 * PHP
 *   ↓
 * 200 OK
 *   ↓
 * POST /api/bookings
 *
 * ============================================================
 */

if (
    $_SERVER['REQUEST_METHOD'] === 'OPTIONS'
) {

    http_response_code(204);

    exit;

}


/**
 * ============================================================
 * FIN DE CORS
 * ============================================================
 */
