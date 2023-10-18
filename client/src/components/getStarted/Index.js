const { useNavigate } = require("react-router-dom");
const GetStarted = require("../../assets/images/getStarted.png");
const { useEffect } = require("react");

function Index() {
  const navigate = useNavigate();
  
  return (
    <div className="w-screen h-screen bg-[#252422] flex flex-col lg:flex-row justify-evenly items-center">
      <div className="h-[45%]">
        <img src={GetStarted} alt={"Get Started"} />
      </div>
      <div className="text-white flex flex-col gap-10">
        <div className="header">
          <h1 className="text-center text-[54px]">
            Let's Started
          </h1>
          <p>
            Get Fuel on your doorstep.
          </p>
        </div>
        <div className="actions w-full flex flex-col gap-4">
          <button className="bg-[#fe6f2b] hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              navigate('user/auth/login');
            }}
          >
            User
          </button>
          <button className="bg-transparent border border-[#fe6f2b] hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              navigate('seller/auth/login');
            }}
          >
            Seller
          </button>
        </div>
      </div>
    </div>
  );
}

module.exports = Index;
