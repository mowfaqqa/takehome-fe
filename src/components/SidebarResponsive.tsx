import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { XCircle, ChevronDown } from "react-feather";
import Button from "./Button";
import { navigation } from "./Sidebar";
import Link from "next/link";
import { useRouter } from "next/router";

const userNavigation = [{ name: "Logout", href: "#" }];
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const SidebarResponsive = (): JSX.Element => {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <Button onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XCircle color="#fff" />
                    </Button>
                  </div>
                </Transition.Child>
                <div className="sidebar-header px-2 mb-1 mt-5 ml-5">
                  <Image
                    src="/assets/frame.svg"
                    width={191}
                    height={41}
                    alt="logo"
                  />
                </div>
                <nav className="sidebar-content px-2 space-y-1 bg-white">
                  {navigation.map((item: any, index: number) => {
                    return (
                      <Link key={item.name} href={item.href} passHref>
                        <span
                          className={classNames(
                            router.asPath === item.href
                              ? "bg-primary-main text-white"
                              : "text-secondary-main hover:bg-primary-light",
                            "group flex items-center my-4 px-2 py-2 text-sm font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className="mr-3 h-6 w-6 text-gray-900"
                            aria-hidden="true"
                          />
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
        <div className="flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex border-b">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                width="18"
                height="12"
                viewBox="0 0 21 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.08154 7.80371H19.0815M1.08154 1.80371H19.0815M1.08154 13.8037H19.0815"
                  stroke="#344054"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="flex-1 px-6 flex justify-between items-center py-3">
              <div className="flex-1 flex"></div>
              <div className="ml-4 flex items-center md:ml-6">
                <div className=" flex items-center">{/* <Wraped /> */}</div>
                {/* Profile dropdown */}
                <Menu
                  as="div"
                  className="ml-3 relative bg-primary-faded pr-3 pl-1.5 py-1 rounded-2xl"
                >
                  <div>
                    <Menu.Button className="flex items-center">
                      <div className=" p-2 bg-primary-light border border-solid border-primary-light text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                        <span className="sr-only">Open user menu</span>
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 19 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#FFC3BD"
                        >
                          <path
                            d="M17.0815 19.8037V17.8037C17.0815 16.7428 16.6601 15.7254 15.91 14.9753C15.1598 14.2251 14.1424 13.8037 13.0815 13.8037H5.08154C4.02068 13.8037 3.00326 14.2251 2.25312 14.9753C1.50297 15.7254 1.08154 16.7428 1.08154 17.8037V19.8037M13.0815 5.80371C13.0815 8.01285 11.2907 9.80371 9.08154 9.80371C6.8724 9.80371 5.08154 8.01285 5.08154 5.80371C5.08154 3.59457 6.8724 1.80371 9.08154 1.80371C11.2907 1.80371 13.0815 3.59457 13.0815 5.80371Z"
                            stroke="#AB1A39"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="mx-2 text-sm flex items-center">
                        {/* {authUser?.firstName!}{" "} */}
                        <ChevronDown size={15} className="ml-2" />
                      </span>
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
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarResponsive;
