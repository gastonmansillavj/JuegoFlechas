export default class BotonUi extends Phaser.Physics.Arcade.Sprite{

    constructor (scene,x,y,texture,escalaX,escalaY,TxtBoton,callback) {
        super (scene,x,y,texture,escalaX,escalaY,TxtBoton,)
        this.x=x
        this.y=y
        this.texture=texture
        this.callback=callback
        this.escalaX=escalaX
        this.escalaY=escalaY
        this.TxtBoton=TxtBoton
        this.setDepth(5)
        this.visible=true;
        this.setScale(this.escalaX,this.escalaY)
        this.setInteractive();
        this.texto= scene.add.text(this.x, this.y,TxtBoton, {
            fontFamily: 'Arial',
            fontSize: '50px',
            color: '#ffffff',
            bold:true,
            stroke:  '#000000',
            strokeThickness: 9
           
        });
       
        
       this.texto.setDepth(6)
       this.texto.setOrigin(0.5, 0.5)
        
        //this.setTint(0x0000FF)
        this.on('pointerup',callback);
        this.scene.add.existing(this)
        
       
                   
    }
    destruir() {
        this.texto.destroy()
        this.destroy()
    }

    desactivaBoton(boton,estado) {
        boton.enabled=estado;
       boton.visible=estado;
    }

   

    

}