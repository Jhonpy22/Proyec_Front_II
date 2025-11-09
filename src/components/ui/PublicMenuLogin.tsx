import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from '@tanstack/react-router'

export default function PublicLoginMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="focus:outline-none">
        <FaUserCircle
          size={32}
          className="text-[#03045E] hover:text-[#0077B6] transition-colors"
        />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border rounded shadow-lg z-50 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/login"
                from="/"
                className={`block px-4 py-2 text-sm text-[#03045E] ${
                  active ? 'bg-[#90E0EF]' : ''
                }`}
              >
                Iniciar sesión
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
