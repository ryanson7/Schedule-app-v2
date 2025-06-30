// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface StudioSchedule {
  id: string
  shoot_date: string
  start_time: string
  end_time: string
  instructor_name: string
  course_name: string
  shooting_type: string
  approval_status: 'pending' | 'approved' | 'cancelled'
  sub_location_id: number
  planner_id: string
  schedule_type: string
  created_at: string
}

export interface StudioLocation {
  id: number
  name: string
  equipment: string[]
}
