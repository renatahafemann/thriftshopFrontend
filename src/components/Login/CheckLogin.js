import React, {useState} from "react";
import '../Signup/NewAccount.css'
import { Navigate } from "react-router-dom";

function CheckLogin({onLogin}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState(''); 
    const [authenticated, setAuthenticated ] = useState(false);    
    
    let handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          let res = await fetch("/clients/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
          });
          
          const data = await res.json();
          if (res.status === 200) {                       
            const clientId = data.id;  
            const firstName = data.firstName;        
            onLogin({email, clientId, firstName});
            setAuthenticated(true);
            
          } else {            
            setEmailError(data.message);              
          }
        } catch (err) {
          console.log(err);
        }
      };

    let checkError = async (e) => {
        e.preventDefault();

        try {
          let res = await fetch("/verification/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify({               
                email: email,
                password: password,
            }),
          });
          const data = await res.json();
            if(data.fieldErrors) {
              data.fieldErrors.forEach(fieldError => {
                if(fieldError.field === 'email'){
                  setEmailError(fieldError.message);            
                }   
                if(fieldError.field === 'password'){
                  setPasswordError(fieldError.message);
                }               
              });
            } else {     
              handleSubmit(e);       
            }          
        }
         catch (err) {
          console.log(err);
        }
      };

      if(authenticated){
        return <Navigate replace to="/"/>;
      } else{

      return (
        
        <div className="NewAccount">
          <form onSubmit={checkError}>
          
            { emailError ? <span style={{ color: 'red', fontSize: '12px'}}>{emailError}</span> : '' }
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => {setEmail(e.target.value); setEmailError('')}}
            />
            { passwordError ? <span style={{ color: 'red', fontSize: '12px'}}>{passwordError}</span> : '' }
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {setPassword(e.target.value); setPasswordError('')}}
            />        
    
            <button type="submit">Login</button>
 
          </form>
        </div>
      );
    }}

export default CheckLogin;
