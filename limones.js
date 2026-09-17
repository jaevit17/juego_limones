let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=30;
const ALTURA_PERSONAJE=90;
const ANCHO_PERSONAJE=80;
const ANCHO_LIMON=30;
const ALTURA_LIMON=30;

let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;
let puntaje=0;
let vidas=3;
let velocidadCaida = 200;
let cambioVelocidad;
let imagenLimon=new Image();
imagenLimon.src="limon.png";
let imagenCanasta=new Image();
imagenCanasta.src="canasta.png";

function iniciar(){
    cambioVelocidad=setInterval(bajarLimon, velocidadCaida);;//primerParametro: function segundoParametro: tiempo en milisegundos
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}
function dibujarSuelo(){
    ctx.fillStyle ="#d27aab";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}
function dibujarPersonaje(){
    //ctx.fillStyle="#D1173D";
    //ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
    ctx.drawImage(imagenCanasta,personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}
function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}
//mover Izquierda 
function moverIzquierda(){
    personajeX=personajeX-15;
    actualizarPantalla();
}
//mover Derecha
function moverDerecha(){
    personajeX=personajeX+15;
    actualizarPantalla();
}
function dibujarLimon(){
    //ctx.fillStyle="green";
    //ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON)
    ctx.drawImage(imagenLimon,limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);  
}
function bajarLimon(){
    limonY=limonY+10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}
function detectarAtrapado(){
    if(limonX+ANCHO_LIMON>personajeX && 
        limonX<personajeX+ANCHO_PERSONAJE &&
        limonY+ALTURA_LIMON>personajeY && 
        limonY<personajeY+ALTURA_PERSONAJE){
        //alert("ATRAPADO!!");
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarEnSpan("txtPuntaje",puntaje);
    }
    //Puntaje 3 = velocidad 150
    if(puntaje==3){
    velocidadCaida=150;
    //limpiar intervalo
    clearInterval(cambioVelocidad);
    cambioVelocidad=setInterval(bajarLimon, velocidadCaida);
}
    //Puntaje 6 = velocidad 100
    if(puntaje==6){
    velocidadCaida=100;
    //limpiar intervalo
    clearInterval(cambioVelocidad);
    cambioVelocidad=setInterval(bajarLimon, velocidadCaida);
}
    //Puntaje 10 "ES EL GANADOR" 
    if(puntaje==10){
        alert("🍋 ATRAPASTE LOS LIMONES█▓▒░ GΛNΛDØR ░▒▓█ , ES MOMENTO DE UNA LIMONADA ¡FELICIDADES GANADOR!! 🏆");
        //detener setInterval
        clearInterval(cambioVelocidad);
    }
}
function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}
function detectarPiso(){
    if(limonY+ALTURA_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpan("txtVidas",vidas);
    }
    //GAME OVER
    if(vidas==0){
        alert("█▓▒░ GΛME ØVER ░▒▓█");
        //detener setInterval
        clearInterval(cambioVelocidad);
    }
}
function reiniciar(){
    //Al perder o ganar el setInterval anterior queda detenido
    //iniciar() crea uno nuevo
    //el exististente esta activo se evita terminar con dos intervalos
    //usando clearInterval para limpiar intervalo y que comience en 200.
    clearInterval(cambioVelocidad);
    vidas=3;
    puntaje=0;
    velocidadCaida=200;
    mostrarEnSpan("txtPuntaje",puntaje);
    mostrarEnSpan("txtVidas",vidas);
    iniciar();
}