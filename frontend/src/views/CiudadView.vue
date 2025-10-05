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
   <div class="conteiner">

    <h2>{{ esEdicion ? 'Editar Ciudad' : 'Crear Ciudad' }}</h2>

    <form @submit.prevent="guardar">
      <label for="nombre">Nombre de la Ciudad</label>
      <input 
      id="nombre"
      v-model="ciudad.nombre" 
      placeholder="Ejemplo: Buenos Aires"
      required
      />
      <button type="submit" :disabled="cargando">
        {{ esEdicion ? 'Actualizar' : 'Crear' }}
      </button>
    </form>

    <p v-if="error" class="error">Error: {{ error.message }}</p>
  </div>
</template>

<style scoped>
.container {
  margin: 40px auto;
  max-width: 500px;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  color: #1e293b;
  margin-bottom: 24px;
  font-size: 1.6rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
}

label {
  font-weight: 600;
  color: #334155;
  text-align: left;
}

input {
  padding: 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  font-size: 1rem;
  transition: border 0.2s;
}

input:focus {
  border-color: #2563eb;
}

button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #1e40af;
}

button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
  margin-top: 12px;
}
</style>
