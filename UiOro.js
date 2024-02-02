import controladorOroYCompras from "./controladorComprasYOro.js"

export default class UiOro extends Phaser.GameObjects.Sprite{
    
    constructor (scene,x,y,imagen) {
        super (scene,x,y,imagen)
        this.scene=scene
        this.x=x
        this.y=y
        this.imagen=imagen
        this.expParaSubir=80
        this.setOrigin(1,0)
        this.setDepth(5)
        this.setFlipX(true)
        this.setScale(0.2)
        this.cantMonedas=0  
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)

        this.texto = scene.add.text(this.x-150, this.y+15,this.cantMonedas, {strokeThickness:7,fontFamily:"Open sans",fontSize: '50px', fill: '#000000' });
        this.texto.setDepth(5)

        this.ControladorOro=new controladorOroYCompras(this.scene) 
     
    }

    actualizaTexto(){
        this.texto.setText(this.cantMonedas+=1)
        this.ControladorOro.sumaMonedas(this.scene.datosUsuario,1)
        
    }
   
    

}