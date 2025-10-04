import axios from 'axios'
import { ref } from 'vue'

 export const eliminarCiudad= ()=>{


   const error = ref(null)
   const cargando = ref(false)

    async function eliminarCiudadApi(url,id){
    try {
      cargando.value = true
      error.value = null

      const res = await axios.delete(`${url}/${id}`)
      return res.data
    } catch (err) {
      console.error(`Error al eliminar la ciudad: ${err.message}`)
    }finally {
      cargando.value = false
    }

  }
  return{
    error,
    cargando,
    eliminarCiudadApi
    }
}
