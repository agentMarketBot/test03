import { createClient } from '@supabase/supabase-js'

// These would typically be environment variables
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database operations
export const registrationService = {
  async getAllRegistrations() {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    
    if (error) {
      console.error('Error fetching registrations:', error)
      return []
    }
    
    return data
  },

  async addRegistration(name, email) {
    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          created_at: new Date().toISOString()
        }
      ])
      .select()
    
    if (error) {
      console.error('Error adding registration:', error)
      throw error
    }
    
    return data[0]
  }
}