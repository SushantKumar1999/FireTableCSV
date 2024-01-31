import React from "react";
import logo1 from "../assets/Ellipse 111.png";
import logo2 from "../assets/Vector 7.png";

function Logo() {
    return (
        <div>
          <img alt="logopart1" src={logo1} className="w-[80.15px] h-[80.15px] mt-[54.32px] ml-[61.03px] clipped-opposite" />
          <img alt="logopart2" src={logo2} className="w-[84.82px] h-[22.04px] mt-[-48px] ml-[63px] clipped-opposite"/>
        </div>
    )
} 

export default Logo;