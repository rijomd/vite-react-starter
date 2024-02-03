import { toast } from 'react-toastify';

export const useNotify = (message: string, type: "error" | "success") => {
    toast[type](message,
        {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
}