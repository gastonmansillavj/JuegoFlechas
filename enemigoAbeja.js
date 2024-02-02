import EfectosColisionesFlechas from "./EfectosColisionesFlechas.js"
import ClasePrincipal from "./clasePrincipal.js"
import Cristal from "./Cristal.js"

export default class enemigoAbeja extends ClasePrincipal {
    
    constructor (scene,x,y,texture) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=20
        this.lobo=this
        this.velocidad=100
        this.setVelocityY(this.velocidad)
        this.setScale(2.8)
        this.TextoVida = scene.add.text(this.x, this.y, this.vida, {strokeThickness:2,fontFamily:"Open sans",fontSize: '40px', fill: '#000000' });
        this.TextoVida.setDepth(1)
        this.TextoVida.setOrigin(0.5)
        this.setBodySize(18,25)
        this.setOffset(16,19)
        this.congelado= false
        this.estaVivo=true
        this.expEnemigo=50;
        this.estado="normal"
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)

        this.configurarAnimaciones()  
        this.anims.play("caminarAbeja");
    }

    configurarAnimaciones() {
        this.scene.anims.create({
            key: 'caminarAbeja',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 6, end: 11 }),
            frameRate: 5,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'muereAbeja',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end:5 }),
            frameRate: 10,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'ataqueAbeja',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 12, end: 17 }),
            frameRate: 15,
            repeat: 0
        })

        

        this.scene.anims.create({
            key: 'congelaAbeja',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 6, end: 6 }),
            frameRate: 100,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'recibeAtaqueAbeja',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 8, end: 9}),
            frameRate: 5,
            repeat: 0
        })

        
        
    
    };

    actualizaPosicion(){

        this.TextoVida.x=this.x
        this.TextoVida.y=this.y-70
       
        
    }

    EnemigoRecibeAtaque(poderDeAtaque,enemigo,flecha) {

        enemigo.vida=enemigo.vida-poderDeAtaque

        if(enemigo.vida<=0 ) {
           
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
    
                if(enemigo.anims.currentAnim.key!="muereAbeja") {
                    enemigo.anims.play("muereAbeja");
                    this.creaCristal(this.x-20,this.y)
                    this.creaCristal(this.x+20,this.y)
                    
                    
                }
                
                enemigo.on("animationcomplete",()=>{ 
                    this.destruyePersonaje(enemigo)
                    
                    
                },this)  

        
           
            
       
        }
        
        else if(enemigo.estado=="normal"){
            
            if(enemigo.anims.currentAnim.key!="caminarAbeja" ) {
                
                enemigo.anims.play("caminarAbeja")
                

                
            }
            
            enemigo.setVelocityY(enemigo.velocidad)
            enemigo.clearTint() 
           

        }

        else if(enemigo.estado=="congelado") {
            
            enemigo.setVelocity(0)
            enemigo.setTint(0x3498db);          
            
            
           
            if(enemigo.anims.currentAnim.key!="congelaAbeja") {
                
                enemigo.anims.play("congelaAbeja");
                
            }
           
            

        }
       else if ( enemigo.estado=="recibeAtaque") {
            
        enemigo.setVelocity(0)

        if(enemigo.anims.currentAnim.key!="recibeAtaqueAbeja") {
                
            enemigo.anims.play("recibeAtaqueAbeja"); 
        
        }  
            
       
        if(enemigo.anims.currentAnim.key=="recibeAtaqueAbeja" && enemigo.anims.currentFrame.index==1) {
           
            enemigo.estado="normal"
            
        }
            

        }

       

        

    }

    
    animacionAtaque(enemigo) {
        enemigo.estado="ataque"
        enemigo.anims.play("ataqueAbeja");
        enemigo.body.enable=false;
        enemigo.on("animationcomplete",()=>{this.destruyePersonaje(enemigo)},this)
    }

    destruyePersonaje(enemigo) {
        enemigo.destroy()
        
    }

    creaCristal (x,y) {
        new Cristal(this.scene,x,y,"cristalExp")
    }

    

   
    

}