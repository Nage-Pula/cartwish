import React, { useEffect, useState } from "react";
import { getJwt, getUser } from "./Services/userServices";

import UserContext from "./contexts/UserContext";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI, decreaseProductAPI, increaseProductAPI } from "./components/Cart/cartServices"; // Importing the addToCart function
import { set } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCartAPI } from "./components/Cart/cartServices"; // Importing the getCart function
import CartContext from "./contexts/CartContext";
import { removeFromCartAPI } from "./components/Cart/cartServices"; // Importing the removeFromCart function

setAuthToken(getJwt());

const App = () => {
	const [user, setUser] = useState(null);
	const [cart, setCart] = useState([]);
	useEffect(() => {
		try {
			const jwtUser = getUser();

			if (Date.now() >= jwtUser.exp * 1000) {
				localStorage.removeItem("token");
				location.reload();
			} else {
				setUser(jwtUser);
			}
		} catch (error) {}
	}, []);
	const addToCart = (product, quantity) => {
		const updatedCart = [...cart];
		const productIndex = updatedCart.findIndex(
			(item) => item._id === product._id
		);
		if (productIndex === -1) {
			updatedCart.push({ product, quantity });
		} else {
			updatedCart[productIndex].quantity += quantity;
		}
		setCart(updatedCart);

		addToCartAPI(product._id, quantity)
			.then((res) => {
				toast.success("Product added to cart successfully!");
			})
			.catch((err) => {
				toast.error("Failed to add product to cart.");
				setCart(oldCart); // Clear cart on error
			});
	};

	const removeFromCart = id => {
		const oldCart = [...cart];
		const newCart = oldCart.filter(item => item.product._id !== id);
		setCart(newCart);
		removeFromCartAPI(id)
			.then((res) => {
				toast.success("Product removed from cart successfully!");
			})
			.catch((err) => {
				toast.error("Failed to remove product from cart.");
				setCart(oldCart); // Restore old cart on error
			});
	};

	const updateCart = (type,id) => {
		const updatedCart = [...cart];
		const productIndex = updatedCart.findIndex(
			(item) => item.product._id === id)
			if(type ==="increase"){
				updatedCart[productIndex].quantity += 1;
				setCart(updatedCart);
				increaseProductAPI(id)
					.then((res) => {
						toast.success("Product quantity increased successfully!");
					})
					.catch((err) => {
						toast.error("Failed to increase product quantity.");
						setCart(oldCart); // Restore old cart on error
					});
			}else if(type ==="decrease"){
				updatedCart[productIndex].quantity -= 1;
				setCart(updatedCart);
				decreaseProductAPI
					.then((res) => {
						toast.success("Product quantity decreased successfully!");
					})
					.catch((err) => {
						toast.error("Failed to decrease product quantity.");
						setCart(oldCart); // Restore old cart on error
					});
			}
			
    }

	const getCart = () => {
		// Assuming you have a function to fetch the cart items
		getCartAPI()
			.then((res) => {
				setCart(res.data);
			})
			.catch((err) => {
				toast.error("Failed to fetch cart items.");
			});
	};
	useEffect(() => {
		if (user) {
			getCart();
		}
	}, [user]);

	return (
		<UserContext.Provider value={user}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart, setCart }}>
			<div className="app">
				<Navbar   />
				<main>
					<ToastContainer position="bottom-right" />
					<Routing  />
				</main>
			</div>
      </CartContext.Provider>
		</UserContext.Provider>
	);
};

export default App;
