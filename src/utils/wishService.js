import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const wishService = {
  // Get all wishes from Supabase
  getWishes: async () => {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('id', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (e) {
      console.error('Failed to fetch wishes from Supabase', e)
      return []
    }
  },

  // Save a single wish to Supabase
  addWish: async (wish) => {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert([{ 
          name: wish.name, 
          message: wish.message,
          date: new Date().toLocaleString('id-ID', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'short' })
        }])
        .select()
      
      if (error) throw error
      return data[0]
    } catch (e) {
      console.error('Failed to add wish to Supabase', e)
      throw e
    }
  },

  // Delete wish (admin functionality)
  deleteWish: async (id) => {
    try {
      const { error } = await supabase
        .from('wishes')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (e) {
      console.error('Failed to delete wish from Supabase', e)
      throw e
    }
  }
}
