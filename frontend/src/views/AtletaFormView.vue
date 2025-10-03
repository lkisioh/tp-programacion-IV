<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

  <h1>Nuevo Atleta</h1>
  <form>
    <label>
      DNI
    </label>
    <input type="number" />
    <label>
      Nombre
    </label>
    <input type="text" />

    <label>
      Tiempo
    </label>
    <input type="text" />
    <label>
      Ciudad
    </label>
    <select >Seleccione ciudad</select>

  </form>



</template>
