import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xvayvlcgjjpidbodxnia.supabase.co";
// https://xvayvlcgjjpidbodxnia.supabase.co/storage/v1/object/sign/thumbnails/Rectangle%201.png
// https://xvayvlcgjjpidbodxnia.supabase.co/storage/v1/object/sign/thumbnails/1716660163809-Rectangle 1.png
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2YXl2bGNnampwaWRib2R4bmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NTQ5NzUsImV4cCI6MjAzMjIzMDk3NX0.ekVCkoJpEdXF16YsXLNolgB-AeXv-jbFa3vKgptdZco";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
