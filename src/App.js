import React, { useState } from 'react';
import './App.scss'

const App = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let result = []; 

  const rules = [
    { name: 'characters', regex: /.{6,}/, description: "At least 6 characters" },
    { name: 'numbers', regex: /.*[0-9].*/, description: "At least 1 number" },
    { name: 'lowercase', regex: /[a-z]/, description: "At least 1 lower case character" },
    { name: 'uppercase', regex: /[A-Z]/, description: "At least 1 upper case character" },
    { name: 'specials', regex: /[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/, description: "At least 1 special character" }
  ]

  const checkPassword = regex => regex.test(password);
  const confirmPass = () => password === confirmPassword ? true : false;

  const finalCheck = () => {
    let tempSum = 0;
    rules.forEach(rule => {
      if(checkPassword(rule.regex) === true) {
        result.push(rule.name)
        tempSum ++;
      }
    })

    return tempSum === rules.length ? true : false;
  }

  const handleClick = () => {
    let isValidate = finalCheck();
    let invalidRules = [];
    let passwordMatched = confirmPass();

    for (let i = 0; i < rules.length; i ++) {
      if(result.indexOf(rules[i].name) < 0) invalidRules.push(rules[i].description);
    }

    return isValidate === true ? alert("Valid password!!!") : passwordMatched === true ? alert(invalidRules.join(" \n")) : alert("Unmatched password!!!")
  }

  return (
    <div className="app">
      <input
        type="password"
        placeholder="input password"
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="confirm password"
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <br />
      <button onClick={handleClick}> Submit </button>
    </div>
  );
}

export default App;
