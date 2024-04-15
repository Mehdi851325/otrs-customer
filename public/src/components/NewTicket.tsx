import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@radix-ui/themes";
import * as Label from "@radix-ui/react-label";
import Navbar from "./Navbar";
import { BsExclamationOctagon } from "react-icons/bs";
// import { TreeSelect } from "primereact/treeselect";
import { useEffect, useRef, useState } from "react";
// import Queues from "../data/Queues";
import { Dropdown } from "primereact/dropdown";
import TicketTypes from "../data/TicketTypes";
import QueuesSM from "../data/QueuesSM";
import { useSessionGetMutation } from "../redux/features/api/apiSlice";
import { useTicketCreateMutation } from "../redux/features/api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
import { Toast } from "primereact/toast";
import "quill/dist/quill.snow.css";
import Priority from "../data/Priority";
import { FileUpload } from "primereact/fileupload";

import TicketTypeHR from "../data/TicketTypeHR";
import RenderHeaderEditor from "./RenderHeaderEditor";
import FanavaranForm from "../data/FanavaranForm";
import { DatePicker } from "zaman";
import ServiceITForm from "../data/ServiceITForm";

interface FormData {
  description: string;
  queue: { name: string; code: string };
  title: string;
  type: { name: string; code: string };
  priority: { name: string; code: string };
  file: any;
  form: AllForm;
}
interface AllForm {
  name: string;
  code: string;
  fields: FieldFormType;
}
// type ShowForm ={
//   name: string;
//   code: string;
//   type: string;
// }
interface FieldFormType {
  id: string;
  lable: string;
  length: number;
  option: { name: string; code: string };
}
type Params = {
  id?: string;
};
const NewTicket = () => {
  const { id } = useParams<Params>();
  const toast = useRef<Toast>(null);
  const [showForm, setShowForm] = useState<any>("");
  const [changeForm, setChangeForm] = useState<any>("");
  const header = RenderHeaderEditor();
  const navigate = useNavigate();
  const [sessionGet] = useSessionGetMutation();
  const [ticketCreate] = useTicketCreateMutation();
  const [emailUser, setEmailUser] = useState<string>();
  const [, setFullNameUser] = useState<string>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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
            setFullNameUser(detailSession.Value);
          }
        }
      );
    });
  }, [id]);
  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "بارگذاری موفق",
      detail: "فایل شما با موفقیت بارگذاری شد",
      life: 3000,
    });
  };

  const formSubmitHandler = (data: FormData) => {
    
    const sendForm = () => {
      var keyElement = [];
      var valueElement = [];
      let simpleArray = [];
      if (data.form) {
        const array: any = data.form.fields;
        for (let index = 0; index < array.length; index++) {
          keyElement = array[index];
          //@ts-ignore
          valueElement = data[index];

          if (valueElement.name) {
            let simple = `${keyElement.lable} : ${valueElement.name}`;
            simpleArray.push(simple);
          } else {
            let simple = `${keyElement.lable} : ${valueElement}`;
            simpleArray.push(simple);
          }
        }
        const fullDisc = simpleArray.join(`\n`);
        return `${data.description} \n __________________________________________________ \n ${fullDisc}`;
      } else {
        return data.description;
      }
    };

    const sendTitleForm = () => {
      if (data.form) {
        return data.form.name;
      } else {
        return data.title;
      }
    };
    const queueFormat = QueuesSM.find((queue) => queue.type === data.type.name);

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
              Title: sendTitleForm(),
              Queue: `${
                id === "IT"
                  ? "IT::Opration::Support::Helpdesk"
                  : queueFormat?.data
              }`,
              Lock: "unlock",
              CustomerUser: emailUser,
              State: "new",
              Priority: "3 عادی",
              OwnerID: 1,
            },
            Article: {
              ArticleTypeID: 1,
              SenderTypeID: 1,
              Subject: sendTitleForm(),
              Body: sendForm(),
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
        }).then(() => {
          navigate("/myticket");
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
            Title: sendTitleForm(),
            Queue: `${
              id === "IT"
                ? "IT::Opration::Support::Helpdesk"
                : queueFormat?.data
            }`,
            Lock: "unlock",
            CustomerUser: emailUser,
            State: "new",
            Priority: "3 عادی",
            OwnerID: 1,
          },
          Article: {
            ArticleTypeID: 1,
            SenderTypeID: 1,
            Subject: sendTitleForm(),
            Body: sendForm(),
            ContentType: "text/plain; charset=utf8",
            Charset: "utf8",
            MimeType: "text/plain",
            From: emailUser,
          },
        },
        port: `${id === "HR" ? "23000" : "15000"}`,
      }).then(() => {
        navigate("/myticket");
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Navbar />
      <div className="flex w-11/12 p-5 font-shabnam">
        <form
          className="w-full flex"
          onSubmit={handleSubmit((data) => formSubmitHandler(data))}
        >
          <div className="w-5/12">
            <div className="flex ">
              <div className="relative mb-6 w-full">
                <div className="absolute top-[-20px] right-[12px] bg-white px-2 z-10">
                  <Label.Root
                    className={`text-[15px] font-medium leading-[35px] mb-6 ${
                      errors.type ? "text-red-700" : "text-black"
                    }`}
                    htmlFor="type"
                  >
                    نوع درخواست
                  </Label.Root>
                </div>

                <div className="border-2 py-4 rounded-md card flex font-shabnam">
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: "نوع درخواست خود را انتخاب کنید" }}
                    render={({ field }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        optionLabel="name"
                        placeholder="انتخاب نوع درخواست"
                        options={id === "IT" ? TicketTypes : TicketTypeHR}
                        focusInputRef={field.ref}
                        onChange={(e) => {
                          field.onChange(e.value), setShowForm(e.value);
                        }}
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
                {errors.type && (
                  <div className="pr-6 py-1 mb-8 bg-red-100 mt-2 rounded-md flex items-center">
                    <BsExclamationOctagon color="red" />
                    <p className="text-red-700 pr-2">{errors.type.message}</p>
                  </div>
                )}
              </div>
            </div>
            {showForm.type === "disc" && (
              <div className="relative ">
                <div className="absolute top-[-20px] right-[12px] bg-white px-2 z-10">
                  <Label.Root
                    className={`text-[15px] font-medium leading-[35px] mb-6 ${
                      errors.type ? "text-red-700" : "text-black"
                    }`}
                    htmlFor="title"
                  >
                    عنوان درخواست
                  </Label.Root>
                </div>
                <div>
                  <TextField.Root>
                    <TextField.Input
                      id="title"
                      className="text-right py-[25px] pr-4"
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
            )}
            <div className="mb-8">
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
                      headerTemplate={header}
                      onTextChange={(e) => field.onChange(e.textValue)}
                      style={{
                        height: "320px",
                        fontSize: "1.25rem",
                        fontFamily: "shabnam",
                        width: "100%",
                        textAlign: "right",
                      }}
                    />
                  )}
                />
              </div>
              {errors.description && (
                <div className="pr-6 py-1 mb-8 bg-red-100 mt-2 rounded-md flex items-center">
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
          </div>
          <div className="w-1/12"></div>
          {showForm.code === "01" && <div className="w-5/12"></div>}
          {showForm.type === "form" && (
            <div className=" w-5/12">
              <div className="relative">
                <div className="absolute top-[-20px] right-[12px] bg-white px-2 z-10">
                  <Label.Root
                    className={`text-[15px] font-medium leading-[35px] mb-6 ${
                      errors.form ? "text-red-700" : "text-black"
                    }`}
                    htmlFor="form"
                  >
                    نوع فرم
                  </Label.Root>
                </div>

                <div className="border-2 py-4 rounded-md card flex font-shabnam">
                  <Controller
                    name="form"
                    control={control}
                    rules={{ required: "نوع فرم خود را انتخاب کنید" }}
                    render={({ field }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        optionLabel="name"
                        placeholder="انتخاب فرم درخواست"
                        options={
                          showForm.code === "04" ? FanavaranForm : ServiceITForm
                        }
                        focusInputRef={field.ref}
                        onChange={(e) => {
                          field.onChange(e.value), setChangeForm(e.value);
                        }}
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
                          panel: {
                            className: "mt-4 font-shabnam text-right",
                          },
                          item: { className: "p-2" },
                        }}
                      />
                    )}
                  />
                </div>
                {errors.form && (
                  <div className="pr-6 py-1 mb-8 bg-red-100 mt-2 rounded-md flex items-center">
                    <BsExclamationOctagon color="red" />
                    <p className="text-red-700 pr-2">{errors.form.message}</p>
                  </div>
                )}
                {changeForm.code && (
                  <div className="w-full mt-4">
                    {changeForm.fields.map((card: any, index: any) => (
                      <div key={card.id} className="flex w-full">
                        <div
                          className={`bg-white  ${
                            card.type === "text"
                              ? "min-w-[100%]"
                              : "min-w-[50%]"
                          }`}
                        >
                          <Label.Root
                            className={`text-[15px] font-medium leading-[35px] mb-6 ${
                              errors.form ? "text-red-700" : "text-black"
                            }`}
                            htmlFor="title"
                          >
                            {card.lable}
                          </Label.Root>
                        </div>
                        <div className="min-w-[50%] font-shabnam text-sm">
                          {card.type === "input" && (
                            <TextField.Root>
                              <TextField.Input
                                id={card.lable}
                                className="text-right"
                                placeholder=""
                                //@ts-ignore
                                {...register(`${index}`, {
                                  required: "فیلد های فرم اجباریست",
                                })}
                              />
                            </TextField.Root>
                          )}
                          {card.type === "drop" && (
                            <div className="border-2 py-[4px] rounded-md card flex font-shabnam text-sm">
                              <Controller
                                //@ts-ignore
                                name={`${index}`}
                                control={control}
                                rules={{
                                  required: "فیلد خود را انتخاب کنید",
                                }}
                                render={({ field }) => (
                                  <Dropdown
                                    id={field.name}
                                    value={field.value}
                                    optionLabel="name"
                                    placeholder=""
                                    options={card.option}
                                    focusInputRef={field.ref}
                                    onChange={(e) => {
                                      field.onChange(e.value),
                                        console.log(field);
                                    }}
                                    className="w-full"
                                    pt={{
                                      root: {
                                        className:
                                          "flex flex-row justify-between w-full content-between text-right shadow-none",
                                      },
                                      input: {
                                        className:
                                          "justify-self-end self-end text-sm ml-auto font-shabnam pr-1",
                                      },
                                      panel: {
                                        className:
                                          "mt-4 font-shabnam text-right",
                                      },
                                      item: { className: "p-2" },
                                    }}
                                  />
                                )}
                              />
                            </div>
                          )}
                          {card.type === "date" && (
                            <div className="border-2 py-[4px] rounded-md card flex font-shabnam text-sm">
                              <Controller
                                //@ts-ignore
                                name={`${index}`}
                                control={control}
                                rules={{
                                  required: "فیلد خود را انتخاب کنید",
                                }}
                                render={({ field }) => (
                                  <DatePicker
                                    onChange={() => {
                                      const inputDataPicker =
                                        document.querySelector(
                                          ".input-data-picker"
                                        );

                                      setTimeout(() => {
                                        field.onChange(
                                          inputDataPicker?.getAttribute("value")
                                        );
                                      }, 200);
                                    }}
                                    className="w-full pr-2"
                                    inputClass="input-data-picker"
                                  />
                                )}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default NewTicket;
