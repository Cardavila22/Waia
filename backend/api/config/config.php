<?php
// Configuración general de la API WAIA.


/**
 * ============================================================
 * WAIA
 * Plataforma Digital de Experiencias Turísticas de Nicaragua
 * ============================================================
 *
 * Archivo:
 * backend/api/config/config.php
 *
 * Función:
 * Configuración general y centralizada de la API REST.
 *
 * Proyecto:
 * Hackathon Nicaragua 2026
 *
 * Equipo:
 * <CodeInfinity/>
 *
 * Arquitectura:
 *
 * React + Vite
 *       ↓
 * API REST PHP
 *       ↓
 * MySQL
 *
 * ============================================================
 */


/**
 * ============================================================
 * 1. ZONA HORARIA
 * ============================================================
 *
 * Nicaragua utiliza la zona horaria UTC-6.
 *
 * Esto será importante para:
 *
 * - Reservas
 * - Fechas
 * - Horarios
 * - Registros
 * - Logs
 * - created_at
 * - updated_at
 *
 * ============================================================
 */

date_default_timezone_set('America/Managua');


/**
 * ============================================================
 * 2. INFORMACIÓN GENERAL DE LA API
 * ============================================================
 */

define(
    'WAIA_NAME',
    'WAIA'
);

define(
    'WAIA_DESCRIPTION',
    'Plataforma Digital de Experiencias Turísticas de Nicaragua'
);

define(
    'WAIA_VERSION',
    '1.0.0'
);

define(
    'WAIA_ENVIRONMENT',
    getenv('APP_ENV') ?: 'development'
);


/**
 * ============================================================
 * 3. CONFIGURACIÓN DEL ENTORNO
 * ============================================================
 *
 * Durante el Hackathon trabajaremos principalmente
 * en entorno de desarrollo.
 *
 * Valores previstos:
 *
 * development
 * production
 *
 * ============================================================
 */

define(
    'APP_ENV',
    getenv('APP_ENV') ?: 'development'
);


/**
 * ============================================================
 * 4. MODO DEBUG
 * ============================================================
 *
 * En desarrollo podemos habilitar información adicional
 * para facilitar la detección de errores.
 *
 * En producción debe permanecer desactivado.
 *
 * ============================================================
 */

define(
    'APP_DEBUG',
    APP_ENV === 'development'
);


/**
 * ============================================================
 * 5. URL BASE DE LA API
 * ============================================================
 *
 * Puede definirse mediante la variable:
 *
 * API_BASE_URL
 *
 * Ejemplo:
 *
 * API_BASE_URL=http://localhost/waia/backend/api
 *
 * ============================================================
 */

define(
    'API_BASE_URL',
    rtrim(
        getenv('API_BASE_URL')
            ?: 'http://localhost/waia/backend/api',
        '/'
    )
);


/**
 * ============================================================
 * 6. FORMATO DE RESPUESTA
 * ============================================================
 *
 * Toda la API trabajará utilizando JSON.
 *
 * ============================================================
 */

define(
    'API_CONTENT_TYPE',
    'application/json; charset=utf-8'
);


/**
 * ============================================================
 * 7. CONFIGURACIÓN DE PAGINACIÓN
 * ============================================================
 *
 * Los endpoints que devuelvan grandes cantidades de datos
 * podrán utilizar paginación.
 *
 * Ejemplo:
 *
 * GET /experiences?page=1&limit=12
 *
 * ============================================================
 */

define(
    'DEFAULT_PAGE',
    1
);

define(
    'DEFAULT_LIMIT',
    12
);

define(
    'MAX_LIMIT',
    100
);


/**
 * ============================================================
 * 8. CONFIGURACIÓN DE MONEDAS
 * ============================================================
 *
 * WAIA trabajará principalmente con:
 *
 * NIO = Córdoba nicaragüense
 * USD = Dólar estadounidense
 *
 * Los precios de las experiencias se almacenarán
 * en ambas monedas cuando corresponda.
 *
 * ============================================================
 */

define(
    'CURRENCY_PRIMARY',
    'NIO'
);

define(
    'CURRENCY_SECONDARY',
    'USD'
);


/**
 * ============================================================
 * 9. CONFIGURACIÓN DEL IDIOMA
 * ============================================================
 */

define(
    'WAIA_LANGUAGE',
    'es'
);


/**
 * ============================================================
 * 10. CONFIGURACIÓN DE FECHAS
 * ============================================================
 */

define(
    'DATE_FORMAT',
    'Y-m-d'
);

define(
    'DATETIME_FORMAT',
    'Y-m-d H:i:s'
);


/**
 * ============================================================
 * 11. CONFIGURACIÓN DE RESPUESTAS
 * ============================================================
 */

function waiaJsonResponse(
    bool $success,
    string $message = '',
    mixed $data = null,
    int $statusCode = 200,
    array $meta = []
): void {

    /**
     * Establecer código HTTP.
     */

    http_response_code($statusCode);


    /**
     * Establecer Content-Type.
     */

    header(
        'Content-Type: ' . API_CONTENT_TYPE
    );


    /**
     * Construir respuesta.
     */

    $response = [

        'success' => $success,

        'message' => $message,

        'data' => $data

    ];


    /**
     * Agregar metadata cuando exista.
     */

    if (!empty($meta)) {

        $response['meta'] = $meta;

    }


    /**
     * Enviar respuesta JSON.
     */

    echo json_encode(

        $response,

        JSON_UNESCAPED_UNICODE |
        JSON_UNESCAPED_SLASHES

    );


    /**
     * Detener ejecución.
     */

    exit;
}


/**
 * ============================================================
 * 12. RESPUESTA EXITOSA
 * ============================================================
 */

function waiaSuccess(
    string $message = 'Operación realizada correctamente.',
    mixed $data = null,
    int $statusCode = 200,
    array $meta = []
): void {

    waiaJsonResponse(

        true,

        $message,

        $data,

        $statusCode,

        $meta

    );
}


/**
 * ============================================================
 * 13. RESPUESTA DE ERROR
 * ============================================================
 */

function waiaError(
    string $message = 'Ha ocurrido un error.',
    int $statusCode = 400,
    mixed $data = null
): void {

    waiaJsonResponse(

        false,

        $message,

        $data,

        $statusCode

    );
}


/**
 * ============================================================
 * 14. RESPUESTA DE ERROR DEL SERVIDOR
 * ============================================================
 *
 * Esta función evita exponer información sensible al usuario.
 *
 * El detalle técnico se almacena en los logs del servidor.
 *
 * ============================================================
 */

function waiaServerError(
    string $message = 'Error interno del servidor.',
    ?Throwable $exception = null
): void {

    /**
     * Registrar información técnica.
     */

    if ($exception !== null) {

        error_log(

            '[WAIA SERVER ERROR] ' .
            $exception->getMessage()

        );

    }


    /**
     * En desarrollo podemos mostrar información adicional.
     */

    if (APP_DEBUG && $exception !== null) {

        waiaError(

            $message,

            500,

            [

                'error' =>
                    $exception->getMessage()

            ]

        );

    }


    /**
     * Producción:
     * mostrar solamente mensaje genérico.
     */

    waiaError(

        $message,

        500

    );
}


/**
 * ============================================================
 * 15. NORMALIZACIÓN DE PAGINACIÓN
 * ============================================================
 */

function waiaPagination(
    ?int $page,
    ?int $limit
): array {

    /**
     * Página.
     */

    $page = $page ?? DEFAULT_PAGE;

    if ($page < 1) {

        $page = DEFAULT_PAGE;

    }


    /**
     * Límite.
     */

    $limit = $limit ?? DEFAULT_LIMIT;

    if ($limit < 1) {

        $limit = DEFAULT_LIMIT;

    }


    /**
     * Evitar solicitudes excesivamente grandes.
     */

    if ($limit > MAX_LIMIT) {

        $limit = MAX_LIMIT;

    }


    /**
     * Calcular offset.
     */

    $offset = ($page - 1) * $limit;


    return [

        'page' => $page,

        'limit' => $limit,

        'offset' => $offset

    ];
}


/**
 * ============================================================
 * 16. OBTENER INPUT JSON
 * ============================================================
 *
 * Se utilizará posteriormente en:
 *
 * POST
 * PUT
 * PATCH
 *
 * Ejemplo de solicitud:
 *
 * {
 *     "customer_name": "Alejandro",
 *     "experience_id": 15
 * }
 *
 * ============================================================
 */

function waiaGetJsonInput(): array
{
    $input = file_get_contents('php://input');


    /**
     * Si no existe contenido.
     */

    if (empty($input)) {

        return [];

    }


    /**
     * Convertir JSON a array.
     */

    $data = json_decode(
        $input,
        true
    );


    /**
     * Validar JSON.
     */

    if (
        json_last_error() !== JSON_ERROR_NONE
    ) {

        waiaError(

            'El formato JSON enviado no es válido.',

            400

        );

    }


    return is_array($data)
        ? $data
        : [];
}


/**
 * ============================================================
 * 17. LIMPIEZA BÁSICA DE STRING
 * ============================================================
 *
 * Esto NO reemplaza las consultas preparadas de PDO.
 *
 * Su objetivo es normalizar datos recibidos.
 *
 * ============================================================
 */

function waiaCleanString(
    mixed $value
): string {

    if (!is_string($value)) {

        return '';

    }


    return trim($value);
}


/**
 * ============================================================
 * 18. VALIDAR MÉTODO HTTP
 * ============================================================
 */

function waiaRequestMethod(): string
{
    return strtoupper(
        $_SERVER['REQUEST_METHOD'] ?? 'GET'
    );
}


/**
 * ============================================================
 * 19. IDENTIFICADOR ÚNICO DE REQUEST
 * ============================================================
 *
 * Será útil para:
 *
 * - Logs
 * - Depuración
 * - Seguimiento de errores
 * - Soporte técnico
 *
 * ============================================================
 */

function waiaRequestId(): string
{
    return uniqid(
        'waia_',
        true
    );
}


/**
 * ============================================================
 * 20. CONSTANTES HTTP
 * ============================================================
 */

define(
    'HTTP_OK',
    200
);

define(
    'HTTP_CREATED',
    201
);

define(
    'HTTP_BAD_REQUEST',
    400
);

define(
    'HTTP_UNAUTHORIZED',
    401
);

define(
    'HTTP_FORBIDDEN',
    403
);

define(
    'HTTP_NOT_FOUND',
    404
);

define(
    'HTTP_METHOD_NOT_ALLOWED',
    405
);

define(
    'HTTP_CONFLICT',
    409
);

define(
    'HTTP_UNPROCESSABLE_ENTITY',
    422
);

define(
    'HTTP_INTERNAL_SERVER_ERROR',
    500
);


/**
 * ============================================================
 * 21. INFORMACIÓN DE CONFIGURACIÓN
 * ============================================================
 *
 * No incluye contraseñas ni información sensible.
 *
 * Útil para debugging durante el Hackathon.
 *
 * ============================================================
 */

function waiaConfigInfo(): array
{
    return [

        'name' =>
            WAIA_NAME,

        'description' =>
            WAIA_DESCRIPTION,

        'version' =>
            WAIA_VERSION,

        'environment' =>
            APP_ENV,

        'debug' =>
            APP_DEBUG,

        'language' =>
            WAIA_LANGUAGE,

        'currency_primary' =>
            CURRENCY_PRIMARY,

        'currency_secondary' =>
            CURRENCY_SECONDARY,

        'api_base_url' =>
            API_BASE_URL

    ];
}


/**
 * ============================================================
 * FIN DE CONFIGURACIÓN
 * ============================================================
 */
