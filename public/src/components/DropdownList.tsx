import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}



export default function DropdownList() {
  const [filter, setFilter] = useState("فناوری اطلاعات");
  return (
    <div className="w-11/12 text-center flex pt-8 font-shabnam">
      <Menu as="div" className="relative inline-block text-center w-52">
        <div>
          <Menu.Button className="text-white text-center w-full bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-2.5 inline-flex space-x-6 items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
            <FaChevronDown
              size={33}
              className="pl-4 text-2xl text-gray-100 justify-self-start"
              aria-hidden="true"
            />
            <h3 className="">{filter}</h3>
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    onClick={() => setFilter("فناوری اطلاعات")}
                    to={"#"}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-base"
                    )}
                  >
                    فناوری اطلاعات
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => setFilter("واحد مالی")}
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-base"
                    )}
                  >
                    واحد مالی
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => setFilter("منابع انسانی")}
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-base"
                    )}
                  >
                    منابع انسانی
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => setFilter("درمانت")}
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-base"
                    )}
                  >
                    درمانت
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
