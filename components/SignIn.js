import Form from "./styles/Form";
import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: {
      email,
      password,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signin();
    setEmail("");
    setPassword("");
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign In Your Account</h2>
      <DisplayError error={error} />
      <fieldset>
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
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
