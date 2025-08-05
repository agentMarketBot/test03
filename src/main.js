import './style.css'
import { registrationService } from './supabase.js'

class CountdownApp {
  constructor() {
    this.targetDate = null
    this.intervalId = null
    this.init()
  }

  init() {
    this.bindEvents()
    this.loadRegistrations()
  }

  bindEvents() {
    const startBtn = document.getElementById('start-countdown')
    const stopBtn = document.getElementById('stop-countdown')
    const registerForm = document.getElementById('register-form')

    startBtn.addEventListener('click', () => this.startCountdown())
    stopBtn.addEventListener('click', () => this.stopCountdown())
    registerForm.addEventListener('submit', (e) => this.handleRegistration(e))
  }

  startCountdown() {
    const targetDateInput = document.getElementById('target-date')
    const targetDateValue = targetDateInput.value

    if (!targetDateValue) {
      alert('Please select a target date and time')
      return
    }

    this.targetDate = new Date(targetDateValue)
    
    if (this.targetDate <= new Date()) {
      alert('Please select a future date and time')
      return
    }

    this.stopCountdown() // Clear any existing interval
    this.intervalId = setInterval(() => this.updateCountdown(), 1000)
    this.updateCountdown() // Update immediately
  }

  stopCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  updateCountdown() {
    if (!this.targetDate) return

    const now = new Date()
    const timeLeft = this.targetDate - now

    if (timeLeft <= 0) {
      this.displayTime(0, 0, 0)
      this.stopCountdown()
      alert('Countdown finished!')
      return
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    this.displayTime(hours, minutes, seconds)
  }

  displayTime(hours, minutes, seconds) {
    const display = document.getElementById('countdown-display')
    const formatTime = (time) => time.toString().padStart(2, '0')
    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
  }

  async handleRegistration(event) {
    event.preventDefault()
    
    const nameInput = document.getElementById('name')
    const emailInput = document.getElementById('email')
    
    const name = nameInput.value.trim()
    const email = emailInput.value.trim()

    if (!name || !email) {
      alert('Please fill in all fields')
      return
    }

    try {
      await registrationService.addRegistration(name, email)
      nameInput.value = ''
      emailInput.value = ''
      
      // Reload registrations to show the new one
      this.loadRegistrations()
      
      alert('Registration successful!')
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Registration failed. Please try again.')
    }
  }

  async loadRegistrations() {
    try {
      const registrations = await registrationService.getAllRegistrations()
      this.displayRegistrations(registrations)
    } catch (error) {
      console.error('Failed to load registrations:', error)
      // For demo purposes, show some mock data if Supabase is not configured
      this.displayMockRegistrations()
    }
  }

  displayRegistrations(registrations) {
    const container = document.getElementById('registrations')
    
    if (registrations.length === 0) {
      container.innerHTML = '<p>No registrations yet. Be the first to register!</p>'
      return
    }

    container.innerHTML = registrations.map(reg => `
      <div class="registration-item">
        <div class="registration-name">${this.escapeHtml(reg.name)}</div>
        <div class="registration-email">${this.escapeHtml(reg.email)}</div>
        <div class="registration-date">${new Date(reg.created_at).toLocaleString()}</div>
      </div>
    `).join('')
  }

  displayMockRegistrations() {
    const mockData = [
      { name: 'John Doe', email: 'john@example.com', created_at: new Date().toISOString() },
      { name: 'Jane Smith', email: 'jane@example.com', created_at: new Date(Date.now() - 3600000).toISOString() }
    ]
    
    const container = document.getElementById('registrations')
    container.innerHTML = `
      <div style="color: #ff6b6b; margin-bottom: 1rem;">
        <strong>Demo Mode:</strong> Supabase not configured. Showing mock data.
      </div>
    ` + mockData.map(reg => `
      <div class="registration-item">
        <div class="registration-name">${reg.name}</div>
        <div class="registration-email">${reg.email}</div>
        <div class="registration-date">${new Date(reg.created_at).toLocaleString()}</div>
      </div>
    `).join('')
  }

  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CountdownApp()
})