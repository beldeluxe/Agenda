<?php
header("Content-type: text/xml");
require_once ("ConexionBBDD.php");

$funcion= $_POST['funcion'];//linea 310


//insertar nuevo contacto
function nuevo()
{
	$id= $_POST['id'];
	$nombre= $_POST['nombre'];
	$apellidos= $_POST['apellidos'];
	//$telefono= $_POST['telefono'];
	$email= $_POST['email'];
	$direccion= $_POST['direccion'];
	$array_telefono= $_POST['array_telefono'];

	$array_telefono_ok= explode(",", $array_telefono);



	$query1= "SELECT nombre, apellidos FROM datos where nombre='$nombre' and apellidos='$apellidos'";

    $con = new ConexionBBDD;

    $res1= $con->obtener($query1);

    if(count($res1)>0)
    {
    	echo 1;
    }	

    else
    {
    	if(empty($nombre)||empty($apellidos))
    	{
    		echo 4;
    	}	
    	else
    	{
    		$query= "INSERT INTO `datos` (`id`, `nombre`, `apellidos`, `email`, `direccion`)
		    VALUES ('$id', '$nombre', '$apellidos', '$email', '$direccion')";
		 

		    $res = $con->ejecutar($query);

		    if($res)
		    {
		    	$query= "SELECT id FROM datos where nombre='$nombre' and apellidos='$apellidos'";

		    	$id_nuevo= $con->obtener($query);
		    	foreach ($id_nuevo as $fila) 
		    	{
		    		$id_nuevo_ok= $fila['id'];
		    	}

		    	//$id_nuevo_ok= $id_nuevo[0]['id'];

		    	if ($array_telefono_ok=="")
		    	{
		    		$query2= "INSERT INTO telefono (numero_telefono, id_contacto) VALUES ('no hay telefono asignado', '$id_nuevo_ok')";
		    		$con->ejecutar($query2);
		    	}	
		    	else
		    	{
		    		for($i=0; $i<count($array_telefono_ok);$i++)
		    		{
		    		$telefono_ok= $array_telefono_ok[$i];
		    		$query2= "INSERT INTO telefono (numero_telefono, id_contacto) VALUES ('$telefono_ok','$id_nuevo_ok')";
		    		$con->ejecutar($query2);	
		    		}	

		    	}	
		    	
		    	echo 2;

		    			    	
		    }	
		    else
		    {
		    	echo 3;
	    	}
    	}	
    	
    }	
    
}


//busca por nombre y apellidos
function buscarm()
{
	
	$nombre= $_POST['nombre'];
	$apellidos= $_POST['apellidos'];
	$query= "SELECT * FROM datos where nombre='$nombre' and apellidos='$apellidos'";

    $con = new ConexionBBDD;

    $res= $con->obtener($query);
    	echo "<xml>";
    foreach ($res as $fila) 
    {    
		echo "<datos>";
		echo "<id>".$fila['id']."</id>";
		echo "<nombre>".$fila['nombre']."</nombre>";
		echo "<apellidos>".$fila[apellidos]."</apellidos>";
		
			if($fila[email]==null)
			{
				echo "<email>No hay email asignado</email>";
			}
			else
			{
				echo "<email>".$fila[email]."</email>";
			}	
			if($fila[direccion]==null)
			{
				echo "<direccion>No hay dirección asignada</direccion>";
			}
			else
			{
				echo "<direccion>".$fila[direccion]."</direccion>";
			}	
			
		echo "</datos>";	   
    }
	 echo "</xml>";
}

//modifica los datos de un contacto por id, devuelve bool si la operación se realizó correctamente o no
function modificar()
{
	$id= $_POST['id'];
	$nombre= $_POST['nombre'];
	$apellidos= $_POST['apellidos'];
	$telefono= $_POST['telefono'];
	$email= $_POST['email'];
	$direccion= $_POST['direccion'];

	$query = "UPDATE datos set nombre= '$nombre' , apellidos= '$apellidos', telefono='$telefono', email= '$email', direccion='$direccion' WHERE id= $id";
	$con = new ConexionBBDD;
	$res = $con->ejecutar($query);

	echo "<xml>";
    
		echo "<respuesta>".$res."</respuesta>";
		   
	 echo "</xml>";

}


function listar()
{
	$query= "SELECT datos.id, datos.nombre, datos.apellidos, datos.email, datos.direccion, 
	telefono.numero_telefono, telefono.id_contacto 
	FROM datos INNER JOIN telefono WHERE datos.id = telefono.id_contacto ORDER by datos.nombre ASC, datos.apellidos ASC";

	$con =new ConexionBBDD;
	$res = $con->obtener($query);

	echo "<xml>";

	for ($i=0; $i<count($res); $i++)
	{
			echo "<datos>";

			echo "<id>".$res[i][id]."</id>";
			echo "<nombre>".$fila[nombre]."</nombre>";
			echo "<apellidos>".$fila[apellidos]."</apellidos>";


	}	
	
  //   foreach ($res as $fila) 
  //   {    
		// echo "<datos>";

		// 	echo "<id>".$fila[id]."</id>";
		// 	echo "<nombre>".$fila[nombre]."</nombre>";
		// 	echo "<apellidos>".$fila[apellidos]."</apellidos>";

		// 	if($fila[telefono]==null)
		// 	{
		// 		echo "<telefono>No hay número de teléfono</telefono>";
		// 	}
		// 	else
		// 	{
		// 		echo "<telefono>".$fila[telefono]."</telefono>";
		// 	}	
		// 	if($fila[email]==null)
		// 	{
		// 		echo "<email>No hay email asignado</email>";
		// 	}
		// 	else
		// 	{
		// 		echo "<email>".$fila[email]."</email>";
		// 	}	
		// 	if($fila[direccion]==null)
		// 	{
		// 		echo "<direccion>No hay dirección asignada</direccion>";
		// 	}
		// 	else
		// 	{
		// 		echo "<direccion>".$fila[direccion]."</direccion>";
		// 	}	
			
		 echo "</datos>";	   
  //   }
	 echo "</xml>";

}


function buscar()
{
	$filtro= $_POST['filtro'];
	$dato= $_POST['dato'];

	$query= "SELECT $filtro FROM datos where $filtro like '%$dato%'";

	$con =new ConexionBBDD;
	$res = $con->obtener($query);


	echo "<xml>";
    foreach ($res as $fila) 
    { 
    	foreach ($fila as $contenido) 
    	{
    	  
			echo "<coincidencia>".$contenido."</coincidencia>";			
				
    	}   
		   
    }
	 echo "</xml>";
}

//cambiar
function buscar2()
{
	$filtro= $_POST['filtro'];
	$dato= $_POST['dato'];

	$query= "SELECT * FROM datos where $filtro= '$dato'";

	$con =new ConexionBBDD;
	$res = $con->obtener($query);


	echo "<xml>";
    foreach ($res as $fila) 
    { 
    	   echo "<datos>";

			echo "<id>".$fila[id]."</id>";
			echo "<nombre>".$fila[nombre]."</nombre>";
			echo "<apellidos>".$fila[apellidos]."</apellidos>";
			if($fila[telefono]==null)
			{
				echo "<telefono>No hay número de teléfono</telefono>";
			}
			else
			{
				echo "<telefono>".$fila[telefono]."</telefono>";
			}	
			if($fila[email]==null)
			{
				echo "<email>No hay email asignado</email>";
			}
			else
			{
				echo "<email>".$fila[email]."</email>";
			}	
			if($fila[direccion]==null)
			{
				echo "<direccion>No hay dirección asignada</direccion>";
			}
			else
			{
				echo "<direccion>".$fila[direccion]."</direccion>";
			}	
			
		echo "</datos>";    	
		   
    }
	 echo "</xml>";
}


//cambiar
function buscar_tel()
{
	$id= $_POST['id'];

	$query="SELECT numero_telefono FROM telefono where id_contacto='$id'";

	$con =new ConexionBBDD;
	$res = $con->obtener($query);

	echo "<xml>";
	if(!$res)
	{
		echo "<telefono>No hay numero de teléfono asignado</telefono>";
	}
	else
	{
		foreach ($res as $fila) 
		{
			echo "<telefono>".$fila[numero_telefono]."</telefono>";
		}
	}	
	

	echo "</xml>";	


}

//recibe como parámetro el nombre de la función que se va a ejecutars
switch ($funcion) 
{
	case 'nuevo':
		nuevo();
		break;
	case 'buscarm':
		buscarm();
		break;
	break;		
	case 'modificar':
		modificar();
	break;
	case 'listar':
		  listar();
	break;
	case 'buscar':
		  buscar();
	break;
	case 'buscar2':
		  buscar2();
	break;
	case 'buscar_tel':
		  buscar_tel();
	break;
	// default:
	
	// 	break;
}


?>