
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
            nivFlechaCongelante:1
        }
        this.guardarEnLocalStorage(datos.nombre,datos)

    }

    traeCantidadOro(usuario) {
        
        return this.recuperarDeLocalStorage(usuario).cantidadDeOro
    }

    sumaMonedas (usuario,cantidad) {

        let ObjetoUsuario= this.recuperarDeLocalStorage(usuario)
        let sumaMonedas=cantidad+ObjetoUsuario.cantidadDeOro
       
        ObjetoUsuario.cantidadDeOro=sumaMonedas
        console.log(ObjetoUsuario)
        this.guardarEnLocalStorage(usuario,ObjetoUsuario)


    }

    RestaMonedas (usuario,cantidad) {

        let ObjetoUsuario= this.recuperarDeLocalStorage(usuario)
        let sumaMonedas=ObjetoUsuario.cantidadDeOro-cantidad
       
        ObjetoUsuario.cantidadDeOro=sumaMonedas
        console.log(ObjetoUsuario)
        this.guardarEnLocalStorage(usuario,ObjetoUsuario)


    }



    

    

}