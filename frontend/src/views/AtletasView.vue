<script setup>
import { RouterLink,} from 'vue-router'
import {traerAtletas} from '@/composables/atleta/traerAtletas.js'

const {atletas,error,cargando,llamarAtletasAPI} = traerAtletas()

llamarAtletasAPI('http://localhost:3000/Atletas')
</script>

<template>

 <div v-if="error"><h1>HUBO UN ERROR AL BUSCAR ATLETAS</h1></div>
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
    <tr v-for="atleta in atletas" :key=atleta.id>

      {{ atleta.nombre }}
        <RouterLink :to="`/Atletas/${atleta.id}`"> Editar</RouterLink>
        <button>Eliminar</button>
    </tr>
    </table>
    </div>

  </div>


</template>
