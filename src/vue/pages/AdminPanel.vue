<template>
  <div class="admin-panel">
    <div class="container">
      <h1>Panneau d'administration</h1>
      <router-link to="/" class="btn btn-secondary mb-3">Retour au CV</router-link>
      
      <!-- CRUD pour les contacts -->
      <div class="crud-section">
        <h2>Gestion des contacts ({{ contactsCount }})</h2>
        
        <!-- Formulaire d'ajout/modification -->
        <div class="card mb-4">
          <div class="card-header">
            <h3>{{ editingContact ? 'Modifier' : 'Ajouter' }} contact</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="saveContact">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="name" class="form-label">Nom *</label>
                    <input v-model="contactForm.name" type="text" class="form-control" id="name" required>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email *</label>
                    <input v-model="contactForm.email" type="email" class="form-control" id="email" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="subject" class="form-label">Sujet</label>
                    <input v-model="contactForm.subject" type="text" class="form-control" id="subject">
                  </div>
                  <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea v-model="contactForm.message" class="form-control" id="message" rows="3"></textarea>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary me-2">
                {{ editingContact ? 'Mettre à jour' : 'Ajouter' }}
              </button>
              <button v-if="editingContact" @click="cancelEdit" type="button" class="btn btn-secondary">
                Annuler
              </button>
            </form>
          </div>
        </div>
        
        <!-- Liste des contacts -->
        <div class="card">
          <div class="card-header">
            <h3>Liste des contacts</h3>
          </div>
          <div class="card-body">
            <div v-if="contacts.length === 0" class="alert alert-info">
              Aucun contact pour le moment
            </div>
            <div v-else class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Sujet</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="contact in contacts" :key="contact.id">
                    <td>{{ contact.id }}</td>
                    <td>{{ contact.name }}</td>
                    <td>{{ contact.email }}</td>
                    <td>{{ contact.subject || '-' }}</td>
                    <td>{{ formatDate(contact.createdAt) }}</td>
                    <td>
                      <button @click="editContact(contact)" class="btn btn-sm btn-warning me-1">
                        Modifier
                      </button>
                      <button @click="removeContact(contact.id)" class="btn btn-sm btn-danger">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '/src/stores/index.js'

const store = useMainStore()

// Computed
const contacts = computed(() => store.contacts)
const contactsCount = computed(() => store.contactsCount)

// Reactive data
const editingContact = ref(null)
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Methods
function saveContact() {
  if (editingContact.value) {
    // Mettre à jour le contact existant
    store.updateContact(editingContact.value.id, { ...contactForm.value })
    editingContact.value = null
  } else {
    // Créer un nouveau contact
    store.addContact({ ...contactForm.value })
  }
  
  // Réinitialiser le formulaire
  contactForm.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}

function editContact(contact) {
  editingContact.value = contact
  contactForm.value = {
    name: contact.name,
    email: contact.email,
    subject: contact.subject || '',
    message: contact.message || ''
  }
}

function cancelEdit() {
  editingContact.value = null
  contactForm.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}

function removeContact(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
    store.deleteContact(id)
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('ru-RU')
}
</script>

<style scoped>
.admin-panel {
  padding: 20px 0;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.crud-section {
  margin-top: 2rem;
}

/* Amélioration du contraste et de la lisibilité */
h1 {
  color: #212529;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

h2 {
  color: #343a40;
  font-weight: 600;
  text-shadow: 0 1px 1px rgba(0,0,0,0.1);
}

.card-header h3 {
  color: #495057;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 1px 1px rgba(0,0,0,0.05);
}

.form-label {
  color: #6c757d;
  font-weight: 500;
  font-size: 0.95rem;
}

.table th {
  color: #495057;
  font-weight: 600;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.table td {
  color: #495057;
  font-weight: 500;
}

.alert-info {
  color: #055160;
  background-color: #d1ecf1;
  border-color: #bee5eb;
  font-weight: 500;
}

.btn {
  font-weight: 600;
  text-shadow: 0 1px 1px rgba(0,0,0,0.1);
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
  box-shadow: 0 2px 4px rgba(13, 110, 253, 0.25);
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
  box-shadow: 0 4px 8px rgba(13, 110, 253, 0.35);
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #000;
  box-shadow: 0 2px 4px rgba(255, 193, 7, 0.25);
}

.btn-warning:hover {
  background-color: #ffca2c;
  border-color: #ffc720;
  color: #000;
  box-shadow: 0 4px 8px rgba(255, 193, 7, 0.35);
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.25);
}

.btn-danger:hover {
  background-color: #bb2d3b;
  border-color: #b02a37;
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.35);
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  box-shadow: 0 2px 4px rgba(108, 117, 125, 0.25);
}

.btn-secondary:hover {
  background-color: #5c636a;
  border-color: #565e64;
  box-shadow: 0 4px 8px rgba(108, 117, 125, 0.35);
}

.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #dee2e6;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}

.form-control {
  border: 2px solid #ced4da;
  font-weight: 400;
  color:rgb(226, 232, 237);
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  color:rgb(196, 209, 220);
}

.form-control::placeholder {
  color: #adb5bd;
  opacity: 1;
}
</style> 