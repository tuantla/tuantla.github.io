import { Route, Routes } from 'react-router-dom'
import { TopNav } from './components/TopNav'
import { Apps } from './pages/Apps'
import { Base64 } from './pages/Base64'
import { Dashboard } from './pages/Dashboard'

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 overflow-hidden">
      <TopNav />
      <main className="flex flex-col flex-1 overflow-hidden">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="apps" element={<Apps />} />
          <Route path="apps/base64" element={<Base64 />} />
        </Routes>
      </main>
    </div>
  )
}
