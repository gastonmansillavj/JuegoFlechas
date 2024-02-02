

export default class Reloj {
    
    constructor (scene,x,y) {
        
        this.scene=scene
        this.x=x
        this.y=y
        this.segundos=0
        this.minutos=0
        this.Reloj = scene.add.text(this.x,this.y,this.minutos+":"+this.segundos,{strokeThickness:7,fontFamily:"Open sans",fontSize: '50px', fill: '#000000' })
        this.Reloj.setDepth(18)  
        this.scene.add.existing(this)
       
            this.tempReloj=this.scene.time.addEvent({
                delay: 1000, // milisegundos
                callback:this.actualizaReloj,
                callbackScope: this,
                loop: true,
                name:"Reloj"
       
            })
            this.scene.grupoTemp.push(this.tempReloj)
        
     
    }

    actualizaReloj () {
        
        this.segundos+=1
        if(this.segundos>=60) {
            this.segundos=0
            this.minutos+=1
        }
        this.Reloj.setText(this.minutos+":"+this.segundos)
    }
        
        

    




    

}