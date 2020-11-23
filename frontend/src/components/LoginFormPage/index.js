import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import './LoginForm.css'
import './Navigation.css'

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if(sessionUser) return (
    <Redirect to ='/' />
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(res => {
        if(res.data && res.data.errors) setErrors(res.data.errors);
      });
  }


  return (
    <div className='loginContainer'>
      <form onSubmit={handleSubmit}>
        <div className='formHeader'>
          <div className='circleContainer'>
            <div className='formCircleOne'></div>
            <div className='formCircleTwo'></div>
          </div>
          <h3>Login with an ccount</h3>
        </div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        {/* <label>Email</label> */}
        <input
          type='text'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder='Email'
          required
        />
        {/* <label>Password</label> */}
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        <div className='buttonDiv'>
          <button type='submit'>Log In</button>
        </div>
      </form>
    </div>
  )
}

export default LoginFormPage;
