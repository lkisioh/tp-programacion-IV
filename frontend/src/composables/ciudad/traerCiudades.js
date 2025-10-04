import axios from 'axios'
import {ref} from 'vue'

export const traerCiudades = ()=> {

  let ciudades = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const llamarCiudadesAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await axios.get(url)
    ciudades.value= res.data
  }catch (error){
    console.error(`Error al buscar las ciudades: ${error.message}`)
  }finally {
      cargando.value = false
  }

}
return{
    ciudades,
    error,
    cargando,
    llamarCiudadesAPI
}
}


