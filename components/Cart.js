import { useCart } from '../lib/CartState';
import CartItem from './CartItem';
import CartStyles from './styles/CartStyles';
import SickButton from './styles/SickButton';
import Supreme from './styles/Supreme';
import { useUser } from './User';

export default function Cart() {
	const me = useUser();
	const { closeCart } = useCart();
	if(!me) return null;
	
	return <CartStyles open>
		<header>
			<Supreme>{me.name} Cart</Supreme>
			<SickButton onClick={closeCart} >X</SickButton>
		</header>
		<ul>
			{me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/> )}
		</ul>
	</CartStyles>
}