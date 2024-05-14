import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tmqshbonovzamvxhsobz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtcXNoYm9ub3Z6YW12eGhzb2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxOTQzMTYsImV4cCI6MjAyOTc3MDMxNn0.B1-ynKXpKbExvnJRdv-_JxeA21EeYi7VE6WJ0r2GPeg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
