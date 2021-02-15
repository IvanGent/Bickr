import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignupForm.css'

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  if(sessionUser) return <Redirect to='/' />

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({email, firstName, lastName, password}))
        .catch(res => {
          if(res.data && res.data.errors) setErrors(res.data.errors);
        })
    }
    return setErrors(['Confirm Password field does not match Password field']);
  }

  return (
    <div className='signupContainer'>
      <form onSubmit={handleSubmit}>
        <div className='formHeader'>
          <div className='circleContainer'>
            <div className='formCircleOne'></div>
            <div className='formCircleTwo'></div>
          </div>
          <h3>Sign up for Bickr</h3>
        </div>
        <ul>
         {errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
        <input
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder='First Name'
          required
        />
        <input
        type='text'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder='Last Name'
        required
        />
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
          required
        />
        <div className='buttonDiv'>
          <button type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default SignupFormPage;
