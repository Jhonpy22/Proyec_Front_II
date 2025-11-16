import { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { ChevronLeft, Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { MdAdminPanelSettings } from 'react-icons/md'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  
  return (
    <div className="flex min-h-screen bg-slate-900">
      <aside 
        className={`bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transition-all duration-300 border-r border-cyan-500/20 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
          {!collapsed && (
            <div className="font-bold text-lg flex items-center gap-2">
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Panel Administrativo</span>
              <MdAdminPanelSettings className="text-cyan-400"/>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-cyan-500/20 transition ml-auto text-cyan-400"
          >
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
      
        <div className="flex-1 p-4">
          <Sidebar collapsed={collapsed} />
        </div>
      </aside>
      
      <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Outlet />
      </main>
    </div>
  )
}