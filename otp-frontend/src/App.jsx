import './App.css'
import Otp from './components/Otp'

function App() {

  function triggerChangeIfComplete(otp) {
    console.log("Completed OTP: ", otp)
  }
  
  return (
    <>
      <Otp length={4} onChangeOTP={triggerChangeIfComplete}/>
    </>
  )
}

export default App
