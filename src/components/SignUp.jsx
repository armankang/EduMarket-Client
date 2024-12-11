import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { apiRequest } from "../utils";
import { Login } from "../redux/userSlice";

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(false); // default set as not registered

  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  let from = location.state?.from?.pathname || "/"; //if doesnt exist go back home
  const closeModal = () => setOpen(false); //to close the modal

  const onSubmit = async (data) => {
    let URL = null;
    if (isRegister) {
      URL = "user/register";
    } else {
      URL = "user/login";
    }

    try {
      const res = await apiRequest({
        url: URL,
        data: data,
        method: "POST",
      });

      console.log(res);

      if (res?.status === "failed") {
        setErrMsg(res?.message);
      } else {
        setErrMsg("");
        const data = { token: res?.token, ...res?.user };
        dispatch(Login(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
        window.location.replace(from);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Transition appear show={true}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold lwading-6 text-gray-900"
                  >
                    {isRegister ? "Create Account" : "Account Sign In"}
                  </Dialog.Title>

                  <form
                    className="w-full flex flex-col gap-5 mt-2"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextInput
                      name="email"
                      label="Email Address"
                      placeholder="email@example.com"
                      type="email"
                      register={register("email", {
                        required: "Email Address is required!",
                      })}
                      error={errors.email ? errors.email.message : ""}
                    />

                    {isRegister && (
                      <div className="w-full flex gap-1 md:gap-2">
                        <div className={"w-1/2"}>
                          <TextInput
                            name={"firstName"}
                            label={"First Name"}
                            placeholder={"eg. James"}
                            type="text"
                            register={register("firstName", {
                              required: "First Name is required",
                            })}
                            error={
                              errors.firstName ? errors.firstName?.message : ""
                            }
                          />
                        </div>

                        {isRegister && (
                          <div className="w-1/2">
                            <TextInput
                              name="lastName"
                              label="Last Name"
                              placeholder="Wagonner"
                              type="text"
                              register={register("lastName", {
                                required: "Last Name is required",
                              })}
                              error={
                                errors.lastName ? errors.lastName?.message : ""
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="w-full flex gap-1 md:gap-2">
                      <div className={`${isRegister ? "w-1/2" : "w-full"}`}>
                        <TextInput
                          name="password"
                          label="Password"
                          placeholder="Password"
                          type="password"
                          register={register("password", {
                            required: "Password is required!",
                          })}
                          error={
                            errors.password ? errors.password?.message : ""
                          }
                        />
                      </div>

                      {isRegister && (
                        <div className="w-1/2">
                          <TextInput
                            label="Confirm Password"
                            placeholder="Password"
                            type="password"
                            register={register("cPassword", {
                              validate: (value) => {
                                const { password } = getValues();

                                if (password != value) {
                                  return "Passwords do no match";
                                }
                              },
                            })}
                            error={
                              errors.cPassword &&
                              errors.cPassword.type === "validate"
                                ? errors.cPassword?.message
                                : ""
                            }
                          />
                        </div>
                      )}
                    </div>

                    {errMsg && (
                      <span
                        role="alert"
                        className="text-sm text-red-500 mt-0.5"
                      >
                        {errMsg}
                      </span>
                    )}

                    <div className="mt-2">
                      <CustomButton
                        type="submit"
                        containerStyles={`inline-flex justify-center rounded-md bg-black px-8 py-2 text-sm font-medium text-white outline-none hover:bg-[#808080]`}
                        title={isRegister ? "Create Account" : "Login Account"}
                      />
                    </div>
                  </form>

                  <div className="mt-4">
                    <p className="text-sm text-gray-700">
                      {isRegister
                        ? "Already has an account?"
                        : "Do not have an account"}

                      <span
                        className="text-sm text-blue-600 ml-2 hover:text-blue-700 hover:font-semibold cursor-pointer"
                        onClick={() => setIsRegister((prev) => !prev)}
                      >
                        {isRegister ? "Login" : "Create Account"}
                      </span>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignUp;
