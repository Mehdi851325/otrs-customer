import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

const DropdownDash = ({setQueue}) => {
  const [selectedQueue, setSelectedQueue] = useState();
  const queue = [
    { name: "فناوری اطلاعات", code: "IT" },
    { name: "واحد مالی", code: "Finance" },
    { name: "منابع انسانی", code: "HR" },
    { name: "درمانت", code: "Darmanet" },
  ];
const ChangeHandler = (e) =>{
    setQueue(e.value.code)
    setSelectedQueue(e.value)
}
  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedQueue}
        onChange={(e) => ChangeHandler(e)}
        options={queue}
        optionLabel="name"
        placeholder="فناوری اطلاعات"
        className="w-full md:w-14rem"
      />
    </div>
  );
};

export default DropdownDash;
