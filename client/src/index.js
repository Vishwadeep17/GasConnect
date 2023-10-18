require("./index.css");
const React = require("react");
const ReactDom = require("react-dom/client");
const App = require("./App");
const { BrowserRouter } = require("react-router-dom");
const { ToastContainer } = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");

const el = document.getElementById("root");
const root = ReactDom.createRoot(el);

root.render(
  React.createElement(BrowserRouter, null,
    React.createElement(ToastContainer, { autoClose: 1200 }),
    React.createElement(App)
  )
);
