import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInput,
  generateOtp,
  verifyOtp,
} from "../../store/Slice/AuthSlice";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, step, input } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");

  //  Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  //  Prevent UI flash
  if (user) return null;

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">
        {step === 1 ? "Login or Signup" : "OTP Verification"}
      </h2>

      {step === 1 && (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Enter mobile number or email
          </p>

          <input
            type="text"
            placeholder="Mobile number / Email"
            value={input}
            onChange={(e) => dispatch(setInput(e.target.value))}
            className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:border-pink-500"
          />

          <button
            onClick={() => dispatch(generateOtp())}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded font-semibold"
          >
            CONTINUE
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-sm text-gray-600 mb-4">
            OTP sent to <span className="font-semibold">{input}</span>
          </p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:border-pink-500"
          />

          <button
            onClick={() => dispatch(verifyOtp(otp))}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded font-semibold"
          >
            VERIFY
          </button>

          <p
            onClick={() => dispatch(generateOtp())}
            className="text-pink-500 text-sm mt-3 cursor-pointer"
          >
            Resend OTP
          </p>
        </>
      )}

      <p className="text-xs text-gray-500 mt-6">
        By continuing, you agree to Terms of Use & Privacy Policy
      </p>

    </div>
  );
};

export default AuthPage;