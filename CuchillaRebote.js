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
        this.contadorRebote=10
        this.Velocidad=900;
        this.PoderDeAtaque=10;
        this.setScale(0.1)
        this.movedorCuchillo
        this
       
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.setName("CuchilloRebote")
        
     
    }
     // 

     rebota () {
        const escena=this.scene
        let contCiclo=0
        let cuchillo=this
        let enemigoMasCerca
            if (this.contadorRebote==0) {
                //this.movedorCuchillo=escena.physics.moveToObject(this, this.jugador,this.Velocidad)

                //this.destroy()
            }
        
            
            if (this.contadorRebote>=1 && this.grupoEne.countActive()>0) {
                this.contadorRebote-=1
                
                
                this.grupoEne.children.iterate(function (child) {

                    
                if (contCiclo==0 && child.enColisionCuchillo==false) {
                    enemigoMasCerca=child
                    contCiclo+=1
                
                }
                        
                if( child.enColisionCuchillo==false&& Phaser.Math.Distance.Between(child.x, child.y,cuchillo.x,cuchillo.y)<=Phaser.Math.Distance.Between(enemigoMasCerca.x, enemigoMasCerca.y,cuchillo.x,cuchillo.y)) {
                    enemigoMasCerca=child
                    console.log("entra rebote")
                }
                
        
                });
                
                if(enemigoMasCerca) {
                    this.movedorCuchillo=escena.physics.moveToObject(this, enemigoMasCerca,this.Velocidad)
                }
                else {
                    
                    //this.movedorCuchillo=escena.physics.moveToObject(this, this.jugador,this.Velocidad)

                    this.destroy()
                    /*
                    contCiclo=0
                    this.grupoEne.children.iterate(function (child) {

                    
                        if (contCiclo==0 && child.enColisionCuchillo==false) {
                            enemigoMasCerca=child
                            contCiclo+=1
                        
                        }
                                
                        if( child.enColisionCuchillo==false&& Phaser.Math.Distance.Between(child.x, child.y,cuchillo.x,cuchillo.y)<=Phaser.Math.Distance.Between(enemigoMasCerca.x, enemigoMasCerca.y,cuchillo.x,cuchillo.y)) {
                            enemigoMasCerca=child
                            console.log("entra rebote")
                        }
                        
                
                        });
*/
                }
           
        }

     }

    
    

}