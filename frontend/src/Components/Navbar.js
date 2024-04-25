import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLogout } from "../Hooks/useLogout";
import useAuthenticationContextHook from "../Hooks/useAuthenticationContextHook";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";

const navigation = [
  { name: "Team", href: "#", current: false },
  { name: "Signup", href: "/signup", current: false },
  { name: "Login", href: "/login", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { logOut } = useLogout();
  const { user } = useAuthenticationContextHook();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onClickHandler = () => {
    console.log("LOG OUT Clicked");
    logOut();
  };

  useEffect(() => {
    // Fetch user profile data when the component mounts
    async function fetchUserData() {
      setLoading(true);
      try {
        console.log("in navbar Fetching user data for: ", user.email);

        const response = await fetch(`/api/userProfile/getUserProfileData?email=${user.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        
        console.log("User data fetched: ", data);

        //console.log("User data fetched: ", data);
        setUserData(data);
        setLoading(false);
  
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Disclosure as="nav" className="bg-green-400 text-black fixed w-full z-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-20">
            <div className="relative flex mt-4 items-center justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                {/* Logo here */}
                <img
                  className="hidden lg:block h-8 w-auto text-white"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="VAG"
                />
              </div>
              <div className="hidden sm:block sm:ml-10 space-x-4">
                {user ? (
                  <div>
                    <Link
                      to="/discoverArt"
                      className={classNames(
                        "text-white",
                        "mr-2 px-4 py-2 rounded-md text-sm font-medium ",
                        "fs-4"
                      )}
                    >
                      Discover Art
                    </Link>
                    <Link
                      to="/VirtualGallery"
                      className={classNames(
                        "text-white",
                        "mr-2 px-4 py-2 rounded-md text-sm font-medium",
                        "fs-4"
                      )}
                    >
                      Virtual Exhibition
                    </Link>
                    <Link
                      to="/uploadArt"
                      className={classNames(
                        "text-white",
                        "mr-2 px-4 py-2 rounded-md text-sm font-medium",
                        "fs-4"
                      )}
                    >
                      Upload Art
                    </Link>
                    <Link
                      to="/AddCart"
                      className={classNames(
                        "text-white",
                        "mr-2 px-4 py-2 rounded-md text-sm font-medium ",
                        "fs-4"
                      )}
                    >
                      Your Cart
                    </Link>
                    <Link
                      to="/team"
                      className={classNames(
                        "text-white",
                        "mr-2 px-4 py-2 rounded-md text-sm font-medium ",
                        "fs-4"
                      )}
                    >
                      Team
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className={classNames(
                        "text-white",
                        "px-6 py-3 rounded-md text-sm font-medium bg-black ",
                        "fs-3"
                      )}
                    >
                      Sign Up
                    </Link>

                    <Link
                      to="/login"
                      className={classNames(
                        "text-black",
                        "px-6 py-3 rounded-md text-sm font-medium bg-white",
                        "fs-3"
                      )}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
              {user && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-circle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          {userData && userData.length > 0 && userData[0].image && (
                            <img
                              className="h-8 w-16 rounded-circle"
                              src={require(`../uploads/ProfileImage/${userData[0].image}`)}
                              alt=""
                            />
                          )}
                        </Menu.Button>

                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={onClickHandler}
                            >
                              Log out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
