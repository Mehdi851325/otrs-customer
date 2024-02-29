import { TabView, TabPanel } from "primereact/tabview";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

import {
  useSessionGetMutation,
  useTicketListMutation,
  useTicketSearchMutation,
} from "../redux/features/api/apiSlice";
import ListTicket from "./ListTicket";
import FieldMessageTicket from "./FieldMessageTicket";
import PortApi from "../data/PortApi";

type Tickets = {
  TicketNumber: number;
  Title: string;
  Owner: string;
  CustomerUserID: string;
  StateType: string;
  TicketID?: number;
  Type: string;
};

const SenderTicket = () => {
  const [tickets, setTickets] = useState<Tickets[]>([]);

  const [sessionGet] = useSessionGetMutation();
  const [ticketSearch] = useTicketSearchMutation();
  const [ticketList, { isLoading }] = useTicketListMutation();

  useEffect(() => {
    PortApi.map((port) => {
      sessionGet({
        session: { SessionID: localStorage.getItem(`session${port.name}`) },
        port: port.name,
      }).then((res: any) => {
        res.data.data.SessionData.find(
          (detailSession: { Key: string; Value: string }) => {
            if (detailSession.Key === "UserLogin") {
              ticketSearch({
                Queue: {
                  SessionID: localStorage.getItem(`session${port.name}`),
                  Title: "",
                  CustomerUserLogin: detailSession.Value,
                },
                port: port.name,
              }).then((res: any) => {
                ticketList({
                  ticketId: {
                    SessionID: localStorage.getItem(`session${port.name}`),
                    TicketID: res.data.data.TicketID,
                    ArticleSenderType: ["customer", "agent"],
                    AllArticles: 1,
                    Attachments: 1,
                  },
                  port: port.name,
                }).then((res: any) => {
                  setTickets((tickets) => [
                    ...tickets,
                    ...res.data.data.Ticket,
                  ]);
                });
              });
            }
          }
        );
      });
    });
  }, []);

  const closedTicket = tickets.filter(
    (ticket) => ticket.StateType === "closed"
  );
  const openTicket = tickets.filter(
    (ticket) => ticket.StateType === "new" || ticket.StateType === "open"
  );

  return (
    <div className="card w-full">
      <Navbar />
      <TabView
        pt={{
          root: { className: "w-full font-shabnam" },
        }}
      >
        <TabPanel className=" pb-3" header="درخواست های باز">
          <div className="mt-4 flex flex-col justify-center w-full items-center">
            {openTicket.length === 0 ? (
              <FieldMessageTicket />
            ) : (
              <ListTicket tickets={openTicket} isLoading={isLoading} />
            )}
          </div>
        </TabPanel>
        <TabPanel className="pb-3" header="درخواست های بسته">
          <div className="mt-4 flex flex-col justify-center w-full items-center">
            <ListTicket tickets={closedTicket} isLoading={isLoading} />
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default SenderTicket;
