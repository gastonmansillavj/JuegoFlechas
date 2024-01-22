import BotonUi from "./BotonUi.js";
import UiMensajes from "./UiMensajes.js";
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

//localStorage.clear();

this.cajaTexto = this.add.dom(0,-300, 'input', estiloCajaTexto);
this.cajaTexto.setScale(2)
inicioSesion.add(this.cajaTexto)
this.cajaTexto.setOrigin(0.5, 0.5);
this.cajaTexto.addListener('input');
this.cajaTexto.setVisible(true)
this.nombreUsuarioGlobal="";
this.usuarioParaRegistro=""
// Añadir un evento de cambio de valor
this.cajaTexto.on('input', function (event) {
    // Obtener el valor del input
    const nombreUsuario = event.target.value;
    this.nombreUsuarioGlobal=nombreUsuario;
    
   

    // Puedes hacer algo con el nombre de usuario, por ejemplo, imprimirlo en la consola
    console.log('Nombre de usuario:', nombreUsuario);
});

// mensajes  informativos
let MensajeUi=" El usuario no \nexiste presione el \n boton de  registrar \n para registrarlo"
let UiMensajeInf = new UiMensajes (this,550,800,"fondoUi",MensajeUi,1.2,1,"Boton")
UiMensajeInf.ocultaMuestra(UiMensajeInf,false)
// boton registrarse 

this.btnRegistrarse= new BotonUi(this,550,1000,"Boton",1.3,1.3,"registrarse",()=>{
 if(this.cajaTexto.node.value.length>0 && this.cajaTexto.node.value.indexOf(' ')===-1) {
    this.usuarioABuscar.registrarse(this.cajaTexto.node.value)
    this.btnRegistrarse.desactivaBoton(this.btnRegistrarse,false)
    this.btnRegistrarse.desactivaBoton(this.btnRegistrarse.texto,false)
    UiMensajeInf.cambioMensaje(UiMensajeInf,"El usuario \n"+this.cajaTexto.node.value+" \n ha sido registrado")
    UiMensajeInf.ocultaMuestra(UiMensajeInf,true)
 }
 else{
    console.log("la caja tiene espacios")
    //console.log(this.cajaTexto.value.indexOf(' '))
    UiMensajeInf.cambioMensaje(UiMensajeInf,"el usuario \n "  + this.cajaTexto.node.value+ " \n tiene espacios \n en blanco")
    UiMensajeInf.ocultaMuestra(UiMensajeInf,true)
 }
    
})
this.btnRegistrarse.desactivaBoton(this.btnRegistrarse,false)
this.btnRegistrarse.desactivaBoton(this.btnRegistrarse.texto,false)


this.usuarioABuscar = new controladorOroYCompras (this)



this.btnInicioSesion=new BotonUi(this,550,800,"Boton",1.3,1.3,"Iniciar sesion",()=>{
    

    if (this.usuarioABuscar.DatosJugadorIniciarSesion(this.cajaTexto.node.value)) {
        this.scene.get("Menu").data.set("nombreUsuario",this.cajaTexto.node.value)
        this.scene.start("Menu")

    }
    else {
        this.usuarioParaRegistro=this.cajaTexto.node.value
        
        console.log("el usuario no existe")
        UiMensajeInf.ocultaMuestra(UiMensajeInf,true)
        this.btnRegistrarse.desactivaBoton(this.btnRegistrarse,true)
        this.btnRegistrarse.desactivaBoton(this.btnRegistrarse.texto,true)
        
    }
})


// fin create
}

update () {

   
    
    if ( this.usuarioParaRegistro!=this.cajaTexto.node.value) {
    this.btnRegistrarse.desactivaBoton(this.btnRegistrarse,false)
    this.btnRegistrarse.desactivaBoton(this.btnRegistrarse.texto,false)
    }
 
}



// fin clase 

}