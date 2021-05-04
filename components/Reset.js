import { useState } from "react";
import gql from "graphql-tag";
import Form from "./styles/Form";
import { useMutation } from "@apollo/client";
import DisplayError from "./ErrorMessage";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

function Reset({ token }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  const [resetPassword, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: {
      email,
      token,
      password,
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await resetPassword().catch(console.error);
    console.log(res);
    console.log({ data, loading });
    clearForm();
  }

  const successfulError = data?.redeemUserPasswordResetToken?.code
  ? data?.redeemUserPasswordResetToken
  : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset>
        <DisplayError error={error || successfulError}/>
        <h2>Reset your password</h2>
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
        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
}

export default Reset;
