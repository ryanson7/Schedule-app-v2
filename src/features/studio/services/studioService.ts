// src/features/studio/services/studioService.ts
import { supabase } from '@/lib/supabase'
import type { StudioSchedule } from '@/lib/supabase'

export class StudioService {
  // 기존 버전의 스튜디오 서비스 로직 적용
  static async getStudios() {
    const { data, error } = await supabase
      .from('sub_locations')
      .select('id, name')
      .gte('id', 31)
      .lte('id', 35)
      .order('id')

    if (error) throw error
    
    return data.map(studio => ({
      id: studio.id,
      name: `스튜디오 ${studio.id - 30}`,
      equipment: ['PPT', '전자칠판', '일반칠판']
    }))
  }

  static async getWeeklySchedules(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('shooting_schedules')
      .select('*')
      .eq('schedule_type', 'studio')
      .gte('shoot_date', startDate)
      .lte('shoot_date', endDate)
      .order('shoot_date', { ascending: true })

    if (error) throw error
    return data || []
  }
}
