import useForm from "../lib/useForm";
import Form from './styles/Form';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import DisplayError from './ErrorMessage';
import {ALL_PRODUCTS_QUERY} from './Products'
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

const CreateProduct = () => {

	const {inputs, handleChange, clearForm} = useForm({
		name:'',
		price:1,
		description: '',
		image: ''
	});

	const [createProduct, {data, loading, error}] = useMutation(
		CREATE_PRODUCT_MUTATION, 
		{
			variables:inputs,
			refetchQueries: [{query: ALL_PRODUCTS_QUERY}]
		}
	)

	return (

		<Form onSubmit={async (e) => {
			e.preventDefault();
			console.log(inputs)
			const res = await createProduct();
			console.log(res)
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
			<label htmlFor="image">
				Image
				<input 
					required
					type="file" 
					id="image" 
					name="image" 
					onChange={handleChange} 
				/>
			</label>
			</fieldset>
			<button type="submit" >+ Add Product</button>
		</Form>
	)
}

export default CreateProduct;
