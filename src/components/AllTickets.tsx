import { TabPanel, TabView } from "primereact/tabview";
import Navbar from "./Navbar";
import ListTicket from "./ListTicket";
import FieldMessageTicket from "./FieldMessageTicket";
import {
  useTicketListMutation,
  useTicketSearchMutation,
} from "../redux/features/api/apiSlice";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

type Tickets = {
    TicketNumber: number;
    Title: string;
    Owner: string;
    CustomerUserID: string;
    StateType: string;
  };

const AllTickets = () => {
    const navigate = useNavigate();
  const [ticketSearch] = useTicketSearchMutation();
  const [ticketList, { isLoading }] = useTicketListMutation();
  

  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [queue] = useState<string>("IT:");

    useEffect(() => {
    const sessionID = localStorage.getItem("session");

    ticketSearch({
      SessionID: sessionID,
      Queue: queue,
      Title: "",
    })
      .then((res) => {
        if ("data" in res) {
          ticketList({
            SessionID: sessionID,
            TicketID: res.data.data.TicketID,
          }).then((res:any) => {
            if ("data" in res) {
              setTickets(res.data.data.Ticket);
            }
          });
        }
      })
      .catch(() => {
        navigate("/");
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
      <TabView className="w-full flex flex-col items-end font-shabnam justify-center">
        <TabPanel className="w-full pb-3" header="درخواست های باز">
          <div className="mt-4 flex flex-col justify-center w-full items-center">
            {openTicket.length === 0 ? (
              <FieldMessageTicket />
            ) : (
              <ListTicket tickets={openTicket} isLoading={isLoading} />
            )}
          </div>
        </TabPanel>
        <TabPanel className="pb-3 w-full" header="درخواست های بسته">
          <div className="mt-4 flex flex-col justify-center w-full items-center">
            <ListTicket tickets={closedTicket} isLoading={isLoading} />
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default AllTickets;
