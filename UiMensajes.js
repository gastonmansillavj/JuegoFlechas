import BotonUi from "./BotonUi.js"


export default class UiMensajes extends Phaser.Physics.Arcade.Sprite{

    constructor (scene,x,y,texture,textoUi,escalaX,escalaY,imgBotonOk) {
       super (scene,x,y,texture,textoUi,escalaX,escalaY,imgBotonOk)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.textoUi=textoUi
        this.imgbotonOk=imgBotonOk
        this.scene.add.existing(this)
        this.setScale(escalaX,escalaY)
        this.setDepth(10)
    
        this.texto= scene.add.text(this.x, this.y-100,this.textoUi, {
            fontFamily: 'Arial',
            fontSize: '50px',
            color: '#ffffff',
            bold:true,
            stroke:  '#000000',
            strokeThickness: 9,
            align: 'center', // Puedes cambiar esto a 'left', 'right', 'center', 'justify', etc.
           
        });
        this.texto.setDepth(11)
        this.texto.setOrigin(0.5, 0.5)

        this.BotonAceptar= new BotonUi (this.scene,this.x,this.y+200,this.imgbotonOk,1,1,"aceptar",()=>{
            this.ocultaMuestra(this,false)
        })
        this.BotonAceptar.setDepth(11)
        this.BotonAceptar.texto.setDepth(12)
        
     
    }

    cambioMensaje (objText,nuevoTexto) {
        
        objText.texto.setText(nuevoTexto)

    }

    ocultaMuestra ( objUi,estado) {
        objUi.enable=estado
        objUi.setVisible(estado)
        objUi.texto.setVisible(estado)
        this.BotonAceptar.enable=estado
        this.BotonAceptar.setVisible(estado)
        this.BotonAceptar.texto.setVisible(estado)

    }

    

}