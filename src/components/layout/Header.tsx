// src/components/layout/Header.tsx (GlobalHeader 적용)
'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <h1 className="text-xl font-bold">Schedule-app</h1>
          </Link>
          
          <nav className="flex space-x-6">
            <Link href="/studio" className="text-gray-600 hover:text-blue-600">
              스튜디오
            </Link>
            <Link href="/professor" className="text-gray-600 hover:text-blue-600">
              교수님
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
