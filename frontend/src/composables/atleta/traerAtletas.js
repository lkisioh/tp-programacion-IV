import axios from 'axios'
import {ref} from 'vue'

export const traerAtletas = ()=> {

  let atletas = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const llamarAtletasAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await axios.get(url)
    atletas.value= res.data
  }catch (error){
    console.error(`Error al buscar las atletas: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    atletas,
    error,
    cargando,
    llamarAtletasAPI
}
}
