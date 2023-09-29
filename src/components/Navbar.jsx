import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineLogin } from "react-icons/ai";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="w-full fixed z-[1100]">
      <nav>
        <div className="bg-black text-white flex justify-between items-center px-5 lg:px-20 py-6">
          <a href="#" className="text-xl font-bold">
            Ships Tracking & Docking
          </a>
          <AiOutlineMenu
            size={30}
            color=""
            onClick={handleMenu}
            className="lg:hidden"
          />
          <div className="font-semibold lg:flex items-center hidden">
            <a
              href="#home"
              className="hover:text-dark hover:bg-light rounded p-3 transition-all delay-50 ease-in-out"
            >
              Home
            </a>
            <a
              href="#form"
              className="hover:text-dark hover:bg-light rounded p-3 transition-all delay-50 ease-in-out"
            >
              Form
            </a>
          </div>
        </div>
        <div
          className={` ${
            menu ? "fixed" : "hidden"
          } bg-black text-white lg:hidden`}
        >
          <nav className="flex flex-col justify-center items-center pb-3 w-screen">
            <a
              href="#home"
              className="hover:text-dark hover:bg-light rounded p-3 transition-all delay-50 ease-in-out"
            >
              Home
            </a>
            <a
              href="#form"
              className="hover:text-dark hover:bg-light rounded p-3 transition-all delay-50 ease-in-out"
            >
              Form
            </a>
          </nav>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
