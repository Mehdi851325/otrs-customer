import classNames from "classnames";
import { TbWorldWww } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewTicketBoxs = () => {
  const navigate = useNavigate();
  const boxes = [
    {
      lable: "IT",
      name: "فناوری اطلاعات",
      href: "/newticket/IT",
      logo: <TbWorldWww size={35} />,
    },
    {
      lable: "HR",
      name: "منابع انسانی",
      href: "/newticket/HR",
      logo: <FaUsers size={35} />,
    },
    {
      lable: "Finance",
      name: "واحد مالی",
      href: "/newticket/Finance",
      logo: <FaMoneyCheck size={35} />,
    },
    {
      lable: "Darmanet",
      name: "درمانت",
      href: "/newticket/Darmanet",
      logo: <FaStethoscope size={35} />,
    },
  ];

  return (
    <div className="lg:bg-gradient-to-t from-gray-400 from-60% to-white to-30% bg-gray-300 w-11/12 flex flex-col lg:flex-row justify-around p-10 rounded-md font-shabnam">
      {boxes.map((box) => (
        <div
          key={box.href}
          onClick={() => navigate(box.href)}
          className={classNames({
            "!bg-[#F1E9FB] pointer-events-auto text-[#441C78] border-[#441C78]":
              box.lable === "IT",
            "!bg-[#C3C6CB] pointer-events-none text-gray-600 border-gray-600":
              box.lable === "Darmanet",
            "bg-[#C3C6CB] pointer-events-none text-gray-600 border-gray-600":
              box.lable === "Finance",
            "!bg-[#FFF9E5] pointer-events-auto text-[#8C6B04] border-[#8C6B04]":
              box.lable === "HR",
            "pr-2 cursor-pointer lg:w-1/5 w-4/5 py-8 mt-4  flex flex-col m-auto border rounded-2xl":
              true,
          })}
        >
          <div className="pb-6 pr-4">{box.logo}</div>
          <h2 className="text-lg font-medium pt-6 pr-4">{box.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default NewTicketBoxs;
