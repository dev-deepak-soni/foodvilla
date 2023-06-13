import { useRouteError } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";


const Error = () => {
const err = useRouteError();
    return (
       <>
       <Header />
       <div className="container my-16 mx-auto px-4 md:px-12">
        <h3>Error  Occurred {err.message}</h3>
       </div>
       <Footer />
       </>
    )
}

export default Error;