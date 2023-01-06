import React from "react";
import { useState } from "react";

//useForm
import { useForm } from "react-hook-form";

//icon FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

//icon FontAwesomeIcon
const eye = <FontAwesomeIcon icon={faEye} />;
const EyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

function App() {
  const [displayShowData, setDisplayShowData] = useState("");
  console.log("displayShowData", displayShowData);
  //Show password
  const [passwordShown, setPasswordShown] = useState(false);
  //Show password Function
  const PasswordShown = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  //Show Confirm Password
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  //Show Confirm Password  Function
  const ConfirmPasswordShown = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onTouched",
  });
  // Submit Function
  const onSubmit = async (data) => {
    // console.log(data);
    setDisplayShowData(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="py-6 text-[30px]">
          Check Password Confirm Password Validation
        </h2>
        {/*---------- show Submit data start--------- */}
        {displayShowData && (
          <div className="py-6">
            <h2 className="text-red-600 text-center text-2xl font-bold">Submit Value</h2>
            <p>Password : {displayShowData.password}</p>
            <p>Confirm Password : {displayShowData.confirmPassword}</p>
          </div>
        )}
        {/*---------- show Submit data end--------- */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="wrapper">
            {/*------------- password fild start----------------- */}
            <div className="input-box">
              <input
                id="password"
                type={passwordShown ? "text" : "password"}
                required
                {...register("password", {
                  required: "this field is required.",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{4,}$/,
                    message:
                      "Minimum 4 characters at least one letter one number",
                  },
                })}
              />
              <label>Password</label>
              <i onClick={PasswordShown}>
                {(passwordShown ? false : true) ? <>{EyeSlash}</> : <>{eye}</>}
              </i>
            </div>
            {/*------------- password error show----------------- */}
            {errors.password && (
              <div className="text-red-600 invalid-feedback capitalize text-[14px]">
                {errors.password.message}
              </div>
            )}
            {/*------------- Confirm Password fild start----------------- */}
            <div className="input-box">
              <input
                id="confirmPassword"
                type={confirmPasswordShown ? "text" : "password"}
                required
                {...register("confirmPassword", {
                  required: "this field required.",
                  validate: (value) =>
                    value == getValues("password") || "password doesn't match.",
                })}
              />

              <label>Confirm Password</label>
              <i onClick={ConfirmPasswordShown}>
                {(confirmPasswordShown ? false : true) ? (
                  <>{EyeSlash}</>
                ) : (
                  <>{eye}</>
                )}
              </i>
            </div>
            {/*------------- Confirm Password error show----------------- */}
            {errors.confirmPassword && (
              <div className="text-red-600 invalid-feedback capitalize text-[14px] mb-2">
                {errors.confirmPassword.message}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-blue bg-blue-500 border-none px-28 w-full mt-2"
            >
              Chack
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
