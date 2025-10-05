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