


export default class Moneda extends Phaser.Physics.Arcade.Sprite{
    
    constructor (scene,x,y,texture) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.experiencia=10
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
       // this.setOrigin(0,0)
         this.setScale(0.2)  
         this.setDepth(9)
         this.scene.grupoMonedas.add(this)
              
         this.scene.physics.moveToObject(this,this.scene.interfazOro,900)
    }

    destruye() {
        
    }


}
    

