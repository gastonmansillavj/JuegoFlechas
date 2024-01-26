import EfectosColisionesFlechas from "./EfectosColisionesFlechas.js"
import ClasePrincipal from "./clasePrincipal.js"

export default class enemigoSlime extends ClasePrincipal {
    
    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture,vida)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida
        this.lobo=this
        this.velocidad=70
        this.setVelocityY(this.velocidad)
        this.setScale(5)
        this.TextoVida = scene.add.text(this.x, this.y, vida, {strokeThickness:2,fontFamily:"Open sans",fontSize: '40px', fill: '#000000' });
        this.TextoVida.setDepth(1)
        this.TextoVida.setOrigin(0.5)
        this.setBodySize(18,25)
        this.setOffset(16,19)
        this.congelado= false
        this.estaVivo=true
        this.expEnemigo=100;
        this.estado="normal"
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)

        this.configurarAnimaciones()  
        this.anims.play("caminarLobo");
    }

    configurarAnimaciones() {
        this.scene.anims.create({
            key: 'caminarLobo',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 12, end: 17 }),
            frameRate: 5,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'muereLobo',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 6, end:11 }),
            frameRate: 10,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'ataqueLobo',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        })

        

        this.scene.anims.create({
            key: 'congeladoLobo',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 6, end: 6 }),
            frameRate: 100,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'RecibeAtaqueLobo',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 3, end: 4 }),
            frameRate: 5,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'esquivaLobo',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 18, end: 23 }),
            frameRate: 25,
            repeat: 0,
            
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
 
    
        console.log(this.estado)

        if (enemigo.estado == "muerto"){

            
                enemigo.body.enable=false;        
                enemigo.clearTint()
                enemigo.TextoVida.destroy() 
    
                if(enemigo.anims.currentAnim.key!="muereLobo") {
                    enemigo.anims.play("muereLobo");
                    
                    
                }
                
                enemigo.on("animationcomplete",()=>{ 
                    this.destruyePersonaje(enemigo)
                    
                    
                },this)  

        
           
            
       
        }
        
        else if(enemigo.estado=="normal"){
            
            if(enemigo.anims.currentAnim.key!="caminarLobo" ) {
                
                enemigo.anims.play("caminarLobo")
                

                
            }
            
            enemigo.setVelocityY(enemigo.velocidad)
            enemigo.clearTint() 
           

        }

        else if(enemigo.estado=="congelado") {
            
            enemigo.setVelocity(0)
            enemigo.setTint(0x3498db);          
            
            
           
            if(enemigo.anims.currentAnim.key!="congeladoLobo") {
                
                enemigo.anims.play("congeladoLobo");
                
            }
           
            

        }
       else if ( enemigo.estado=="recibeAtaque") {
            
        enemigo.setVelocity(0)

        if(enemigo.anims.currentAnim.key!="RecibeAtaqueLobo") {
                
            enemigo.anims.play("RecibeAtaqueLobo"); 
        
        }  
            
       
        if(enemigo.anims.currentAnim.key=="RecibeAtaqueLobo" && enemigo.anims.currentFrame.index==1) {
            enemigo.estado="esquiva"
            //enemigo.estado="normal"
            
        }
            

        }

        else if ( enemigo.estado=="esquiva") {
            
            

                if(enemigo.anims.currentAnim.key!="esquivaLobo") {
                    
                    enemigo.anims.play("esquivaLobo");
                    

                    if(enemigo.x>600) {
                        enemigo.setVelocityX(-1500)
                        enemigo.flipX=false
                    }
                    else if (enemigo.x<300) {
                        enemigo.setVelocityX(1500)
                    }
                    else {
                        if(Phaser.Math.Between(1,2)==1) {
                            enemigo.flipX=true
                        enemigo.setVelocityX(1500)
                        }
                        else {
                            enemigo.flipX=false
                            enemigo.setVelocityX(1500)
                        }
                        
                    }
                    
                
                
                }      
                         
           
                if(enemigo.anims.currentAnim.key=="esquivaLobo" && enemigo.anims.currentFrame.index>=5) {
                    enemigo.setVelocityX(0)
                    
                    enemigo.estado="normal"
                
                }
          
                
    
            }

        

    }

    
    animacionAtaque(enemigo) {
        enemigo.estado="ataque"
        enemigo.anims.play("ataqueLobo");
        enemigo.body.enable=false;
        enemigo.on("animationcomplete",()=>{this.destruyePersonaje(enemigo)},this)
    }

    destruyePersonaje(enemigo) {
        enemigo.destroy()
        
    }

    

   
    

}