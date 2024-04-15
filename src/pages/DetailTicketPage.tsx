import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Controller, useForm } from "react-hook-form";
import { BsExclamationOctagon } from "react-icons/bs";
//Data
import {
  useTicketListMutation,
  useTicketUpdateMutation,
} from "../redux/features/api/apiSlice";

import Priority from "../data/Priority";
// import StateReply from "../data/StateReply";
//styled

import { Button, TextField } from "@radix-ui/themes";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import * as Label from "@radix-ui/react-label";

import TicketAccordion from "../components/TicketAccordion";
import DetailSidebar from "../components/DetailSidebar";

interface FormData {
  description: string;
  queue: string;
  title: string;
  type: { name: string; code: string };
  priority: string;
  state: string;
  file: any;
}


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
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [ticketList] = useTicketListMutation();
  const [ticketUpdate] = useTicketUpdateMutation();

  const [detailTicket, setDetailTicket] = useState<DetailTicketType>();
  const [showReply, setShowReply] = useState(false);
  const [articles, setArticles] = useState([]);
  const { unit, id } = useParams<Params>();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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

  const formSubmitHandler = (data: FormData) => {
    if (data.file) {
      var reader = new FileReader();
      reader.readAsDataURL(data.file);
      reader.onload = function () {
        const stringResult: any = reader.result;
        const searchBase64 = stringResult.search("base64");
        const sliceBase64 = stringResult.slice(searchBase64 + 7);
        ticketUpdate({
          detailTicket: {
            SessionID: localStorage.getItem(
              `session${unit === "HR" ? "23000" : "15000"}`
            ),
            Ticket: {
              TicketID: parseInt(id!),
              Queue: "",
              State: "open",
              Owner: detailTicket?.Owner,
            },
            Article: {
              CommunicationChannelID: 3,
              Subject: data.title,
              Body: data.description,
              ContentType: "text/plain; charset=utf8",
              Charset: "utf8",
              MimeType: "text/plain",
            },
            Attachment: {
              Content: sliceBase64,
              ContentType: data.file.type,
              Filename: data.file.name,
            },
          },
          port: `${unit === "HR" ? "23000" : "15000"}`,
        }).then(() => {
          navigate("/myticket");
        });
      };
    } else {
      ticketUpdate({
        detailTicket: {
          SessionID: localStorage.getItem(
            `session${unit === "HR" ? "23000" : "15000"}`
          ),
          Ticket: {
            TicketID: parseInt(id!),
            Queue: "",
            State: "open",
            Owner: detailTicket?.Owner,
          },
          Article: {
            CommunicationChannelID: 3,
            Subject: data.title,
            Body: data.description,
            ContentType: "text/plain; charset=utf8",
            Charset: "utf8",
            MimeType: "text/plain",
          },
        },
        port: `${unit === "HR" ? "23000" : "15000"}`,
      }).then(() => {
        navigate("/myticket");
      });
    }
  };
  

 
  return (
    <>
      <Toast ref={toast} />
      <Navbar />
      <div className="w-full flex justify-center">
        <TicketAccordion articles={articles} setShowReply={setShowReply}/>
        <div className="w-1/12"></div>
        <DetailSidebar detailTicket={detailTicket}/>
      </div>
      {showReply && (
        <div className="w-full flex justify-center">
          <form
            className="w-8/12 p-5 space-y-3 font-shabnam"
            onSubmit={handleSubmit((data) => formSubmitHandler(data))}
          >
            <div className="relative">
              <div className="absolute top-[-20px] right-[12px] bg-white px-2 z-10">
                <Label.Root
                  className={`text-[15px] font-medium leading-[35px] mb-6 ${
                    errors.title ? "text-red-700" : "text-black"
                  }`}
                  htmlFor="title"
                >
                  عنوان درخواست
                </Label.Root>
              </div>
              <div>
                <TextField.Root>
                  <TextField.Input
                    className="p-2 py-6 text-right"
                    placeholder="موضوع"
                    {...register("title", {
                      required: "عنوان درخواست خود را وارد نمایید",
                    })}
                  />
                </TextField.Root>
              </div>
              {errors.title && (
                <div className="pr-6 py-1 mb-8 bg-red-100 mt-2 rounded-md flex items-center">
                  <BsExclamationOctagon color="red" />
                  <p className="text-red-700 pr-2">{errors.title.message}</p>
                </div>
              )}
            </div>
            <div>
              <div>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "توضیحات درخواست خود را وارد نمایید" }}
                  render={({ field }) => (
                    <Editor
                      id={field.name}
                      name="description"
                      value={field.value}
                      onTextChange={(e) => field.onChange(e.textValue)}
                      style={{
                        height: "320px",
                        fontSize: "1.25rem",
                        fontFamily: "shabnam",
                        textAlign: "right",
                      }}
                    />
                  )}
                />
              </div>
              {errors.description && (
                <div className="pr-6 py-1 mb-8 bg-red-100 mt-1 rounded-md flex items-center">
                  <BsExclamationOctagon color="red" />
                  <p className="text-red-700 pr-2">
                    {errors.description.message}
                  </p>
                </div>
              )}
            </div>
            <div className="relative">
              <div className="absolute top-[-20px] right-[12px] bg-white px-2 z-10">
                <Label.Root
                  className="text-[15px] font-medium leading-[35px] text-black mb-6"
                  htmlFor="type"
                >
                  الویت درخواست
                </Label.Root>
              </div>
              <div className="border-2 py-4 rounded-md card flex font-shabnam">
                <Controller
                  name="priority"
                  control={control}
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
            </div>
            <div className="w-full border-2 p-1 rounded-md card flex font-shabnam">
              <Controller
                name="file"
                control={control}
                render={({ field: { onChange } }) => (
                  <FileUpload
                    mode="basic"
                    name="demo[]"
                    url="/api/upload"
                    customUpload
                    uploadHandler={(e) => {
                      onChange(e.files[0]);
                      showSuccess();
                    }}
                    chooseLabel="انتخاب فایل"
                    pt={{
                      chooseButton: { className: "w-[220px]" },
                      root: {
                        className: "w-full flex items-center justify-start",
                      },
                      label: { className: "m-2" },
                      chooseIcon: { className: "mx-2" },
                      buttonbar: { className: "m-4" },
                    }}
                  />
                )}
              />
            </div>
            <Button className="bg-primary-500 cursor-pointer px-6 py-4 font-semibold">
              ثبت
            </Button>
            <Button
              onClick={() => setShowReply(false)}
              className="bg-gray-500 cursor-pointer px-6 mx-6 py-4 font-semibold"
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

export default DetailTicketPage;
