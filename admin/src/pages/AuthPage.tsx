import Google from '@/assets/google.svg?react';
import { useFirebase } from '@/contexts/FirebaseContext';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { Ripple } from 'primereact/ripple';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';

export const AuthPage = () => {
  const { auth, recordEvent } = useFirebase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [waitingApproval, setWaitingApproval] = useState(false);

  const signIn = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    if (result) recordEvent('login', { method: 'google' });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await user.getIdTokenResult();
        if (result.claims.admin) navigate('/');
        else {
          setWaitingApproval(true);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setWaitingApproval(false);
      }
    });
  }, []);

  return (
    <div className="self-center flex flex-col grow justify-center">
      {loading ? (
        <BounceLoader color="white" />
      ) : (
        <>
          {waitingApproval ? (
            <p>Please wait, admins are reviewing your access request</p>
          ) : (
            <>
              <p className="mb-4 text-xl">Kindly Sign In to continue</p>
              <button
                className="p-ripple mx-auto px-4 border border-neutral-600 flex py-1.5 items-center rounded-md"
                onClick={signIn}
              >
                <Google />
                <span className="ml-2">Sign In With Google</span>
                <Ripple />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
