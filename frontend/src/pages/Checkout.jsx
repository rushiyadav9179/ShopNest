import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import '../styles/checkout.css';

const Checkout = () => {

  const { user } = useContext(AuthContext);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();


  // ==============================
  // SHIPPING ADDRESS
  // ==============================

  const [address, setAddress] = useState({

    fullName: '',

    street: '',

    city: '',

    postalCode: '',

    country: ''

  });


  // ==============================
  // TOTAL PRICE
  // ==============================

  const totalPrice = cartItems.reduce(

    (acc, item) =>
      acc + item.price * item.qty,

    0

  );



const bypassPayment = async () => {
  try {
    // Convert frontend cart items to the format expected by backend
    const formattedItems = cartItems.map((item) => ({
      productID: item.productId,
      quantity: item.qty,
      price: item.price
    }));

    console.log("Original Cart Items:", cartItems);
    console.log("Items Sent To Backend:", formattedItems);

const saveOrderRes = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`
  },
  body: JSON.stringify({
    items: formattedItems,
    totalAmount: totalPrice,
    address: {
      fullName: address.fullName,
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country
    },
    paymentId: 'bypass_txn_' + Date.now()
  })
});

const data = await saveOrderRes.json();

console.log("STATUS:", saveOrderRes.status);
console.log("ORDER RESPONSE:", data);

if (saveOrderRes.ok) {
  alert("Order placed successfully!");

  dispatch(clearCart());

  navigate('/');
} else {
  console.error("ORDER CREATION FAILED:", data);

  alert(
    data.message ||
    data.error?.message ||
    "Error creating order"
  );
}

  } catch (error) {
    console.error("ORDER ERROR:", error);

    alert("Something went wrong while creating the order");
  }
};



  // ==============================
  // FORM SUBMIT
  // ==============================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Check Login

    if (!user) {

      alert(
        "Please login first"
      );

      navigate('/login');

      return;

    }


    // Check Cart

    if (cartItems.length === 0) {

      alert(
        "Your cart is empty"
      );

      return;

    }


    // Student/Test Bypass

    await bypassPayment();

  };


  // ==============================
  // UI
  // ==============================

  return (

    <div className="checkout-container">

      <h2>
        Checkout
      </h2>


      <div className="checkout-content">


        <form

          onSubmit={handleSubmit}

          className="shipping-form"

        >


          <h3>
            Shipping Address
          </h3>


          <input

            type="text"

            placeholder="Full Name"

            required

            value={address.fullName}

            onChange={(e) =>

              setAddress({

                ...address,

                fullName:
                  e.target.value

              })

            }

          />


          <input

            type="text"

            placeholder="Street"

            required

            value={address.street}

            onChange={(e) =>

              setAddress({

                ...address,

                street:
                  e.target.value

              })

            }

          />


          <input

            type="text"

            placeholder="City"

            required

            value={address.city}

            onChange={(e) =>

              setAddress({

                ...address,

                city:
                  e.target.value

              })

            }

          />


          <input

            type="text"

            placeholder="Postal Code"

            required

            value={address.postalCode}

            onChange={(e) =>

              setAddress({

                ...address,

                postalCode:
                  e.target.value

              })

            }

          />


          <input

            type="text"

            placeholder="Country"

            required

            value={address.country}

            onChange={(e) =>

              setAddress({

                ...address,

                country:
                  e.target.value

              })

            }

          />


          <div className="checkout-summary">


            <h4>

              Total to Pay:

              ₹{totalPrice.toFixed(2)}

            </h4>


            <button

              type="submit"

              className="btn"

            >

              Place Test Order

            </button>


          </div>


        </form>


      </div>


    </div>

  );

};


export default Checkout;