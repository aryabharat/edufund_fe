import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import axios from 'axios';
import {base_url} from '../../config/backend.json'

async function loginUser(key) {
  var config = {
    method: 'post',
    url: `${base_url}/login/`,
    data: {key}
  };
  // console.log(config)
 let {token} = (await axios(config)).data
 console.log(token);
 window.location.reload(); 
 return token
}

export default function Login({ setToken }) {
  const [key, setKey] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const token = await loginUser(key);
      setToken(token);
      setError(null)
    }catch(e){
      setError('invalid key')
      console.log(e);
    }
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>KEY</p>
          <input type="text" onChange={e => setKey(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        {error != null && <small style={{color:"red"}}>{error}</small> }
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};