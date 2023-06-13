import { useDispatch, useSelector } from "react-redux";
import { EmptyCart } from "./Shimmer";
import { imageUri } from "../constant/data";
import { addItem, removeItem } from "../redux/CartSlice"
import { useNavigate } from "react-router-dom";
// import Store from '../redux/Store'


const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleAddItem = (items) => {
        dispatch(addItem(items))
    }

    const handleRemoveItem = (items) => {
        dispatch(removeItem(items))
    }

    const cartItems = useSelector((Store) => Store.cart.items);
    const totalPrice = useSelector((Store) => Store.cart.totalPrice);
    console.log('cartItems cart', cartItems);

    const testVerify = async () => {
        try {
            const apiVerify = await fetch("http://localhost:5000/payment/verify", {
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "razorpay_payment_id": "pay_LMYOIAfSwXqR6w",
                    "razorpay_order_id": "order_LMYO3wVeLXMWzS",
                    "razorpay_signature": "3bb0b8be2c05df1a9d9583c5da4ec3b546d5f3b7bfa820b233a0e22a22136bf9"
                }),
            });
            const resultVerify = await apiVerify.json();
            if (resultVerify.signatureIsValid) {
                navigate("/paymentSuccess");
            } else {
                navigate("/paymentFail");
            }
            console.log('resultVerify', resultVerify.signatureIsValid);
        } catch (error) {
            console.log('error', error.message);

        }
    }

    const handleCheckOut = async () => {
        const apicall = await fetch("http://localhost:5000/create/order",{
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "amount": totalPrice*100
            }),
        });
        const result = await apicall.json();
        console.log('result', result);
        if (result.id) {
            var options = {
                "key": "rzp_test_mpoYxkBVkNFiuK", // Enter the Key ID generated from the Dashboard
                "amount": totalPrice*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "GURU Kripa",
                "description": "food payment",
                "image": "https://lh3.googleusercontent.com/a/AEdFTp5jWpbrlpIPl6HVH1XK2d1U5NQKzpKveSYvOxuOMA=s96-c",
                "order_id": result.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": async function (response) {
                    console.log(response.razorpay_payment_id);
                    console.log(response.razorpay_order_id);
                    console.log(response.razorpay_signature)
                    try {
                        const apiVerify = await fetch("http://localhost:5000/payment/verify", {
                            "method": "POST",
                            "timeout": 0,
                            "headers": {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "razorpay_payment_id": response.razorpay_payment_id,
                                "razorpay_order_id": response.razorpay_order_id,
                                "razorpay_signature": response.razorpay_signature
                            }),
                        });
                        const resultVerify = await apiVerify.json();
                        if (resultVerify.signatureIsValid) {
                            navigate("/paymentSuccess");
                        } else {
                            navigate("/paymentFail");
                        }

                    } catch (error) {
                        console.log('error', error.message);
                    }

                },
                "prefill": {
                    "name": "Gaurav Kumar",
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
        }

    }



    return (!cartItems) ? <EmptyCart /> : (
        <div className="container my-16 mx-auto px-4 md:px-12">
            <div className="flex">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((x, i) =>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={x.id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {i + 1}
                                </th>
                                <td className="px-6 py-4">
                                    <img src={imageUri + x.cloudinaryImageId} className={(x.cloudinaryImageId) ? "h-10 w-10" : "bg-gray-400 animate-pulse h-10 w-10"} />
                                </td>
                                <td className="px-6 py-4">
                                    {x.name}
                                </td>
                                <td className="px-6 py-4">
                                    ₹{x.price / 100}
                                </td>
                                <td className="px-6 py-4">
                                    <button type="button" className="focus:outline-none text-white bg-red-400 hover:bg-red-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-400 dark:hover:bg-red-400 dark:focus:ring-red-900" onClick={() => handleRemoveItem(x)}>-</button>
                                    {x.qty}
                                    <button type="button" className="ml-2 text-gray-900 bg-gray border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" id={`btn_${x.id}`} onClick={() => handleAddItem(x)}>
                                        +
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    ₹{(x.price / 100) * x.qty}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div id="summary">
                <div className="text-xl text-center">Summary Items</div>
                <div className="text-lg">Total Products {cartItems.length}</div>
                <div className="text-lg">Total Price {totalPrice}</div>
                <div><button className="rounded bg-green-900 text-white" onClick={handleCheckOut}>Checkout</button></div>
                {/* <div><button id="rzp-button1">Pay</button></div> */}
            </div>
        </div>
    )
}
export default Cart;




