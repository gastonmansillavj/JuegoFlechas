import BotonUi from "./BotonUi.js"


export default class UiPowerUps extends Phaser.Physics.Arcade.Sprite{

    constructor (scene,x,y,texture,textoUi,escalaX,escalaY,imgBotonOk,jugador) {
       super (scene,x,y,texture,textoUi,escalaX,escalaY,imgBotonOk,jugador)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.textoUi=textoUi
        this.imgbotonOk=imgBotonOk
        this.jugador=jugador
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

        // power ups 

        

/*
        this.PowerAlea1= new BotonUi (this.scene,this.x,this.y-300,this.imgbotonOk,1,1,"Aumenta el daño",()=>{
            this.jugador.PoderDeAtaque+=2
            this.scene.juegoPausado=false
            this.ocultatodos(this,false)
        })
        this.PowerAlea1.setDepth(11)
        this.PowerAlea1.setScale(2.5)
        this.PowerAlea1.texto.setDepth(12)
*/
        this.PowerAlea2= new BotonUi (this.scene,this.x,this.y+100,this.imgbotonOk,1,1,"Lanza una flecha \n Congelante  despues de "+this.scene.TiempoSpawnFlechaCongelante+"\n disparos comunes",()=>{
            
            if (this.scene.EstadoFlechaCongelante==false) {
                this.scene.EstadoFlechaCongelante=true
            }
            else{
                //this.scene.cantFlechasCongelantes += 1
                this.scene.TiempoSpawnFlechaCongelante-=1
            }
            this.scene.juegoPausado=false
            this.ocultatodos(this,false)
        })
        this.PowerAlea2.setScale(2.5)
        this.PowerAlea2.setDepth(11)
        this.PowerAlea2.texto.setDepth(12)
/*
        this.PowerAlea3= new BotonUi (this.scene,this.x,this.y+500,this.imgbotonOk,1,1,"Aumenta la \nvelocidad de ataque",()=>{
            this.scene.tempDisp.delay-=20
            this.ocultatodos(this,false)
            this.scene.juegoPausado=false
        })
        this.PowerAlea3.setScale(2.5)
        this.PowerAlea3.setDepth(11)
        this.PowerAlea3.texto.setDepth(12)*/

        this.PowerAlea4= new BotonUi (this.scene,this.x,this.y+500,this.imgbotonOk,1,1,"agrega una \n flecha mas",()=>{
            this.scene.cantidadFlechasComunes += 1
            this.ocultatodos(this,false)
            this.scene.juegoPausado=false
        })
        this.PowerAlea4.setScale(2.5)
        this.PowerAlea4.setDepth(11)
        this.PowerAlea4.texto.setDepth(12)


       
        
     
    }

   
    ocultatodos(MenuPowerUp,estado) {
       this.ocultaMuestra(MenuPowerUp,estado)
      // this.ocultaMuestra(MenuPowerUp.PowerAlea1,estado)
       this.ocultaMuestra(MenuPowerUp.PowerAlea2,estado)
       //this.ocultaMuestra(MenuPowerUp.PowerAlea3,estado)
       this.ocultaMuestra(MenuPowerUp.PowerAlea4,estado)
    }

    

    ocultaMuestra ( BtnUi,estado) {
        BtnUi.enable=estado
        BtnUi.setVisible(estado)
        BtnUi.texto.visible=estado     
    }

    creaPowerUps(uiPower) {
   
        uiPower.ocultaMuestra(this,true)
       
         uiPower.ocultaMuestra(uiPower.PowerAlea2,true)
       

        uiPower.ocultaMuestra(uiPower.PowerAlea4,true)
       

       
    }

   


    

}