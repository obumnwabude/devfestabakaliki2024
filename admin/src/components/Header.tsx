import { useFirebase } from '@/contexts/FirebaseContext';
import { signOut } from 'firebase/auth';
import { Ripple } from 'primereact/ripple';

export const Header = () => {
  const { auth } = useFirebase();

  return (
    <div className="shadow fixed z-20 top-0 left-0 right-0 p-4 h-16 bg-neutral-900 px-8">
      <div className="w-full max-w-screen-2xl mx-auto flex justify-between">
        <h1 className="text-xl">Admin</h1>
        {auth.currentUser ? (
          <button
            className="p-ripple px-3 pb-1 rounded-md border border-neutral-600"
            onClick={() => signOut(auth)}
          >
            Sign Out <Ripple />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
