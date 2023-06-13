import logo from "../assets/logo/logo.png";
import {Link} from "react-router-dom";
const Footer = () => {
    return (
        <div className="truncate inset-x-0 bottom-0 fixed flex md:flex md:flex-grow flex-row text-center border-solid shadow-xl h-16 bg-black text-white">
        <div>
            {/* <img className="h-11 ml-4" src={logo} /> */}
        </div>
        <div className="ml-5">Swiggy @2023</div>
        <ul className="ml-10 flex md:flex md:flex-grow flex-row justify-end">
            <li className="mr-6">
                <Link to="#!" className="text-blue-500 hover:text-blue-800"> <i className="m-5 fa fa-facebook"></i></Link>
            </li>
            <li className="mr-6">
                <Link to="#!" className="text-blue-500 hover:text-blue-800"><i className="m-5 fa fa-pinterest"></i></Link>
            </li>
            <li className="mr-6">
                <Link to="#!" className="text-blue-500 hover:text-blue-800"><i className="m-5 fa fa-instagram"></i></Link>
            </li>
            <li className="mr-6">
                <Link to="#!" className="text-blue-500 hover:text-blue-800"><i className="m-5 fa fa-twitter"></i></Link>
            </li>
        </ul>
    </div>
    )
}

export default Footer;