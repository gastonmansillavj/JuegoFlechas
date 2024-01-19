export default class ClasePrincipal extends Phaser.Physics.Arcade.Sprite{

    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        
     
    }

    

}