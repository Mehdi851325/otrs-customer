import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Controller, useForm } from "react-hook-form";
//Data
import {
  useTicketListMutation,
  useTicketUpdateMutation,
} from "../redux/features/api/apiSlice";
import QueuesSM from "../data/QueuesSM";
import Priority from "../data/Priority";
// import StateReply from "../data/StateReply";
//styled

import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";
import { Button, TextField } from "@radix-ui/themes";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";

interface FormData {
  description: string;
  queue: string;
  title: string;
  type: { name: string; code: string };
  priority: string;
  state: string;
}
type Aeticle = {
  ArticleNumber: number;
  Subject: string;
  From: string;
  To: string;
  Body: string;
};

type DetailTicketType = {
  TicketNumber: number;
  State: string;
  Priority: string;
  Queue: string;
  Owner: string;
  StateType: string;
};
type Params = {
  id?: string;
};
const DetailTicket = () => {
  const navigate = useNavigate();
  const [ticketList] = useTicketListMutation();
  const [ticketUpdate] = useTicketUpdateMutation();

  const [detailTicket, setDetailTicket] = useState<DetailTicketType>();
  const [showReply, setShowReply] = useState(false);
  const [articles, setArticles] = useState([]);
  const { id } = useParams<Params>();
  const { register, control, handleSubmit } = useForm<FormData>();
  console.log(id);
  useEffect(() => {
    const sessionID = localStorage.getItem("session");
    ticketList({
      SessionID: sessionID,
      TicketID: parseInt(id!),
      ArticleSenderType: ["customer", "agent"],
      AllArticles: 1,
    }).then((res: any) => {
      setArticles(res.data.data.Ticket[0].Article);
      setDetailTicket(res.data.data.Ticket[0]);
    });
  }, []);
  const formSubmitHandler = (data: FormData) => {
    const sessionID = localStorage.getItem("session");
    if (detailTicket) {
      ticketUpdate({
        SessionID: sessionID,
        Ticket: {
          TicketID: parseInt(id!),
          Queue: "",
          State: "open",
          Owner: detailTicket.Owner,
        },
        Article: {
          CommunicationChannelID: 3,
          Subject: data.title,
          Body: data.description,
          ContentType: "text/plain; charset=utf8",
          Charset: "utf8",
          MimeType: "text/plain",
          Attachment: {
            Content: "Dear customer,",
            ContentType: "text/plain",
            Filename: "a.txt",
          },
        },
      }).then((res) => {
        console.log(res);
        navigate("/myticket");
      });
    }
  };
  const queueName = () => {
    if (detailTicket) {
      const findQueueName = QueuesSM.find(
        (queue) => queue.data === detailTicket.Queue
      );
      return findQueueName;
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="w-8/12 flex items-center justify-center">
          <Accordion pt={{ root: { className: "w-full font-shabnam" } }}>
            {articles.map((article: Aeticle, index: number) => (
              <AccordionTab
                pt={{
                  header: { className: " rounded-md border-2 my-4" },
                  headerAction: {
                    className: "flex-row-reverse text-right px-4",
                  },
                  headerTitle: { className: "py-6 px-2" },
                  headerIcon: { className: "w-8 pr-2" },
                }}
                key={article.ArticleNumber}
                header={article.Subject}
              >
                <Card
                  key={article.ArticleNumber}
                  pt={{
                    root: { className: "px-10 py-4" },
                    footer: { className: "felx justify-end items-end w-full" },
                  }}
                  footer={
                    index === articles.length - 1 && (
                      <Button
                        onClick={() => setShowReply(true)}
                        className="bg-primary-500 cursor-pointer px-8 py-5 text-base font-shabnam"
                      >
                        پاسخ
                      </Button>
                    )
                  }
                >
                  <div>
                    <div>
                      <ul className="py-4 space-y-2">
                        <li>
                          <span className="font-bold text-gray-500">
                            از&nbsp;:&nbsp;
                          </span>
                          {article.From}
                        </li>
                        {article.To && (
                          <li>
                            <span>به&nbsp;:&nbsp;</span>
                            {article.To}
                          </li>
                        )}
                        <li>
                          <span className="font-bold text-gray-500">
                            موضوع&nbsp;:&nbsp;
                          </span>
                          {article.Subject}
                        </li>
                      </ul>
                    </div>
                    <div className="border-t-4 py-4 pr-6">{article.Body}</div>
                  </div>
                </Card>
              </AccordionTab>
            ))}
          </Accordion>
        </div>
        <div className="w-1/12"></div>
        <div className="w-2/12 h-full border-2 mt-4 rounded-md">
          <div className="border-b-2 p-2 bg-primary-200">مشخصات درخواست</div>
          <div className="border-2 p-2 ">
            {detailTicket && (
              <ul className="space-y-4">
                <li>
                  <span className="font-bold text-gray-500">
                    شماره&nbsp;&nbsp;:&nbsp;&nbsp;
                  </span>
                  {detailTicket.TicketNumber}
                </li>
                <li>
                  <span className="font-bold text-gray-500">
                    وضعیت&nbsp;&nbsp;:&nbsp;&nbsp;
                  </span>
                  {detailTicket.State}
                </li>
                <li>
                  <span className="font-bold text-gray-500">
                    حالت&nbsp;&nbsp;:&nbsp;&nbsp;
                  </span>
                  {detailTicket.Priority}
                </li>
                <li>
                  <span className="font-bold text-gray-500">
                    واحد&nbsp;&nbsp;:&nbsp;&nbsp;
                  </span>
                  {queueName()?.name}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {showReply && (
        <div className="w-full flex justify-center">
          <form
            className="w-8/12 p-5 space-y-3 font-shabnam"
            onSubmit={handleSubmit((data) => formSubmitHandler(data))}
          >
            <TextField.Root>
              <TextField.Input
                className="p-2 py-4 text-right"
                placeholder="موضوع"
                {...register("title")}
              />
            </TextField.Root>
            <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Editor
                id={field.name}
                name="description"
                value={field.value}
                onTextChange={(e) => field.onChange(e.textValue)}
                style={{ height: "320px" ,	 fontSize:"1.25rem", fontFamily:"shabnam",textAlign:"right"}}
              />
            )}
          />
            <div className="border-2 p-1 rounded-md card flex font-shabnam">
              <Controller
                name="priority"
                control={control}
                rules={{ required: "priority is required." }}
                render={({ field }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    optionLabel="name"
                    placeholder="فوریت"
                    options={Priority}
                    focusInputRef={field.ref}
                    onChange={(e) => field.onChange(e.value)}
                    className="w-full"
                    pt={{
                      root: {
                        className:
                          "flex flex-row-reverse justify-between w-full content-between text-right shadow-none",
                      },
                      input: {
                        className:
                          "justify-self-end self-end ml-auto font-shabnam",
                      },
                      panel: { className: "mt-4 font-shabnam text-right" },
                      item: { className: "p-2" },
                    }}
                  />
                )}
              />
            </div>
            {/* <div className="border-2 p-1 rounded-md card flex font-shabnam">
              <Controller
                name="state"
                control={control}
                rules={{ required: "state is required." }}
                render={({ field }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    optionLabel="name"
                    placeholder="Select a state"
                    options={StateReply}
                    focusInputRef={field.ref}
                    onChange={(e) => field.onChange(e.value)}
                    className="w-full"
                    pt={{
                      root: {
                        className:
                          "flex flex-row-reverse justify-between w-full content-between text-right shadow-none",
                      },
                      input: {
                        className:
                          "justify-self-end self-end ml-auto font-shabnam",
                      },
                      panel: { className: "mt-4 font-shabnam text-right" },
                      item: { className: "p-2" },
                    }}
                  />
                )}
              />
            </div> */}
            <Button className="bg-primary-500 cursor-pointer px-6 py-4">
              ثبت
            </Button>
            <Button
              onClick={() => setShowReply(false)}
              className="bg-gray-500 cursor-pointer px-6 mx-6 py-4"
            >
              انصراف
            </Button>
          </form>
          <div className="w-3/12"></div>
        </div>
      )}
    </>
  );
};

export default DetailTicket;
