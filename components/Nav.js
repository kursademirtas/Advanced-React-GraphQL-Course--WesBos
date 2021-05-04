import React from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";
import SignOut from "./SignOut";
import { useCart } from "../lib/CartState";

const Nav = () => {
  const user = useUser();
  const { openCart } = useCart()
  console.log(openCart)
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button onClick={openCart}>Cart🛒</button>
        </>
      )}
	  {!user && (
		  <Link href="/signin">Sign In</Link>
	  )

	  }
    </NavStyles>
  );
};

export default Nav;
