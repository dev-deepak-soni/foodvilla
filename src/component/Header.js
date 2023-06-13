import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.png"
import Store from "../redux/Store";
const Header = () => {

    const cartItems = useSelector((Store)=>Store.cart.items)


    return (
        <div className="truncate inset-x-0 top-0 fixed flex md:flex md:flex-grow flex-row text-center border-solid shadow-xl h-16 bg-white">
            <div>
                <Link to="/">
                    Home
                    {/* <img className="h-11 ml-4" src={logo} /> */}
                    </Link>
                <span className="text-xs block text-gray-500 font-semibold hover:text-teal-300 transition duration-300"><i className="fa fa-map-marker"></i> BCC House</span>
            </div>
            <ul className="ml-5 flex md:flex md:flex-grow flex-row justify-end">
                <li className="mr-6">
                    <Link to="search" className="text-m block text-gray-500 font-semibold hover:text-teal-300 transition duration-300"><i className="fa fa-search"></i> Search</Link>
                </li>
                <li className="mr-6">
                    <Link to="offers" className="text-m block text-gray-500 font-semibold hover:text-teal-300 transition duration-300"><i className="fa fa-percent"></i> Offers</Link>
                </li>
                <li className="mr-6">
                    <Link to="help" className="text-m block text-gray-500 font-semibold hover:text-teal-300 transition duration-300"><i className="fa fa-info"></i> Help</Link>
                </li>
                <li className="mr-6">
                    <Link to="signin" className="text-m block text-gray-500 font-semibold hover:text-teal-300 transition duration-300"><i className="fa fa-sign-in"></i> Sign In</Link>
                </li>
                <li className="mr-6">
                    <Link to="cart" className="text-m block text-gray-500 font-semibold hover:text-teal-300 transition duration-300"><i className="fa fa-shopping-cart"></i> Cart {cartItems.length}</Link>
                </li>
            </ul>
        </div>
    )
}
export default Header;