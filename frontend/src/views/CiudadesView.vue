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

<style scoped>
 
div {
  margin: 20px auto;
  max-width: 900px;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}


h1 {
  margin-bottom: 20px;
  color: #1e293b;
}


a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}


table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px; 
  margin-top: 20px;
}

th {
  text-align: left;
  background: #f1f5f9;
  padding: 12px 16px;
  font-weight: 600;
  color: #334155;
}

td {
  background: #f8fafc;
  padding: 10px 16px;
  border-radius: 6px;
}


td a {
  color: #1d4ed8;
  font-weight: 500;
  margin-right: 12px; 
}

td a:hover {
  color: #1e40af;
}

td button {
  background: #2563eb;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

td button:hover {
  background: #1e40af;
}

</style>