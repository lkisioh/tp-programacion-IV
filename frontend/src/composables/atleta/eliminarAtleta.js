import axios from 'axios'
import { ref } from 'vue'

 export const eliminarAtleta= ()=>{


   const error = ref(null)
   const cargando = ref(false)

    async function eliminarAtletaApi(url,id){
    try {
      cargando.value = true
      error.value = null

      const res = await axios.delete(`${url}/${id}`)
      return res.data
    } catch (err) {
      console.error(`Error al eliminar atleta: ${err.message}`)
    }finally {
      cargando.value = false
    }

  }
  return{
    error,
    cargando,
    eliminarAtletaApi
    }
}
