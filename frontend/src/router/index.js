import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//Ciudades
import CiudadesView from '@/views/CiudadesView.vue'
import CiudadFormView from '@/views/CiudadFormView.vue'
//Atletas
import AtletasView from '@/views/AtletasView.vue'
import AtletaFormView from '@/views/AtletaFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/Ciudades',
      name: 'ciudades',
      component: CiudadesView,
    },
    {
      path: '/NuevaCiudad',
      name: 'ciudad-form',
      component: CiudadFormView,
    },
    {
      path: '/Atletas',
      name: 'atletas',
      component: AtletasView,
    },
    {
      path: '/NuevoAtleta',
      name: 'atleta-form',
      component: AtletaFormView,
    }
  ],
})

export default router
