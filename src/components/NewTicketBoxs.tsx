import classNames from "classnames";
import { TbWorldWww } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewTicketBoxs = () => {
  const navigate =useNavigate()
  const boxes = [
    {
      lable: "IT",
      name: "فناوری اطلاعات",
      href: "/newticket",
      logo: <TbWorldWww size={35} />,
    },
    {
      lable: "Finance",
      name: "واحد مالی",
      href: "/newticket",
      logo: <FaMoneyCheck size={35} />,
    },
    {
      lable: "HR",
      name: "منابع انسانی",
      href: "/newticket",
      logo: <FaUsers size={35} />,
    },
    {
      lable: "Darmanet",
      name: "درمانت",
      href: "/newticket",
      logo: <FaStethoscope size={35} />,
    },
  ];

  return (
    <div className="bg-primary-50 w-11/12 flex justify-around p-10 rounded-md font-shabnam">
      {boxes.map((box) => (
        <div
          key={box.href}
          onClick={()=>navigate(box.href)}
          className={classNames({
            "bg-secondary-IT": box.lable === "IT",
            "bg-secondary-Finance": box.lable === "Finance",
            "bg-secondary-HR": box.lable === "HR",
            "bg-secondary-Darmanet": box.lable === "Darmanet",
            "pr-2 cursor-pointer w-1/5 py-8  flex flex-col m-auto border-2 rounded-2xl":
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
