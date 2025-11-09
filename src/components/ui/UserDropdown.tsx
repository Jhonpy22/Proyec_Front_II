import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuthContext } from '../../modules/auth/contexts/AuthContext';
import { useNavigate } from '@tanstack/react-router';

type Props = {
  collapsed?: boolean;
};

export default function UserDropdown({ collapsed = false }: Props) {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <Menu.Button
        className={[
          'w-full flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/15 transition focus:outline-none',
          collapsed ? 'justify-center px-0' : '',
        ].join(' ')}
      >
        <FaUserCircle size={28} className="text-white" />
        {!collapsed && (
          <span className="font-semibold text-sm text-white">Usuario</span>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={[
            'absolute z-50 w-64 bg-white border rounded-lg shadow-xl overflow-hidden focus:outline-none',
            collapsed
              ? 'left-full bottom-0 ml-2 origin-left'
              : 'bottom-full mb-2 origin-bottom',
          ].join(' ')}
        >
          <div className="py-1">
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-sm ${
                    active ? 'bg-[#FFE5E5]' : ''
                  } text-red-600`}
                >
                  <FaSignOutAlt />
                  Cerrar sesión
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}