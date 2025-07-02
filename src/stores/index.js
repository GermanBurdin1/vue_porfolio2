import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMainStore = defineStore('main', () => {
  // État
  const contacts = ref([])
  const currentUser = ref(null)
  
  // Getters
  const contactsCount = computed(() => contacts.value.length)
  
  // Actions
  function addContact(contact) {
    const newContact = {
      id: Date.now(),
      ...contact,
      createdAt: new Date().toISOString()
    }
    contacts.value.push(newContact)
    return newContact
  }
  
  function updateContact(id, updatedData) {
    const index = contacts.value.findIndex(contact => contact.id === id)
    if (index !== -1) {
      contacts.value[index] = { ...contacts.value[index], ...updatedData }
      return contacts.value[index]
    }
    return null
  }
  
  function deleteContact(id) {
    const index = contacts.value.findIndex(contact => contact.id === id)
    if (index !== -1) {
      contacts.value.splice(index, 1)
      return true
    }
    return false
  }
  
  function getContactById(id) {
    return contacts.value.find(contact => contact.id === id)
  }
  
  return {
    contacts,
    currentUser,
    contactsCount,
    addContact,
    updateContact,
    deleteContact,
    getContactById
  }
}) 