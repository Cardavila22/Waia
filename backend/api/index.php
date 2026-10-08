<?php

/**
 * ============================================================
 * WAIA
 * Plataforma Digital de Experiencias Turísticas de Nicaragua
 * ============================================================
 *
 * Archivo:
 * backend/api/index.php
 *
 * Función:
 * Punto de entrada principal de la API REST de WAIA.
 *
 * Arquitectura:
 *
 * React + Vite
 *       ↓
 * index.php
 *       ↓
 * Routes
 *       ↓
 * Controllers
 *       ↓
 * Models
 *       ↓
 * PDO
 *       ↓
 * MySQL
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
 * 1. CARGAR CONFIGURACIÓN
 * ============================================================
 */

require_once __DIR__ . '/config/config.php';


/**
 * ============================================================
 * 2. CARGAR CORS
 * ============================================================
 */

require_once __DIR__ . '/config/cors.php';


/**
 * ============================================================
 * 3. CARGAR CONEXIÓN A BASE DE DATOS
 * ============================================================
 *
 * Aunque el endpoint inicial no necesita consultar MySQL,
 * cargamos la conexión desde el principio para dejar
 * preparado el flujo de la API.
 *
 * ============================================================
 */

require_once __DIR__ . '/config/database.php';


/**
 * ============================================================
 * 4. IDENTIFICADOR DE REQUEST
 * ============================================================
 *
 * Cada solicitud recibe un identificador único.
 *
 * Esto será útil posteriormente para debugging y logs.
 *
 * ============================================================
 */

$requestId = waiaRequestId();


/**
 * ============================================================
 * 5. OBTENER MÉTODO HTTP
 * ============================================================
 */

$method = waiaRequestMethod();


/**
 * ============================================================
 * 6. OBTENER URI
 * ============================================================
 */

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';


/**
 * ============================================================
 * 7. LIMPIAR QUERY STRING
 * ============================================================
 *
 * Ejemplo:
 *
 * /experiences?page=1
 *
 * Se convierte en:
 *
 * /experiences
 *
 * ============================================================
 */

$path = parse_url(
    $requestUri,
    PHP_URL_PATH
);


/**
 * ============================================================
 * 8. NORMALIZAR SLASH FINAL
 * ============================================================
 *
 * /experiences/
 *
 * se convierte en:
 *
 * /experiences
 *
 * ============================================================
 */

$path = rtrim(
    $path,
    '/'
);


/**
 * ============================================================
 * 9. SI LA RUTA ESTÁ VACÍA
 * ============================================================
 */

if ($path === '') {

    $path = '/';

}


/**
 * ============================================================
 * 10. DETECTAR BASE DE LA API
 * ============================================================
 *
 * En XAMPP normalmente podremos tener:
 *
 * /waia/backend/api
 *
 * Por lo tanto:
 *
 * /waia/backend/api/
 *
 * es la raíz de nuestra API.
 *
 * ============================================================
 */

$apiBasePath = '/waia/backend/api';


/**
 * ============================================================
 * 11. REMOVER BASE DE LA API
 * ============================================================
 *
 * Ejemplo:
 *
 * URI:
 *
 * /waia/backend/api/experiences
 *
 * Resultado:
 *
 * /experiences
 *
 * ============================================================
 */

if (
    str_starts_with(
        $path,
        $apiBasePath
    )
) {

    $path = substr(
        $path,
        strlen($apiBasePath)
    );

}


/**
 * ============================================================
 * 12. NORMALIZAR NUEVAMENTE
 * ============================================================
 */

if (
    empty($path)
) {

    $path = '/';

}


/**
 * ============================================================
 * 13. RESPUESTA PARA LA RAÍZ
 * ============================================================
 *
 * GET /
 *
 * Endpoint utilizado para comprobar que la API está
 * funcionando correctamente.
 *
 * ============================================================
 */

if (
    $path === '/' &&
    $method === 'GET'
) {

    waiaSuccess(

        'API WAIA funcionando correctamente.',

        [

            'name' =>
                WAIA_NAME,

            'description' =>
                WAIA_DESCRIPTION,

            'version' =>
                WAIA_VERSION,

            'environment' =>
                APP_ENV,

            'request_id' =>
                $requestId,

            'architecture' =>
                'React → PHP REST API → MySQL'

        ],

        HTTP_OK

    );

}


/**
 * ============================================================
 * 14. ENDPOINT DE INFORMACIÓN
 * ============================================================
 *
 * GET /api
 *
 * También permite consultar información general.
 *
 * ============================================================
 */

if (
    $path === '/api' &&
    $method === 'GET'
) {

    waiaSuccess(

        'API WAIA funcionando correctamente.',

        waiaConfigInfo(),

        HTTP_OK

    );

}


/**
 * ============================================================
 * 15. RUTA NO ENCONTRADA
 * ============================================================
 *
 * Si ninguna ruta coincide, devolvemos 404.
 *
 * ============================================================
 */

waiaError(

    'Endpoint no encontrado.',

    HTTP_NOT_FOUND,

    [

        'path' =>
            $path,

        'method' =>
            $method,

        'request_id' =>
            $requestId

    ]

);