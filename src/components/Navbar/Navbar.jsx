import React, { useContext, useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import rocket from '../../assets/rocket.png'
import star from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'
import LinkWithIcon from './LinkWithIcon';
import UserContext from '../../contexts/UserContext';
import CartContext from '../../contexts/CartContext'; // Importing CartContext
import { getSuggestionsAPI } from '../../Services/ProductServices'


const Navbar = () => {
  const [search, setSearch] = useState("");
  const user = useContext(UserContext);
  const [selectedItem, setSelectedItem] = useState(-1);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`); // Navigate to search results
    }
    setSuggestions([]); // Clear suggestions after search
  };

  useEffect(() => {
    const delaySuggestions =setTimeout(() => {
      if (search.trim() !== "") {
      getSuggestionsAPI(search).then((res) => {
        setSuggestions(res.data);
      }).catch((err) => {
        console.log("Error fetching suggestions:", err);
      });
    } else{
      setSuggestions([]); // Clear suggestions if search is empty
    }
    }, 300);
    return () => {
      clearTimeout(delaySuggestions); // Clear timeout on unmount or search change
    }
  }, [search]);

  const handleKeyDown = (e) => {
    if(selectedItem < suggestions.length){ 
    if (e.key === 'ArrowDown') {
      setSelectedItem(current => (current === suggestions.length - 1 ? 0 : current + 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedItem(current => (current === 0 ? suggestions.length - 1 : current - 1));
    }else if (e.key === 'Enter' && selectedItem > -1) {
    const suggestion = suggestions[selectedItem];
    navigate(`/products?search=${suggestion.title}`);
    setSearch("");
    setSuggestions([]);
  }else{
      setSelectedItem(-1); // Reset selected item if not navigating
  }
}

  }
  return (
    <nav className='align_center navbar'>
      <div className='align_center'>
        <h1 className='navbar_heading'>Cart Wish</h1>
        <form action="" className='align_center navbar_form' onSubmit={handleSubmit}>
          <input type="text"
           placeholder='Search Products'
            className='navbar_search'  
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <button type="submit" className='search_button'>Search</button>
           {suggestions.length > 0 && <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li key={suggestion._id} className={selectedItem===index?'search_suggestion_link active':'search_suggestion_link'}>
                  <Link to={`/products?search=${suggestion.title}`} onClick={() => {
                    setSearch("");
                    setSuggestions([]);
                  }}>
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>}
        </form>
      </div>
      <div className='align_center navbar_links'>
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />
        { !user && <>
          <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
          <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
        </>}
       { user && <>
         <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
         <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
         <NavLink to="/cart" className='align_center'>
          Cart <p className='align_center cart_counts'>{cart.length}</p>
         </NavLink>
       </>}
      </div>
    </nav>
  );
}

export default Navbar

