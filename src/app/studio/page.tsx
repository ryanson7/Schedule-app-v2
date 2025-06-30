// src/app/studio/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { StudioSchedule, StudioLocation } from '@/lib/supabase'

export default function StudioPage() {
  const [studios, setStudios] = useState<StudioLocation[]>([])
  const [schedules, setSchedules] = useState<StudioSchedule[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())

  // 주간 날짜 계산
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate)
    const startOfWeek = date.getDate() - date.getDay() + 1
    date.setDate(startOfWeek + i)
    return date
  })

  // 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        // 스튜디오 목록 조회
        const { data: studioData, error: studioError } = await supabase
          .from('sub_locations')
          .select('id, name')
          .gte('id', 31)
          .lte('id', 35)
          .order('id')

        if (studioError) throw studioError

        const studiosFormatted = studioData.map(studio => ({
          id: studio.id,
          name: `스튜디오 ${studio.id - 30}`,
          equipment: ['PPT', '전자칠판', '일반칠판']
        }))

        // 주간 스케줄 조회
        const startDate = weekDays[0].toISOString().split('T')[0]
        const endDate = weekDays[6].toISOString().split('T')[0]

        const { data: scheduleData, error: scheduleError } = await supabase
          .from('shooting_schedules')
          .select('*')
          .eq('schedule_type', 'studio')
          .gte('shoot_date', startDate)
          .lte('shoot_date', endDate)
          .order('shoot_date', { ascending: true })

        if (scheduleError) throw scheduleError

        setStudios(studiosFormatted)
        setSchedules(scheduleData || [])
      } catch (error) {
        console.error('데이터 로드 오류:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [currentDate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">데이터 로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">스튜디오 스케줄</h1>
              <p className="text-gray-600 mt-1">실시간 스튜디오 예약 관리</p>
            </div>
            
            {/* 날짜 네비게이션 */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => {
                  const newDate = new Date(currentDate)
                  newDate.setDate(newDate.getDate() - 7)
                  setCurrentDate(newDate)
                }}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                이전
              </button>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                {weekDays[0]?.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} - 
                {weekDays[6]?.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
              </span>
              <button 
                onClick={() => {
                  const newDate = new Date(currentDate)
                  newDate.setDate(newDate.getDate() + 7)
                  setCurrentDate(newDate)
                }}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                다음
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                오늘
              </button>
            </div>
          </div>
        </div>

        {/* 스케줄 그리드 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* 헤더 */}
              <thead>
                <tr className="bg-gray-50">
                  <th className="w-32 p-3 text-left border font-medium">스튜디오</th>
                  {weekDays.map((day, index) => (
                    <th key={index} className="w-40 p-3 text-center border">
                      <div className="text-sm font-medium">
                        {day.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {day.toLocaleDateString('ko-KR', { weekday: 'short' })}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* 바디 */}
              <tbody>
                {studios.map(studio => (
                  <tr key={studio.id} className="hover:bg-gray-50">
                    {/* 스튜디오 이름 */}
                    <td className="p-3 border bg-blue-50 font-medium text-center">
                      <div className="text-lg font-bold text-blue-800">
                        {studio.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {studio.equipment.join(', ')}
                      </div>
                    </td>

                    {/* 날짜별 셀 */}
                    {weekDays.map((day, dayIndex) => {
                      const dateString = day.toISOString().split('T')[0]
                      const cellSchedules = schedules.filter(s => 
                        s.sub_location_id === studio.id && 
                        s.shoot_date === dateString
                      )

                      return (
                        <td 
                          key={dayIndex}
                          className="p-2 border align-top min-h-[100px] cursor-pointer hover:bg-gray-50"
                        >
                          <div className="space-y-1">
                            {cellSchedules.map(schedule => (
                              <div
                                key={schedule.id}
                                className="bg-white border rounded p-2 shadow-sm hover:shadow-md text-xs"
                              >
                                <div className="font-bold">
                                  {schedule.start_time.slice(0,5)}-{schedule.end_time.slice(0,5)}
                                </div>
                                <div className="text-gray-700">
                                  {schedule.instructor_name}
                                </div>
                                <div className="text-gray-600">
                                  {schedule.course_name}
                                </div>
                                <div className={`px-1 rounded text-xs ${
                                  schedule.approval_status === 'approved' ? 'bg-green-100 text-green-800' :
                                  schedule.approval_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {schedule.approval_status === 'approved' ? '승인' :
                                   schedule.approval_status === 'pending' ? '대기' : '취소'}
                                </div>
                              </div>
                            ))}
                            
                            {cellSchedules.length === 0 && (
                              <div className="text-xs text-gray-400 text-center py-8">
                                스케줄 등록
                              </div>
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
