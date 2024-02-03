import ClasePrincipal from "./clasePrincipal.js"

export default class CuchillaRebote extends ClasePrincipal{
    
    constructor (scene,x,y,texture,grupoEne,jugador) {
        super (scene,x,y,texture,grupoEne)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.grupoEne=grupoEne
        this.jugador=jugador
        this.contadorRebote=this.scene.ControladorDinero.traeCantidadRebotes(this.scene.datosUsuario)
        this.Velocidad=900;
        this.PoderDeAtaque=10;
        this.setScale(0.1)
        this.movedorCuchillo
        this.enemigoCerca
       
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.setName("CuchilloRebote")
        console.log(this.contadorRebote)
        this.rebota()
        setTimeout(() => {
            if (this) {
                this.destroy()
            } 
        },10000);

       
        
      
    }
     // 

     rebota () {

        const escena=this.scene
        let contCiclo=0
        let cuchillo=this
        let enemigoMasCerca
            if (this.contadorRebote<=0 || this.grupoEne.countActive()<=0) {
                //this.movedorCuchillo=escena.physics.moveToObject(this, this.jugador,this.Velocidad)

                this.destroy()
            }
            
    else  {

                //this.contadorRebote-=1      se descuenta solo cuandoChoca     
                this.grupoEne.children.iterate(function (child) {
                
                if (contCiclo==0 && child.enColisionCuchillo==false) {
                    enemigoMasCerca=child
                    contCiclo+=1
                
                }            
                else if( child.enColisionCuchillo==false&& Phaser.Math.Distance.Between(child.x, child.y,cuchillo.x,cuchillo.y)<=Phaser.Math.Distance.Between(enemigoMasCerca.x, enemigoMasCerca.y,cuchillo.x,cuchillo.y)) {
                    enemigoMasCerca=child
                    //console.log("entra rebote")
                }
    
                });

                if(this.enemigoCerca) {

                    this.movedorCuchillo=this.scene.physics.moveToObject(this, this.enemigoCerca,this.Velocidad)
                
                }
                else {
                    //this.rebota()
                    this.destroy()
                
        
                }

            
           }
     }


     RevoteFinal() {
        const escena=this.scene
        let contCiclo=0
        let cuchillo=this
        let enemigoMasCerca

     }

  
    
    

}