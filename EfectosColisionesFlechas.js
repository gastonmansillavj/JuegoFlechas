

export default class EfectosColisionesFlechas extends Phaser.Physics.Arcade.Sprite{
    
    constructor (scene,x,y) {
        super (scene,x,y,"explosionHielo")
        this.scene=scene
        this.x=x
        this.y=y       
        this.setScale(1)
        this.scene.add.existing(this)
        //"EfectosColisionesFlechas"
        //this.setName(this.nombre)
        
        this.creaAnim()
        this.anims.play('ExplosionCongelante')
        setTimeout(() => {
            this.destroy()
        }, 500);
    }

    creaAnim(){
        this.scene.anims.create({
            key: 'ExplosionCongelante',
            frames: this.scene.anims.generateFrameNumbers("explosionHielo", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        })
    }
    

    
    

}