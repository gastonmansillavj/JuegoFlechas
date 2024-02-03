


export default class Rayo extends Phaser.Physics.Arcade.Sprite{
    
    constructor (scene,x,y,texture) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.experiencia=10
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.setScale(2)  
        this.setDepth(9)
        this.setBodySize(30,30)
        this.setOffset(20,115)
         
        this.configurarAnimaciones()
        this.anims.play("caer")
        this.on("animationcomplete",()=>{                    
            this.destroy()
                   
        },this)  
    }

    
        configurarAnimaciones() {
            this.scene.anims.create({
                key: 'caer',
                frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 2}),
                frameRate: 8,
                repeat:0
            })};
    

    
    


}
    

