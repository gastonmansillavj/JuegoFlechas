import ClasePrincipal from "./clasePrincipal.js"

export default class Enemigos extends ClasePrincipal {
    
    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida
        this.setVelocityY(70)
        this.setScale(5)
        this.TextoVida = scene.add.text(this.x, this.y, vida, {strokeThickness:2,fontFamily:"Open sans",fontSize: '40px', fill: '#000000' });
        this.TextoVida.setDepth(1)
        this.TextoVida.setOrigin(0.5)
        this.setBodySize(18,25)
        this.congelado= false
        this.estaVivo=true
        this.estado="normal"
       
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
            key: 'reciveAtaque',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 6, end: 7 }),
            frameRate: 5,
            repeat: 0
        })
    
    };

    actualizaPosicion(){
        this.TextoVida.x=this.x
        this.TextoVida.y=this.y-70
        
    }

    actualizaVida(poderDeAtaque,enemigo,flecha) {
        enemigo.vida=enemigo.vida-poderDeAtaque 
        
        //console.log(enemigo.vida)
        if(enemigo.vida<=0){
            
            enemigo.estado="muerto"
            this.estadosEnemigo(enemigo)
          
            return this.buffDeAtaque
            
        }
        else{

            if (flecha.name =="FlechaComun"& enemigo.estado!="muerto") {

                    if(enemigo.estado=="normal") {
                        this.estadosEnemigo(enemigo)                       
                    }
                    else {                       
                        enemigo.TextoVida.setText(enemigo.vida)
                    }
                                   
            }
            else if (flecha.name =="FlechaCongelante") {

                enemigo.estado="congelado"
                this.estadosEnemigo(enemigo)

            }
            
                     
        }
               
    }



    estadosEnemigo (enemigo) {

        console.log(enemigo.estado)

        if (enemigo.estado=="muerto"){
            enemigo.body.enable=false;        
            enemigo.clearTint() 
            enemigo.TextoVida.setText(enemigo.vida)        
            enemigo.anims.play("muere");
            enemigo.on("animationcomplete",()=>{this.destruyePersonaje(enemigo)},this)
        }

        else if(enemigo.estado=="normal"){
            enemigo.TextoVida.setText(enemigo.vida)
            enemigo.estado="recibeAtaque"
            enemigo.anims.play("reciveAtaque");
            enemigo.setVelocity(0)
            enemigo.on("animationcomplete",()=>{
                enemigo.estado="normal"             
                enemigo.anims.play("caminar")
                enemigo.setVelocityY(70)              
            },this)

        }

        else if(enemigo.estado=="congelado") {
            
            enemigo.TextoVida.setText(this.vida)
            enemigo.setVelocity(0)
            enemigo.setTint(0x3498db);
            //enemigo.estado="recibeAtaque"
            enemigo.anims.stop(enemigo.anims.currentAnim); 
            setTimeout(()=>{this.descongela(enemigo)},10000)
            

        }
    }

    
    animacionAtaque(enemigo) {
        enemigo.estado="ataque"
        enemigo.anims.play("ataque");
        enemigo.body.enable=false;
        enemigo.on("animationcomplete",()=>{this.destruyePersonaje(enemigo)},this)
    }

    destruyePersonaje(enemigo) {
        enemigo.TextoVida.destroy() 
        enemigo.destroy()
        
    }

    descongela(enemigo){

        if (enemigo.anims?.play("caminar")===undefined) {
               
        }
        else {
        enemigo.estado="normal"
        enemigo.anims.play("caminar")
        enemigo.setVelocityY(70)
        enemigo.clearTint()
        }
        
    }

   
    

}