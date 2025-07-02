import { createRouter, createWebHistory } from 'vue-router'
import Resume from '/src/vue/stack/Resume.vue'
import AdminPanel from '/src/vue/pages/AdminPanel.vue'

// Создаем простые компоненты для дополнительных страниц
const About = { 
  template: `
    <div class="container mt-5">
      <h1>О проекте</h1>
      <p>Это портфолио создано с использованием Vue.js 3</p>
      <router-link to="/" class="btn btn-primary">Вернуться к резюме</router-link>
    </div>
  ` 
}

const Contact = { 
  template: `
    <div class="container mt-5">
      <h1>Контакты</h1>
      <p>Свяжитесь со мной через форму в основном резюме</p>
      <router-link to="/" class="btn btn-primary">Вернуться к резюме</router-link>
    </div>
  ` 
}

const routes = [
  {
    path: '/',
    name: 'Resume',
    component: Resume
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 