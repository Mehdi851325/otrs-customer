import { useEffect, useState } from "react";

import ListTicket from "./ListTicket";
import Navbar from "./Navbar";
import NewTicketBoxs from "./NewTicketBoxs";
import {
  useSessionGetMutation,
  useTicketListMutation,
  useTicketSearchMutation,
} from "../redux/features/api/apiSlice";
import FieldMessageTicket from "./FieldMessageTicket";

import PortApi from "../data/PortApi";

type Tickets = {
  TicketNumber: number;
  Title: string;
  Owner: string;
  CustomerUserID: string;
  StateType: string;
  TicketID: number;
  Type: string;
  Queue:string;
};

const Dashboard = () => {
  const [ticketSearch] = useTicketSearchMutation();
  const [ticketList, { isLoading }] = useTicketListMutation();
  const [sessionGet] = useSessionGetMutation();

  const [tickets, setTickets] = useState<Tickets[]>([]);

  useEffect(() => {
    PortApi.map((port) => {
      sessionGet({
        session: { SessionID: localStorage.getItem(`session${port.name}`) },
        port: port.name,
      }).then((res: any) => {
        res.data &&
          res.data.data.SessionData.find(
            (detailSession: { Key: string; Value: string }) => {
              if (detailSession.Key === "UserLogin") {
                ticketSearch({
                  Queue: {
                    SessionID: localStorage.getItem(`session${port.name}`),
                    Title: "",
                    CustomerUserLogin: detailSession.Value,
                    States: [
                      "new",
                      "open",
                      "pending reminder",
                      "pending auto close+",
                      "pending auto close-",
                    ],
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
                    console.log(res.data.data.Ticket);
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

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center w-full items-center">
        <NewTicketBoxs />
        {tickets.length === 0 ? (
          <FieldMessageTicket />
        ) : (
          <ListTicket tickets={tickets} isLoading={isLoading} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
