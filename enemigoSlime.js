import Cristal from "./Cristal.js"
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
        this.velocidad=50
        this.setVelocityY(this.velocidad)
        this.setScale(5)
        this.TextoVida = scene.add.text(this.x, this.y, vida, {strokeThickness:2,fontFamily:"Open sans",fontSize: '40px', fill: '#000000' });
        this.TextoVida.setDepth(1)
        this.TextoVida.setOrigin(0.5)
        this.setBodySize(18,25)
        this.congelado= false
        this.estaVivo=true
        this.expEnemigo=10;
        this.estado="normal"
        this.dividido=false
        this.name="enemigoSlime"
        // cuchillo
        this.enColisionRayo=false
        //
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)

        this.configurarAnimaciones()  
        this.anims.play("caminarS");
    }

    configurarAnimaciones() {
        this.scene.anims.create({
            key: 'caminarS',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 12, end: 17 }),
            frameRate: 5,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'muereS',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end:5 }),
            frameRate: 10,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'ataqueS',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 12, end: 17 }),
            frameRate: 15,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'divideS',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 6, end: 15 }),
            frameRate: 10,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'congeladoS',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 6, end: 6 }),
            frameRate: 100,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'recibeAtaqueS',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 13, end: 14 }),
            frameRate: 10,
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
            else if (enemigo.dividido==false) {
            
                
        
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
           
           

            if(enemigo.dividido==false) {
                
                enemigo.body.enable=false;        
                enemigo.clearTint()
                enemigo.TextoVida.destroy()                         
                if(enemigo.anims.currentAnim.key!="divideS") {
                    enemigo.anims.play("divideS");
                    
                    this.creaCristal()
                    
                }
               
                    if(enemigo.anims.currentAnim.key=="divideS" && enemigo.anims.currentFrame.index==7) {
                        
                        
                        const SlimeEne=new enemigoSlime(this.scene,enemigo.x+50,enemigo.y,"slimeEnemigo",10)
                        SlimeEne.dividido=true
                        this.scene.GrupoEnemigos.add(SlimeEne)
                        const SlimeEne2=new enemigoSlime(this.scene,enemigo.x-50,enemigo.y,"slimeEnemigo",10)
                        SlimeEne2.dividido=true
                        this.scene.GrupoEnemigos.add(SlimeEne2)
                        enemigo.destroy() 

                        
                    }
            
               
            }
            else {
                enemigo.body.enable=false;        
                enemigo.clearTint()
                enemigo.TextoVida.destroy() 
    
                if(enemigo.anims.currentAnim.key!="muereS") {
                    enemigo.anims.play("muereS");
                    this.creaCristal()
                    
                }
                
                enemigo.on("animationcomplete",()=>{ 
                   
                   
                    
                    this.destruyePersonaje(enemigo)
                    
                    
                },this)  

            }
           
            
       
        }
        
        else if(enemigo.estado=="normal"){
            
            if(enemigo.anims.currentAnim.key!="caminarS" ) {
                
                enemigo.anims.play("caminarS")
                

                
            }
            
            enemigo.setVelocityY(enemigo.velocidad)
            enemigo.clearTint() 
           

        }

        else if(enemigo.estado=="congelado") {
            
            enemigo.setVelocity(0)
            enemigo.setTint(0x3498db);          
            
            
           
            if(enemigo.anims.currentAnim.key!="congeladoS") {
                
                enemigo.anims.play("congeladoS");
                
            }
           
            

        }
       else if ( enemigo.estado=="recibeAtaque") {
            
        enemigo.setVelocity(0)
        enemigo.anims.play("recibeAtaqueS");      
       
        if(enemigo.anims.currentAnim.key=="recibeAtaqueS" && enemigo.anims.currentFrame.index==1) {
            enemigo.estado="normal"
            
        }
            

        }

        

    }

    
    animacionAtaque(enemigo) {
        enemigo.estado="ataque"
        enemigo.anims.play("ataqueS");
        enemigo.body.enable=false;
        enemigo.on("animationcomplete",()=>{this.destruyePersonaje(enemigo)},this)
    }

    destruyePersonaje(enemigo) {
        enemigo.destroy()
        
    }
    creaCristal () {
        new Cristal(this.scene,this.x,this.y,"cristalExp")
    }

    

   
    

}