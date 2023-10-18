const React = require("react");

function Card() {
    const onHandleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        React.createElement("div", {
            className: "shadow-lg gap-3  rounded m-8 p-8 flex bg-gray-800"
        }, [
            React.createElement("div", {
                className: "lg: md:flex flex-col gap-3"
            }, [
                React.createElement("h3", {
                    className: "text-orange text-xl font-semibold text-white"
                }, "Profile Update"),
                React.createElement("form", {
                    onSubmit: onHandleSubmit
                }, [
                    React.createElement("div", null, [
                        React.createElement("label", {
                            htmlFor: "current-password"
                        }, "Current Password : "),
                        React.createElement("br"),
                        React.createElement("input", {
                            id: "current-password"
                        })
                    ]),
                    React.createElement("div", null, [
                        React.createElement("label", {
                            htmlFor: "new-password"
                        }, "New Password : "),
                        React.createElement("br"),
                        React.createElement("input", {
                            id: "new-password"
                        })
                    ]),
                    React.createElement("div", null, [
                        React.createElement("label", {
                            htmlFor: "confirm-password"
                        }, "Confirm Password : "),
                        React.createElement("br"),
                        React.createElement("input", {
                            id: "confirm-password"
                        })
                    ]),
                    React.createElement("button", {
                        className: "bg-transparent hover:bg-blue-500 text-blue-700 font-bold hover:text-white py-1  border border-blue-500 hover:border-transparent rounded"
                    }, "Update Password")
                ])
            ])
        ])
    );
}

module.exports = Card;
