import React from "react";
import bellimg from "../assets/Vector.png";
import userimg from "../assets/image 1.png";

const Header = () => {
  return (
    <div className="flex justify-between items-center mt-[49px] h-[32px]">
      <h1 className="text-black font-bold text-[21px] sm:text-[24px] ">
        Upload CSV
      </h1>
      <div className="flex justify-between items-center gap-3" style={{float:"right"}}>
        <img src={bellimg} alt="bell" className="w-[18px] h-[20px]" />
        <img src={userimg} alt="user" className="rounded-full"/>
      </div>
    </div>
    
  );
};

export default Header;
