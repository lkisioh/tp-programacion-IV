<script setup>
import { RouterLink} from 'vue-router'
import {traerCiudades} from '@/composables/ciudad/traerCiudades.js'
import { eliminarCiudad } from '@/composables/ciudad/eliminarCiudad'

const {ciudades,error,cargando,llamarCiudadesAPI} = traerCiudades()

const {eliminarCiudadApi}= eliminarCiudad()

llamarCiudadesAPI('http://localhost:3000/Ciudades')

async function eliminar(id) {
  const ok = await eliminarCiudadApi('http://localhost:3000/Ciudades', id)
  if (ok) {
    await llamarCiudadesAPI('http://localhost:3000/Ciudades')
  }
}
</script>

<template>

  <div v-if="error"><h1>HUBO UN ERROR AL BUSCAR CIUDADES</h1></div>
  <div v-else-if="!cargando">

    <div>
      <h1>CIUDADES</h1>
      <RouterLink to="/Ciudad">Agragar Ciudad</RouterLink>
      <br>
      <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ciudad in ciudades" :key="ciudad.id">
          <td>{{ ciudad.nombre }}</td>
          <td>
            <RouterLink :to="`/Ciudad/${ciudad.id}`">Editar</RouterLink>
            <button @click="eliminar(ciudad.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

  </div>


</template>
