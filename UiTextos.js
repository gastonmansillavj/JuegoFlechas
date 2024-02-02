

export default class UiTextos extends Phaser.Physics.Arcade.Sprite{
    
    constructor (scene,x,y,texture,texto) {
        super (scene,x,y,texture,texto)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.setScale(0.7)
        this.texto=texto
        this.TextoDescripcion = scene.add.text(this.x-150,this.y-100,this.texto,
            {strokeThickness:7,
            fontFamily:"Open sans",
            fontSize: '50px', 
            fill: '#000000',
            align: 'center'
            
         })
        this.TextoDescripcion.setDepth(18)  
        this.scene.add.existing(this)
        
     
    }

  
        
        

    




    

}