import { Header } from '@/components/Header';
import { useFirebase } from '@/contexts/FirebaseContext';
import { AddAttendeePage } from '@/pages/AddAttendeePage';
import { AttendeesPage } from '@/pages/AttendeesPage';
import { AuthPage } from '@/pages/AuthPage';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ReactNode, useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  redirect,
  Route,
  RouterProvider,
  ScrollRestoration,
  useLocation,
  useNavigate
} from 'react-router-dom';

const Layout = ({ outlet }: { outlet: ReactNode }) => {
  const { auth, recordNavigation } = useFirebase();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const names: { [key: string]: string } = {
      '/': 'Home',
      '/add': 'Add',
      '/auth': 'Auth'
    };
    let name = names[location.pathname];
    if (name) recordNavigation(location.pathname, name);
  }, [location]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const result = await user.getIdTokenResult();
        navigate(result.claims.admin ? '/' : '/auth');
      } else {
        navigate('/auth');
      }
    });
  }, []);

  return (
    <>
      <Header />
      <main className="p-8 grow flex flex-col items-stretch">{outlet}</main>
      <ScrollRestoration />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout outlet={<Outlet />} />}>
      <Route index element={<AttendeesPage />} />
      <Route path="add" element={<AddAttendeePage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="*" action={() => redirect('/')} />
    </Route>
  )
);

export const App = () => <RouterProvider router={router} />;
