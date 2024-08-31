import { Header } from '@/components/Header';
import { useFirebase } from '@/contexts/FirebaseContext';
import { HomePage } from '@/pages/HomePage';
import { RegisterPage } from '@/pages/RegisterPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ReactNode, useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
  useLocation
} from 'react-router-dom';
import { Footer } from './components/Footer';

const Layout = ({ outlet }: { outlet: ReactNode }) => {
  const { recordNavigation } = useFirebase();
  const location = useLocation();

  useEffect(() => {
    const names: { [key: string]: string } = {
      '/': 'Home',
      '/register': 'Register'
    };
    let name = names[location.pathname];
    if (name) recordNavigation(location.pathname, name);
  }, [location]);

  return (
    <>
      <Header />
      <main className="grow flex flex-col items-stretch">{outlet}</main>
      <ScrollRestoration />
      <Footer />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout outlet={<Outlet />} />}>
      <Route index element={<HomePage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

export const App = () => {
  useEffect(() => {
    AOS.init({duration: 2500});
  }, []);

  return <RouterProvider router={router} />;
};
