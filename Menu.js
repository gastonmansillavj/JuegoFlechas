import BotonUi from "./BotonUi.js";
import controladorOroYCompras from "./controladorComprasYOro.js";
export default class Menu extends Phaser.Scene {
    

    constructor () {
        super ("Menu"); 
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

        const nombreUsuario=this.data.get("nombreUsuario")
        
        
       let btnPlay = new BotonUi(this,500,500,"Boton",1,1,"Play",()=>{
        this.scene.get("Nivel1").data.set("nombreUsuario",nombreUsuario)
        this.scene.start("Nivel1")
    
    
    })

       let btnHabilidades = new BotonUi(this,500,800,"Boton",1,1,"Flechas",()=>{
        
        this.scene.get("MenuCompras").data.set("nombreUsuario",nombreUsuario)
        this.scene.start("MenuCompras")

    })
       
       
       
       let objOro= new controladorOroYCompras (this)
       let textoMonedas = this.add.text(800,100, objOro.traeCantidadOro(nombreUsuario), {
            fontFamily: 'Arial',
            fontSize: '50px',
            color: '#ffffff',
            bold:true,
            stroke:  '#000000',
            strokeThickness: 9
           
        });
        textoMonedas.setDepth(6)
        textoMonedas.setOrigin(0.5, 0.5)
/*
        let botonPruebaMonedas=  new BotonUi(this,500,1300,"Boton",1,1,"monedasPruebas",()=>{
            objOro.sumaMonedas(nombreUsuario,2)
            
        })*/
    }

    
    
       

 
   
}