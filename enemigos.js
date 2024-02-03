import EfectosColisionesFlechas from "./EfectosColisionesFlechas.js"
import ClasePrincipal from "./clasePrincipal.js"

export default class Enemigos extends ClasePrincipal {
    
    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida
        this.velocidad=30
        this.setVelocityY(this.velocidad)
        this.setScale(5)
        this.TextoVida = scene.add.text(this.x, this.y, vida, {strokeThickness:2,fontFamily:"Open sans",fontSize: '40px', fill: '#000000' });
        this.TextoVida.setDepth(1)
        this.TextoVida.setOrigin(0.5)
        this.setBodySize(18,25)
        this.congelado= false
        this.estaVivo=true
        this.expEnemigo=200;
        this.estado="normal"
        this.enColisionRayo=false
        
       
        this.buffDeAtaque="nada"
        this.TipoBuff=Phaser.Math.Between(1,2)
        
        if(this.TipoBuff==1) {
            this.buffDeAtaque="poderAumentado"
        }
        else if (this.TipoBuff==2) {
            this.buffDeAtaque="velAtaque"
        }
        else{
            this.buffDeAtaque="nada"
        }
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)

        this.configurarAnimaciones()  
        this.anims.play("caminar");
    }

    configurarAnimaciones() {
        this.scene.anims.create({
            key: 'caminar',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'muere',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 6, end: 11 }),
            frameRate: 10,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'ataque',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 12, end: 17 }),
            frameRate: 15,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'recibeAtaque',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 6, end: 7 }),
            frameRate: 10,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'congelado',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 6, end: 6 }),
            frameRate: 100,
            repeat: -1
        })
    
    };

    actualizaPosicion(){

        this.TextoVida.x=this.x
        this.TextoVida.y=this.y-70
        console.log("entro")
        this.scene.Grupobalas.children.iterate(function (child) {
           
            
         });
        
    }

    EnemigoRecibeAtaque(poderDeAtaque,enemigo,flecha) {

        enemigo.vida=enemigo.vida-poderDeAtaque

        if(enemigo.vida<=0) {
            enemigo.estado="muerto"
            return this.expEnemigo

        }

        else if (flecha.name =="FlechaComun" ) {

            if(enemigo.estado=="congelado") {

            }
            else {
                enemigo.estado="recibeAtaque"
            }    
              
                                        
                       
        }
        
        else if (flecha.name =="FlechaCongelante") {

            enemigo.estado="congelado"
            new EfectosColisionesFlechas (this.scene,this.x,this.y)

            setTimeout(()=>{            
                enemigo.estado="normal"
               
            },5000)          

        }
        
        enemigo.TextoVida.setText(enemigo.vida)
        
    }


//////////////////////////////////////////////////


    estadosEnemigo (enemigo) {
 


        if (enemigo.estado == "muerto"){
            enemigo.body.enable=false;        
            enemigo.clearTint()
            enemigo.TextoVida.destroy() 

            if(enemigo.anims.currentAnim.key!="muere") {
                enemigo.anims.play("muere");
                
                
            }
            
            enemigo.on("animationcomplete",()=>{ 
                this.destruyePersonaje(enemigo)
                
                
            },this)  
            
       
        }
        
        else if(enemigo.estado=="normal"){
            
            if(enemigo.anims.currentAnim.key!="caminar" ) {
                
                enemigo.anims.play("caminar")
                

                
            }
            
            enemigo.setVelocityY(enemigo.velocidad)
            enemigo.clearTint() 
           

        }

        else if(enemigo.estado=="congelado") {
            
            enemigo.setVelocity(0)
            enemigo.setTint(0x3498db);          
            
            
           
            if(enemigo.anims.currentAnim.key!="congelado") {
                
                enemigo.anims.play("congelado");
                
            }
           
            

        }
       else if ( enemigo.estado=="recibeAtaque") {
            
        enemigo.setVelocity(0)
        enemigo.anims.play("recibeAtaque");      
       

        if(enemigo.anims.currentAnim.key=="recibeAtaque" && enemigo.anims.currentFrame.index==1) {
            enemigo.estado="normal"
            
        }
            
            
                              
            


        }

    }

    
    animacionAtaque(enemigo) {
        enemigo.estado="ataque"
        enemigo.anims.play("ataque");
        enemigo.body.enable=false;
        enemigo.on("animationcomplete",()=>{this.destruyePersonaje(enemigo)},this)
    }

    destruyePersonaje(enemigo) {
        enemigo.destroy()
        
    }

    

   
    

}