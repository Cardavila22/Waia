<?php

/**
 * ============================================================
 * WAIA
 * Plataforma Digital de Experiencias Turísticas de Nicaragua
 * ============================================================
 *
 * Archivo:
 * backend/api/models/Experience.php
 *
 * Función:
 * Modelo encargado de consultar la información de experiencias
 * almacenada en MySQL.
 *
 * ============================================================
 */

class Experience
{
    /**
     * Conexión PDO.
     */
    private PDO $db;


    /**
     * Constructor.
     *
     * @param PDO $db
     */
    public function __construct(PDO $db)
    {
        $this->db = $db;
    }


    /**
     * ========================================================
     * OBTENER EXPERIENCIAS
     * ========================================================
     *
     * Obtiene las experiencias publicadas.
     *
     * Permite:
     *
     * - búsqueda
     * - categoría
     * - departamento
     * - paginación
     *
     * ========================================================
     */
    public function getAll(
        ?string $search = null,
        ?int $categoryId = null,
        ?int $departmentId = null,
        int $limit = 12,
        int $offset = 0
    ): array {

        $sql = "
            SELECT

                e.id,
                e.title,
                e.slug,

                e.short_description,
                e.long_description,

                e.location,

                e.duration_minutes,
                e.max_participants,

                e.difficulty,

                e.price_nio,
                e.price_usd,

                e.currency_primary,

                e.latitude,
                e.longitude,

                e.main_image_url,

                e.requirements,
                e.includes,
                e.recommendations,

                e.featured,

                e.status,

                e.created_at,
                e.updated_at,

                c.id AS category_id,
                c.name AS category_name,
                c.slug AS category_slug,

                d.id AS department_id,
                d.name AS department_name,
                d.slug AS department_slug,

                co.id AS community_id,
                co.name AS community_name,

                h.id AS host_id,
                h.name AS host_name,
                h.profile_image AS host_image,

                a.id AS artisan_id,
                a.name AS artisan_name,
                a.specialty AS artisan_specialty

            FROM experiences e

            INNER JOIN categories c
                ON e.category_id = c.id

            INNER JOIN departments d
                ON e.department_id = d.id

            LEFT JOIN communities co
                ON e.community_id = co.id

            LEFT JOIN hosts h
                ON e.host_id = h.id

            LEFT JOIN artisans a
                ON e.artisan_id = a.id

            WHERE e.status = 'published'
        ";


        /**
         * Parámetros preparados.
         */
        $params = [];


        /**
         * ====================================================
         * BÚSQUEDA
         * ====================================================
         */

        if (
            $search !== null &&
            $search !== ''
        ) {

            $sql .= "
                AND (
                    e.title LIKE :search
                    OR e.short_description LIKE :search
                    OR e.location LIKE :search
                    OR d.name LIKE :search
                    OR c.name LIKE :search
                )
            ";

            $params[':search'] =
                '%' . $search . '%';
        }


        /**
         * ====================================================
         * FILTRO POR CATEGORÍA
         * ====================================================
         */

        if ($categoryId !== null) {

            $sql .= "
                AND e.category_id = :category_id
            ";

            $params[':category_id'] =
                $categoryId;
        }


        /**
         * ====================================================
         * FILTRO POR DEPARTAMENTO
         * ====================================================
         */

        if ($departmentId !== null) {

            $sql .= "
                AND e.department_id = :department_id
            ";

            $params[':department_id'] =
                $departmentId;
        }


        /**
         * ====================================================
         * ORDENAMIENTO
         * ====================================================
         *
         * Las experiencias destacadas aparecen primero.
         */

        $sql .= "
            ORDER BY
                e.featured DESC,
                e.created_at DESC
        ";


        /**
         * ====================================================
         * PAGINACIÓN
         * ====================================================
         */

        $sql .= "
            LIMIT :limit
            OFFSET :offset
        ";


        /**
         * Preparar consulta.
         */

        $stmt = $this->db->prepare($sql);


        /**
         * Vincular parámetros.
         */

        foreach ($params as $key => $value) {

            $stmt->bindValue(
                $key,
                $value
            );
        }


        /**
         * LIMIT y OFFSET deben enviarse como enteros.
         */

        $stmt->bindValue(
            ':limit',
            $limit,
            PDO::PARAM_INT
        );

        $stmt->bindValue(
            ':offset',
            $offset,
            PDO::PARAM_INT
        );


        /**
         * Ejecutar.
         */

        $stmt->execute();


        /**
         * Retornar resultados.
         */

        return $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );
    }


    /**
     * ========================================================
     * CONTAR EXPERIENCIAS
     * ========================================================
     *
     * Permite construir posteriormente la paginación del
     * Frontend.
     *
     * ========================================================
     */
    public function count(
        ?string $search = null,
        ?int $categoryId = null,
        ?int $departmentId = null
    ): int {

        $sql = "
            SELECT COUNT(*)

            FROM experiences e

            INNER JOIN categories c
                ON e.category_id = c.id

            INNER JOIN departments d
                ON e.department_id = d.id

            WHERE e.status = 'published'
        ";


        $params = [];


        /**
         * Búsqueda.
         */

        if (
            $search !== null &&
            $search !== ''
        ) {

            $sql .= "
                AND (
                    e.title LIKE :search
                    OR e.short_description LIKE :search
                    OR e.location LIKE :search
                    OR d.name LIKE :search
                    OR c.name LIKE :search
                )
            ";

            $params[':search'] =
                '%' . $search . '%';
        }


        /**
         * Categoría.
         */

        if ($categoryId !== null) {

            $sql .= "
                AND e.category_id = :category_id
            ";

            $params[':category_id'] =
                $categoryId;
        }


        /**
         * Departamento.
         */

        if ($departmentId !== null) {

            $sql .= "
                AND e.department_id = :department_id
            ";

            $params[':department_id'] =
                $departmentId;
        }


        /**
         * Ejecutar.
         */

        $stmt = $this->db->prepare($sql);

        $stmt->execute($params);


        return (int) $stmt->fetchColumn();
    }
}