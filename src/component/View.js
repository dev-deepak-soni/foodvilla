import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { VIEW_PRODUCT_URL, imageUri } from "../constant/data";
import { addItem, removeItem } from "../redux/CartSlice";
import Shimmer from "./Shimmer";

const View = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    
    const cartItems = useSelector((Store)=>Store.cart.items);
    console.log('cartItems',cartItems);
    const [menuData , setMenuData] = useState();
    const [showBtn , setShowBtn] = useState();

    const handleAdd = (id) => {
        setShowBtn(`crement_${id}`);
    }

    const handleAddItem = (items) => {
        dispatch(addItem(items))
    }

    const handleRemoveItem = (items) => {
        dispatch(removeItem(items))
    }

    useEffect(()=>{
        fetchProductData();
    },[])

    const fetchProductData = async () => {
        const apicall = await fetch(VIEW_PRODUCT_URL+id);
        const result = await apicall.json();
        setMenuData(result.data)
        console.log('menuData',menuData);

    }

    return (!menuData)  ?  <Shimmer/> : (
        <div className="container my-16 mx-auto px-4 md:px-12">
            <div className="bg-purple-300">
                <img className="object-contain h-48 w-96 ..." src={imageUri+menuData.cloudinaryImageId} />
            </div>
            <ul className="list-decimal">
                {menuData && Object.values(menuData.menu.items).map( (x,i)=>
                    <li className="mt-2 p-2" key={x.id}> 
                        <div className="float-left h-10 w-10"><img src={imageUri+x.cloudinaryImageId} className={ (x.cloudinaryImageId) ?  "h-10 w-10" : "bg-gray-400 animate-pulse h-10 w-10"}/> </div>
                        <div className="float-left p-2">
                            <p>{x.name}</p>
                        </div>
                        <div className="float-left p-2">
                            <p>
                                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" id={`btn_${x.id}`} onClick={()=>handleAddItem(x)}>
                                    Add
                                </button>

                            </p>
                        </div>
                        <div className={(cartItems?.findIndex(y=>y.id == x.id) > -1 )  ? "float-left p-2" : "hidden"} id={`crement_${x.id}`}>
                            <p>
                            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>handleRemoveItem(x)}>-</button>
                                <span className="text-lg m-2 p-2">{
                                     (cartItems?.findIndex(y=>y.id == x.id) > -1 ) ? cartItems[i].qty : 0
                                }</span>
                            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>handleAddItem(x)}>+</button>


                            </p>
                        </div>
                        <div className="float-none clear-both"></div>
                    </li>
                    
                    )}
            </ul>
        </div>
    )
}

export default View;