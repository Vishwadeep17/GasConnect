const { Route, Routes, useNavigate } = require("react-router-dom");
const Login = require("./components/user/login/Login");
const Register = require("./components/user/register/Register");
const SimpleMap = require("./components/map/Simple");
const Home = require("./components/user/home/Home");
const Order = require("./components/user/order/Order");
const BookOrder = require("./components/user/order/BookOrder");
const Profile = require("./components/user/Profile/UpdateProfile");
const FuelHome = require("./components/fuelStation/home/Home");
const FuelOrder = require("./components/fuelStation/order/Order");
const FuelOrderHistory = require("./components/fuelStation/order/OrderHistory");
const UpdateProfile = require("./components/fuelStation/Profile/UpdateProfile");
const GetStarted = require("./components/getStarted/Index");
const Auth = require("./components/user/credentials/Auth");
const FuelAuth = require("./components/fuelStation/credentials/Auth");
const FuelLogin = require("./components/fuelStation/login/Login");
const FuelRegister = require("./components/fuelStation/register/Register");
const { Toaster } = require("react-hot-toast");
const UpdateFuel = require("./components/fuelStation/inventory/UpdateFuel");
const OrderHistory = require("./components/user/order/OrderHistory");
const { toast } = require("react-toastify");
const { useEffect } = require("react");

function App() {
  return (
    <Routes>
      <Route path="/" element={<GetStarted />}></Route>
      <Route path="user">
        <Route path="auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="logout" element={<LogoutUser />}></Route>
        <Route path="" element={<Home />} />
        <Route path="order" element={<Order />} />
        <Route path="bookOrder/:id" element={<BookOrder />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="orderHistory" element={<OrderHistory />} />
      </Route>
      <Route path="seller">
        <Route path="auth" element={<FuelAuth />}>
          <Route path="register" element={<FuelRegister />} />
          <Route path="login" element={<FuelLogin />} />
        </Route>
        <Route path="" element={<FuelHome />} />
        <Route path="order" element={<FuelOrder />} />
        <Route path="orderHistory" element={<FuelOrderHistory />} />
        <Route path="logout" element={<LogoutSeller />} />
        <Route path="profile" element={<UpdateProfile />} />
        <Route path="update-inventory" element={<UpdateFuel />} />
      </Route>
      <Route
        path="map"
        element={<SimpleMap lat={12.2} lng={23.4} />}
      ></Route>
    </Routes>
  );
}

const LogoutSeller = () => {
  const navigate = useNavigate();
  localStorage.removeItem("fuelStation");
  toast.success("Log Out");
  useEffect(() => {
    navigate("/seller/");
  }, []);
};

const LogoutUser = () => {
  const navigate = useNavigate();
  localStorage.removeItem("user");
  toast.success("Log Out");
  useEffect(() => {
    navigate("/user/");
  }, []);
};

module.exports = App;
module.exports = { LogoutSeller };
module.exports = { LogoutUser };
