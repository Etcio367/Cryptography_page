//--------------------- VARIABLES GLOBALES

var texto = "";

// ------------ Declaración constantes globales

const fileInput = document.getElementById("fileInput");

document.addEventListener('DOMContentLoaded', function() {
    
    const botonCifrar = document.getElementById("botonCifrar");
    const textoCifrado = document.getElementById("textoCifrado");
    const botonDescifrar = document.getElementById("botonDescifrar");
    const textoDescifrado = document.getElementById("textoDescifrado");
    const descargaCifrado = document.getElementById("descargaCifrado");
    const descargaDescifrado = document.getElementById("descargaDescifrado");

    //------------------- Función cifrar    

    botonCifrar.addEventListener("click", function(){

        const textoMostrado = texto;
        const contraseña = prompt("Ingresa la contraseña para cifrar: ");

        if(texto === "")
        {
            alert("Por favor ingrese un archivo primero!!!!");
        }
        else{
            if(contraseña)
            {
                const encrypted = CryptoJS.AES.encrypt(textoMostrado, contraseña);
                textoDescifrado.value = encrypted.toString();
                alert("El archivo fue cifrado correctamente :3 ");

                const blob = new Blob([textoDescifrado.value], {type: "text/plain"});
                const url = URL.createObjectURL(blob);

                const enlace = document.createElement("a");
                enlace.href = url;
                enlace.download = "archivo_cifrado.txt";
                enlace.click();

                URL.revokeObjectURL(url)

            }
            else{
                alert("Debe de ingresar una contraseña válida :C");
            }
        }    
    });

    //-------------------- Función Descifrar 
    botonDescifrar.addEventListener("click", function() {
        const valorCifrado = texto;
        const contraseña = prompt("Ingrese la contraseña para descifrar:");

        if(contraseña) {
            try {
                const descifrado = CryptoJS.AES.decrypt(valorCifrado, contraseña);
                const textoDescifradoValue = descifrado.toString(CryptoJS.enc.Utf8);
                textoDescifrado.value = textoDescifradoValue;
                
                alert("El archivo se ha descifrado correctamente");
                
                const blob = new Blob([textoDescifradoValue], {type: "text/plain"});
                const url = URL.createObjectURL(blob);

                const enlace = document.createElement("a");
                enlace.href = url;
                enlace.download = "archivo_descifrado.txt";
                enlace.click();

        URL.revokeObjectURL(url)
            } catch(error) {
                alert("Error al descifrar. Verificar contraseña");
            }
        } else {
            alert ("Debe ingresar una contraseña");
        }
    });
});

//---------------- Funciones para carga y muestra de archivos

window.addEventListener('load', inicio, false);

function inicio() {
    document.getElementById('fileInput').addEventListener('change', cargar, false);           
}

function cargar(ev) {
    var arch=new FileReader();
    arch.addEventListener('load',leer,false);
    arch.readAsText(ev.target.files[0]);
}

function leer(ev) {
    document.getElementById('textoCifrado').value=ev.target.result;
    texto = ev.target.result;
}