<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { traerCiudades } from '@/composables/ciudad/traerCiudades'
import { editarCiudad } from '@/composables/ciudad/editarCiudad'
import { guardarCiudad } from '@/composables/ciudad/guardarCiudad'

const route = useRoute()
const router = useRouter()

const {ciudades,cargando,error,llamarCiudadesAPI} = traerCiudades()

const {editarCiudadApi} = editarCiudad()

const {guardarCiudadApi} = guardarCiudad()

const esEdicion = ref(false)

let ciudad = ref({ nombre: '' })

onMounted(async () => {
  if (route.params.id) {
    esEdicion.value = true
    try {

      await llamarCiudadesAPI(`http://localhost:3000/Ciudades/${route.params.id}`)
      console.log(ciudades.value)
      ciudad.value = ciudades.value

    } catch (err) {
      console.error(err)
    }
  }
})


async function guardar() {
  if (esEdicion.value) {
    editarCiudadApi('http://localhost:3000/Ciudades', route.params.id, ciudad.value)
  } else {
    guardarCiudadApi('http://localhost:3000/Ciudades',ciudad.value)
  }
  router.push({ path: '/Ciudades', query: { refresh: Date.now() } })
}
</script>

<template>
   <div>

    <h2>{{ esEdicion ? 'Editar Ciudad' : 'Crear Ciudad' }}</h2>

    <form @submit.prevent="guardar">
      <label for="nombre">NOMBRE</label>
      <input v-model="ciudad.nombre" placeholder="Nombre de la ciudad" />
      <button type="submit" :disabled="cargando">
        {{ esEdicion ? 'Actualizar' : 'Crear' }}
      </button>
    </form>

    <p v-if="error">Error: {{ error.message }}</p>
  </div>
</template>
