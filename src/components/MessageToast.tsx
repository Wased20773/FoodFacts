import './MessageToast.css'

type Props = {
    message: string;
}

export default function MessageToast({message}: Props): React.JSX.Element {
    return (
        <div className="message-toast-container">
            <p className='message-toast'>{message}</p>
        </div>
    )
}