import BotonUi from "./BotonUi.js";
import controladorOroYCompras from "./controladorComprasYOro.js";
import UiOro from "./UiOro.js";
import UiTextos from "./UiTextos.js";

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
        this.cantOro= new UiOro(this,300,150,"moneda")
        this.cantOro.texto.setText(objOro.traeCantidadOro(nombreUsuario))

        let btnVolver = new BotonUi(this,930,200,"botonCerrar",0.5,0.5,"",()=>{this.scene.start("Menu")})
        let txtHabilidad1=new UiTextos(this,300,550,"fondoUi","Aumenta 2 \n puntos el \n ataque del \njugador")
        let btnHabilidad1 = new BotonUi(this,300,900,"Boton",0.8,0.8,"30",()=>{
            
            if(objOro.traeCantidadOro(nombreUsuario)>=30) {
                objOro.SubeAtaque(nombreUsuario,2)
                this.cantOro.texto.setText(objOro.traeCantidadOro(nombreUsuario))

            }
        })
        let txtHabilidad2=new UiTextos(this,800,550,"fondoUi","Aumenta 20 \n puntos la \n velocidad de \n ataque del \njugador")
        let btnHabilidad2 = new BotonUi(this,800,900,"Boton",0.8,0.8,"20",()=>{
            if(objOro.traeCantidadOro(nombreUsuario)>=20) {
                objOro.SubeVelocidadDeAtaque(nombreUsuario)
                this.cantOro.texto.setText(objOro.traeCantidadOro(nombreUsuario))
            }
        })
        let txtHabilidad3=new UiTextos(this,550,1300,"fondoUi","Aumenta 20 \n puntos la \n vida del \n castillo")
        let btnHabilidad3 = new BotonUi(this,550,1650,"Boton",0.8,0.8,"10",()=>{
            if(objOro.traeCantidadOro(nombreUsuario)>=10) {
                objOro.SubeVidaTorre(nombreUsuario)
                this.cantOro.texto.setText(objOro.traeCantidadOro(nombreUsuario))

            }
        })
       
        

    }
    update () {

            
       
       
       
    }

 
   
}