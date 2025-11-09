import { Outlet, useLocation } from '@tanstack/react-router'
import Footer from '../public/PublicFooter'
import { PublicNavbar } from './PublicNavbar';

export const PublicLayout = () => {
    const location = useLocation();
    const isLogin = location.pathname === "/login";
    return (
        <div className="min-h-screen flex flex-col">
            {!isLogin && <PublicNavbar/>}
            <main className="flex-1">
                <Outlet />
            </main>
            {!isLogin && <Footer />}
        </div>
    )
}
