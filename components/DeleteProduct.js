import { useMutation } from "@apollo/client";
import gql from "graphql-tag"


const DELETE_PRODUCT_MUTATION = gql`
	mutation DELETE_PRODUCT_MUTATION($id: ID!) {
		deleteProduct(id: $id) {
			id
			name
		} 
	}
`;


function updateCache(cache, payload) {

	cache.evict(cache.identify(payload.data.deleteProduct));
}



export default function DeleteProduct({ id, children }) {

	const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT_MUTATION, {
		variables: { id },
		updateCache
	})

	return (
		<button
			type="button"
			disabled= {loading}
			onClick={() => {
				if(confirm('Are u sure want to delete this product?')) {
					deleteProduct().catch(error => alert(error.message))
				}
			}}>
			{children}</button>)
}