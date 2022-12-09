window.addEventListener("DOMContentLoaded",function(){agregarEventos()})

function crearcaptcha(){
    let caracteres = ["a","g","r","t","2","5","i","x","d"];
    let captcha = "";
    for (let i = 0; i < 6; i++){
        let mezclador = caracteres [(Math.floor(Math.random()*(caracteres.length)))]
        captcha = captcha+mezclador;
    }
    return captcha;
}

function agregarEventos(){
    document.getElementById ("validarcaptcha").addEventListener("click", validar);
    let botonCrear = document.getElementById("crearcaptcha");
    botonCrear.addEventListener ("click", function(){
        document.getElementById("textcaptcha").innerHTML = crearcaptcha();
    });
    
  
}
function validar(){
    let valor = document.getElementById("textcaptcha").textContent;
    let aValidar = document.getElementById("validacion").value;
    if(valor == aValidar){
        document.getElementById("verificacion").innerHTML = "validado";
        document.getElementById("enviar").disable = false;
    }
    else{
        document.getElementById("verificacion").innerHTML = "intente de nuevo";
    }
}
       



                /*    TABLA DINAMICA REST  */
    //tabla dinamica Rest
//mostrar
async function obtenerDatos() {
    const url = 'https://62b203b320cad3685c87da89.mockapi.io/web1/Usuarios';
    const Tabla = document.querySelector(".personales");
    Tabla.innerHTML = "";
    try {
        let res = await fetch(url); // GET url
        let json = await res.json(); // texto json a objeto
        console.log(json);
        for (const Usuarios of json) {
            let idusuario = Usuarios.id;
            let nombre= Usuarios.Nombre;
            let apellido = Usuarios.Apellido;
            let emailusuario = Usuarios.Email;
            Tabla.innerHTML += `<tr>
                    <td>${idusuario}</td>
                    <td>${nombre}</td>
                    <td>${apellido}</td>
                    <td>${emailusuario}</td></tr >`

        }
    } catch (error) {
        console.log(error);
    }
}
//LLamamos la funcion
obtenerDatos();
//boton editar
const baseURL = 'https://62b203b320cad3685c87da89.mockapi.io/web1/Usuarios';

document.querySelector("#button-editar").addEventListener('click', sendData)
const Tabla = document.querySelector(".usuarios");
function sendData() {
    console.log("Boton Enviar Dato")
    let id = document.querySelector("#idusuario").value;
    let nombre = document.querySelector("#nombre").value;
    let apellido= document.querySelector("#apellido").value;
    let email = document.querySelector("#email").value;
    let camposvacios = document.querySelector(".inputsVacios");
    if (nombre.length === 0 || id.length === 0 || apellido.length === 0 || email.length === 0) {
        camposvacios.innerHTML = "Ingrese un ID y datos a editar";
    return;
    }
    else {
        document.querySelector(".inputsVacios").innerHTML = '';

    }
    let data = {
        "Nombre": nombre,
        "Apellido":apellido,
        "Email":email
    };
   

    fetch(baseURL + "/" + id, {
        "method": "PUT",
        "mode": 'cors',
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(data)
    }).then(function (r) {
        if (!r.ok) {
            console.log("Error")
        }
        return r.json()
    })
        .then(function (json) {
     
            obtenerDatos();

        })
        .catch(function (e) {
            console.log(e)
        })
        
         document.querySelector("#idusuario").value='';
         document.querySelector("#nombre").value='';
         document.querySelector("#apellido").value='';
         document.querySelector("#email").value='';
    }

            //Boton add
//let contenedor = document.querySelector(".personales");
document.querySelector("#btn-Add").addEventListener('click', addDato)
async function addDato() {
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let email = document.querySelector("#email").value;
    let camposvacios = document.querySelector(".inputsVacios");

    if (nombre.length === 0 || apellido.length === 0 || email.length === 0) {
        camposvacios.innerHTML = "Ingrese un ID y datos a agregar ";

        return;
    }
    else {
        document.querySelector(".inputsVacios").innerHTML = '';

    }
    let data = {
        "Nombre": nombre,
        "Apellido": apellido,
        "Email": email
    };

    const url = 'https://62b203b320cad3685c87da89.mockapi.io/web1/Usuarios';

    try {
       let res = await fetch(url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(data)
        });
        let json = await res.json();
            console.log(json);
        obtenerDatos();
    } catch (error) {
        console.log(error);
    }
    
    document.querySelector("#nombre").value='';
    document.querySelector("#apellido").value='';
    document.querySelector("#email").value='';
}
//Boton Delet 
//let conten = document.querySelector(".personales");
document.querySelector("#button-delete").addEventListener('click', borrardato)

async function borrardato() {
    let id = document.querySelector("#idusuario").value;
    let camposvacios = document.querySelector(".inputsVacios");
    if (id.length === 0) {
        camposvacios.innerHTML = "Ingrese el  ID para eliminar ";
        return;
    }
    else {
        document.querySelector(".inputsVacios").innerHTML='';

            }
        
    

    const url = 'https://62b203b320cad3685c87da89.mockapi.io/web1/Usuarios';
    try {
        let res = await   fetch(url + "/" + id,{
            "method": "DELETE",
         
        });

        let json = await res.json();
        console.log(json);
        obtenerDatos();
    } 
    catch (error) {
        console.log(error);
    }
    
    document.querySelector("#idusuario").value='';
}
