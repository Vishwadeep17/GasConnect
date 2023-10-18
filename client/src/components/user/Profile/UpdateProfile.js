const React = require("react");
const { useState, useEffect } = require("react");
const authService = require("../../../services/auth.service");
const { toast } = require("react-toastify");
const { useNavigate } = require("react-router-dom");
const Card = require("./Card");
const LoginLight = require("../../../assets/images/loginLight.jpg");

function UpdateProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate("/user/auth/login");
    }
  }, []);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password and Confirm Password not matching");
      return;
    }
    try {
      await authService.updateProfilePassword(
        user.userId,
        oldPassword,
        newPassword
      ).then(
        (response) => {
          toast.success(response.data.message);
          navigate("../logout");
        },
        (error) => {
          console.log(error);
          toast.error(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return React.createElement(
    "div",
    {
      className: "w-[screen] h-screen flex flex-col justify-around items-center lg:md:flex-row",
      style: {
        backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
    },
    [
      React.createElement(
        "div",
        {
          className:
            "text-white p-3 text-center text-[54px] flex flex-row justify-around items-center gap-3  whitespace-break-spaces font-sans  lg:text-[96px] md:text-[74px]",
        },
        React.createElement("h1", null, "Profile")
      ),
      React.createElement(
        "div",
        {
          className:
            "w-[100%] text-white  h-[100%] justify-center gap-5 lg:w-1/3 items-center flex flex-col flex-wrap overflow-scroll",
        },
        [
          React.createElement("div", { className: "header" }, [
            React.createElement("h1", { className: "text-center text-[54px]" }, "Change Password"),
            React.createElement("p", null, "Please Fill in the old and new Password"),
          ]),
          React.createElement(
            "form",
            { className: "w-full max-w-sm", onSubmit: onHandleSubmit },
            [
              React.createElement(
                "div",
                { className: "gap-3 md:flex md:items-center mb-6" },
                [
                  React.createElement("div", { className: "md:w-2/3" }, [
                    React.createElement(
                      "label",
                      {
                        className:
                          "block text-white font-bold md:text-right mb-1 md:mb-0 pr-4",
                        htmlFor: "inline-currentPassword",
                      },
                      "Current Password"
                    ),
                  ]),
                  React.createElement("div", { className: "mb-3 lg:mb-0" }, [
                    React.createElement("input", {
                      className:
                        "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
                      id: "inline-currentPassword",
                      type: "password",
                      value: oldPassword,
                      required: true,
                      minLength: 8,
                      onChange: (e) => {
                        setOldPassword(e.target.value);
                      },
                      placeholder: "Password",
                    }),
                  ]),
                ]
              ),
              React.createElement(
                "div",
                { className: "gap-3 md:flex md:items-center mb-6" },
                [
                  React.createElement("div", { className: "md:w-2/3" }, [
                    React.createElement(
                      "label",
                      {
                        className:
                          "block text-white font-bold md:text-right mb-1 md:mb-0 pr-4",
                        htmlFor: "inline-newPassword",
                      },
                      "New Password"
                    ),
                  ]),
                  React.createElement("div", null, [
                    React.createElement("input", {
                      className:
                        "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
                      id: "inline-newPassword",
                      type: "password",
                      value: newPassword,
                      required: true,
                      minLength: 8,
                      onChange: (e) => {
                        setNewPassword(e.target.value);
                      },
                      placeholder: "New Password",
                    }),
                  ]),
                ]
              ),
              React.createElement(
                "div",
                { className: "gap-3 md:flex md:items-center mb-6" },
                [
                  React.createElement("div", { className: "md:w-2/3" }, [
                    React.createElement(
                      "label",
                      {
                        className:
                          "block text-white font-bold md:text-right mb-1 md:mb-0 pr-4",
                        htmlFor: "inline-confirm",
                      },
                      "Confirm Password"
                    ),
                  ]),
                  React.createElement("div", null, [
                    React.createElement("input", {
                      className:
                        "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
                      id: "inline-confirm",
                      type: "password",
                      value: confirmPassword,
                      required: true,
                      minLength: 8,
                      onChange: (e) => {
                        setConfirmPassword(e.target.value);
                      },
                      placeholder: "Confirm Password",
                    }),
                  ]),
                ]
              ),
              React.createElement(
                "div",
                { className: "actions w-full flex flex-col gap-4" },
                [
                  React.createElement(
                    "button",
                    {
                      className:
                        "bg-[#fe6f2b] hover:bg-[#F59337] w-full text-white font-bold py-2 px-4 rounded-full",
                    },
                    "Update"
                  ),
                  React.createElement(
                    "button",
                    {
                      className:
                        "bg-transparent border border-[#fe6f2b] w-full hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full",
                      onClick: (e) => {
                        e.preventDefault();
                        navigate("../");
                      },
                    },
                    "Cancel"
                  ),
                ]
              ),
            ]
          ),
        ]
      ),
    ]
  );
}

module.exports = UpdateProfile;
