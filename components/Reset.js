import { useState } from "react";
import gql from "graphql-tag";
import Form from "./styles/Form";
import { set } from "nprogress";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      data: { email: $email, token: $token, password: $password }
    ) {
      code
      message
    }
  }
`;

function Reset() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  const [resetPassword, { data, loading }] = useMutation(RESET_MUTATION, {
    variables: {
      email,
      password,
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await reset().catch(console.error);
    console.log(res);
    clearForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset>
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
