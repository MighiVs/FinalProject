import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rdhyuxqnqfgwyywiebfm.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkaHl1eHFucWZnd3l5d2llYmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1ODE2MTksImV4cCI6MTk5NzE1NzYxOX0.XHiqZ4_6WqgxPWqvbPt_NJ-egbvTq00P5U_vgCSgUKc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
