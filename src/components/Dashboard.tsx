import { useEffect, useState} from "react";



import ListTicket from "./ListTicket";
import Navbar from "./Navbar";
import NewTicketBoxs from "./NewTicketBoxs";
import {
  useSessionGetMutation,
  useTicketListMutation,
  useTicketSearchMutation,
} from "../redux/features/api/apiSlice";
import FieldMessageTicket from "./FieldMessageTicket";
import { useNavigate } from "react-router-dom";



type Tickets = {
  TicketNumber: number;
  Title: string;
  Owner: string;
  CustomerUserID: string;
  StateType: string;
  TicketID:number;
};

const Dashboard = () => {
  
  const navigate = useNavigate();
  const [ticketSearch] = useTicketSearchMutation();
  const [ticketList, { isLoading }] = useTicketListMutation();
  const [sessionGet] = useSessionGetMutation();

  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [queue] = useState<string>("IT");


  // useEffect(() => {
  //   const sessionID = localStorage.getItem("session");

  //   ticketSearch({
  //     SessionID: sessionID,
  //     Queue: queue,
  //     Title: "",
  //   })
  //     .then((res) => {
  //       if ("data" in res) {
  //         ticketList({
  //           SessionID: sessionID,
  //           TicketID: res.data.data.TicketID,
  //         }).then((res:any) => {
  //           if ("data" in res) {
  //             setTickets(res.data.data.Ticket);
  //           }
  //         });
  //       }
  //     })
  //     .catch(() => {
  //       navigate("/");
  //     });
  // }, []);
  // useEffect(() => {
  //   const sessionID = localStorage.getItem("session");
  //   sessionGet({ SessionID: sessionID }).then((res: any) => {
  //     res.data && res.data.data.SessionData.find(
  //       (detailSession: { Key: string; Value: string }) => {
  //         if (detailSession.Key === "UserLogin") {
  //           ticketSearch({
  //             SessionID: sessionID,
  //             Queue: "IT",
  //             Title: "",
  //             CustomerUserLogin: detailSession.Value,
  //             States: [
  //               "new",
  //               "open",
  //               "pending reminder",
  //               "pending auto close+",
  //               "pending auto close-",
  //             ],
  //           }).then((res:any) => {
  //             ticketList({
  //               SessionID: sessionID,
  //               TicketID: res.data.data.TicketID,
  //             }).then((res: any) => {
  //               setTickets(res.data.data.Ticket);
  //             })
  //           });
  //         }
  //       }
  //     );
  //   });
  // }, []);
  useEffect(() => {
    const sessionIDHR = localStorage.getItem("sessionHR");
    sessionGet({ SessionID: sessionIDHR }).then((res: any) => {
      res.data && res.data.data.SessionData.find(
        (detailSession: { Key: string; Value: string }) => {
          if (detailSession.Key === "UserLogin") {
            ticketSearch({
              SessionID: sessionIDHR,
              Queue: "IT",
              Title: "",
              CustomerUserLogin: detailSession.Value,
              States: [
                "new",
                "open",
                "pending reminder",
                "pending auto close+",
                "pending auto close-",
              ],
            }).then((res:any) => {
              ticketList({
                SessionID: sessionID,
                TicketID: res.data.data.TicketID,
              }).then((res: any) => {
                setTickets(res.data.data.Ticket);
              })
            });
          }
        }
      );
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
          <ListTicket queue={queue} tickets={tickets} isLoading={isLoading} />
          )}
      </div>
    </>
  );
};

export default Dashboard;
