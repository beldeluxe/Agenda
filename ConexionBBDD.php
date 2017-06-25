<?php

class ConexionBBDD
{
    protected $db;

    public function __construct()
    {
        $this->db = new mysqli("localhost", "root", "", "agenda");

        if ( $this->db->connect_errno )
        {
            return false;
        }
        $this->db->set_charset("UTF-8");
    }


    public function obtener($consulta)
    {
        $result = $this->db->query($consulta);


        $respuesta = $result->fetch_all(MYSQLI_ASSOC);


        return $respuesta;
    }


    public function ejecutar($query)
    {

        $result = $this->db->query($query);

        return $result;

    }
}
