function cargarLayout(div, url, cblay) 
{
    let xmlhttp;
    if(window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function()
    {
    if(this.readyState=4&& this.status==200)
    {
        div.innerHTML=this.responseText;
           //cblay(url);
    }
   };
       xmlhttp.open("Post", url, true);
       xmlhttp.send();

}

function onclick_nuevo()
{
    document.getElementById("mostrar").innerHTML="";
    cargarLayout(document.getElementById("mostrar"), NUEVO, uiNuevo);    
    console.log('hola onclicknuevo');

}

function onclick_guardar()
{
   console.log('hola guardar');
    let id= null;
    let nombre= document.getElementById("nombre").value;
    let apellidos= document.getElementById("apellidos").value;
    //let telefono= document.getElementById("telefono").value;
    let telefono= document.getElementsByClassName("lista");
    //console.log("telefono "+telefono[0].firstChild.nodeValue);
    let email= document.getElementById("email").value;
    let direccion= document.getElementById("direccion").value;
    let funcion= "nuevo";
   
    let array_telefono=new Array();

    for(let i=0; i<telefono.length;i++)
    {
          let valor= telefono[i].firstChild.nodeValue;
          array_telefono[array_telefono.length]= valor;
    }  

    //let vars={id:id, nombre:nombre, apellidos: apellidos, email:email, direccion: direccion, funcion: funcion, telefono: array_telefono};
    //console.log(cadena);

    //cadena=cadena.slice(0,-1);
    //console.log(cadena);

    let peticion = new XMLHttpRequest();

   
    
    let vars = "id="+id+"&nombre="+nombre+"&apellidos="+apellidos+"&email="+email+"&direccion="+direccion+"&funcion="+funcion+"&array_telefono="+array_telefono;
    console.log('entra en onclick_guardar '+array_telefono);
    peticion.onreadystatechange = function()
    {
      if(this.readyState == 4 && this.status== 200)
      {   

    console.log('entra en onclick_guardar peticion');
        let res = peticion.responseText;

        console.log("peticion response "+res);
        
        switch (res) 
        {
          case '1':
             alert("ya existe un usuario con ese nombre y apellidos");
            break;
          case '2':

              alert("datos insertados correctamente");

               document.getElementById("nombre").value="";
               document.getElementById("apellidos").value="";
               document.getElementById("telefono").value="";
               document.getElementById("direccion").value="";
               document.getElementById("email").value="";
            break;
            case '3':
                alert ("error");
            break;
            case '4':
                alert ("los campos nombre y apellidos son obligatorios");
            break;
            default:
            // statements_def
            break;
        } 
     
      }

    };
      peticion.open("POST", "agenda.php", true);
      peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      peticion.send(vars);
}

function onclick_modificar()
{
    document.getElementById("mostrar").innerHTML="";
    cargarLayout(document.getElementById("mostrar"), MODI); 

}

function onclick_buscarm()
{
    let nombre1= document.getElementById("nombre1").value;
    let apellidos1= document.getElementById("apellidos1").value;
    let funcion= "buscarm";
    let vars = "nombre="+nombre1+"&apellidos="+apellidos1+"&funcion="+funcion;
    console.log('nombre '+nombre1);
     console.log('ap '+apellidos1);

    let peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function()
    {
      if(this.readyState == 4 && this.status== 200)
      {

        console.log('petic '+peticion);

        let resultado = peticion.responseXML;
        console.log('res '+resultado);
        let id_p = resultado.getElementsByTagName("id");
          console.log('id prueba '+id_p[0].firstChild.nodeValue);
        let id = id_p[0].firstChild.nodeValue;
        let nombre  = resultado.getElementsByTagName("nombre")[0].firstChild.nodeValue;
        let apellidos  = resultado.getElementsByTagName("apellidos")[0].firstChild.nodeValue;
        //let telefono  = resultado.getElementsByTagName("telefono")[0].firstChild.nodeValue;
        let email  = resultado.getElementsByTagName("email")[0].firstChild.nodeValue;
        let direccion  = resultado.getElementsByTagName("direccion")[0].firstChild.nodeValue;       


         document.getElementById("mostrar").innerHTML+= "<br><p><b>Datos de "+nombre+" "+apellidos+"<b></p>"
        document.getElementById("mostrar").innerHTML+= "<br><input type='text' id='nombrem' name='nombre' value='"+nombre+"'>";
        document.getElementById("mostrar").innerHTML+= "<br><br><input type='text' id='apellidosm' name='nombre' value='"+apellidos+"'>";

        //document.getElementById("mostrar").innerHTML+= "<br><br><input type='text' id='telefonom' name='nombre' value='"+telefono+"'>";
        document.getElementById("mostrar").innerHTML+= "<br><br><input type='text' id='emailm' name='nombre' value='"+email+"'>";
        document.getElementById("mostrar").innerHTML+= "<br><br><input type='text' id='direccionm' name='nombre' value='"+direccion+"'>";
        let nombrem= document.getElementById("nombrem").value;
        let apellidosm= document.getElementById("apellidosm").value;
        telefonos(id);  
       
        
    }
  };

      peticion.open("POST", "agenda.php", true);
      peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      peticion.send(vars); 
      
}


function telefonos(id)
{
        let funcion2 = "buscar_tel";
        let vars2 = "id="+id+"&funcion="+funcion2;

        let peticion2 = new XMLHttpRequest();
        peticion2.onreadystatechange=function()
        {
            if(this.readyState == 4 && this.status== 200)
            {
              console.log("llega a telefnos"+id);
                let resultado2 = peticion2.responseXML;
                let telefono  = resultado2.getElementsByTagName("telefono");
                document.getElementById("mostrar").innerHTML+= "<p><b>Telefono/s<b></p>"
                for(let i=0; i<telefono.length; i++)
                {
                    let valor= telefono[i].firstChild.nodeValue;
                    document.getElementById("mostrar").innerHTML+= "<input type='text' id='telefono'"+i+" name='nombre' value='"+valor+"'><br><br>";
                }  

                 document.getElementById("mostrar").innerHTML+= "<br><button name='guardar2' onclick='onclick_guardar2("+id+")'>Guardar Modificaiones</button>";
            }  

        };
        peticion2.open("POST", "agenda.php", true);
        peticion2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion2.send(vars2); 
}



function onclick_guardar2(id)
{
      console.log('id '+id);
      let nombrem= document.getElementById("nombrem").value;
      let apellidosm= document.getElementById("apellidosm").value;
      let telefonom= document.getElementById("telefonom").value;
      let emailm= document.getElementById("apellidosm").value;
      let direccionm= document.getElementById("direccionm").value;
      let funcion= "modificar";
   
      let vars2 = "id="+id+"&nombre="+nombrem+"&apellidos="+apellidosm+"&telefono="+telefonom+"&email="+emailm+"&direccion="+direccionm+"&funcion="+funcion;
      let peticion =new XMLHttpRequest();

      peticion.onreadystatechange = function()
      {
        if(this.readyState == 4 && this.status== 200)
        {   
        let resultado = peticion.responseXML;
        
        let res= resultado.getElementsByTagName("respuesta")[0].firstChild.nodeValue;
        console.log('res '+res);

        if(res==true)
         {
            alert("datos modificados correctamente");
            document.getElementById("mostrar").innerHTML="";
         } 
         else
         {
            alert("error al modificar");
         } 
      }

   };

      peticion.open("POST", "agenda.php", true);
      peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      peticion.send(vars2); 
}


function onclick_listado()
{
    let funcion= "listar";
    let vars3= "funcion="+funcion;
    document.getElementById("mostrar").innerHTML= "<h3>Listado de contactos</h3>";

    let peticion= new XMLHttpRequest();

    peticion.onreadystatechange= function()
    {
         if(this.readyState == 4 && this.status== 200)
         {
            let resultado = peticion.responseXML;
            console.log('lista resul '+resultado);
            let datos = resultado.getElementsByTagName("datos");
            
            for(let i=0; i<datos.length;i++)
            {
              let id = resultado.getElementsByTagName("id")[i].firstChild.nodeValue;
              let nombre= resultado.getElementsByTagName("nombre")[i].firstChild.nodeValue;
              let apellidos= resultado.getElementsByTagName("apellidos")[i].firstChild.nodeValue;
              //let telefono= resultado.getElementsByTagName("telefono")[i].firstChild.nodeValue;
              let email= resultado.getElementsByTagName("email")[i].firstChild.nodeValue;
              let direccion= resultado.getElementsByTagName("direccion")[i].firstChild.nodeValue;
            
               document.getElementById("mostrar").innerHTML+= "<h3>Contacto "+(i+1)+"</h3><p>NOMBRE: "+nombre+"</p>";
               document.getElementById("mostrar").innerHTML+= "<p>APELLIDOS: "+apellidos+"</p>";
               //document.getElementById("mostrar").innerHTML+= "<p>TELEFONO: "+telefono+"</p>";
               document.getElementById("mostrar").innerHTML+= "<p>EMAIL: "+email+"</p>";
               document.getElementById("mostrar").innerHTML+= "<p>DIRECCIÓN: "+direccion+"</p>";
               console.log("fin pintar direcciones "+nombre);
                ////// TELEFONOS /////////
                //lista_telefonos(id);             
            }  
         } 
    };
      peticion.open("POST", "agenda.php", true);
      peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      peticion.send(vars3); 
}

// function lista_telefonos(id)
// {
//      let funcion2 = "buscar_tel";
//       let vars2 = "id="+id+"&funcion="+funcion2;

//       let peticion2 = new XMLHttpRequest();
//       peticion2.onreadystatechange=function()
//       {
//           if(this.readyState == 4 && this.status== 200)
//           {
//             console.log("llega a telefnos"+id);
//               let resultado2 = peticion2.responseXML;
//               console.log("resultado2 peticion"+ resultado2);
//               let telefono  = resultado2.getElementsByTagName("telefono");
//               console.log("telefono elemby tagname "+telefono[0].firstChild.nodeValue);

//               document.getElementById("mostrar").innerHTML+= "<p><b>Telefono/s<b></p>"
//               for(let i=0; i<telefono.length; i++)
//               {
//                   let valor= telefono[i].firstChild.nodeValue;
//                   document.getElementById("mostrar").innerHTML+= "<p>TELEFONO: "+valor+"</p><br><br>";
//               }                           
//           }  

//       };
//       peticion2.open("POST", "agenda.php", true);
//       peticion2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//       peticion2.send(vars2); 


// }

function onclick_buscar()
{
    document.getElementById("mostrar").innerHTML="";
    cargarLayout(document.getElementById("mostrar"), BUSCAR); 
}

function onchange_buscar2()
{
  let filtro=document.getElementById("filtro").value;
  let dato=document.getElementById("texto").value;
  let funcion= "buscar";
  console.log("entra en onchange "+dato);
  let vars= "filtro="+filtro+"&dato="+dato+"&funcion="+funcion;
  let peticion= new XMLHttpRequest();
    let lista= document.getElementById("dato");
    lista.innerHTML="";
  peticion.onreadystatechange= function()
  {
    if(this.readyState == 4 && this.status== 200)
    {
        
        let resultado = peticion.responseXML;
            console.log('busca resul '+resultado);
            let datos = resultado.getElementsByTagName("coincidencia");
          
           
            for(let i=0; i<datos.length;i++)
            {
              let option= document.createElement("option");
              let txt= document.createTextNode(datos[i].firstChild.nodeValue);   
              option.appendChild(txt);
              option.setAttribute("value", datos[i].firstChild.nodeValue);
              lista.appendChild(option);                

            }  
        
    }  
  };

      peticion.open("POST", "agenda.php", true);
      peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      peticion.send(vars);
}

function onclick_buscar2()
{
    let filtro=document.getElementById("filtro").value;
    let dato=document.getElementById("texto").value;
    let funcion= "buscar2";
    console.log("entra en buscar2 "+dato);
    let vars= "filtro="+filtro+"&dato="+dato+"&funcion="+funcion;

    let peticion= new XMLHttpRequest();
    peticion.onreadystatechange= function()
    {
    if(this.readyState == 4 && this.status== 200)
    {
    
         let resultado = peticion.responseXML;
         let datos = resultado.getElementsByTagName("datos");
        document.getElementById("mostrar").innerHTML="";
        for(let i=0; i<datos.length;i++)
        {
          let nombre= resultado.getElementsByTagName("nombre")[i].firstChild.nodeValue;
          let apellidos= resultado.getElementsByTagName("apellidos")[i].firstChild.nodeValue;
          let telefono= resultado.getElementsByTagName("telefono")[i].firstChild.nodeValue;
          let email= resultado.getElementsByTagName("email")[i].firstChild.nodeValue;
          let direccion= resultado.getElementsByTagName("direccion")[i].firstChild.nodeValue;
          console.log("direccion "+direccion);

           document.getElementById("mostrar").innerHTML+= "<h3>Contacto "+(i+1)+"</h3><p>NOMBRE: "+nombre+"</p>";
           document.getElementById("mostrar").innerHTML+= "<p>APELLIDOS: "+apellidos+"</p>";
           document.getElementById("mostrar").innerHTML+= "<p>TELEFONO: "+telefono+"</p>";
           document.getElementById("mostrar").innerHTML+= "<p>EMAIL: "+email+"</p>";
           document.getElementById("mostrar").innerHTML+= "<p>DIRECCIÓN: "+direccion+"</p>";
        }
    }  
  };

      peticion.open("POST", "agenda.php", true);
      peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      peticion.send(vars);
}

var id_telefono=0;
function onclick_suma_telefono()
{
  
  let telefono= document.getElementById("telefono").value;
  if(!telefono)
  {
    alert("introduza numero de telefono");
  }  
  else
  {
    let ul=document.getElementById("lista_ul");
  //let div_lista= document.getElementById("lista_telefono");

      let li= document.createElement("li");
      let txt= document.createTextNode(telefono);   
      li.appendChild(txt);
      li.setAttribute("class", "lista");
      li.setAttribute("value", txt);
      li.setAttribute("id", telefono);
      li.setAttribute("onclick", "marcar_telefono(event)");
      ul.appendChild(li); 

    document.getElementById("telefono").value= "";  
  }  
  
}

function marcar_telefono(e)
{
  if(id_telefono==0)
  {
       document.getElementById("div_telefono").innerHTML+= "<div id='div_borrar'><input type='text' id='telefono_borrar'><br><button onclick='borrar_telefono()'>Borrar Teléfono</button></div>";
       
        let telefono_borrar= document.getElementById("telefono_borrar");
        let input_telefono= event.target.id
   
        telefono_borrar.setAttribute("value", input_telefono);
        id_telefono++;
  }  
  else
  {
        let telefono_borrar= document.getElementById("telefono_borrar");
        let input_telefono= event.target.id
       
        telefono_borrar.setAttribute("value", input_telefono);
  }   

}

function borrar_telefono()
{
  let id_input= document.getElementById("telefono_borrar").value;
  let li_borrar= document.getElementById(id_input);
  let padre= li_borrar.parentNode;
  //let padre= document.getElementById("lista_ul")
  padre.removeChild(li_borrar);

  document.getElementById("telefono_borrar").value="";

}

