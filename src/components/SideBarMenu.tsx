import { useRef, useState } from "react";
import { Sidebar } from "primereact/sidebar";

import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { StyleClass } from 'primereact/StyleClass';

import { TbWorldWww } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";

export default function SideBarMenu() {
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const btnRef3 = useRef<any>(null);
  return (
    <>
      <div className="flex justify-content-center font-shabnam  bg-white dark:bg-gray-800">
        <button
          className="text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
          onClick={() => setVisibleRight(true)}
        >
          <GiHamburgerMenu size={"20px"} />
        </button>
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
          content={() => (
            <div className="min-h-screen flex font-shabnam  lg:static surface-ground">
              <div
                id="app-sidebar-2"
                className=" h-screen  flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
                style={{ width: "280px" }}
              >
                <div className="w-full justify-end flex flex-column h-full">
                  <div className="flex justify-content-between px-4 pt-3 flex-shrink-0">
                    <div>
                      <button
                        type="button"
                        onClick={() => setVisibleRight(false)}
                        data-drawer-hide="drawer-navigation"
                        aria-controls="drawer-navigation"
                        className="text-gray-400 bg-transparent mr-4 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2 end-2 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Close menu</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex py-4 overflow-y-auto">
                    <ul className="space-y-2 flex flex-col items-end font-medium">
                      <li className="text-right pt-8">
                        <Link
                          to={"/dashboard"}
                          className="flex items-center justify-end space-x-4 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <span className="ms-3 text-right">داشبورد</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                          </svg>
                        </Link>
                      </li>
                      <h5
                        id="drawer-navigation-label"
                        className="text-base text-right pt-2 font-semibold text-gray-500 uppercase dark:text-gray-400"
                      >
                        درخواست ها
                      </h5>
                      {/* <li className="text-right">
                        <Link
                          to={"/newticket"}
                          className="flex items-center justify-end space-x-4 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <span className="ms-3 text-right">ایجاد درخواست</span>
                          <svg
                            fill="currentColor"
                            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            viewBox="0 0 24 24"
                            version="1.2"
                            baseProfile="tiny"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M18 10h-4v-4c0-1.104-.896-2-2-2s-2 .896-2 2l.071 4h-4.071c-1.104 0-2 .896-2 2s.896 2 2 2l4.071-.071-.071 4.071c0 1.104.896 2 2 2s2-.896 2-2v-4.071l4 .071c1.104 0 2-.896 2-2s-.896-2-2-2z" />
                          </svg>
                        </Link>
                      </li> */}
                      <li>
                        <StyleClass
                          nodeRef={btnRef3}
                          selector="@next"
                          enterClassName="hidden"
                          enterActiveClassName="slidedown"
                          leaveToClassName="hidden"
                          leaveActiveClassName="slideup"
                        >
                          <a
                            ref={btnRef3}
                            className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 transition-duration-150 transition-colors w-full"
                          >
                            <i className="pi pi-chart-line mr-2"></i>
                            <span className="font-medium">ایجاد درخواست جدید</span>
                            <i className="pi pi-chevron-down ml-auto mr-1"></i>
                            <svg
                            fill="currentColor"
                            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            viewBox="0 0 24 24"
                            version="1.2"
                            baseProfile="tiny"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M18 10h-4v-4c0-1.104-.896-2-2-2s-2 .896-2 2l.071 4h-4.071c-1.104 0-2 .896-2 2s.896 2 2 2l4.071-.071-.071 4.071c0 1.104.896 2 2 2s2-.896 2-2v-4.071l4 .071c1.104 0 2-.896 2-2s-.896-2-2-2z" />
                          </svg>
                          </a>
                        </StyleClass>
                        <ul className="list-none py-0 text-right pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                          <li className="text-right">
                            <Link to={"/newticket/IT"} className="p-ripple flex text-right align-items-center items-center cursor-pointer p-3 border-round text-700 hover:bg-gray-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-table mr-2"></i>
                              <span className="font-medium text-right pr-2"> واحد فناوری اطلاعات</span>
                              <TbWorldWww size={25} />
                            </Link>
                          </li>
                          <li className="text-right">
                            <Link to={"/newticket/HR"} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:bg-gray-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-search mr-2"></i>
                              <span className="font-medium pr-2 pl-4">واحد منابع انسانی</span>
                              <FaUsers size={25} />
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="text-right">
                        <Link
                          to={"/myticket"}
                          className="flex items-center justify-end space-x-4 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span> */}
                          <span className="flex-1 ms-3 whitespace-nowrap">
                            لیست درخواست‌های من
                          </span>
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                          </svg>
                        </Link>
                      </li>
                      {/* <li className="text-right">
                        <Link
                          to={"/alltickets"}
                          className="flex items-center justify-end space-x-4 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <span className="flex-1 ms-3 whitespace-nowrap">
                            لیست همه‌ی درخواست‌ها
                          </span>
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                          </svg>
                        </Link>
                      </li> */}
                      {/* <li className="text-right">
              <a
                href="#"
                className="flex items-center justify-end space-x-4 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  تیکت های بسته شده{" "}
                </span>
                <svg
                  fill="currentColor"
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m13.817 5.669 4.504 4.501-8.15 8.15-4.501-4.504zm-3.006 13.944 8.8-8.8c.166-.163.27-.389.27-.64s-.103-.477-.269-.64l-5.156-5.156c-.166-.158-.392-.255-.64-.255s-.474.097-.64.256l-8.8 8.8c-.166.163-.27.389-.27.64s.103.477.269.64l5.156 5.156c.166.158.392.255.64.255s.474-.097.64-.256zm12.663-9.073-12.918 12.933c-.332.326-.787.527-1.289.527s-.957-.201-1.289-.527l-1.794-1.793c.477-.492.77-1.164.77-1.905 0-1.513-1.227-2.74-2.74-2.74-.74 0-1.412.294-1.905.771l.001-.001-1.781-1.794c-.326-.332-.527-.787-.527-1.289s.201-.957.527-1.289l12.919-12.906c.332-.326.787-.527 1.289-.527s.957.201 1.289.527l1.781 1.781c-.515.499-.835 1.197-.835 1.969 0 1.513 1.227 2.74 2.74 2.74.773 0 1.471-.32 1.969-.835l.001-.001 1.794 1.781c.326.332.527.787.527 1.289s-.201.957-.527 1.289z" />
                </svg>
              </a>
            </li> */}
                    </ul>
                  </div>
                  {/* <div className="overflow-y-auto">
                    <ul className="list-none p-3 m-0">
                      <li>
                        <StyleClass
                          nodeRef={btnRef1}
                          selector="@next"
                          enterClassName="hidden"
                          enterActiveClassName="slidedown"
                          leaveToClassName="hidden"
                          leaveActiveClassName="slideup"
                        >
                          <div
                            ref={btnRef1}
                            className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer"
                          >
                            <span className="font-medium">FAVORITES</span>
                            <i className="pi pi-chevron-down"></i>
                            <Ripple />
                          </div>
                        </StyleClass>
                        <ul className="list-none p-0 m-0 overflow-hidden">
                          <li>
                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-home mr-2"></i>
                              <span className="font-medium">Dashboard</span>
                              <Ripple />
                            </a>
                          </li>
                          <li>
                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-bookmark mr-2"></i>
                              <span className="font-medium">Bookmarks</span>
                              <Ripple />
                            </a>
                          </li>
                          <li>
                            <StyleClass
                              nodeRef={btnRef2}
                              selector="@next"
                              enterClassName="hidden"
                              enterActiveClassName="slidedown"
                              leaveToClassName="hidden"
                              leaveActiveClassName="slideup"
                            >
                              <a
                                ref={btnRef2}
                                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                              >
                                <i className="pi pi-chart-line mr-2"></i>
                                <span className="font-medium">Reports</span>
                                <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                <Ripple />
                              </a>
                            </StyleClass>
                            <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                              <li>
                                <StyleClass
                                  nodeRef={btnRef3}
                                  selector="@next"
                                  enterClassName="hidden"
                                  enterActiveClassName="slidedown"
                                  leaveToClassName="hidden"
                                  leaveActiveClassName="slideup"
                                >
                                  <a
                                    ref={btnRef3}
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                  >
                                    <i className="pi pi-chart-line mr-2"></i>
                                    <span className="font-medium">Revenue</span>
                                    <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                    <Ripple />
                                  </a>
                                </StyleClass>
                                <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                  <li>
                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                      <i className="pi pi-table mr-2"></i>
                                      <span className="font-medium">View</span>
                                      <Ripple />
                                    </a>
                                  </li>
                                  <li>
                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                      <i className="pi pi-search mr-2"></i>
                                      <span className="font-medium">
                                        Search
                                      </span>
                                      <Ripple />
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                  <i className="pi pi-chart-line mr-2"></i>
                                  <span className="font-medium">Expenses</span>
                                  <Ripple />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-users mr-2"></i>
                              <span className="font-medium">Team</span>
                              <Ripple />
                            </a>
                          </li>
                          <li>
                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-comments mr-2"></i>
                              <span className="font-medium">Messages</span>
                              <span
                                className="inline-flex align-items-center justify-content-center ml-auto bg-blue-500 text-0 border-circle"
                                style={{ minWidth: "1.5rem", height: "1.5rem" }}
                              >
                                3
                              </span>
                              <Ripple />
                            </a>
                          </li>
                          <li>
                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-calendar mr-2"></i>
                              <span className="font-medium">Calendar</span>
                              <Ripple />
                            </a>
                          </li>
                          <li>
                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-cog mr-2"></i>
                              <span className="font-medium">Settings</span>
                              <Ripple />
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul className="list-none p-3 m-0">
                      <li>
                        <StyleClass
                          nodeRef={btnRef4}
                          selector="@next"
                          enterClassName="hidden"
                          enterActiveClassName="slidedown"
                          leaveToClassName="hidden"
                          leaveActiveClassName="slideup"
                        >
                          <div
                            ref={btnRef4}
                            className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer"
                          >
                            <span className="font-medium">APPLICATION</span>
                            <i className="pi pi-chevron-down"></i>
                            <Ripple />
                          </div>
                        </StyleClass>
                        <ul className="list-none p-0 m-0 overflow-hidden">
                          <li>
                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-folder mr-2"></i>
                              <span className="font-medium">Projects</span>
                              <Ripple />
                            </a>
                          </li>
                          <li>
                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-chart-bar mr-2"></i>
                              <span className="font-medium">Performance</span>
                              <Ripple />
                            </a>
                          </li>
                          <li>
                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-cog mr-2"></i>
                              <span className="font-medium">Settings</span>
                              <Ripple />
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div> */}
                  {/* <div className="mt-auto">
                    <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                    <a
                      v-ripple
                      className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    >
                      <Avatar
                        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                        shape="circle"
                      />
                      <span className="font-bold">Amy Elsner</span>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        ></Sidebar>
      </div>
    </>
  );
}
