import axios from 'axios'
import {ref} from 'vue'

export function guardarAtleta () {

  const error = ref(null)
  const cargando = ref(false)

  async function guardarAtletaApi(url,body){
  try{
    cargando.value=true
    const res = await axios.post(url,body)
    return res.data

  }catch (error){

    console.error(`Error al guardar atleta nuevo: ${error.message}`)
  }finally {
      cargando.value = false
    }

}
return{
  error,
  cargando,
  guardarAtletaApi
}
}
