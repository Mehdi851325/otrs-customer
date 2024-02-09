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

type Tickets = {
  TicketNumber: number;
  Title: string;
  Owner: string;
  CustomerUserID: string;
  StateType: string;
  TicketID?: number;
};

const SenderTicket = () => {
  const [tickets, setTickets] = useState<Tickets[]>([]);

  const [sessionGet] = useSessionGetMutation();
  const [ticketSearch] = useTicketSearchMutation();
  const [ticketList, { isLoading }] = useTicketListMutation();

  useEffect(() => {
    const sessionID = localStorage.getItem("session");
    sessionGet({ SessionID: sessionID }).then((res: any) => {
      res.data.data.SessionData.find(
        (detailSession: { Key: string; Value: string }) => {
          if (detailSession.Key === "UserLogin") {
            ticketSearch({
              SessionID: sessionID,
              Queue: "IT",
              Title: "",
              CustomerUserLogin: detailSession.Value,
            }).then((res: any) => {
              ticketList({
                SessionID: sessionID,
                TicketID: res.data.data.TicketID,
              }).then((res: any) => {
                setTickets(res.data.data.Ticket);
              });
            });
          }
        }
      );
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
