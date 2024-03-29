import ClasePrincipal from "./clasePrincipal.js"

export default class VidaCasa extends ClasePrincipal{
    
    constructor (scene,x,y,texture,vida) {
        super (scene,x,y,texture)
        this.scene=scene
        this.x=x
        this.y=y
        this.texture=texture
        this.vida=vida    // solo cambiar la vida
        this.vidaMax=this.vida
        this.dimensionMax=90
        this.DimensionIniBarra=90
        this.DimensionActual=this.DimensionIniBarra
        this.setOrigin(0,0)
        this.setScale(this.DimensionActual/100,1)
       // this.setScale(this.vida/100,1)  
        this.TextoVidaCasa = scene.add.text(this.x+this.width/2-50, this.y, this.vida, {strokeThickness:6,fontFamily:"Open sans",fontSize: '40px', fill: '#000000' })
        this.TextoVidaCasa.setDepth(15)
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
     
     
    }

   restaVidaCasa(casa){
    let danio=10
    this.vida-=danio  

   this.DimensionActual=((this.vida*this.dimensionMax)/this.vidaMax)
  
      
    if (this.vida>0) {
    
        casa.setScale(this.DimensionActual/100,1)
        casa.TextoVidaCasa.setText(this.vida)
        
      

    }
    else{
        casa.setScale(0,1)
        casa.TextoVidaCasa.setText(0)

    }



}
    

}