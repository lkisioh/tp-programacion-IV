<script setup>
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Maratón App</h1>
      <p>
        Bienvenido a tu panel de gestión de maratones.  
        Aquí podrás visualizar atletas, ciudades y estadísticas de manera sencilla y moderna.
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 70vh;
  background: linear-gradient(135deg, #dbeafe 0%, #f1f5f9 100%);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 3rem 1rem;
}

.hero-content {
  max-width: 600px;
  animation: fadeIn 1s ease-out;
}

.hero h1 {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.6;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
