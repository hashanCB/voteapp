"use client";
import React, { useEffect, useState } from "react";
import { Form, get, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddPoll = () => {
  const [pollname, setPollname] = useState(() => {
    const localData = window.localStorage.getItem("pollname");
    if (localData) {
      return JSON.parse(localData);
    } else {
      return [];
    }
  });

  const schema = yup.object().shape({
    username: yup.string().required("please  Enter value"),
    email: yup.string().email().required("please  Enter value"),
    //phone number validation
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required(),
    pollname: yup.string().required("please  Enter value"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setPollname((prev) => {
      return [...prev, data];
    });

    reset();
  };

  useEffect(() => {
    window.localStorage.setItem("pollname", JSON.stringify(pollname));
  }, [pollname]);
  return (
    <div className=" w-full h-screen bg-slate-500 ">
      <div className=" flex-col flex max-w-[600px]mx-auto py-[100px]   bg-gray-500 border-cyan-100">
        <div className=" flex flex-col items-center space-y-10 bottom-4 border-red-300">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col space-y-3"
          >
            <input
              className=" rounded-xl h-8 w-[400px] px-5"
              type="text"
              placeholder="user name"
              name="username"
              {...register("username", { required: true })}
            />
            {errors.username?.message}

            <input
              className=" rounded-xl h-8 w-[400px] px-5"
              type="text"
              placeholder="email"
              name="email"
              {...register("email", { required: true })}
            />
            {errors.email?.message}
            <input
              className=" rounded-xl h-8 w-[400px] px-5"
              type="text"
              placeholder="phone"
              name="phone"
              {...register("phone", { required: true })}
            />
            {errors.phone?.message}
            <input
              className=" rounded-xl h-8 w-[400px] px-5"
              type="text"
              placeholder="enter your Question to poll"
              name="pollname"
              {...register("pollname", { required: true })}
            />
            {errors.pollname?.message}
            <button
              type="submit"
              name="submit"
              className=" bg-fuchsia-400 p-2 px-5 rounded-lg"
            >
              button{" "}
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-10 bottom-4 border-red-300">
        <div>
          {pollname.map((pool, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <h1>username: {pool.username}</h1>
              <h1>email: {pool.email}</h1>
              <h1>phone: {pool.phone}</h1>
              <h1>pollname: {pool.pollname}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPoll;
