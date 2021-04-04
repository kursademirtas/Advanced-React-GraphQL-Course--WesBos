import Form from "./styles/Form";
import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION($email: String!, $name:String!, $password:String!) {
		createUser(data: {email:$email,name:$name,password:$password}) {
			id
			email
			name
		}
	}
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  const [signup, { data,  loading,error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      email,
	  name,
      password,
    },
    //refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function clearForm() {
	setName('')
    setEmail("");
    setPassword("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup();
	console.log(res);
	clearForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an  Account</h2>
      <DisplayError error={error} />
      <fieldset>
		  {data?.createUser && <p>Signed up with {data.createUser.email}- Please Go Ahead and Sign In!</p> }
        <label htmlFor="name">
          Your Name
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Your name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
		<label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Your email addrees"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
