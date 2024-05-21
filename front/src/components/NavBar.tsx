import { useState } from "react";
import { styled } from "styled-components";
import { PiHouseSimpleLight } from "react-icons/pi";

const NavBarDiv = styled.div`
  color: #1c2649;
  background-color: rgba(255, 255, 255, 0.9);
  font-family: "Anton", sans-serif;
  font-size: 18px;
  //position: fixed;
  z-index: 1;
  width: 100%;
`;
const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navBar = () => {
    return (
      <ul className="p-4 md:p-0 mt-4 md:mt-0 flex flex-col md:flex-row items-center md:bg-white text-base md:text-lg font-medium border md:border-0 border-gray-100 bg-gray-50 rounded-lg md:space-x-8">
        {/* <li className="mb-1">
          <div>
            <PiHouseSimpleLight size={25} className="cursor-pointer" />
          </div>
        </li> */}
        <li className="mb-1">
          <div>
            <div
              className={`py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0`}
            >
              Partenaires
            </div>
          </div>
        </li>
        <li className="mb-1">
          <div>
            <div
              className={`py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0 `}
            >
              Mes favoris
            </div>
          </div>
        </li>
        <li className="mb-1">
          <div>
            <div
              className={`py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0 `}
            >
              Mon compte
            </div>
          </div>
        </li>
      </ul>
    );
  };

  return (
    <NavBarDiv>
      <div className="w-full bg-white">
        <nav className="">
          <div className="w-full mx-auto p-4">
            <div
              className="hidden w-full md:flex justify-end md:w-auto"
              id="navbar-default"
            >
              {navBar()}
            </div>
            <div className="relative w-full flex flex-col items-center justify-center md:hidden">
              <button
                data-collapse-toggle="navbar-default-mobile"
                type="button"
                className="w-10 h-10 p-2 flex items-center justify-center md:hidden hover:bg-gray-100 text-sm text-gray-500 rounded-lg "
                aria-controls="navbar-default-mobile"
                aria-expanded="false"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              {showMobileMenu && (
                <div
                  className="z-10 absolute top-10 w-52"
                  id="navbar-default-mobile"
                >
                  {navBar()}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </NavBarDiv>
  );
};

export default NavBar;
