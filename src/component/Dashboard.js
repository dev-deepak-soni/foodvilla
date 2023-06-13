import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiUri } from '../constant/data.js'
import Shimmer from "./Shimmer.js";

const Dashboard = () => {

    const [restaurents, setRestaurents] = useState([]);

    const fetchRestaurents = async () => {
        const restaurentsData = await fetch(ApiUri);
        const result = await restaurentsData.json();
        setRestaurents(result?.data?.cards)
    }

    useEffect(() => {
        fetchRestaurents();
    }, [])

    return (
        <div className="container my-16 mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-5">
                {(restaurents.length == 0) ? <Shimmer /> : restaurents.map(x =>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 shadow-lg" key={x?.data?.data?.id}>
                        <Link to={`view/${ x?.data?.data?.id}`}>
                            <article className="overflow-hidden rounded-lg shadow-lg">

                                <img alt="Placehold er" className="block h-auto w-full" src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${x?.data?.data?.cloudinaryImageId}`} />


                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">

                                        {x?.data?.data?.name}
                                    </h1>
                                    <p className="text-grey-darker text-sm">
                                        {x?.data?.data?.area}
                                    </p>
                                </header>

                                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                    <span className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                        {x?.data?.data?.avgRating}
                                        <span className="hidden">Rating</span>
                                        <i className="fa fa-star ml-1"></i>
                                    </span>
                                    <span className="flex items-center no-underline hover:underline text-black" href="#">
                                        <i className="fa fa-map-marker"></i>
                                        <p className="ml-2 text-sm">
                                            {x?.data?.data?.lastMileTravelString}
                                        </p>
                                    </span>
                                </footer>

                            </article>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Dashboard;