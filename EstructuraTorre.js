export default class EstructuraTorre extends Phaser.Physics.Arcade.Sprite{

    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida
        this.setScale(4)
        //this.setOffset.y(1)
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.AnimacionCastillo()
        this.anims.play("DestruccionCastillos");
    }


    AnimacionCastillo () {
        this.scene.anims.create({
            key: 'DestruccionCastillos',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 3 }),
            frameRate:3,
            repeat: 0
        })
    }

    

}