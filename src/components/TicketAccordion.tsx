import { Accordion, AccordionTab } from "primereact/accordion"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputTextarea } from "primereact/inputtextarea"
import { RiAttachment2 } from "react-icons/ri"

type Article = {
    ArticleNumber: number;
    Subject: string;
    From: string;
    To: string;
    Body: string;
    Attachment: [Attachment];
    CreateTime: string;
  };

  interface Attachment {
    Content: string;
    Filename: string;
    ContentType: string;
  }

  interface Props {
    articles: [Article]
    setShowReply:any
  }
  
  
  const TicketAccordion = ({articles,setShowReply} : Props) => {

    const dateConvert = (createTime: any): string => {
      const event = new Date(
        Date.UTC(
          createTime.slice(0, 4),
          createTime.slice(5, 7) - 1,
          createTime.slice(8, 10),
          createTime.slice(10, 13),
          createTime.slice(14, 16),
          createTime.slice(17, 19)
        )
      );
      return event.toLocaleString("fa-IR-u-nu-latn");
    };
  
    const hrefImage = (base64: Attachment) => {
      const base64Content = base64.Content;
      // const sliceBase64 = base64.Content.slice(searchBase64 + 6);
      return `data:${base64.ContentType};base64,` + base64Content;
    };

  return (
    <div className="w-8/12 flex items-center justify-center">
          <Accordion pt={{ root: { className: "w-full font-shabnam" } }}>
            {articles.map((article: Article, index: number) => (
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
                        <li>
                          <span className="font-bold text-gray-500">
                            ایجاد شده&nbsp;:&nbsp;
                          </span>
                          {dateConvert(article.CreateTime)}
                        </li>
                      </ul>
                    </div>
                    <div className="card flex justify-content-center w-full border-t-4 py-2 text-black">
                      <InputTextarea
                        autoResize
                        rows={5}
                        cols={30}
                        value={article.Body}
                        pt={{
                          root: {
                            className:
                              "w-full !text-black px-4 py-2 border-2 !text-opacity-100 opacity-100",
                          },
                        }}
                      />
                    </div>
                    {article.Attachment && (
                      <div className="border-t-4 py-4 pr-6 flex text-center items-center">
                        <a
                          className="flex items-center bg-slate-300 p-2 rounded-md text-black"
                          href={hrefImage(article.Attachment[0]) as string}
                          download={article.Attachment[0].Filename}
                        >
                          <RiAttachment2 size={18} />
                          {article.Attachment[0].Filename}
                        </a>
                      </div>
                    )}
                  </div>
                </Card>
              </AccordionTab>
            ))}
          </Accordion>
        </div>
  )
}

export default TicketAccordion