import './style.css'
import { SupabaseDatabase } from './supabase.js'

class CountdownApp {
  constructor() {
    this.db = new SupabaseDatabase()
    this.targetDate = new Date('2025-12-31T23:59:59').getTime()
    this.countdownDisplay = document.getElementById('countdown-display')
    this.registrationForm = document.getElementById('registration-form')
    this.registrationsList = document.getElementById('registrations')
    
    this.init()
  }

  async init() {
    try {
      await this.db.init()
      this.startCountdown()
      this.setupEventListeners()
      await this.loadRegistrations()
    } catch (error) {
      console.error('Failed to initialize app:', error)
      this.showError('Failed to connect to database. Please check your Supabase configuration.')
    }
  }

  startCountdown() {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = this.targetDate - now

      if (distance < 0) {
        this.countdownDisplay.innerHTML = "EXPIRED"
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      this.countdownDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`
    }

    updateCountdown()
    setInterval(updateCountdown, 1000)
  }

  setupEventListeners() {
    this.registrationForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      const name = document.getElementById('name').value
      const email = document.getElementById('email').value
      
      if (name && email) {
        await this.registerUser(name, email)
        this.registrationForm.reset()
      }
    })
  }

  async registerUser(name, email) {
    try {
      const registration = {
        name,
        email,
        timestamp: new Date().toISOString()
      }
      
      await this.db.addRegistration(registration)
      await this.loadRegistrations()
      
      this.showSuccess('Registration successful!')
    } catch (error) {
      console.error('Registration failed:', error)
      this.showError('Registration failed. Please try again.')
    }
  }

  async loadRegistrations() {
    try {
      const registrations = await this.db.getRecentRegistrations(10)
      this.renderRegistrations(registrations)
    } catch (error) {
      console.error('Failed to load registrations:', error)
    }
  }

  renderRegistrations(registrations) {
    this.registrationsList.innerHTML = registrations.map(reg => `
      <div class="registration-item">
        <div><strong>${reg.name}</strong> (${reg.email})</div>
        <div class="registration-time">${new Date(reg.timestamp).toLocaleString()}</div>
      </div>
    `).join('')
  }

  showError(message) {
    // Create error display if it doesn't exist
    let errorDiv = document.getElementById('error-message')
    if (!errorDiv) {
      errorDiv = document.createElement('div')
      errorDiv.id = 'error-message'
      errorDiv.className = 'error-message'
      document.body.insertBefore(errorDiv, document.body.firstChild)
    }
    errorDiv.textContent = message
    errorDiv.style.display = 'block'
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      errorDiv.style.display = 'none'
    }, 5000)
  }

  showSuccess(message) {
    // Create success display if it doesn't exist
    let successDiv = document.getElementById('success-message')
    if (!successDiv) {
      successDiv = document.createElement('div')
      successDiv.id = 'success-message'
      successDiv.className = 'success-message'
      document.body.insertBefore(successDiv, document.body.firstChild)
    }
    successDiv.textContent = message
    successDiv.style.display = 'block'
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      successDiv.style.display = 'none'
    }, 3000)
  }
}

// Initialize the app
new CountdownApp()