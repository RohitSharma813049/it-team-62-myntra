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

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  if (user) return null;

  return (
    <div className=" flex items-center justify-center px-4">

      <div className="w-full max-w-sm bg-white p-6 rounded-xl">

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-2 text-center">
          {step === 1 ? "Login or Signup" : "OTP Verification"}
        </h2>

        <p className="text-sm text-gray-500 mb-6 text-center">
          {step === 1
            ? "Enter mobile number or email"
            : `OTP sent to ${input}`}
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Mobile number / Email"
              value={input}
              onChange={(e) => dispatch(setInput(e.target.value))}
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 
              focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            <button
              onClick={() => dispatch(generateOtp())}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              CONTINUE
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              maxLength={4}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 
              text-center tracking-widest text-lg
              focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            <button
              onClick={() => dispatch(verifyOtp(otp))}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              VERIFY
            </button>

            <p
              onClick={() => dispatch(generateOtp())}
              className="text-pink-500 text-sm mt-4 text-center cursor-pointer hover:underline"
            >
              Resend OTP
            </p>
          </>
        )}

        {/* FOOTER */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          By continuing, you agree to Terms of Use & Privacy Policy
        </p>

      </div>
    </div>
  );
};

export default AuthPage;