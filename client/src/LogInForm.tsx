import React, { useState } from "react";
import { useUserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const LOG_IN_FAILED_MSG = "Incorrect email or password";

export default function LogInForm() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const { setUserId } = useUserContext()!;
	const navigate = useNavigate();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

		event.preventDefault();
		setErrorMsg('');

		const formData = new FormData(document.forms[0]);
		const obj = Object.fromEntries(formData.entries());

		try {
			const response = await fetch('/rest/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(obj)
			});

			if (! response.ok)
				throw new Error("Couldn't log the user in. The server responded with status "
					+ response.status);

			const data = await response.json();

			if (! data.success)
				setErrorMsg(LOG_IN_FAILED_MSG);
			else {
				setUserId(data.userId);
				navigate('/chat');
			}
		}
		catch (error) {
			console.error('Error:', error);
		}
	}

	function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
	}

	function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>{errorMsg}</div>
			<div>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					value={email}
					onChange={handleEmailChange}
				/>
			</div>
			<div>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
				/>
			</div>
			<button type="submit">Log In</button>
		</form>
	);
}
