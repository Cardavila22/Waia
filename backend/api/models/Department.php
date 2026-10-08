<?php

/**
 * ============================================================
 * WAIA
 * Plataforma Digital de Experiencias Turísticas de Nicaragua
 * ============================================================
 *
 * Archivo:
 * backend/api/models/Department.php
 *
 * Función:
 * Modelo encargado de consultar los departamentos
 * registrados en MySQL.
 *
 * ============================================================
 */

class Department
{
    /**
     * Conexión PDO.
     */
    private PDO $db;


    /**
     * Constructor.
     */
    public function __construct(PDO $db)
    {
        $this->db = $db;
    }


    /**
     * ========================================================
     * OBTENER TODOS LOS DEPARTAMENTOS
     * ========================================================
     *
     * Devuelve únicamente departamentos activos.
     *
     * ========================================================
     */
    public function getAll(): array
    {
        $sql = "
            SELECT

                d.id,
                d.name,
                d.slug,

                d.description,

                d.image_url,

                d.latitude,
                d.longitude,

                d.created_at,
                d.updated_at

            FROM departments d

            WHERE d.status = 'active'

            ORDER BY d.name ASC
        ";


        $stmt = $this->db->prepare($sql);

        $stmt->execute();


        return $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );
    }


    /**
     * ========================================================
     * OBTENER DEPARTAMENTO POR ID
     * ========================================================
     *
     * Preparado para futuras páginas:
     *
     * /departments/1
     *
     * ========================================================
     */
    public function getById(int $id): ?array
    {
        $sql = "
            SELECT

                d.id,
                d.name,
                d.slug,

                d.description,

                d.image_url,

                d.latitude,
                d.longitude,

                d.created_at,
                d.updated_at

            FROM departments d

            WHERE d.id = :id

            AND d.status = 'active'

            LIMIT 1
        ";


        $stmt = $this->db->prepare($sql);


        $stmt->bindValue(
            ':id',
            $id,
            PDO::PARAM_INT
        );


        $stmt->execute();


        $department =
            $stmt->fetch(
                PDO::FETCH_ASSOC
            );


        if (!$department) {

            return null;

        }


        return $department;
    }
}