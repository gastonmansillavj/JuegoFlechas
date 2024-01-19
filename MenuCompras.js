import BotonUi from "./BotonUi.js";
import controladorOroYCompras from "./controladorComprasYOro.js";

BotonUi

export default class MenuCompras extends Phaser.Scene {
    

    constructor () {
        super ("MenuCompras"); 
    }
 
    preload ()  {
        this.load.image("fondo","assets/map1.png");
        this.load.image("Boton","assets/boton.png")
        this.load.image("botonCerrar","assets/botonCerrar.png")
        this.load.image("fondoUi","assets/fondoUi.png")
        
       
    }   
    create () {
      
///fondo
        var fondo=this.add.image(520,940,"fondo");
        fondo.setScale(3);
        var fondoUi=this.add.image(540,940,"fondoUi");
        fondoUi.setScale(2,2.3)

        const nombreUsuario=this.data.get("nombreUsuario")
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

        let btnVolver = new BotonUi(this,970,150,"botonCerrar",0.5,0.5,"",()=>{this.scene.start("Menu")})
        let btnHabilidad1 = new BotonUi(this,300,600,"Boton",0.8,0.8,"1",()=>{})
        let btnHabilidad2 = new BotonUi(this,800,600,"Boton",0.8,0.8,"2",()=>{})
        let btnHabilidad3 = new BotonUi(this,300,1100,"Boton",0.8,0.8,"3",()=>{})
        let btnHabilidad4 = new BotonUi(this,800,1100,"Boton",0.8,0.8,"4",()=>{})
        let btnHabilidad5 = new BotonUi(this,300,1600,"Boton",0.8,0.8,"5",()=>{})
        let btnHabilidad6 = new BotonUi(this,800,1600,"Boton",0.8,0.8,"6",()=>{})
   

    }
    update () {

            
       
       
       
    }

 
   
}