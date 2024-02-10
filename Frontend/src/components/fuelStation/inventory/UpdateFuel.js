import { useNavigate } from "react-router-dom";
import LoginLight from "../../../assets/images/loginLight.jpg";
import { MdOutlineInventory2 } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import authService from "../../../services/auth.service";

function UpdateFuel() {
  const [petrolQuantity, setPetrolQuantity] = useState(null);
  const [petrolPrice, setPetrolPrice] = useState(null);

  const [gasQuantity, setGasQuantity] = useState(null);
  const [gasPrice, setGasPrice] = useState(null); 

  const navigate = useNavigate();
  const fuelStation = authService.getCurrentFuelStation();

  useEffect(() => {
    if (!fuelStation) {
      navigate("../auth/login");
    }
  }, []);

  const updateInventory = async () => {
    const quantity = {};

    if (petrolQuantity) {
      const petrol = {
        price: petrolPrice,
        quantity: petrolQuantity,
      };
      quantity.petrol = petrol;
    }
    if (gasQuantity) {
      const gas = {
        price: gasPrice,
        quantity: gasQuantity,
      };
      quantity.gas = gas;
    }
    try {
      await authService
        .fuelInventoryUpdate(quantity, fuelStation.stationId)
        .then(
          (response) => {
            toast.success(response.data.message);
            navigate("../");
          },
          (error) => {
            toast.error(error.response.data.message);
          }
        );
    } catch (err) {
      console.log(err);
    }
  }

  const validation = () => {
    if (petrolPrice !== "" && petrolQuantity === "") {
      toast.warning("Please Fill in Petrol Quantity");
      return false;
    }

    if (petrolPrice === "" && petrolQuantity !== "") {
      toast.warning("Please Fill in Petrol Price");
      return false;
    }

    if (gasPrice !== "" && gasQuantity === "") {
      toast.warning("Please Fill in Gas Quantity");
      return false;
    }

    if (gasPrice === "" && gasQuantity !== "") {
      toast.warning("Please Fill in Gas Price");
      return false;
    }
    return true;
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      updateInventory();
    }
  }

  useEffect(() => {}, [petrolPrice, petrolQuantity, gasPrice, gasQuantity]);

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
        <MdOutlineInventory2 />
        <h1>Inventory</h1>
      </div>
      <div className="w-[100%] text-white  h-[100%] justify-center gap-5 lg:w-1/2 items-center flex flex-col flex-wrap overflow-scroll">
        <div className="header">
          <h1 className="text-center text-[54px]">Update Quantity</h1>
          <p>Please Fill in the new quantity of Petrol and Gas</p>
        </div>
        <form className="w-full max-w-sm" onSubmit={onHandleSubmit}>
          <div className="gap-3 md:flex md:items-center mb-6">
            <div className="mb-3 lg:mb-0">
              <label
                className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-petrol"
              >
                Petrol
              </label>
            </div>
            <div className="mb-3 lg:mb-0">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-petrol"
                type="number"
                value={petrolQuantity}
                onChange={(e) => {
                  setPetrolQuantity(e.target.value);
                }}
                placeholder="Quantity"
              />
            </div>
            <div className="">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-petrol"
                type="number"
                value={petrolPrice}
                onChange={(e) => {
                  setPetrolPrice(e.target.value);
                }}
                placeholder="Price"
              />
            </div>
          </div>
          <div className="gap-3 md:flex md:items-center mb-6">
            <div className="mb-3 lg:mb-0">
              <label
                className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-gas" // Changed "diesel" to "gas"
              >
                Gas
              </label>
            </div>
            <div className="mb-3 lg:mb-0">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-gas" // Changed "diesel" to "gas"
                type="number"
                value={gasQuantity}
                onChange={(e) => {
                  setGasQuantity(e.target.value);
                }}
                placeholder="Quantity"
              />
            </div>
            <div className="">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-gas" // Changed "diesel" to "gas"
                type="number"
                value={gasPrice}
                onChange={(e) => {
                  setGasPrice(e.target.value);
                }}
                placeholder="Price"
              />
            </div>
          </div>
          <div className="actions flex flex-col gap-4">
            <button className="bg-[#fe6f2b] hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full">
              Update
            </button>
            <button
              className="bg-transparent border border-[#fe6f2b] hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                navigate("../");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateFuel;
