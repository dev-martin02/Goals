import { useState } from "react";
import barIcon from "../../../assets/barIcon.svg";
import { Link } from "react-router-dom";

const NavLinks = () => (
  <>
    <a href="#" className="pointer-events-none ">
      Planning
    </a>
    <Link to="Login" className="pointer-events-none">
      Login
    </Link>
    <Link to="#" className="pointer-events-none">
      See more
    </Link>
  </>
);
export default function NavBar() {
  // NavLinks are better than Links (Keep in mind for future changes )

  const [isOpen, setIsOpen] = useState(false);

  function showNavBar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <nav>
        <div className={`flex flex-col justify-around `}>
          <img
            src={barIcon}
            alt="navigationIcon"
            className={`w-10 h-10`}
            onClick={showNavBar}
          />
          {isOpen && (
            <div className="h-96 w-40 absolute top-0 left-0 bg-yellow-700 p-2  rounded-br-lg rounded-tr-lg text-white flex flex-col">
              <img
                src="#"
                alt="Close"
                className="relative left-24"
                onClick={showNavBar}
              />
              <NavLinks />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

/*
    How can I make the NavBar stay open in the larger screen? just like this -> https://app.todoist.com/app/inbox
*/
