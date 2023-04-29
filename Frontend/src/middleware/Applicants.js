import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../helper/storage";

const Applicants = () => {
  const auth = getAuthUser();
  return <>{auth && auth.type === 0 ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default Applicants;
