import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vzfbyhnyiukhhawpmjxv.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6ZmJ5aG55aXVraGhhd3Btanh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5OTU5OTYsImV4cCI6MjA2MjU3MTk5Nn0.7wZ6M7ReN75XL59opvwfQrHEbS5kqf7sJEoQYmimz8A"

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)