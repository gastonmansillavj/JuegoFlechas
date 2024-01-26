
export default class BarraExp extends Phaser.GameObjects.Sprite{
    
    constructor (scene,x,y,imagen) {
        super (scene,x,y,imagen)
        this.scene=scene
        this.x=x
        this.y=y
        this.imagen=imagen
        this.expParaSubir=100
        this.setOrigin(0)
        this.setDepth(5)
        this.DimensionMaxBarra=800
        this.DimensionIniBarra=0
        this.DimensionActual=this.DimensionIniBarra
        this.nivel="0"
        
        this.setScale(this.DimensionIniBarra/100,1)
        
        // this.TextoVidaCasa = scene.add.text(this.x+this.width/2-50, this.y, this.vida, {strokeThickness:2,fontFamily:"Open sans",fontSize: '40px', fill: '#000000' })
        //this.TextoVidaCasa.setDepth(15)
        this.scene.add.existing(this)
        this.texto = scene.add.text(this.x, this.y, this.nivel, {strokeThickness:2,fontFamily:"Open sans",fontSize: '40px', fill: '#000000' });
        this.texto.setDepth(5)
        /*



        120 => 100
        60=> ? 60*100/120

        1000=50
        500=

        1000= experienciaTotal
        50= tamañoBarra
        500= experienciaConsegida

        

        
        */
     
    }

   ActualizaExperiencia(exp,barraExp,jugador,powerUp){

    if (exp) {
        barraExp.DimensionActual+=((exp*barraExp.DimensionMaxBarra)/barraExp.expParaSubir)/100
        if (barraExp.DimensionActual>=barraExp.DimensionMaxBarra/100) {
            barraExp.DimensionActual=0
            barraExp.expParaSubir*=2
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