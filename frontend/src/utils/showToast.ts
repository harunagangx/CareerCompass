import { toast } from 'sonner';

interface ToastTypeProps {
  type?: 'success' | 'error';
}

const showToast = (message: string, type?: ToastTypeProps) => {
  switch (type?.type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    default:
      toast(message);
      break;
  }
};

export default showToast;
