
import UiTienda from "./UiTienda.js"
import BotonUiTienda from "./BotonUi.js"
export default class Tienda extends Phaser.Physics.Arcade.Sprite{

    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida
        this.setScale(3)
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.setInteractive()
        this.CargaImagen()
        
        this.on("pointerup",this.activaUiTienda)

        
        
     
    }
    CargaImagen() {
        this.scene.load.image("fondoUi","assets/fondoUi.png");
        this.scene.load.image("Boton","assets/boton.png",{frameWidth:48.4,frameHeight:50})
        this.scene.load.image("btnCerrar","assets/botonCerrar.png");
        this.scene.load.start();
        this.scene.load.on("complete",this.CreaUiTienda,this)
    }

    CreaUiTienda(){
        
        const interfazTienda = new UiTienda (this.scene,550,850,"fondoUi",100)
        
        this.interfazTienda=interfazTienda

        const BotonCompra1 = new BotonUiTienda (this.scene,this.interfazTienda.x-150, this.interfazTienda.y-200, 'Boton',100,()=>{});
        this.BT1=BotonCompra1

        const BotonCompra2 = new BotonUiTienda (this.scene,this.interfazTienda.x+150, this.interfazTienda.y-200, 'Boton',100,()=>{});
        this.BT2=BotonCompra2

        const BotonCompra3 = new BotonUiTienda (this.scene,this.interfazTienda.x-150, this.interfazTienda.y+100, 'Boton',100,()=>{});
        this.BT3=BotonCompra3

        const BotonCompra4 = new BotonUiTienda (this.scene,this.interfazTienda.x+150, this.interfazTienda.y+100, 'Boton',100,()=>{});
        this.BT4=BotonCompra4

        const BotonCompra5 = new BotonUiTienda (this.scene,this.interfazTienda.x-150, this.interfazTienda.y+400, 'Boton',100,()=>{});
        this.BT5=BotonCompra5

        const BotonCompra6 = new BotonUiTienda (this.scene,this.interfazTienda.x+150, this.interfazTienda.y+400, 'Boton',100,()=>{});
        this.BT6=BotonCompra6
       
        const BotonSalir = new BotonUiTienda (this.scene,interfazTienda.x, interfazTienda.y+480, 'btnCerrar',100,()=>{this.desactivaTienda(this.botSalir,this.interfazTienda)}).setScale(0.5);
        this.botSalir=BotonSalir

    }
    activaUiTienda () {
        this.CambioEstadosVisibilidad(this.botSalir,true)
        this.CambioEstadosVisibilidad(this.interfazTienda,true)
        this.CambioEstadosVisibilidad(this.BT1,true)
        this.CambioEstadosVisibilidad(this.BT2,true)
        this.CambioEstadosVisibilidad(this.BT3,true)
        this.CambioEstadosVisibilidad(this.BT4,true)
        this.CambioEstadosVisibilidad(this.BT5,true)
        this.CambioEstadosVisibilidad(this.BT6,true)

    }

    desactivaTienda(bs,i){
      
       this.CambioEstadosVisibilidad(this.botSalir,false)
       this.CambioEstadosVisibilidad(this.interfazTienda,false)
       this.CambioEstadosVisibilidad(this.BT1,false)
       this.CambioEstadosVisibilidad(this.BT2,false)
       this.CambioEstadosVisibilidad(this.BT3,false)
       this.CambioEstadosVisibilidad(this.BT4,false)
       this.CambioEstadosVisibilidad(this.BT5,false)
       this.CambioEstadosVisibilidad(this.BT6,false)
    }

    CambioEstadosVisibilidad(objParaAct,Estado){
       
        objParaAct.setActive(Estado)
        objParaAct.setVisible(Estado)
    }

    

}