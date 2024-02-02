
export default class BarraExp extends Phaser.GameObjects.Sprite{
    
    constructor (scene,x,y,imagen) {
        super (scene,x,y,imagen)
        this.scene=scene
        this.x=x
        this.y=y
        this.imagen=imagen
        this.expParaSubir=80
        this.setOrigin(1,0)
        this.setDepth(5)
        this.DimensionMaxBarra=90
        this.DimensionIniBarra=0
        this.DimensionActual=this.DimensionIniBarra
        this.nivel="0"
        this.setFlipX(true)
       
        this.setScale(this.DimensionIniBarra/100,1)
        
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.texto = scene.add.text(this.x+50, this.y-8, this.nivel, {strokeThickness:7,fontFamily:"Open sans",fontSize: '50px', fill: '#000000' });
        this.texto.setDepth(5)
  
     
    }

   ActualizaExperiencia(exp,barraExp,jugador,powerUp){

    if (exp) {
        barraExp.DimensionActual+=((exp*barraExp.DimensionMaxBarra)/barraExp.expParaSubir)/100
        if (barraExp.DimensionActual>=barraExp.DimensionMaxBarra/100) {
            barraExp.DimensionActual=0
            barraExp.expParaSubir*=1.5
            this.nivel=jugador.nivel+=1
            barraExp.texto.setText(this.nivel)
            
            if(this.scene.juegoPausado==false) {
            this.scene.juegoPausado=true
            powerUp.creaPowerUps(powerUp)
            
            
            }
            
           
        }
        
        this.setScale(this.DimensionActual,1)
        
    
    }
   
    }

    

}