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
    <form onSubmit={handleSubmit}>
      <ul>
       {errors.map((error, i) => <li key={i}>{error}</li>)}
      </ul>
      <label>First Name
        <input
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>Last Name
        <input
        type='text'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      </label>
      <label>Email
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
      </label>
      <label>Password
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>Confirm Password
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type='submit'>Sign Up</button>
    </form>
  )
}

export default SignupFormPage;
