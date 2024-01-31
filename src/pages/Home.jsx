import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Card from "../components/Card";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [authenticated, setauthenticated] = useState(false);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(true);
    }
    setCheck(false);
  }, []);

  if (!authenticated && !check) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        <div
          className={`relative flex flex-col w-full sm:flex-row justify-between gap-4 lg:gap-6  bg-[#F5F5F5]`}
        >
          <SideBar />
          <div className="flex flex-col w-full gap-2 md:gap-4">
            <Header />
            <Card />
          </div>
        </div>
      </>
    );
  }
};

export default Home;
