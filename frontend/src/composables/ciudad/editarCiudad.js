import axios from 'axios'
import { ref } from 'vue'

 export const editarCiudad= ()=>{


   const error = ref(null)
   const cargando = ref(false)

    async function editarCiudadApi(url,id,body){
    try {
      cargando.value = true
      error.value = null

      const res = await axios.put(`${url}/${id}`, body)
      return res.data
    } catch (err) {
      console.error(`Error al editar la ciudad: ${err.message}`)
    }finally {
      cargando.value = false
    }

  }
  return{
    error,
    cargando,
    editarCiudadApi
    }
}
