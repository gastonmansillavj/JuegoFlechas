


export default class Cristal extends Phaser.Physics.Arcade.Sprite{
    
    constructor (scene,x,y,texture) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.experiencia=10
       // this.setOrigin(0,0)
         this.setScale(0.2)  
       
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.scene.grupoCristales.add(this)
        
     
    }

    


}
    

