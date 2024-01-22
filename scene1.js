import ClasePrincipal from "./clasePrincipal.js";
import Enemigos from "./enemigos.js";
import Jugador from "./Jugador.js";
import FlechaComun from "./FlechaComun.js"
import VidaCasa from "./VidaCasa.js";
import EstructuraTorre from "./EstructuraTorre.js";
//import Tienda from "./Tienda.js";
import FlechaCongelante from "./FlechaCongelante.js";
import BotonUi from "./BotonUi.js";
export default class scene1 extends Phaser.Scene {
    

    constructor () {
        super ("Nivel1"); // nombre escena-
    }
 
    preload ()  {
        this.load.image("fondo","assets/map1.png");
        this.load.spritesheet("GoblinEnemigo","assets/GoblinEnemigo.png",{frameWidth:48,frameHeight:48});
        this.load.spritesheet("jugador","assets/jugador.png",{frameWidth:48.4,frameHeight:50})
        this.load.spritesheet("Cubo","assets/Bloque.png",{frameWidth:48.4,frameHeight:50});
        this.load.spritesheet("arquero","assets/JugadorArquero.png",{frameWidth:48,frameHeight:48})
        this.load.spritesheet("EstructuraTorre","assets/torre1.png",{frameWidth:70,frameHeight:130})
        this.load.image("flecha","assets/flecha.png");
        this.load.image("barraVida","assets/barraVida.png");
        this.load.image("FondoBarraVida","assets/fondoBarraVida.png");
        this.load.image("torreBarraVida","assets/torre.png");
        
    }   
    create () {
      
///fondo
        var fondo=this.add.image(520,940,"fondo");
        fondo.setScale(3);
//  temporizador creador de barriles
        this.time.addEvent({
            delay: 5000, // milisegundos
            callback: this.CreadorDeBarriles,
            callbackScope: this,
            loop: true
        });

// jugador principal
this.Jugador= new Jugador(this,500,1700,"arquero",100)

    // temprizador de balas 
    this.tempDisp = this.time.addEvent({
        delay: this.Jugador.vel_de_disparos, // milisegundos
        callback: this.CreadorDeBalas,
        callbackScope: this,
        loop: true
    });
    //// teclas ///
                  
    this.cursors = this.input.keyboard.createCursorKeys();
    this.Jugador.setInteractive()
    this.input.setDraggable(this.Jugador);




    // grupo enemigos 
    this.GrupoEnemigos=this.add.group()

    // grupo Balas
    this.Grupobalas=this.add.group()


    // limites de Balas y  barriles
    this.grupoLimites=this.add.group()
    this.limitesup=this.physics.add.sprite(500,-20,"Cubo").setScale(25,1);
    this.limiteinf=this.physics.add.sprite(500,1900,"Cubo").setScale(25,1);

    // aleatoriedad barriles 
        this.AleatorioBarril=1
        this.numAnterior=1;

    // vida De La casa
    this.add.image(300,90,"FondoBarraVida");
    this.add.image(115,90,"torreBarraVida").setScale(0.4);
    this.vidaCastillo= new VidaCasa(this,180,69,"barraVida",90).setDepth(10)

    // estructuraTorre 

    this.EstructuraTorre= new EstructuraTorre (this,100,1700,"EstructuraTorre",1000)
    this.EstructuraTorre2= new EstructuraTorre (this,980,1700,"EstructuraTorre",1000)

    // botonPowerUp

    this.tipoDisparo="flechaComun"
    let PowerUp1=new BotonUi(this,1000,1200,"Boton",0.5,1,"p1",()=>{
    
        this.tipoDisparo="flechaCongelante"
        setTimeout(()=>{this.tipoDisparo="flechaComun"},5000)
    })
    
    
    this.physics.add.overlap(this.Grupobalas,this.GrupoEnemigos,this.restaVidaEnemigo,null,this);
    this.physics.add.overlap(this.Grupobalas,this.limitesup,this.destruyeBala,null,this);
    this.physics.add.overlap(this.GrupoEnemigos,this.limiteinf,this.destruyeBarril,null,this);
   
    /// enemigos pruebas 

    //this.Enemigo= new Enemigos(this,500,200,"GoblinEnemigo",100)
    //this.GrupoEnemigos.add(this.Enemigo);

    
    }
    update () {

        this.GrupoEnemigos.children.iterate(function (child) {
            child.estadosEnemigo (child)
         });
 
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            //gameObject.y = dragY;
        });
            
        if (this.cursors.left.isDown ) {
            this.Jugador.movimientoJugadorI()
        }
        else if (this.cursors.right.isDown ) {
            this.Jugador.movimientoJugadorD()
           
           
        }
        else {
            this.Jugador.sinMovimiento()
        }

        this.GrupoEnemigos.children.iterate(function(child){
           child.actualizaPosicion()
           if (child.body.enable==false) {
                setTimeout(()=>{ child.destroy ()},5000)
           }
        });

        
        

       
       
    }

    CreadorDeBarriles() {
        
        
        while (this.numAnterior==this.AleatorioBarril) {
            this.AleatorioBarril=Phaser.Math.Between(1,3);
        }

        if (this.AleatorioBarril==1) {
            this.numAnterior=1;
            this.creadorDosBarriles(300)
            this.creadorDosBarriles(600)

        }
        else if(this.AleatorioBarril==2) {
            this.numAnterior=2
            this.creadorDosBarriles(900)
            this.creadorDosBarriles(600)
        }
        else {
            this.numAnterior=3
            this.creadorDosBarriles(900)
            this.creadorDosBarriles(300)
        }
        
          

        
    }

    creadorDosBarriles (BarrilX) {
        this.Enemigo= new Enemigos(this,BarrilX,200,"GoblinEnemigo",100)
        this.GrupoEnemigos.add(this.Enemigo);

    }
   
 
    CreadorDeBalas() {
        this.Jugador.anims.play("disparar");

        if(this.tipoDisparo=="flechaComun") {
            this.Bala= new FlechaComun(this,this.Jugador.x-10,this.Jugador.y-60,"flecha",100)
            this.Grupobalas.add(this.Bala)
        }
        else if(this.tipoDisparo=="flechaCongelante"){
        this.FlechaCongelante=new FlechaCongelante (this,this.Jugador.x-10,this.Jugador.y-60,"flecha",100)
        this.Grupobalas.add(this.FlechaCongelante)
        }
        
        

        
    }

    destruyeBala(bala,enemigo){       
        bala.destroy();        
    }

    destruyeBarril(barril){ 
        barril.TextoVida.destroy()     
        barril.animacionAtaque(barril)
        this.vidaCastillo.restaVidaCasa(this.vidaCastillo)       
    }


    restaVidaEnemigo(bala,enemigo){

        bala.destroy();
        let tipoBuf=enemigo. EnemigoRecibeAtaque(this.Jugador.PoderDeAtaque,enemigo,bala)
        this.Jugador.buffsJugador(tipoBuf,this.Jugador,this.tempDisp)
        
        
        
    }
    acomodaEnemigos (enemigo1,enemigo2) {
        
    }
}