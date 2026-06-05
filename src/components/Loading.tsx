import './Loading.css'

export default function Loading(): React.JSX.Element {
  return (
    <div className='loading-container'>
        <div className='loading-ball-1'></div>
        <div className='loading-ball-2'></div>
        <div className='loading-ball-3'></div>
    </div>
  )
}