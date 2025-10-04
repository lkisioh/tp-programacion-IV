<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { traerAtletas } from '@/composables/atleta/traerAtletas'
import { editarAtleta} from '@/composables/atleta/editarAtleta'
import { guardarAtleta } from '@/composables/atleta/guardarAtleta'

import { traerCiudades } from '@/composables/ciudad/traerCiudades'

const route = useRoute()
const router = useRouter()

const {atletas,cargando,error,llamarAtletasAPI} = traerAtletas()
const {ciudades,llamarCiudadesAPI} = traerCiudades()
llamarCiudadesAPI('http://localhost:3000/Ciudades')

const {editarAtletaApi} = editarAtleta()

const {guardarAtletaApi} = guardarAtleta()

const esEdicion = ref(false)

let atleta = ref({
  nombre: '',
  dni:'',
  tiempo:'',
  ciudadId:''
 })

onMounted(async () => {
  if (route.params.id) {
    esEdicion.value = true
    try {

      await llamarAtletasAPI(`http://localhost:3000/Atletas/${route.params.id}`)
      console.log(atletas.value)
      atleta.value = atletas.value

       const match = atleta.value.tiempo.match(/(\d+)h\s*(\d+)m\s*(\d+)s/)
      if (match) {
        horas.value = match[1]
        minutos.value = match[2]
        segundos.value = match[3]
      }

    } catch (err) {
      console.error(err)
    }
  }
})


async function guardar() {
  if (esEdicion.value) {

    atleta.value.tiempo = `${horas.value }h ${minutos.value }m ${segundos.value }s`
    editarAtletaApi('http://localhost:3000/Atletas', route.params.id, atleta.value)
  } else {
    guardarAtletaApi('http://localhost:3000/Atletas',atleta.value)
  }
  router.push({ path: '/Atletas', query: { refresh: Date.now() } })
}


const horas = ref('')
const minutos = ref('')
const segundos = ref('')

</script>

<template>
   <div>

    <h2>{{ esEdicion ? 'Editar Atleta' : 'Crear Atleta' }}</h2>

    <form @submit.prevent="guardar">
      <label for="nombre">NOMBRE</label>
      <input v-model="atleta.nombre" placeholder="Nombre del Atleta" />
      <label for="dni">DNI</label>
      <input v-model="atleta.dni" placeholder="DNI del Atleta" />
      <b>TIEMPO</b>
      <label for="horas">HORAS</label>
      <input v-model="horas" placeholder="Horas" />
      <label for="minutos">MINUTOS</label>
      <input v-model="minutos" placeholder="Minutos" />
      <label for="segundos">SEGUNDOS</label>
      <input v-model="segundos" placeholder="Segundos" />
      <label for="ciudad">CIUDAD</label>
      <select v-model="atleta.ciudadId" placeholder="Seleccione la ciudad del Atleta">
        <option v-for="ciudad in ciudades" :key="ciudad.id" :value="ciudad.id">{{ ciudad.nombre }}</option>
      </select>


      <button type="submit" :disabled="cargando">
        {{ esEdicion ? 'Actualizar' : 'Crear' }}
      </button>
    </form>

    <p v-if="error">Error: {{ error.message }}</p>
  </div>
</template>
