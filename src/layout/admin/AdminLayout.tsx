import { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import UserDropdown from '../../components/ui/UserDropdown'
import { FaBars, FaChevronLeft } from 'react-icons/fa'
import { Sidebar } from './Sidebar'

export default function AdminLayout() {

  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#0077B6] text-white flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          {!collapsed && <div className="font-bold text-lg">Panel Administrativo</div>}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="p-2 rounded hover:bg-white/20"
          >
            {collapsed ? <FaBars /> : <FaChevronLeft />}
          </button>
        </div>

        <UserDropdown collapsed={collapsed} />

        <nav className="mt-4 flex-1"><Sidebar/></nav>
      </aside>

      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
