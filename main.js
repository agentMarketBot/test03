import './style.css'
import { Database } from './database.js'

class CountdownApp {
  constructor() {
    this.db = new Database()
    this.targetDate = new Date('2025-12-31T23:59:59').getTime()
    this.countdownDisplay = document.getElementById('countdown-display')
    this.registrationForm = document.getElementById('registration-form')
    this.registrationsList = document.getElementById('registrations')
    
    this.init()
  }

  async init() {
    await this.db.init()
    this.startCountdown()
    this.setupEventListeners()
    await this.loadRegistrations()
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
      
      alert('Registration successful!')
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Registration failed. Please try again.')
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
}

// Initialize the app
new CountdownApp()