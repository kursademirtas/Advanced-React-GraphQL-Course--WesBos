import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import styled from 'styled-components';
import RequestReset from "../components/RequestReset";


const Grid = styled.div`
	display:grid;
	grid-template-columns:repeat(auto-fit, minmax(300px,1fr));
	grid-gap:2rem;
` 

function SignInPage() {
	return (
		<Grid>
			<SignIn />
			<SignUp />
			<RequestReset />
		</Grid>
	)
}

export default SignInPage;
