import BotonUiTienda from "./BotonUi.js"

export default class UiTienda extends Phaser.Physics.Arcade.Sprite{

    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida
        this.setActive(false)
        this.visible=false
        //this.setName('interfazTienda');
        
        
        this.setScale(1.5)
        this.setDepth(2)
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
      

        
        
     
    }

   

    

    
    

    

}