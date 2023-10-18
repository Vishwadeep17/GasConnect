const LoginLight = require("../../../assets/images/loginLight.jpg");
const { useEffect, useState } = require("react");
const SimpleMap = require("../../map/Simple");
const AuthService = require("../../../services/auth.service");
const { getDistance } = require("geolib");
const { useNavigate } = require("react-router-dom");
const ListStation = require("../../user/order/ListStation");
const ListOrder = require("./ListOrder");
const { AiOutlineShoppingCart } = require("react-icons/ai");
const { TbTruckDelivery } = require("react-icons/tb");
const { toast } = require("react-toastify");

function Order() {
    const [orders, setOrders] = useState(null);
    const navigate = useNavigate();
    const fuelStation = AuthService.getCurrentFuelStation();
    const [loading, setLoading] = useState(true);
    const [countOnWayOrders, setCountOnWayOrders] = useState(0);

    useEffect(() => {
        if (!fuelStation) {
            navigate('/home');
        }
        console.log("FuelStation", fuelStation.stationId);
    }, [fuelStation]);

    const getOrders = async () => {
        try {
            await AuthService.getOrders(fuelStation.stationId).then(
                (response) => {
                    console.log(response);
                    setOrders(response.data);

                },
                (error) => {
                    console.log(error.response.data.message);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setCountOnWayOrders(0);
    }, []);

    useEffect(() => {
        getOrders();
        setLoading(false);
    }, [loading]);

    const incrementCount = () => {
        setCountOnWayOrders(countOnWayOrders + 1);
    };

    const renderedOrders = (orders) ? orders.filter((element) => {
        const { isAccepted, isCanceled, isDelivered } = element;
        console.log(element);
        if (isCanceled.status || isDelivered.status) {
            return null;
        }
        return element;
    }).map((element) => {
        const { isAccepted, isCanceled, isDelivered } = element;
        return (
            <ListOrder order={element} setLoading={setLoading} />
        );
    }) : null;

    useEffect(() => {
        if (renderedOrders && renderedOrders.length === 0) {
            toast.warning("There are No Orders");
            navigate('../');
        }
    }, [renderedOrders]);

    const renderedIcon = (countOnWayOrders) ?
        <TbTruckDelivery className="" />
        :
        <AiOutlineShoppingCart className="text-white" />;

    return (
        <div
            className="w-screen h-screen flex flex-col justify-around items-center lg:md:flex-row"
            style={{
                backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
                backgroundPosition: `50% 50%`,
                backgroundSize: `cover`,
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="text-white p-3 text-center text-[54px] flex flex-row justify-center items-center gap-3  whitespace-break-spaces font-sans  lg:text-[96px] md:text-[74px] ">
                {renderedIcon}
                <h1>Orders</h1>
            </div>
            <div className="w-[100%] h-[100%] justify-center lg:w-[75%] lg:w-[75%] items-center flex flex-row flex-wrap overflow-scroll">
                {renderedOrders}
            </div>
        </div>
    );
}

module.exports = Order;
