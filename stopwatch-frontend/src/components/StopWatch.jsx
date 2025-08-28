import { useState , useRef, useEffect} from 'react'

const StopWatch = () => {

    const [time,setTime] = useState(0);
    const intervalRef = useRef(null);
    const StopWatchRef = useRef(null);
    const needToResume = useRef(false)

    useEffect(()=>{
      window.addEventListener("focus",handleFocus);
      window.addEventListener("blur",handleBlur);

      return () =>{
        window.removeEventListener("focus",handleFocus);
        window.removeEventListener("blur",handleBlur);
      }
    },[time])

    function handleFocus(){
      if(needToResume.current){
        needToResume.current = false;
        handleStart()
      }
    }

    function handleBlur(){
      needToResume.current = !!intervalRef.current;
      clearInterval(intervalRef.current)
    }

    function handleStart(){
        StopWatchRef.current = new Date().getTime() - time; //by reducing the time the timer will not start with 0
        if(intervalRef.current){
          clearInterval(intervalRef.current)
        }
        intervalRef.current = setInterval(() => {
            setTime(new Date().getTime() - StopWatchRef.current);
        },10)
    }

    function handlePause(){
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    function handleReset(){
      clearInterval(intervalRef.current);
      setTime(0)
    }

    function formatTime(){

      const ms = Math.floor( (time % 1000) /10).toString().padStart(2,"0");
      const s = Math.floor((time/1000) % 60).toString().padStart(2,"0");
      const m = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2,"0");
      const h = Math.floor(time / (1000 * 60 * 60)).toString().padStart(2,"0");

      return `${h}:${m}:${s}:${ms}`
    }


    
  return (
    <div>
      <h1>{formatTime()}</h1>
      <div style={{marginTop: "10px",display:"flex",gap:"10px"}}>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default StopWatch
