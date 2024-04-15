import { useSessionGetMutation } from "../redux/features/api/apiSlice";
import { useEffect, useState } from "react";
import { DropdownMenu, Text } from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import SideBarMenu from "./SideBarMenu";
// import { FaRegMoon } from "react-icons/fa";
// import { FaRegSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  // const [theme, setTheme] = useState<string>("light");
  // useEffect(() => {
  //   if (theme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [theme]);
  const [userInfo, setUserInfo] = useState<string>();
  const [, setUserLoginInfo] = useState<string>("");
  const [sessionGet] = useSessionGetMutation();

  useEffect(() => {
    const sessionID = localStorage.getItem("session15000");
    sessionGet({ session: { SessionID: sessionID }, port: "15000" }).then(
      (res: any) => {
        res.data &&
          res.data.data.SessionData.find(
            (detail: { Key: string; Value: string }) => {
              if (detail.Key === "UserFullname") {
                setUserInfo(detail.Value);
              }
              if (detail.Key === "UserLogin") {
                setUserLoginInfo(detail.Value);
              }
            }
          );
      }
    );
  }, []);

  const LogOutHandler = () => {
    localStorage.removeItem("session15000");
    localStorage.removeItem("session23000");
    setUserInfo("");
    navigate("/");
  };
  // const darkModeHandler = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  // };

  return (
    <div className="flex justify-between min-h-20 px-6 items-center font-shabnam">
      <div>
        <SideBarMenu />
      </div>

      <div></div>
      <div className="flex items-center">
        {/* <button onClick={() => darkModeHandler()}>
          {theme === "dark" ? (
            <FaRegMoon style={iconStyle} size={25} />
          ) : (
            <FaRegSun style={iconStyle} size={25} />
          )}
        </button> */}
        <button className="flex items-center mr-6">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="rounded-full">
              <button className="rounded-full inline-flex items-center justify-center bg-gray-300 ring-0 border-0">
                <Avatar.Root className=" inline-flex h-[35px] w-[35px] select-none items-center justify-center overflow-hidden rounded-full ring-0 align-middle">
                  <Avatar.Fallback
                    className="text-white leading-1 flex h-full w-full items-center justify-center bg-[#043A8C] text-[17px] pb-1 font-semibold ring-0"
                    delayMs={600}
                  >
                    {userInfo?.toUpperCase().slice(0, 1)}
                  </Avatar.Fallback>
                </Avatar.Root>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="min-w-[100px] bg-white rounded-md p-[5px]"
              sideOffset={5}
            >
              <DropdownMenu.Item
                onClick={() => LogOutHandler()}
                className=" text-[15px] cursor-pointer text-right bg-white leading-none rounded-[3px] flex items-center h-[18px] px-[5px] relative pl-[25px] select-none outline-none"
              >
                <button className="bg-white text-black font-shabnam">
                  خروج
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <div className="items-center justify-center">
            {userInfo && (
              <Text className="font-shabnam pr-4 text-base pb-2">
                {userInfo}
              </Text>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
