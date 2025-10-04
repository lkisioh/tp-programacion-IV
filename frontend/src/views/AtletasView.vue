<script setup>
import { RouterLink,} from 'vue-router'
import {traerAtletas} from '@/composables/atleta/traerAtletas.js'
import { eliminarAtleta } from '@/composables/atleta/eliminarAtleta'

const {atletas,error,cargando,llamarAtletasAPI} = traerAtletas()
const {eliminarAtletaApi} = eliminarAtleta()

llamarAtletasAPI('http://localhost:3000/Atletas')

async function eliminar(id) {
  const ok = await eliminarAtletaApi('http://localhost:3000/Atletas', id)
  if (ok) {
    await llamarAtletasAPI('http://localhost:3000/Atletas')
  }
}
</script>

<template>

 <div v-if="error"><h1>HUBO UN ERROR AL BUSCAR ATLETAS</h1></div>
  <div v-else-if="!cargando">

    <div>
      <h1>Atletas</h1>
      <RouterLink to="/Atleta">Agragar atleta</RouterLink>
      <br>
      <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>DNI</th>
          <th>Posición</th>
          <th>Tiempo</th>
          <th>Ciudad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="atleta in atletas" :key=atleta.id>
          <td>{{ atleta.nombre }}</td>
          <td>{{ atleta.dni}}</td>
          <td>{{ atleta.posicion }}</td>
          <td>{{ atleta.tiempo }}</td>
          <td>{{ atleta.ciudadId }}</td>

          <td>
            <RouterLink :to="`/Atleta/${atleta.id}`"> Editar</RouterLink>
            <button @click="eliminar(atleta.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


</template>
