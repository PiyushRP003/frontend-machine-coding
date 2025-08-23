import React, { useRef, useState } from "react";

const Otp = ({ length ,onChangeOTP}) => {
  const [otp, setotp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const triggerChangeIfComplete = (otpArr) => {
    const joined = otpArr.join("");
    if (otpArr.every((val) => val !== "")) {
      onChangeOTP?.(joined);
    }
  };

  function SetFocusRight(index){
    if(inputRefs.current[index + 1]){
      inputRefs.current[index + 1]?.focus()
    }
  }

  function SetFocusLeft(index){
    if(inputRefs.current[index - 1]){
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handleSelection(){
    return (e) =>{
      e.target.setSelectionRange(1,1)
    }
  }

  const handleChange = (e, index) => {
    let value = e.target.value;
    if (isNaN(value)) return;

    let newValue = value.trim()
    let arrNewOTP = [...otp];
    arrNewOTP[index] = newValue;
    setotp(arrNewOTP);
    newValue && SetFocusRight(index);

    triggerChangeIfComplete(arrNewOTP)

  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    if (!/^\d+$/.test(pastedData)) return;
    const digits = pastedData.replace(/\D/g, "").slice(0, length).split("");
    if (digits.length === 0) return;


    const newOTP = [...otp];
    digits.forEach((digit, i) => {
      newOTP[i] = digit;
    });
    setotp(newOTP);

    // Focus the next empty box after paste
    inputRefs.current[newOTP.length-1]?.focus()
    triggerChangeIfComplete(newOTP)
    
  };

  function handlekeyup(index) {

    return (e) => {
   
      if(e.key.toLowerCase() === "backspace"){
        SetFocusLeft(index);
        return;
      }

      if(e.key.toLowerCase() === "arrowright"){
        SetFocusRight(index);
        return;
      }

      if(e.key.toLowerCase() === "arrowleft"){
        SetFocusLeft(index);
        return
      }

    };
  }

  return (
    <div onPaste={handlePaste}>
      <h2>Please Enter the OTP</h2>
      {new Array(length).fill("").map((_, index) => {
        return (
          <input
            key={index}
            ref={(iRef) => (inputRefs.current[index] = iRef)}
            value={otp[index ?? ""]}
            maxLength={1}
            onKeyUp={handlekeyup(index)}
            onClick={handleSelection()}
            onChange={(e)=>{handleChange(e,index)}}
            type="text"
            style={{
              width: "30px",
              height: "30px",
              margin: "5px",
              textAlign: "center",
            }}
          />
        );
      })}
    </div>
  );
};

export default Otp;
