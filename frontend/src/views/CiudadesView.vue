<script setup>
import { RouterLink} from 'vue-router'
import {traerCiudades} from '@/composables/ciudad/traerCiudades.js'

const {ciudades,error,cargando,llamarCiudadesAPI} = traerCiudades()

llamarCiudadesAPI('http://localhost:3000/Ciudades')
</script>

<template>

  <div v-if="error"><h1>HUBO UN ERROR AL BUSCAR CIUDADES</h1></div>
  <div v-else-if="cargando">
    <p>CARGANDO...</p>
    <div>
      <table>
    <th>
        <td>
          Nombre
        </td>
        <td>acciones</td>

    </th>
    <tr v-for="ciudad in ciudades" :key=ciudad.id>

      {{ ciudad.nombre }}
        <RouterLink :to="`/Ciudades/${ciudad.id}`"> Editar</RouterLink>
        <button>Eliminar</button>
    </tr>
    </table>
    </div>

  </div>


</template>
