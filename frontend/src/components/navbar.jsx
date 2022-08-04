import Link from "next/link";
import { useState } from "react";
import { FaBars, FaMountain, FaRegWindowClose } from "react-icons/fa";

function Navbar() {
  const pages = [
    { name: "Dashboard", link: "/" },
    { name: "Global", link: "/global" },
    { name: "Data", link: "/data" },
  ];

  const [isOpen, setisOpen] = useState(false);
  return (
    <div className="fixed left-0 right-0 z-10 flex items-center justify-between w-full p-4 mx-auto prose-xl bg-gray-100 md:absolute md:bg-transparent max-w-7xl">
      <div className="items-center md:space-x-4 md:flex">
        {/* Logo and Sections */}

        <Link href="/">
          <div className="flex items-center pb-2 space-x-2 hover:cursor-pointer md:pb-0">
            <span className="text-3xl text-blue-300">
              <FaMountain />
            </span>
            <a className="text-3xl font-semibold">Nemaste</a>
          </div>
        </Link>

        <button
          onClick={() => setisOpen(!isOpen)}
          className="absolute cursor-pointer md:hidden top-6 right-8"
        >
          {isOpen ? <FaRegWindowClose /> : <FaBars />}
        </button>
      </div>

      {/* Page Sections */}
      <ul
        className={` text-center absolute left-0 w-full pb-12 transition-all duration-500 get md:bg-transparent bg-gray-100 text-black md:flex md:space-x-3 md:text-lg md:static ml-0 md:pb-0 md:z-auto z-[-1] md:w-auto md:pl-0 pl-9 ease-in ${
          isOpen ? "opacity-100 top-16" : "top-[-496px] opacity-0"
        } md:opacity-100 `}
      >
        {/* "static" means to position according to the flow of the document */}
        {pages.map((item) => {
          return (
            <li key={item.name}>
              <Link href={item.link}>
                <a className="text-lg transition duration-500 ease-in-out delay-150 hover:underline decoration-blue-500 decoration-8 -tracking-tighter">
                  {item.name}
                </a>
              </Link>
            </li>
          );
        })}
        <button className="bg-blue-300 border-blue-300 btn btn-primary hover:bg-blue-500 hover:border-blue-500">
          {" "}
          Join Us!
        </button>
      </ul>
    </div>
  );
}

export default Navbar;
