import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
	mutation {
		endSession
	}
`
function SignOut({children}) {

	const [signout] = useMutation(SIGN_OUT_MUTATION, {
		refetchQueries: [{query: CURRENT_USER_QUERY}]
	});

	return (
	 <button type="button" onClick={signout}>
		 Sign Out
		 {children}
	 </button>
	)
}

export default SignOut;
