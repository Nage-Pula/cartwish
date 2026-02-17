import React, { useEffect, useState } from "react";
import { getJwt, getUser } from "./Services/userServices";
import "./globalbutton.scss";

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
import { removeFromCartAPI } from "./components/Cart/cartServices"; // Importing the 
import { setPXGlobalContext } from "./utils/pcGlobalContext";
import { BrowserRouter as Router, useLocation } from "react-router-dom";



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
	// ✅ PX: Trigger identify and page after user is set
	useEffect(() => {
		const user = getUser();
		let i=1;
		 const date = new Date("December 17, 2027");

		if (user && window.aptrinsic) {
			window.aptrinsic("identify", {
				'id': user._id|| "user_id_NOTTRACKED", // user info
				'email': user.email || "userEmail@address.com",
				'firstName': user.name || "name_NOTTRACKED",
				'lastName': user.name || "lastname_NOTTRACKED",
				'password': user.password || "password_NOTTRACKED",
				'city': user.deliveryAddress || "address_NOTTRACKED",
				'first_login_date': date,
				'houseName':user.name+" Surray",
				'Language':"English"
			}, {
				'id': user.account || "account_id_NOTTRACKED", // account info
				'name': user.account || "accountName_NOTTRACKED",
				'boolean_id':true,
				'NumberAccountId':i++,
				'Extra':'Values are ' + i++,
				'Lastdate':date,	
				'CompanyName':user.account+" Account"	
			}	
		);
			// Optional: track page
			window.aptrinsic("page");
		}
		 // Add global context right after identify
				setPXGlobalContext({
				city: "Hyderabad",
				role: "user.role",
				plan: "Pro"
				});

				(function () {
    function handleURLChange() {
        const currentURL = window.location.href;
        console.log("Current page URL nage:", currentURL);
        aptrinsic('set', 'user', { "URL": currentURL });
		window.aptrinsic('pageView');
        if (currentURL.includes("news.html")) {
            aptrinsic('set', 'globalContext', { "currentPageURL": currentURL, "subProductLevel2":{"name":"com.bmc.dsom.hgm","version":"25.3.00"} });
        } else {
            aptrinsic('set', 'globalContext', { "currentPageURL": currentURL,
				"subProductLevel2":{"name":"com.bmc.dsom.hgm","version":"25.3.00"}
			 });
        }
		// aptrinsic('track', 'dailyApiCalls', 
		// 		{
		// 		"timestamp":1658965172096,
		// 		"apiCalls":10512,
		// 		"apiType":"RESTful",
		// 		"Category":"Machine Learning",
		// 		"subscriptionName":"GCP"
		// 		}
		// 	); 
    }
	// aptrinsic("bot","search",{
	// 	 "labels":["knowledge center"]
	// });
	aptrinsic("kcb","search",{
		 "labels":["knowledge center"]
	});

    window.addEventListener('load', handleURLChange);
	
})();
	}, [user]);
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

function RouteWatcher() {
  const location = useLocation();

  useEffect(() => {
    // When route changes, update context
    setPXGlobalContext({
      currentRoute: location.pathname
    });
  }, [location]);

  return null; // nothing to render
}

function AppTracking() {
  useEffect(() => {
    // On login or first load after identify
    const userPersona = "User1"; // replace with your user role from login
    const uiVersion = "v2";
    const tenantId = "TENANT_123";
    const isBetaUser = true;

    setPXGlobalContext({
      'persona': userPersona,   // string
      'uiVersion': uiVersion,   // string/number
      'tenantId': tenantId,     // string
      'isBeta': isBetaUser      // boolean
    });
  }, []);
}

/********************************************************************************************/

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
