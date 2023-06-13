import { useState } from "react";
import { Link } from "react-router-dom";
import { imageUri, popularCuisines } from '../constant/data.js'
const Search = () => {

    const [searchKey, setSearchKey] = useState();
    const [searchedData, setSearchedData] = useState();
    const handleChange = async (e) => {
        setSearchKey(e.target.value);
        const getSearchData = await fetch("https://www.swiggy.com/dapi/restaurants/search/suggest?lat=22.6913636&lng=75.8450434&str="+searchKey+"&trackingId=undefined")
        const resultData = await getSearchData.json();
        console.log('resultData',resultData);
    }
    return (
        <>
            <div className="flex items-center justify-center container my-24 mx-auto px-4 md:px-12">
                <div className="flex border-2 rounded">
                    <input type="text" className="px-4 py-2 w-96" onChange={handleChange} name="searchString" id="searchString" placeholder="Search for restaurants and food" />
                    <button className="flex items-center justify-center px-4 border-l">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="text-center text-lg font-bold text-gray-900">Popular Cuisines</div>
            <div className="container">
                <ul className="flex place-content-center">
                    
                        {popularCuisines && popularCuisines.map(x =>
                        <Link to={x?.action?.link.slice(23).trim()}>
                            <li className="flex h-14" key={x.imageId}>
                            <img src={imageUri + x.imageId} />
                            </li>
                        </Link>
                        )}
                </ul>
            </div>
        </>

    )
}
export default Search;