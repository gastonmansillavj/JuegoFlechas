import BotonUi from "./BotonUi.js";
import controladorOroYCompras from "./controladorComprasYOro.js";

export default class InicioSesion extends Phaser.Scene {
    

    constructor () {
        super ("InicioSesion"); 
    }
 
    preload ()  {
        this.load.image("fondo","assets/map1.png");
        this.load.image("Boton","assets/boton.png")
        this.load.image("fondoUi","assets/fondoUi.png")
        this.load.html('cajaTexto', 'assets/cajaDeTexto.html');
       
    }   
    create () { 
        
///fondo
var fondo=this.add.image(520,940,"fondo");
fondo.setScale(3);

const inicioSesion=this.add.container(550,800)
inicioSesion.setDepth(4)
let fondoUi= this.add.image(0,0,"fondoUi");
fondoUi.setScale(1.5)
fondoUi.setOrigin(0.5)
inicioSesion.add(fondoUi)

const estiloCajaTexto = {
color: '#000000',
backgroundColor: '#ffffff',
padding: '10px',
border: '2px solid #000000',
borderRadius: '5px',
width: '200px',
textAlign: 'center',
margin: 'auto',
marginTop: '20px',
};

const cajaTexto = this.add.dom(0,-300, 'input', estiloCajaTexto);
cajaTexto.setScale(2)
inicioSesion.add(cajaTexto)
cajaTexto.setOrigin(0.5, 0.5);
cajaTexto.addListener('input');
this.nombreUsuarioGlobal="";
// Añadir un evento de cambio de valor
cajaTexto.on('input', function (event) {
    // Obtener el valor del input
    const nombreUsuario = event.target.value;
    this.nombreUsuarioGlobal=nombreUsuario;
   

    // Puedes hacer algo con el nombre de usuario, por ejemplo, imprimirlo en la consola
    console.log('Nombre de usuario:', nombreUsuario);
});



this.usuarioABuscar = new controladorOroYCompras (this)

this.btnInicioSesion=new BotonUi(this,550,800,"Boton",1.3,1.3,"Iniciar sesion",()=>{
    

    if (this.usuarioABuscar.DatosJugadorIniciarSesion(cajaTexto.node.value)) {
        this.scene.get("Menu").data.set("nombreUsuario",cajaTexto.node.value)
        this.scene.start("Menu")

    }
    else {
        console.log("el usuario no existe")
    }
})

this.btnRegistrarse= new BotonUi(this,550,1000,"Boton",1.3,1.3,"registrarse",()=>{
this.usuarioABuscar.registrarse(cajaTexto.node.value)

console.log("registrado")

})











    }

}