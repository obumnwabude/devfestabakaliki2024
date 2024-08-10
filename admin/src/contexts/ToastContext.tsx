import { Toast } from 'primereact/toast';
import { ReactNode, createContext, useContext, useRef } from 'react';

interface ToastContextProps {
  toast: (opts: { detail: string; success: boolean }) => void;
}

const ToastContext = createContext<ToastContextProps>({
  toast: () => {}
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toast = useRef<Toast>(null);

  const show = ({ detail, success }: { detail: string; success: boolean }) => {
    if (!toast.current) return;
    toast.current.show({
      severity: success ? 'success' : 'error',
      summary: success ? 'Successful' : 'Error Occured',
      detail,
      life: 12000
    });
  };

  return (
    <ToastContext.Provider value={{ toast: show }}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};
