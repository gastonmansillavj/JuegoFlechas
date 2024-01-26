import ClasePrincipal from "./clasePrincipal.js"

export default class FlechaComun extends ClasePrincipal{
    
    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida
        this.Velocidad=150;
        this.PoderDeAtaque=10;
        this.setScale(2)
        this.setVelocityY(-1200)
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.setName("FlechaComun")
        
     
    }

    destruyeBala(){
        this.destroy()
    }
    

}