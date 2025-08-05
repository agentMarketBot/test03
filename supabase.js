import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// These should be set as environment variables in a real application
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export class SupabaseDatabase {
  constructor() {
    this.client = supabase
  }

  async init() {
    try {
      // Test the connection
      const { data, error } = await this.client.from('registrations').select('count').limit(1)
      if (error && error.code !== 'PGRST116') { // PGRST116 is "relation does not exist"
        console.error('Failed to connect to Supabase:', error)
        throw error
      }
      console.log('Supabase database initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Supabase database:', error)
      throw error
    }
  }

  async addRegistration(registration) {
    try {
      const { data, error } = await this.client
        .from('registrations')
        .insert([registration])
        .select()
      
      if (error) {
        console.error('Failed to add registration:', error)
        throw error
      }
      
      return data[0]
    } catch (error) {
      console.error('Failed to add registration:', error)
      throw error
    }
  }

  async getRecentRegistrations(limit = 10) {
    try {
      const { data, error } = await this.client
        .from('registrations')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit)
      
      if (error) {
        console.error('Failed to get registrations:', error)
        throw error
      }
      
      return data || []
    } catch (error) {
      console.error('Failed to get registrations:', error)
      throw error
    }
  }

  async getAllRegistrations() {
    try {
      const { data, error } = await this.client
        .from('registrations')
        .select('*')
        .order('timestamp', { ascending: false })
      
      if (error) {
        console.error('Failed to get all registrations:', error)
        throw error
      }
      
      return data || []
    } catch (error) {
      console.error('Failed to get all registrations:', error)
      throw error
    }
  }

  async deleteRegistration(id) {
    try {
      const { error } = await this.client
        .from('registrations')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Failed to delete registration:', error)
        throw error
      }
      
      return true
    } catch (error) {
      console.error('Failed to delete registration:', error)
      throw error
    }
  }

  async clearAllRegistrations() {
    try {
      const { error } = await this.client
        .from('registrations')
        .delete()
        .neq('id', 0) // Delete all records
      
      if (error) {
        console.error('Failed to clear registrations:', error)
        throw error
      }
      
      return true
    } catch (error) {
      console.error('Failed to clear registrations:', error)
      throw error
    }
  }
}