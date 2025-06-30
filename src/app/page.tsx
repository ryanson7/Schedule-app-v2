// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-600">Schedule-app</h1>
          <p className="text-gray-600 mt-2">촬영 스케줄 관리 시스템</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 스튜디오 카드 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">스튜디오 스케줄</h2>
              <p className="text-gray-600 mb-4">스튜디오 촬영 일정을 관리합니다</p>
              <a 
                href="/studio" 
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                스튜디오 관리
              </a>
            </div>
          </div>

          {/* 교수님 카드 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">교수님 스케줄</h2>
              <p className="text-gray-600 mb-4">촬영 요청을 간편하게 등록합니다</p>
              <a 
                href="/professor" 
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                촬영 요청
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
