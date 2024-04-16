import { useEffect, useRef, useState } from "react";
import {  useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
// import {  useForm } from "react-hook-form";

//Data
import { useTicketListMutation } from "../redux/features/api/apiSlice";

import { Toast } from "primereact/toast";

import TicketAccordion from "../components/TicketAccordion";
import DetailSidebar from "../components/DetailSidebar";
import FollowUpMessenger from "../components/FollowUpMessenger";

// interface FormData {
//   description: string;
//   queue: string;
//   title: string;
//   type: { name: string; code: string };
//   priority: string;
//   state: string;
//   file: any;
// }

type DetailTicketType = {
  Age: number;
  TicketNumber: number;
  State: string;
  Priority: string;
  Queue: string;
  Owner: string;
  StateType: string;
};
type Params = {
  id?: string;
  unit: string;
};
const DetailTicketPage = () => {
  const toast = useRef<Toast>(null);
  const [ticketList] = useTicketListMutation();

  const [detailTicket, setDetailTicket] = useState<DetailTicketType>();
  const [showReply, setShowReply] = useState(false);
  const [articles, setArticles] = useState([]);
  const { unit, id } = useParams<Params>();

  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>();

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "بارگذاری موفق",
      detail: "فایل شما با موفقیت بارگذاری شد",
      life: 3000,
    });
  };

  useEffect(() => {
    ticketList({
      ticketId: {
        SessionID: localStorage.getItem(
          `session${unit === "HR" ? "23000" : "15000"}`
        ),
        TicketID: parseInt(id!),
        ArticleSenderType: ["customer", "agent"],
        AllArticles: 1,
        Attachments: 1,
      },
      port: `${unit === "HR" ? "23000" : "15000"}`,
    }).then((res: any) => {
      setArticles(res.data.data.Ticket[0].Article);
      setDetailTicket(res.data.data.Ticket[0]);
    });
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <Navbar />
      <div className="w-full flex justify-center">
        <TicketAccordion articles={articles} setShowReply={setShowReply} />
        <div className="w-1/12"></div>
        <DetailSidebar detailTicket={detailTicket} />
      </div>
      {showReply && (
        <FollowUpMessenger
          detailTicket={detailTicket}
          setShowReply={setShowReply}
          showSuccess={showSuccess}
        />
      )}
    </>
  );
};

export default DetailTicketPage;
