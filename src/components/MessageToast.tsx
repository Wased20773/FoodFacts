import type { Toast } from '../types/toast';
import iconX from '../assets/icon-x.png'
import './MessageToast.css'

type Props = {
    toast: Toast;
    setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
}

export default function MessageToast({toast, setToasts}: Props): React.JSX.Element {
    function deleteToast(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string): void {
        event.currentTarget.closest('.message-toast-container-normal')?.classList.add('closing');

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 500);
    }

    return (
        <div id={`toast-${toast.id}`} className={toast.isError ? 'message-toast-container-error' : 'message-toast-container-normal'}>
            <p className={toast.isError ? 'message-toast-error' : 'message-toast-normal'}>
                {toast.message}
                
                {toast.isError === false && 
                    <button
                        id={toast.id}
                        style={{background: 'none', border: 'none'}}
                        onClick={(event) => deleteToast(event, toast.id)}
                    ><img src={iconX} width={20}></img></button>
                }
            </p>
        </div>
    );
}