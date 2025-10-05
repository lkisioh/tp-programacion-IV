<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Maratón App</h1>
    <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/Ciudades">Lista de Ciudades</RouterLink>
        <RouterLink to="/Atletas">Lista de Atletas</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: #cbd5e1;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

nav a:hover {
  background-color: #334155;
  color: #fff;
}

nav a.router-link-exact-active {
  background-color: #475569;
  color: #fff;
}

main {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
/* .logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
