import styled from 'styled-components';
import formatMoney from '../lib/formatMoney'

const CartItemStyles = styled.div`
	padding:1rem 0;
	border-bottom: 1px solid lightgray;
	display:grid;
	grid-template-columns: auto 1fr auto;
	img {
		margin-right:1px;
		width:100px;
	}

`

const CartItem = ({ cartItem }) => {
	const { product } = cartItem;
	if(!product) return <h1>You dont have any product in your cart!</h1>;
	console.log(product)
	return (
		<CartItemStyles>
			<img src={product.photo.image.publicUrlTransformed} alt={product.name} width='100'/>
			<div>
				<h2>{product.name}</h2>
				<p>Total:{formatMoney(product.price * cartItem.quantity )}</p>
			</div>
		
		</CartItemStyles>
	)
}

export default CartItem
