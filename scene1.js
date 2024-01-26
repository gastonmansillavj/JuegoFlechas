import ClasePrincipal from "./clasePrincipal.js";
import Enemigos from "./enemigos.js";
import Jugador from "./Jugador.js";
import FlechaComun from "./FlechaComun.js"
import VidaCasa from "./VidaCasa.js";
import EstructuraTorre from "./EstructuraTorre.js";
import FlechaCongelante from "./FlechaCongelante.js";
import BotonUi from "./BotonUi.js";
import UiFinNivel from "./UiFinNivel.js";
import BarraExp from "./BarraExp.js";
import UiPowerUps from "./UiPowerUps.js";
import EfectosColisionesFlechas from "./EfectosColisionesFlechas.js";
import enemigoSlime from "./enemigoSlime.js";
import enemigoLobos from "./enemigoLobos.js";
import enemigoAbeja from "./enemigoAbeja.js";
import UiMensajes from "./UiMensajes.js";
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
        this.load.image("Boton","assets/boton.png");
        this.load.image("fondoUi","assets/fondoUi.png")
        this.load.spritesheet("flechaDeHielo","assets/flechaCongelante.png",{frameWidth:64,frameHeight:193});
        this.load.spritesheet("explosionHielo","assets/explosionHielo.png",{frameWidth:256,frameHeight:256});
        this.load.spritesheet("slimeEnemigo","assets/slimeEnemigo.png",{frameWidth:48,frameHeight:48});
        this.load.spritesheet("loboEnemigo","assets/loboEnemigo.png",{frameWidth:48,frameHeight:48});
        this.load.spritesheet("abejaEnemigo","assets/abejaEnemigo.png",{frameWidth:48,frameHeight:48});

    }   
    create () {
      


///fondo
        var fondo=this.add.image(520,940,"fondo");
        fondo.setScale(3);

this.grupoTemp = []

        /// crea temporizadores Goblin
setTimeout(() =>{

    this.creaTemporizadores(this.tempEnemigos,30000,this.CreadorDeBarriles,this)
    
 },100000)

/// crea temporizadores Slime
setTimeout(() =>{

    this.creaTemporizadores(this.tempEnemigosSlime,4000,this.creadorEnemigosSlimes,this)

 },1000)



/// crea temporizadores Abeja 
setTimeout(() =>{

    this.creaTemporizadores(this.tempEnemigosAbejas,20000,this.creadorEnemigosAbejas,this)

 },180000)


/// crea temporizadores Lobo 
setTimeout(() =>{

    this.creaTemporizadores(this.tempEnemigosLobos,13000,this.creadorEnemigosLobos,this)
    

 },50000)


 /// creaJefeFinal

 setTimeout(() =>{

    this.SlimeEnemigo= new enemigoSlime(this,500,200,"slimeEnemigo",500)
    .setScale(10)
    this.SlimeEnemigo.velocidad=20
    this.SlimeEnemigo.setTint(0xFF0000)
    this.expEnemigo=500;
    this.GrupoEnemigos.add(this.SlimeEnemigo);

 },320000)

    // pausa juego 

    this.juegoPausado=true;

 // temporizador oleadas /////
     this.nivelTerminado=false
    setTimeout(()=>{this.terminaNivel(this)},10000000)        

    // limites de Balas y  barriles
    this.grupoLimites=this.add.group()
    this.limitesup=this.physics.add.sprite(500,-20,"Cubo").setScale(25,1);
    this.limiteinf=this.physics.add.sprite(500,1500,"Cubo").setScale(25,1);


// jugador principal
    this.Jugador= new Jugador(this,500,1650,"arquero",100)

  

    ///flechas congelantes 
    
    this.EstadoFlechaCongelante=false
    this.cantFlechasCongelantes=1
    this.contadorFlechas=0;
    this.TiempoSpawnFlechaCongelante=8

    //cantidad de flechas comunes 
    
    this.cantidadFlechasComunes = 1

    // velocidad de disparo 
    this.velocidadDisparo=400
    // temprizador de balas 
    this.tempDisp = this.time.addEvent({
        delay: this.velocidadDisparo, // milisegundos
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


    
    // aleatoriedad barriles 
        this.AleatorioBarril=1
        this.numAnterior=1;

    // vida De La casa
    this.add.image(300,90,"FondoBarraVida");
    this.add.image(115,90,"torreBarraVida").setScale(0.4);
    this.vidaCastillo= new VidaCasa(this,180,69,"barraVida",90).setDepth(10)

    // experiencia 

    this.barraExperiencia = new BarraExp(this,600,65,"Cubo")


    // estructuraTorre 

    this.EstructuraTorre= new EstructuraTorre (this,100,1600,"EstructuraTorre",1000)
    this.EstructuraTorre2= new EstructuraTorre (this,980,1600,"EstructuraTorre",1000)

    // botonPowerUp
    this.tipoDisparo="flechaComun"
    

    // menu termia nivel
    this.MenuSiguienteNivel = new UiFinNivel (this,550,900,"fondoUi","Nivel Terminado",1.8,2,"Boton")
    this.MenuSiguienteNivel.ocultatodos(this.MenuSiguienteNivel,false)  
    
    
    // menu powerUps
    this.menuPowerUps= new UiPowerUps(this,550,900,"fondoUi","Elige una mejora",1.8,2,"Boton",this.Jugador)
    this.menuPowerUps.ocultatodos(this.menuPowerUps,false)
    //this.menuPowerUps.creaPowerUps(this.menuPowerUps)
    

    // pausa Escena 
    
    
    this.physics.add.overlap(this.Grupobalas,this.GrupoEnemigos,this.restaVidaEnemigo,null,this);
    this.physics.add.overlap(this.Grupobalas,this.limitesup,this.destruyeBala,null,this);
    this.physics.add.overlap(this.GrupoEnemigos,this.limiteinf,this.destruyeBarril,null,this);
   

    // mensaje mover jugador

    this.MensajeMueveAlJugador = new UiMensajes(this,500,500,"fondoUi"," Desliza el jugador\n con el dedo o \n con el mouse, el \ndisparo es \nautomatico",1,1,"Boton")

    /// enemigos pruebas 

    //this.abejaEnemigo= new enemigoAbeja(this,Phaser.Math.Between(280,800),200,"abejaEnemigo",50)
    //this.GrupoEnemigos.add(this.abejaEnemigo)


    //this.LoboEnemigo= new enemigoLobos(this,Phaser.Math.Between(280,800),200,"loboEnemigo",50)
    //this.GrupoEnemigos.add(this.LoboEnemigo);

    //this.SlimeEnemigo= new enemigoSlime(this,500,200,"slimeEnemigo",50)
    //this.GrupoEnemigos.add(this.SlimeEnemigo);
    
    //  this.creadorEnemigosSlimes (700)
    //this.Enemigo= new Enemigos(this,500,200,"GoblinEnemigo",100)
    //this.GrupoEnemigos.add(this.Enemigo);
    
    }
    update () {

        if (this.vidaCastillo.vida<=0) {
            this.juegoPausado=true
            this.MenuSiguienteNivel.muestraReiniciar(this.MenuSiguienteNivel,true)

        }

       
       
       
        if (this.juegoPausado==true) {

            this.GrupoEnemigos.children.iterate(function (child) {
                child.setVelocity(0)
             });


             this.grupoTemp.forEach(function(elemento) {
                elemento.paused=true
            });
             
             
            this.tempDisp.paused=true         

        }
        else {
            
            this.grupoTemp.forEach(function(elemento) {
                console.log(elemento.paused=false);
            });

            this.tempDisp.paused=false
         


        if(this.Jugador.x<260) {
            this.Jugador.x=260
        }
        else if(this.Jugador.x>830) {
            this.Jugador.x=830
        }
        if (this.nivelTerminado==true) {
            this.tempEnemigos.remove()
            if (this.GrupoEnemigos.countActive()<=0) {
                this.MenuSiguienteNivel.muestraSiguiente(this.MenuSiguienteNivel,true)
                //this.scene.pause()


            }
            
            //this.scene.pause()
           // setTimeout (()=>{this.scene.resume()
           // this.nivelTerminado=false
           // },5000)

           
            
        }
        else {
            
        
 
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            //gameObject.y = dragY;
        });
       /*     
        if (this.cursors.left.isDown ) {
            this.Jugador.movimientoJugadorI()
        }
        else if (this.cursors.right.isDown ) {
            this.Jugador.movimientoJugadorD()
           
           
        }
        else {
            this.Jugador.sinMovimiento()
        }
        // if FinJuego*/
    }

        this.GrupoEnemigos.children.iterate(function(child){
           child.actualizaPosicion()
           if (child.body.enable==false) {
                setTimeout(()=>{ child.destroy ()},1200)
           }
        });

        this.GrupoEnemigos.children.iterate(function (child) {
            child.estadosEnemigo (child)
            
            
         });


         //else if pause 
        }
        

        

       
       
    }

    CreadorDeBarriles() {
        
        
        while (this.numAnterior==this.AleatorioBarril) {
            this.AleatorioBarril=Phaser.Math.Between(1,3);
        }

        if (this.AleatorioBarril==1) {
            this.numAnterior=1;
            this.creadorDosBarriles(Phaser.Math.Between(230,350))
            this.creadorDosBarriles(Phaser.Math.Between(650,830))

        }
        else if(this.AleatorioBarril==2) {
            this.numAnterior=2
            this.creadorDosBarriles(Phaser.Math.Between(350,500))
            this.creadorDosBarriles(Phaser.Math.Between(650,830))
        }
        else {
            this.numAnterior=3
            this.creadorDosBarriles(Phaser.Math.Between(500,650))
            this.creadorDosBarriles(Phaser.Math.Between(230,350))
        }

        
        
          

        
    }

    creadorDosBarriles (BarrilX) {
        
        this.Enemigo= new Enemigos(this,BarrilX,200,"GoblinEnemigo",200)
        this.GrupoEnemigos.add(this.Enemigo);

        console.log("goblin")

    }

    creadorEnemigosSlimes () {
        this.SlimeEnemigo= new enemigoSlime(this,Phaser.Math.Between(280,800),200,"slimeEnemigo",10)
        this.GrupoEnemigos.add(this.SlimeEnemigo);
        

    }

    creadorEnemigosLobos () {
        this.LoboEnemigo= new enemigoLobos(this,Phaser.Math.Between(280,800),200,"loboEnemigo",50)
        this.GrupoEnemigos.add(this.LoboEnemigo);
        

    }

    creadorEnemigosAbejas() {
        let PosAbejasX= Phaser.Math.Between(300,600)
        let PosAbejasY=200
        let contCambioX=0

        this.abejaEnemigo= new enemigoAbeja(this,PosAbejasX,PosAbejasY,"abejaEnemigo",30)
        this.GrupoEnemigos.add(this.abejaEnemigo)
        PosAbejasY-=60
        PosAbejasX-=30
        for (let i = 0; i <2; i++) { 
                       
            this.abejaEnemigo= new enemigoAbeja(this,PosAbejasX,PosAbejasY,"abejaEnemigo",20)
            this.GrupoEnemigos.add(this.abejaEnemigo)
            PosAbejasX+=60

           
        }
        PosAbejasY-=60
        PosAbejasX-=180
        for (let i = 0; i <4; i++) { 
                       
            this.abejaEnemigo= new enemigoAbeja(this,PosAbejasX,PosAbejasY,"abejaEnemigo",20)
            this.GrupoEnemigos.add(this.abejaEnemigo)
            PosAbejasX+=60
           
        }

    }
   
 
    CreadorDeBalas() {
        this.Jugador.anims.play("disparar");
        this.SpawnFlechas()
     
      
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
        let exp=enemigo.EnemigoRecibeAtaque(this.Jugador.PoderDeAtaque,enemigo,bala)
        
        this.barraExperiencia.ActualizaExperiencia(exp,this.barraExperiencia,this.Jugador,this.menuPowerUps)
        
        
        
    }
    

    terminaNivel (escena) {
        
        escena.nivelTerminado=true
        console.log(this.nivelTerminado)
        
    }

    SpawnFlechas() {

        this.contadorFlechas+=1

        if (this.EstadoFlechaCongelante && this.contadorFlechas>=this.TiempoSpawnFlechaCongelante) {
            
            let posFlechas=this.Jugador.x-(50*(this.cantFlechasCongelantes-1))

            for (let i = 0; i <this.cantFlechasCongelantes; i++) {

                this.creaYGuardaFlechas("flechaCongelante",posFlechas+i*100)
            
            }
        
            this.contadorFlechas=0


        }
        else {
            let posFlechas=this.Jugador.x-(25*(this.cantidadFlechasComunes-1))

            for (let i = 0; i <this.cantidadFlechasComunes; i++) {

                this.creaYGuardaFlechas("comun",posFlechas+i*50)
            
            }
         
           
        }


    }

    creaYGuardaFlechas(tipo,xFlechas) {
        if(tipo=="flechaCongelante") {
        this.FlechaCongelante=new FlechaCongelante (this,xFlechas,this.Jugador.y-60,"flechaDeHielo",100)
        this.Grupobalas.add(this.FlechaCongelante)

        }
        else {
            this.Bala= new FlechaComun(this,xFlechas,this.Jugador.y-60,"flecha",100)
            this.Grupobalas.add(this.Bala)
           
        }
        
    }


    creaTemporizadores (nombreEnemigos,tiempo,metodo,escena) {
        //  temporizador creador de EnemigosLobos
    nombreEnemigos=this.time.addEvent({
    delay: tiempo, // milisegundos
    callback:metodo,
    callbackScope: this,
    loop: true })

    this.grupoTemp.push(nombreEnemigos)
    console.log(this.grupoTemp.length)
    
    
    
    

    }
}