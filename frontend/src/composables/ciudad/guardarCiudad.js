import axios from 'axios'
import {ref} from 'vue'

export function guardarCiudad () {

  const error = ref(null)
  const cargando = ref(false)

  async function guardarCiudadApi(url,body){
  try{

    cargando.value=true
    const res = await axios.post(url,body)
    return res.data

  }catch (error){

    console.error(`Error al guardar ciudad nueva: ${error.message}`)
  }finally {
      cargando.value = false
    }

}
return{
  error,
  cargando,
  guardarCiudadApi
}
}
