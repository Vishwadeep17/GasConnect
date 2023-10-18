const React = require("react");
const { useEffect, useState } = require("react");
const { toast } = require("react-toastify");
const { useNavigate } = require("react-router-dom");
const AuthService = require("../../../services/auth.service");
const {
  AiOutlineMail,
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineLock,
  AiOutlineMobile,
} = require("react-icons/ai");
const { IoPersonOutline } = require("react-icons/io5");

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onHandleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(email, password, name, phno).then(
        (response) => {
          toast.success(response.data.message);
        },
        (error) => {
          toast.error(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) {
      navigate("/user/");
    }
  }, [user]);

  return React.createElement(
    "div",
    { className: "header" },
    [
      React.createElement("h1", { className: "text-center text-[54px]" }, "Register"),
      React.createElement("p", null, "Register with your email and password"),
    ],
    React.createElement(
      "form",
      { class: "w-full max-w-sm", onSubmit: onHandleSignup },
      [
        React.createElement(
          "div",
          { class: "md:flex md:items-center mb-6" },
          [
            React.createElement(
              "div",
              { class: "md:w-1/3" },
              [
                React.createElement(
                  "label",
                  {
                    class: "block text-white font-bold md:text-right mb-1 md:mb-0 pr-4",
                    for: "inline-full-name",
                  },
                  "Name"
                ),
              ]
            ),
            React.createElement(
              "div",
              { class: "md:w-2/3" },
              [
                React.createElement("input", {
                  class:
                    "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
                  id: "inline-full-name",
                  type: "text",
                  value: name,
                  required: true,
                  onChange: (e) => {
                    setName(e.target.value);
                  },
                  placeholder: "First Middle Last",
                }),
              ]
            ),
          ]
        ),
        React.createElement(
          "div",
          { class: "md:flex md:items-center mb-6" },
          [
            React.createElement(
              "div",
              { class: "md:w-1/3" },
              [
                React.createElement(
                  "label",
                  {
                    class: "block text-white font-bold md:text-right mb-1 md:mb-0 pr-4",
                    for: "inline-full-email",
                  },
                  "Email"
                ),
              ]
            ),
            React.createElement(
              "div",
              { class: "md:w-2/3" },
              [
                React.createElement("input", {
                  class:
                    "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
                  id: "inline-full-email",
                  type: "email",
                  value: email,
                  required: true,
                  onChange: (e) => {
                    setEmail(e.target.value);
                  },
                  placeholder: "abc@gmail.com",
                }),
              ]
            ),
          ]
        ),
        React.createElement(
          "div",
          { class: "md:flex md:items-center mb-6" },
          [
            React.createElement(
              "div",
              { class: "md:w-1/3" },
              [
                React.createElement(
                  "label",
                  {
                    class: "block text-white font-bold md:text-right mb-1 md:mb-0 pr-4",
                    for: "inline-full-phno",
                  },
                  "Phno"
                ),
              ]
            ),
            React.createElement(
              "div",
              { class: "md:w-2/3" },
              [
                React.createElement("input", {
                  class:
                    "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
                  id: "inline-full-phno",
                  type: "text",
                  value: phno,
                  minLength: 10,
                  maxLength: 13,
                  required: true,
                  onChange: (e) => {
                    setPhno(e.target.value);
                  },
                  placeholder: "+91XXXXXXXXX",
                }),
              ]
            ),
          ]
        ),
        React.createElement(
          "div",
          { class: "md:flex md:items-center mb-6" },
          [
            React.createElement(
              "div",
              { class: "md:w-1/3" },
              [
                React.createElement(
                  "label",
                  {
                    class: "block  text-white font-bold md:text-right mb-1 md:mb-0 pr-4",
                    for: "inline-password",
                  },
                  "Password"
                ),
              ]
            ),
            React.createElement(
              "div",
              { class: "md:w-2/3 relative flex flex-row" },
              [
                React.createElement("input", {
                  class:
                    "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 pr-7 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
                  id: "inline-password",
                  type: `${showPassword ? "text" : "password"}`,
                  placeholder: "******************",
                  minLength: 8,
                  required: true,
                  onChange: (e) => {
                    setPassword(e.target.value);
                  },
                }),
                showPassword
                  ? React.createElement(AiOutlineEyeInvisible, {
                      class: "absolute top-3 right-2 text-xl text-black",
                      onClick: () => {
                        setShowPassword(false);
                      },
                    })
                  : React.createElement(AiOutlineEye, {
                      class: "absolute top-3 right-2 text-xl  text-black",
                      onClick: () => {
                        setShowPassword(true);
                      },
                    }),
              ]
            ),
          ]
        ),
        React.createElement(
          "div",
          { class: "actions w-full flex flex-col gap-4" },
          [
            React.createElement(
              "button",
              {
                class: "bg-[#fe6f2b] hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full",
              },
              "Sign Up"
            ),
            React.createElement(
              "button",
              {
                class: "bg-transparent border border-[#fe6f2b] hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full",
                onClick: (e) => {
                  e.preventDefault();
                  navigate("../login");
                },
              },
              "Login"
            ),
          ]
        ),
      ]
    )
  );
}

module.exports = Register;
