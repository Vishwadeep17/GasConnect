const React = require('react');
const { useState, useEffect } = require('react');
const { Outlet, useNavigate } = require('react-router-dom');
const authImage = require('../../../assets/images/createUserLogin.gif');
const {
  AiOutlineMail,
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineLock,
  AiOutlineMobile,
} = require('react-icons/ai');
const authService = require('../../../services/auth.service');
const { toast } = require('react-toastify');

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  bg-[#252422] flex flex-col lg:flex-row justify-evenly items-center">
      <div className="h-[45%]">
        <img src={authImage} alt={'Auth Image'} />
      </div>
      <div className="text-white flex flex-col gap-10">
        <Outlet />
      </div>
    </div>
  );
}

module.exports = Auth;
