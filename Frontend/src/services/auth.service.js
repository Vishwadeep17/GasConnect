import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://gasconnect-production.up.railway.app/";

const signup = async (email, password,name,phone) => {
  const response = await axios
    .post(API_URL + "user/signup", {
      email,
      password,
      name,
      phone
    });
  if (response.data.authtoken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response;
};

const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "user/login", {
      email,
      password,
    });
  console.log(response);
  if (response.data.authtoken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getUserInfo = async (id) => {
  const response = await axios
    .get(API_URL + `user/getUserInfo/${id}`);
  console.log(response);
  return response;
};

const getCurrentFuelStation = () => {
  return JSON.parse(localStorage.getItem("fuelStation"));
};

const fuelStationLogin = async (email, password) => {
  const response = await axios
    .post(API_URL + "fuel/login", {
      email,
      password
    });
  console.log(response);
  if (response.data.token) {
    localStorage.setItem("fuelStation", JSON.stringify(response.data));
  }
  return response;
};

const fuelStationRegister = async (name,owner,email,password,phone,location) => {
  const response = await axios
    .post(API_URL + "fuel/register", {
      name,
      owner,
      email,
      password,
      phone,
      location
    });
  if (response.data.token) {
    localStorage.setItem("fuelStation", JSON.stringify(response.data));
  }
  return response;
};

const fuelInventoryUpdate = async (quantity,stationId) => {
  const response = await axios
    .put(API_URL + "fuel/updateFuel", {
      quantity, stationId
    });
  console.log(response);
  return response;
};


const getFuelStation = async () => {
  const response = await axios
    .get(API_URL + "fuel/getStations");
  return response;
};

const getFuelStationByID = async (id) => {
  const response = await axios
    .get(API_URL + `fuel/${id}`);
  return response;
};

const postOrder = async (userId,stationId,address,fuel,method) =>{
  const response = await axios
    .post(API_URL + `order/`, {
      userId,
      stationId,
      address,
      fuel,
      method
    });
  console.log(response);
  return response;
}

const cancelOrder = async (id) =>{
  const response = await axios
    .put(API_URL + `order/cancel`, {
      id
    });
  return response;
}

const acceptOrder = async (id) =>{
  const response = await axios
    .put(API_URL + `order/accept`, {
      id
    });
  return response;
}

const deliveryOrder = async (id) =>{
  const response = await axios
    .put(API_URL + `order/deliever`, {
      id
    });
  return response;
}

const getOrders = async (id) =>{
  const response = await axios
    .get(API_URL + `order/getOrderByFuelStationId/${id}`);
  return response;
}
const getUserOrders = async (id) =>{
  const response = await axios
    .get(API_URL + `order/getOrderByUserId/${id}`);
  return response;
}
const updateProfilePassword = async (userId,password,newPassword) =>{
  const response = await axios
    .put(API_URL + `user/changePassword`, {
      userId,
      password,
      newPassword
    });
  return response;
}

const updateSellerProfilePassword = async (stationId,password,newPassword) =>{
  const response = await axios
    .put(API_URL + `fuel/changePassword`, {
      stationId,
      password,
      newPassword
    });
  return response;
}

const loadScript = async(src="https://checkout.razorpay.com/v1/checkout.js")=>{
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
const displayRazorpay = async(totalDeliveryCharge,setTransactionData)=>{
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const result = await axios.post(API_URL + `payment/order`,{
      amount : totalDeliveryCharge
    });

    if (!result) {
        toast.error("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;
     console.log(amount)
    const options = {
        key: "rzp_test_X4JNqOVItvYRBX", // Enter the Key ID generated from the Dashboard
        currency: currency,
        name: "Fuel Station",
        description: "",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };
            console.log(data)

            const result = await axios.post(API_URL + "payment/verify", {data});

            setTransactionData(result.data);
        },
   
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}


const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  fuelStationLogin,
  getCurrentFuelStation,
  fuelStationRegister,
  getFuelStation,
  getFuelStationByID,
  postOrder,
  getOrders,
  getUserInfo,
  cancelOrder,
  acceptOrder,
  deliveryOrder,
  fuelInventoryUpdate,
  updateProfilePassword,
  updateSellerProfilePassword,
  displayRazorpay,
  loadScript,
  getUserOrders
};

export default authService;
