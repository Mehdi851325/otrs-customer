import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@radix-ui/themes";
import Navbar from "./Navbar";
// import { TreeSelect } from "primereact/treeselect";
import { useEffect, useState } from "react";
// import Queues from "../data/Queues";
import { Dropdown } from "primereact/dropdown";
import TicketTypes from "../data/TicketTypes";
import QueuesSM from "../data/QueuesSM";
import { useSessionGetMutation } from "../redux/features/api/apiSlice";
import { useTicketCreateMutation } from "../redux/features/api/apiSlice";
import {  useNavigate, useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
import "quill/dist/quill.snow.css";
import Priority from "../data/Priority";
import { FileUpload } from "primereact/fileupload";

import TicketTypeHR from "../data/TicketTypeHR";


interface FormData {
  description: string;
  queue: { name: string; code: string };
  title: string;
  type: { name: string; code: string };
  priority: { name: string; code: string };
  file: any;
}
type Params = {
  id?: string;
};
const NewTicket = () => {
  
  const { id } = useParams<Params>();
  const navigate = useNavigate()
  const [sessionGet] = useSessionGetMutation();
  const [ticketCreate] = useTicketCreateMutation();
  const [emailUser, setEmailUser] = useState<string>();
  const [fullNameUser,setFullNameUser] = useState<string>()
  const { register, control, handleSubmit } = useForm<FormData>();

  // const paramsPort = PortApi.find((port) => port.code === id);
  // console.log(paramsPort);

  useEffect(() => {
    // const sessionID = localStorage.getItem(`session${paramsPort?.name}`);

    sessionGet({
      session: {
        SessionID: localStorage.getItem(
          `session${id === "HR" ? "23000" : "15000"}`
        ),
      },
      port: `${id === "HR" ? "23000" : "15000"}`,
    }).then((res: any) => {
      res.data.data.SessionData.find(
        (detailSession: { Key: string; Value: string }) => {
          if (detailSession.Key === "UserEmail") {
            setEmailUser(detailSession.Value);
          }
          if (detailSession.Key === "UserFullname") {
            setFullNameUser(detailSession.Value)
          }
        }
      );
    });

    
  }, [id]);
  console.log(fullNameUser)
  const formSubmitHandler = (data: FormData) => {
    // const sessionID = localStorage.getItem(`session${paramsPort?.name}`);
    // const sessionIDHR = localStorage.getItem("session23000");

    const queueFormat = QueuesSM.find(
      (queue) => queue.type === data.type.name
    );
    console.log(data)
    if (data.file) {
      var reader = new FileReader();
      reader.readAsDataURL(data.file);
      reader.onload = function () {
        const stringResult: any = reader.result;
        const searchBase64 = stringResult.search("base64");
        const sliceBase64 = stringResult.slice(searchBase64 + 7);
        ticketCreate({
          ticketInfo: {
            SessionID: localStorage.getItem(
              `session${id === "HR" ? "23000" : "15000"}`
            ),
            Ticket: {
              Type: data.type.name,
              Title: data.title,
              Queue: `${id === "IT"?"IT::Opration::Support::Helpdesk": queueFormat?.data}`,
              Lock: "unlock",
              CustomerUser: emailUser,
              State: "new",
              Priority: "3 عادی",
              OwnerID: 1,
            },
            Article: {
              ArticleTypeID: 1,
              SenderTypeID: 1,
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
          port: `${id === "HR" ? "23000" : "15000"}`,
        }).then((res) => {
          navigate("/myticket");
          console.log(res);
        });
      };
    } else {
      ticketCreate({
        ticketInfo: {
          SessionID: localStorage.getItem(
            `session${id === "HR" ? "23000" : "15000"}`
          ),
          Ticket: {
            Type: data.type.name,
            Title: data.title,
            Queue: `${id === "IT"?"IT::Opration::Support::Helpdesk": queueFormat?.data}`,
            Lock: "unlock",
            CustomerUser: emailUser,
            State: "new",
            Priority: "3 عادی",
            OwnerID: 1,
          },
          Article: {
            ArticleTypeID: 1,
            SenderTypeID: 1,
            Subject: data.title,
            Body: data.description,
            ContentType: "text/plain; charset=utf8",
            Charset: "utf8",
            MimeType: "text/plain",
            From: emailUser,
          },
        },
        port: `${id === "HR" ? "23000" : "15000"}`,
      }).then((res) => {
        navigate("/myticket");
        console.log(res);
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex ">
        <form
          className="max-w-3xl p-5 space-y-3 font-shabnam"
          onSubmit={handleSubmit((data) => formSubmitHandler(data))}
        >
          <div className="border-2 p-1 rounded-md card flex font-shabnam">
            <Controller
              name="type"
              control={control}
              rules={{ required: "Type is required." }}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  optionLabel="name"
                  placeholder="انتخاب نوع درخواست"
                  options={id === "IT" ? TicketTypes : TicketTypeHR}
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
          {/* <div className="border-2 p-1 rounded-md card flex justify-content-center">
            <Controller
              name="queue"
              control={control}
              rules={{ required: "Value is required." }}
              render={({ field }) => (
                <>
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    optionLabel="name"
                    placeholder="انتخاب واحد"
                    options={[
                      {
                        name: `${id === "HR" ? "درخواست جذب" : "Helpdesk"}`,
                        code: "01",
                      },
                    ]}
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
                  <TreeSelect
                    id={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Queue"
                    className="w-full"
                    options={Queues}
                    pt={{
                      root: {
                        className:
                          "flex flex-row-reverse text-right justify-between w-full content-between shadow-none",
                      },
                      panel: { className: "mt-4 font-shabnam " },
                    }}
                  ></TreeSelect>
                </>
              )}
            />
          </div> */}
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
                style={{
                  height: "320px",
                  fontSize: "1.25rem",
                  fontFamily: "shabnam",
                  width: "100%",
                }}
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
                  uploadHandler={(e) => onChange(e.files[0])}
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
          <Button className="bg-primary-500 cursor-pointer px-6 py-4">
            ثبت
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewTicket;
