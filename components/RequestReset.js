import Form from "./styles/Form";
import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import DisplayError from './ErrorMessage';


const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		sendUserPasswordResetLink(email:$email) {
			code
			message
		}
	}
`;

const RequestReset = () => {

  const [email, setEmail] = useState("");
  const [requestPasswordReset, { data,  loading,error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: {
      email,
    },
    //refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await requestPasswordReset();
	setEmail('');
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your password</h2>
      <DisplayError error={error} />
      <fieldset>
		{
			data?.sendUserPasswordResetLink === null &&
			<p>Check your mail for reset link!</p>
		}
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
        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
