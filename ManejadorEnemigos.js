
export default class ManejadorEnemigos {

    constructor (escena,temporizadoresEnemigos,reloj) {

        this.temporizadores=temporizadoresEnemigos
        this.escena=escena
        this.reloj=reloj

    }

    update () {
      
        const esteObjeto=this
        
       /// control slimes 
        if(this.reloj.minutos==0 && this.reloj.segundos==10) {
            if(this.temporizadores[0] && this.temporizadores[0].delay != 3000) {
               
                console.log(this.temporizadores[0].delay = 3000)
            }
        }
       else if(this.reloj.minutos==3 && this.reloj.segundos==0) {
            if(this.temporizadores[0] && this.temporizadores[0].delay != 2000) {
                
                console.log(this.temporizadores[0].delay = 2000)
            }
        }

       else if(this.reloj.minutos==6 && this.reloj.segundos==0) {
            if(this.temporizadores[0] && this.temporizadores[0].delay != 1000) {
                this.temporizadores[0].delay = 2000
                console.log(this.temporizadores[0].delay = 1000)
            }
        }
         
    }

}