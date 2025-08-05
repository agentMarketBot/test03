import Dexie from 'dexie'

export class Database {
  constructor() {
    this.db = new Dexie('CountdownAppDB')
    
    // Define schemas
    this.db.version(1).stores({
      registrations: '++id, name, email, timestamp'
    })
  }

  async init() {
    try {
      await this.db.open()
      console.log('Database initialized successfully')
    } catch (error) {
      console.error('Failed to initialize database:', error)
      throw error
    }
  }

  async addRegistration(registration) {
    try {
      return await this.db.registrations.add(registration)
    } catch (error) {
      console.error('Failed to add registration:', error)
      throw error
    }
  }

  async getRecentRegistrations(limit = 10) {
    try {
      return await this.db.registrations
        .orderBy('timestamp')
        .reverse()
        .limit(limit)
        .toArray()
    } catch (error) {
      console.error('Failed to get registrations:', error)
      throw error
    }
  }

  async getAllRegistrations() {
    try {
      return await this.db.registrations.toArray()
    } catch (error) {
      console.error('Failed to get all registrations:', error)
      throw error
    }
  }

  async deleteRegistration(id) {
    try {
      return await this.db.registrations.delete(id)
    } catch (error) {
      console.error('Failed to delete registration:', error)
      throw error
    }
  }

  async clearAllRegistrations() {
    try {
      return await this.db.registrations.clear()
    } catch (error) {
      console.error('Failed to clear registrations:', error)
      throw error
    }
  }
}