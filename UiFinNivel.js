import BotonUi from "./BotonUi.js"


export default class UiFinNivel extends Phaser.Physics.Arcade.Sprite{

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
        this.texto= scene.add.text(this.x, this.y-600,this.textoUi, {
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

        this.SiguienteNivel= new BotonUi (this.scene,this.x,this.y+100,this.imgbotonOk,1,1,"Siguente",()=>{
            
        })
        this.SiguienteNivel.setDepth(11)
        this.SiguienteNivel.texto.setDepth(12)

        this.Reintentar= new BotonUi (this.scene,this.x,this.y+100,this.imgbotonOk,1,1,"Reintentar",()=>{
           
        })
        this.Reintentar.setDepth(11)
        this.Reintentar.texto.setDepth(12)

        this.Continuar= new BotonUi (this.scene,this.x,this.y+300,this.imgbotonOk,1,1,"Continuar",()=>{
            
        })
        this.Continuar.setDepth(11)
        this.Continuar.texto.setDepth(12)

        this.Regresar= new BotonUi (this.scene,this.x,this.y+500,this.imgbotonOk,1,1,"Regresar",()=>{
            this.scene.scene.start("Menu")
            console.log(this.scene)
        })
        this.Regresar.setDepth(11)
        this.Regresar.texto.setDepth(12)
        
     
    }

   
    ocultatodos(MenuSiguienteNivel,estado) {
       this.ocultaMuestra(MenuSiguienteNivel,estado)
       this.ocultaMuestra(MenuSiguienteNivel.SiguienteNivel,estado)
       this.ocultaMuestra(MenuSiguienteNivel.Reintentar,estado)
       this.ocultaMuestra(MenuSiguienteNivel.Continuar,estado)
       this.ocultaMuestra(MenuSiguienteNivel.Regresar,estado)
    }

    muestraReiniciar (MenuSiguienteNivel,estado) {
       this.ocultaMuestra(MenuSiguienteNivel,estado)
       this.ocultaMuestra(MenuSiguienteNivel.Reintentar,estado)
       this.ocultaMuestra(MenuSiguienteNivel.Continuar,estado)
       this.ocultaMuestra(MenuSiguienteNivel.Regresar,estado)
    }

    muestraSiguiente (MenuSiguienteNivel,estado) {
        this.ocultaMuestra(MenuSiguienteNivel,estado)
        this.ocultaMuestra(MenuSiguienteNivel.SiguienteNivel,estado)
        this.ocultaMuestra(MenuSiguienteNivel.Continuar,estado)
        this.ocultaMuestra(MenuSiguienteNivel.Regresar,estado)
    }

    ocultaMuestra ( BtnUi,estado) {
        BtnUi.enable=estado
        BtnUi.setVisible(estado)
        BtnUi.texto.visible=estado     
    }

    

}