import React, { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAuthContext } from "../../modules/auth/contexts/AuthContext";
import ConfirmLogoutModal from "../../components/ui/ConfirmLogoutModal";
import { LogOut, Box } from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const router = useRouterState();
  const { logout } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);

  const currentPath = router.location.pathname;

  const handleConfirmLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const menuItems = [
    { path: "/admin/simulation", label: "Simulador", icon: Box },
    { path: "/admin/products", label: "Productos", icon: Box },
    { path: "/admin/cards", label: "Tarjetas", icon: Box },
    { path: "/admin/profile", label: "Perfil", icon: Box },
  ];

  return (
    <>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all  ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/30 text-white"
                  : "hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={20} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}

        <div className="mt-4 pt-4 border-t border-cyan-500/20">
          <button
            onClick={() => setOpenModal(true)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all w-full ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-medium">Cerrar Sesión</span>}
          </button>
        </div>
      </nav>

      <ConfirmLogoutModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};
