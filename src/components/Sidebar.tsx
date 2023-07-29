/* eslint-disable require-jsdoc */
import React from "react";
import Image from "next/image";
import { BarChart, File, Settings, User } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/router";

interface INAVIGATION_ITEM {
  [x: string]: any;
}

const Sidebar = () => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("userData")!);

  const userEmail = user?.userRecord.email;
  console.log(userEmail);
  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <div className="hidden md:fixed h-full md:flex md:w-64 md:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-grow flex-col overflow-y-auto pt-2">
        <div className="flex flex-col justify-center items-center px-4">
          {/* <Image
            className="h-10 w-auto"
            src="/assets/apexlogo-light.png"
            width={250}
            height={125}
            alt="Your Company"
          /> */}
        </div>
        <div className="mt-2 flex flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {userEmail === "user-c@mail.com" && (
              <>
                {adminNavigation.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <span
                      className={classNames(
                        router.asPath === item.href
                          ? "bg-primary-main text-white"
                          : "text-primary-main hover:bg-gray-400 hover:text-white",
                        "group flex items-center my-4 px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className="mr-3 h-6 w-6 text-secondary-main "
                        aria-hidden="true"
                      />
                      {item.name}
                    </span>
                  </Link>
                ))}
              </>
            )}
            {userEmail !== "user-c@mail.com" && (
              <>
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <span
                      className={classNames(
                        router.asPath === item.href
                          ? "bg-primary-main text-white"
                          : "text-primary-main hover:bg-gray-400 hover:text-white",
                        "group flex items-center my-4 px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className="mr-3 h-6 w-6 text-secondary-main "
                        aria-hidden="true"
                      />
                      {item.name}
                    </span>
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

export const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart },
];
export const adminNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart },
  { name: "Data", href: "/userData", icon: User },
];
