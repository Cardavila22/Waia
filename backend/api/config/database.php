<?php
// Conexión PDO a MySQL. Las credenciales se configurarán mediante variables de entorno.


/**
 * ============================================================
 * WAIA
 * Plataforma Digital de Experiencias Turísticas de Nicaragua
 * ============================================================
 *
 * Archivo:
 * backend/api/config/database.php
 *
 * Función:
 * Gestionar la conexión entre la API PHP y MySQL.
 *
 * Arquitectura:
 *
 * React
 *   ↓
 * API REST PHP
 *   ↓
 * Database.php
 *   ↓
 * MySQL
 *
 * Proyecto:
 * Hackathon Nicaragua 2026
 *
 * Equipo:
 * <CodeInfinity/>
 * ============================================================
 */


/**
 * ============================================================
 * CONFIGURACIÓN DE LA BASE DE DATOS
 * ============================================================
 *
 * Para desarrollo local utilizamos los valores definidos
 * en el archivo .env.
 *
 * Ejemplo:
 *
 * DB_HOST=localhost
 * DB_PORT=3306
 * DB_NAME=waia
 * DB_USER=root
 * DB_PASSWORD=
 *
 * ============================================================
 */


/**
 * Cargar variables de entorno
 *
 * En esta primera etapa se contempla una configuración
 * sencilla para desarrollo local.
 *
 * Posteriormente podemos utilizar una librería como
 * vlucas/phpdotenv si el proyecto lo requiere.
 */

$host = getenv('DB_HOST') ?: 'localhost';

$port = getenv('DB_PORT') ?: '3306';

$dbname = getenv('DB_NAME') ?: 'waia';

$username = getenv('DB_USER') ?: 'root';

$password = getenv('DB_PASSWORD') ?: '';


/**
 * ============================================================
 * CONFIGURACIÓN DEL DSN
 * ============================================================
 */

$dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";


/**
 * ============================================================
 * OPCIONES PDO
 * ============================================================
 */

$options = [

    /*
     * Mostrar errores mediante excepciones.
     *
     * Esto permite que la API pueda detectar errores
     * de conexión y consultas SQL.
     */

    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,


    /*
     * Las consultas devolverán los resultados como arrays
     * asociativos.
     */

    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,


    /*
     * Desactivar emulación de prepared statements.
     *
     * Esto mejora la seguridad de las consultas SQL.
     */

    PDO::ATTR_EMULATE_PREPARES => false

];


/**
 * ============================================================
 * CONEXIÓN
 * ============================================================
 */

try {

    $pdo = new PDO(

        $dsn,

        $username,

        $password,

        $options

    );

} catch (PDOException $exception) {

    /**
     * ========================================================
     * MANEJO DEL ERROR
     * ========================================================
     *
     * Durante desarrollo podemos registrar el error.
     *
     * Nunca debemos mostrar credenciales o información
     * sensible de la base de datos al usuario final.
     */

    error_log(
        'WAIA Database Error: ' .
        $exception->getMessage()
    );


    /**
     * Respuesta JSON para la API.
     */

    header(
        'Content-Type: application/json; charset=utf-8'
    );


    http_response_code(500);


    echo json_encode(

        [

            'success' => false,

            'message' =>
                'No fue posible conectar con la base de datos.'

        ],

        JSON_UNESCAPED_UNICODE

    );


    exit;

}


/**
 * ============================================================
 * FUNCIÓN AUXILIAR
 * ============================================================
 *
 * Permite comprobar fácilmente si la conexión está disponible.
 *
 * Ejemplo:
 *
 * if (databaseConnectionIsAvailable()) {
 *     // continuar
 * }
 *
 * ============================================================
 */

function databaseConnectionIsAvailable(): bool
{
    global $pdo;

    return isset($pdo) && $pdo instanceof PDO;
}
