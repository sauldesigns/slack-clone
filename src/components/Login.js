import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../services/firebase';
import { useStateValue } from '../provider/StateProvider';
import { actionTypes } from '../provider/reducer';

function Login() {
	const [, dispatch] = useStateValue();
	const signIn = (e) => {
		e.preventDefault();
		auth
			.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((error) => alert(error.message));
	};
	return (
		<div className='login'>
			<div className='login__container'>
				<img src='https://bit.ly/33KASWr' alt='' />
				<h1>Sign in to Slack Clone</h1>
				<p>slack-clone.sauldesigns.me</p>
				<Button onClick={signIn}>Sign In with Google</Button>
			</div>
		</div>
	);
}

export default Login;
