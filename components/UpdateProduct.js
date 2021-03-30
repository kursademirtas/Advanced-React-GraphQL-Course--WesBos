import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SINGLE_PRODUCT_QUERY = gql`
	query SINGLE_PRODUCT_QUERY($id:ID!) {
		Product(where: {id: $id}) {
			id
			name
			description
			price
		}
	}
`

const UPDATE_PRODUCT_MUTATION = gql`
	mutation UPDATE_PRODUCT_MUTATION(
		$id:ID!
		$name: String
		$description:String
		$price:Int
	) {
		updateProduct(
			id:$id,
			data: {
				name:$name,
				description:$description,
				price: $price
			}
		) {
			id
			name
			description
			price
		}
	}
`
export default function UpdateProduct({ id }) {

	const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
		variables: { id },
	});

	const [updateProduct, mutationResponse] = useMutation(UPDATE_PRODUCT_MUTATION);
	const { inputs, handleChange, clearForm } = useForm(data?.Product);
	if (loading) return <p>loading....</p>;

	return (
		<Form onSubmit={async (e) => {
			e.preventDefault();
			const response = await updateProduct({
				variables: {
					id,
					name: inputs.name,
					description: inputs.description,
					price: inputs.price,
				},
			}).catch(console.error);
		}}>
			<DisplayError error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
				<label htmlFor="name">
					Name
				<input
						type="text"
						id="name"
						name="name"
						placeholder="Name"
						value={inputs.name}
						required
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="price">
					Price
				<input
						type="number"
						id="price"
						name="price"
						placeholder="Price"
						value={inputs.price}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="description">
					Description
				<textarea
						id="description"
						name="description"
						placeholder="Description"
						value={inputs.description}
						onChange={handleChange}
					/>
				</label>
			</fieldset>
			<button type="submit" >+ Update Product </button>
		</Form>
	);
}