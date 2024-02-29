import { FaUser } from "react-icons/fa";
import { useSessionGetMutation } from "../redux/features/api/apiSlice";
import { useEffect, useState } from "react";
import { DropdownMenu, Text } from "@radix-ui/themes";
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
  const [userInfo, setUserInfo] = useState("");
  const [sessionGet] = useSessionGetMutation();

  const iconStyle = { color: "gray" };
  useEffect(() => {
    const sessionID = localStorage.getItem("session15000");
    sessionGet({session :{SessionID: sessionID},port: "15000" }).then((res: any) => {
      res.data && res.data.data.SessionData.find(
        (detail: { Key: string; Value: string }) => {
          if (detail.Key === "UserFullname") {
            setUserInfo(detail.Value);
          }
        }
      );
    });
  }, []);
  const LogOutHandler=()=>{
    localStorage.removeItem("session15000")
    navigate("/")
  }
  // const darkModeHandler = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  // };
  
  return (
    <div className="flex justify-between min-h-20 px-6 items-center font-shabnam">
      <div>
        <SideBarMenu />
      </div>

      <div></div>
      <div className="flex">
        {/* <button onClick={() => darkModeHandler()}>
          {theme === "dark" ? (
            <FaRegMoon style={iconStyle} size={25} />
          ) : (
            <FaRegSun style={iconStyle} size={25} />
          )}
        </button> */}
        <button className="border-none flex items-center mr-6">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="border-0">
              <button className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center bg-white border-0 ring-0">
                <FaUser style={iconStyle} size={25} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="min-w-[100px] bg-white rounded-md p-[5px]"
              sideOffset={5}
            >
              <DropdownMenu.Item onClick={()=>LogOutHandler()} className=" text-[15px] cursor-pointer text-right bg-white leading-none rounded-[3px] flex items-center h-[18px] px-[5px] relative pl-[25px] select-none outline-none">
                <button className="bg-white text-black font-shabnam">خروج</button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          {userInfo && (
            <Text className="font-shabnam pr-6 text-base">{userInfo}</Text>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
