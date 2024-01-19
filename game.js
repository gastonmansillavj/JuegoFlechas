import Menu from "./Menu.js";
import MenuCompras from "./MenuCompras.js";
import scene1 from "./scene1.js";
import InicioSesion from "./InicioSesion.js";

var config = {
    
    parent: 'JuegoFlecha',
    dom: {
        createContainer: true // Habilita la creación del contenedor DOM
    }, 
    input: {
        activePointers: 1, // Número de punteros táctiles activos
        touch: {
            target: document.getElementById('game-container') // Identificador del contenedor del juego
        }
    },

    type:Phaser.AUTO,
    scale: {
        mode:Phaser.Scale.FIT, // scala automaticamente
        autoCenter:Phaser.Scale.CENTER_BOTH, // centra automaticamente
        width:1080, // ancho de pantalla
        height:1920,// alto de pantalla
        
    },
    
    
    physics : {
        default:"arcade", // tipo de fisica que va a utilizar 
        arcade: {
            gravity: { y :0},// la gravedad del juego
            debug: true, // debug
            fps: 60
        }
    },
    fps: {
        target: 24,
        forceSetTimeOut: true
      },

    scene:[InicioSesion,Menu,MenuCompras,scene1],
    

}

var game = new Phaser.Game(config) 
var jugador;
var cursors;
var Enemigos;

