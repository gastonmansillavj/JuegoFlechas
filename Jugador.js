import ClasePrincipal from "./clasePrincipal.js"


export default class Jugador extends ClasePrincipal{
    
    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida
        this.setBodySize(30,40)
        this.setOffset(10,8)
        this.vel_de_disparos=400;
        this.cantidadDePersonajes=1;
        this.PoderDeAtaque=10;
        this.setScale(6)
        this.velDeMovimiento=300;
        this.setDepth(1)
        


        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)

        this.configurarAnimaciones()  
        this.anims.play("disparar");
        
     
    }
    movimientoJugadorD() {
        this.setVelocityX(this.velDeMovimiento)
    }
    movimientoJugadorI() {
        this.setVelocityX(-this.velDeMovimiento)
    }
    sinMovimiento() {
        this.setVelocityX(0)
    }

    buffsJugador(tipoBuf,jugador,tempDisp) {
        if (tipoBuf=="poderAumentado"){
            jugador.PoderDeAtaque=jugador.PoderDeAtaque+2
            
        }
        else if(tipoBuf=="velAtaque") {
           jugador.vel_de_disparos=jugador.vel_de_disparos-5
           tempDisp.delay=jugador.vel_de_disparos
          
            
        }
        else {

        }

    }

    //// animaciones 

    configurarAnimaciones() {
        this.scene.anims.create({
            key: 'disparar',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 5 }),
            frameRate: 25,
            repeat: 0
        })};


    

        
   

    

}