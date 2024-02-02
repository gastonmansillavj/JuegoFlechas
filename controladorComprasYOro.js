
export default class controladorOroYCompras {

    constructor (scene) {
        
        this.scene=scene     
     
    }

    guardarEnLocalStorage(clave, objeto) {
        const jsonString = JSON.stringify(objeto);
        localStorage.setItem(clave, jsonString);
    }

    // Método para recuperar una cadena JSON de localStorage y convertirla a un objeto
    recuperarDeLocalStorage(clave) {
        const jsonString = localStorage.getItem(clave);
        return JSON.parse(jsonString);
    }

    DatosJugadorIniciarSesion (nombre) {
        
        if (localStorage.getItem(nombre)!==null) {
            
            return true

        }

        else { 

            return false
        
        }
        
    }
    
    registrarse (nombre) {
        const datos = {
            nombre: nombre,
            nivelesDesbloqueados:1,
            poderesDesbloqueados:["flechaComun"],
            cantidadDeOro:0,
            nivFlechaComun:1,
            nivFlechaCongelante:1,
            poderAtaque:5,
            VelocidadAtaque:400,
            vidaCastillo:120

        }
        this.guardarEnLocalStorage(datos.nombre,datos)

    }

    traeCantidadOro(usuario) {
       
        return this.recuperarDeLocalStorage(usuario).cantidadDeOro
    }

    traePoderDeAtaque(usuario) {
       console.log(this.recuperarDeLocalStorage(usuario))
        return this.recuperarDeLocalStorage(usuario).poderAtaque
    }
    traeVelocidadDeAtaque(usuario) {
       
        return this.recuperarDeLocalStorage(usuario).VelocidadAtaque
    }
    traeVidaCastillo(usuario) {
       
        return this.recuperarDeLocalStorage(usuario).vidaCastillo
    }


    sumaMonedas (usuario,cantidad) {

        let ObjetoUsuario= this.recuperarDeLocalStorage(usuario)
       // console.log("cantidad"+cantidad)
        let sumaMonedas=cantidad+ObjetoUsuario.cantidadDeOro
       
        ObjetoUsuario.cantidadDeOro=sumaMonedas
        //console.log(ObjetoUsuario)
        this.guardarEnLocalStorage(usuario,ObjetoUsuario)


    }

    SubeAtaque (usuario) {

        let ObjetoUsuario= this.recuperarDeLocalStorage(usuario)
       // console.log("cantidad"+cantidad)
        let sumaAtaque=2+ObjetoUsuario.poderAtaque
       
        ObjetoUsuario.poderAtaque=sumaAtaque
        //console.log(ObjetoUsuario)
        this.guardarEnLocalStorage(usuario,ObjetoUsuario)
        this.RestaMonedas(usuario,30)


    }

    SubeVelocidadDeAtaque (usuario) {

        let ObjetoUsuario= this.recuperarDeLocalStorage(usuario)
       // console.log("cantidad"+cantidad)
        let sumaVAtaque=20+ObjetoUsuario.VelocidadAtaque
       
        ObjetoUsuario.VelocidadAtaque=sumaVAtaque
        //console.log(ObjetoUsuario)
        this.guardarEnLocalStorage(usuario,ObjetoUsuario)
        this.RestaMonedas(usuario,20)


    }

    SubeVidaTorre (usuario) {

        let ObjetoUsuario= this.recuperarDeLocalStorage(usuario)
       // console.log("cantidad"+cantidad)
        let sumaVida=20+ObjetoUsuario.vidaCastillo
       
        ObjetoUsuario.vidaCastillo=sumaVida
        //console.log(ObjetoUsuario)
        this.guardarEnLocalStorage(usuario,ObjetoUsuario)
        this.RestaMonedas(usuario,10)


    }

    RestaMonedas (usuario,cantidad) {

        let ObjetoUsuario= this.recuperarDeLocalStorage(usuario)
        let restaMonedas=ObjetoUsuario.cantidadDeOro-cantidad
       
        ObjetoUsuario.cantidadDeOro=restaMonedas
        console.log(ObjetoUsuario)
        this.guardarEnLocalStorage(usuario,ObjetoUsuario)


    }



    

    

}