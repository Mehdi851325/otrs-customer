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
import { useNavigate } from "react-router-dom";
import { Editor } from "primereact/editor";
import "quill/dist/quill.snow.css";
import Priority from "../data/Priority";
import { FileUpload } from "primereact/fileupload";

interface FormData {
  description: string;
  queue: { name: string; code: string };
  title: string;
  type: { name: string; code: string };
  priority: string;
  file: string;
}
// const renderHeader = () => {
//   return (
//       <span className="ql-formats">
//           <button className="ql-bold" aria-label="Bold"></button>
//           <button className="ql-italic" aria-label="Italic"></button>
//           <button className="ql-underline" aria-label="Underline"></button>
//           <button className="ql-text Alignment" aria-label="Text Alignment"></button>
//       </span>
//   );
// };

// const header = renderHeader();
const NewTicket = () => {
  const navigate = useNavigate();
  const [sessionGet] = useSessionGetMutation();
  const [ticketCreate] = useTicketCreateMutation();

  const [emailUser, setEmailUser] = useState<string>();

  const { register, control, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    const sessionID = localStorage.getItem("session");
    sessionGet({ SessionID: sessionID }).then((res: any) => {
      res.data.data.SessionData.find(
        (detailSession: { Key: string; Value: string }) => {
          if (detailSession.Key === "UserEmail") {
            setEmailUser(detailSession.Value);
          }
        }
      );
    });
  }, []);

  const formSubmitHandler = (data: FormData) => {
    const sessionID = localStorage.getItem("session");
    const queueFormat = QueuesSM.find(
      (queue) => queue.name === data.queue.name
    );

    var reader = new FileReader();
    reader.readAsDataURL(data.file);
    reader.onload = function () {
      // ticketCreate({
      //   SessionID: sessionID,
      //   Ticket: {
      //     Type: data.type.name,
      //     Title: data.title,
      //     Queue: queueFormat?.data,
      //     Lock: "unlock",
      //     CustomerUser: emailUser,
      //     State: "new",
      //     Priority: "3 عادی",
      //     OwnerID: 1,
      //   },
      //   Article: {
      //     ArticleTypeID: 1,
      //     SenderTypeID: 1,
      //     Subject: data.title,
      //     Body: data.description,
      //     ContentType: "text/plain; charset=utf8",
      //     Charset: "utf8",
      //     MimeType: "text/plain",
      //     From: emailUser,
      //     Attachment: {
      //       Content: reader.result,
      //       ContentType: data.file.type,
      //       Filename: data.file.name,
      //     },
      //   },
      // }).then((res) => {
      //   navigate("/myticket");
      //   console.log(res);
      // });
      console.log(reader.result);
    };
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
                  options={TicketTypes}
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
          <div className="border-2 p-1 rounded-md card flex justify-content-center">
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
                    options={[{ name: "Helpdesk", code: "01" }]}
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
                  {/* <TreeSelect
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
                  ></TreeSelect> */}
                </>
              )}
            />
          </div>
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
              // rules={{ required: "priority is required." }}
              render={({ field: { value, onChange, ...field } }) => (
                <>
                  <input
                    {...field}
                    value={value?.fileName}
                    onChange={(event) => {
                      onChange(event.target.files[0]);
                    }}
                    type="file"
                    id="file"
                  />
                </>

                // <FileUpload
                //   id={field.name}
                //   name="file"
                //   url={"/api/upload"}
                //   multiple
                //   accept="image/*"
                //   maxFileSize={1000000}
                //   onChange={(e) => console.log(e)}
                //   emptyTemplate={
                //     <p className="m-0">
                //       Drag and drop files to here to upload.
                //     </p>
                //   }
                //   pt={{
                //     buttonbar: {
                //       className:
                //         "w-full min-h-12 flex items-center space-x-4 mb-4",
                //     },
                //     chooseButton: { className: "px-4 py-2 ml-4" },
                //     chooseButtonLabel: { className: "px-2" },
                //     uploadButton: {
                //       root: { className: "px-4 py-2 ml-4" },
                //       label: { className: "px-2" },
                //     },
                //     cancelButton: {
                //       root: { className: "px-4 py-2 ml-4" },
                //       label: { className: "px-2" },
                //     },
                //     message: { root: { className: "px-4" } },
                //     content: {
                //       className:
                //         "w-full p-4 felx justify-center items-center w-full mr-auto",
                //     },
                //     root: {
                //       className:
                //         "w-full flex flex-col items-center justify-start",
                //     },
                //     file: { className: "w-full flex justify-between" },
                //     actions: { className: "flex justify-end" },
                //     details: { className: "flex flex-col text-center w-full" },
                //     badge: { root: { className: " mr-4" } },
                //   }}
                // />
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
