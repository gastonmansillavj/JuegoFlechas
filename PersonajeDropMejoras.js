import Moneda from "./Moneda.js"
export default class PersonajeDropMejoras extends Phaser.Physics.Arcade.Sprite{

    constructor (scene,x,y,texture) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.setScale(2)
        //this.setOffset.y(1)
        this.estado="parado"   
        this.scene.physics.add.existing(this)
        this.body.setSize(50,50)
        this.setOffset(30,80)
        this.scene.add.existing(this)
        this.Animaciones()
        this.anims.play("caminaEneDrop");
        this.SiguientePosicion={x:0,Y:0}
        this.posinicial={x:this.x,y:this.y}
        this.scene.GrupoPersoanjesDropeables.add(this)
    }


    Animaciones () {
        this.scene.anims.create({
            key: 'caminaEneDrop',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 6 }),
            frameRate:15,
            repeat: -1
        })
    }

    MueveIa () {
        
       
        if(this.estado=="muerto") {
            new Moneda (this.scene,this.x,this.y,"moneda")
            this.destroy()
           // this.anims.play("muerto");
        }
        else if (this.estado=="detenido") {
            this.setVelocity(0)
        }
        else if(this.estado=="caminando") {
            if(this.anims.currentAnim.key!="caminaEneDrop") {
                this.anims.play("caminaEneDrop");
            }
           

        }
        else if(this.estado=="parado") {

            
            this.SiguientePosicion={x:Phaser.Math.Between(300,700),y:Phaser.Math.Between(200,1000)}
          
            this.scene.physics.moveToObject(this,this.SiguientePosicion,100) 

            this.estado="caminando"
            
            
        }
       
       
        

    }

    estadoEnemigoDrop() {
       

        this.MueveIa()

        if(Phaser.Math.Distance.Between(this.x,this.y,this.SiguientePosicion.x,this.SiguientePosicion.y)<=100) {
            this.estado="parado"
            
        }
        

    }

    

}