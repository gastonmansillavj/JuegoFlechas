import ClasePrincipal from "./clasePrincipal.js"

export default class FlechaCongelante extends ClasePrincipal{
    
    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida
        this.Velocidad=150;
        this.PoderDeAtaque=10;
        this.setScale(1.8,0.8)
        this.setVelocityY(-1200)
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.setName("FlechaCongelante")
        this.flipY=true
        this.creaAnim()
        this.anims.play("flechaAvanza")
        this.body.setSize(21,100)
        //this.setOffset()
        
     
    }

    destruyeBala(){
        this.destroy()
    }

    creaAnim(){
        this.scene.anims.create({
            key: 'flechaAvanza',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })
    }
    

}