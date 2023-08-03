import React, {useState} from "react";
import './NewAccount.css';


function NewAccount(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setlastNameError] = useState('');

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
          let res = await fetch("/clients/newAccount", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            }),
          });
          
          if (res.status === 200) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            alert("Account created successfully.");
            
          } else {
            const data = await res.json();
            setEmailError(data.message);          
          }
        } catch (err) {
          console.log(err);
        }
      };

      const checkError = async (e) => {
        e.preventDefault();
            
        try {
            let res = await fetch("/login", {
              method: "POST",
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
              body: JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
              }),
            })
          const data = await res.json()
          .then((data) => {
            if(data.fieldErrors) {
              data.fieldErrors.forEach(fieldError => {
                if(fieldError.field === 'email'){
                  setEmailError(fieldError.message);            
                }   
                if(fieldError.field === 'password'){
                  setPasswordError(fieldError.message);
                }
                if(fieldError.field === 'firstName'){
                    setFirstNameError(fieldError.message);
                }
                if(fieldError.field === 'lastName'){
                    setlastNameError(fieldError.message);
                }
              });
            } else {
              handleSubmit(e);
            }
          })} catch (err) {
            console.log(err);
          }
      };

      return (
        <div className="NewAccount">
          <form onSubmit={checkError}>
          { firstNameError ? <span style={{ color: 'red', fontSize: '12px'}}>{firstNameError}</span> : '' }
            <input
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => {setFirstName(e.target.value); setFirstNameError('')}}
            />
            
            { lastNameError ? <span style={{ color: 'red', fontSize: '12px'}}>{lastNameError}</span> : '' }
            <input
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => {setLastName(e.target.value); setlastNameError('')}}
            />
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
            
    
            <button type="submit">Create</button>
 
          </form>
        </div>
      );

    
    }

export default NewAccount;
