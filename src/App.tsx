//router
import { Route, Routes, useNavigate } from "react-router-dom";
//components
import LogIn from "./pages/LogInPage";
//style
import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";

import Dashboard from "./pages/DashboardPage";
import NewTicket from "./components/NewTicket";
import SenderTicket from "./pages/TicketOverviewPage";
import DetailTicket from "./pages/DetailTicketPage";
import { useEffect } from "react";
import { useSessionGetMutation } from "./redux/features/api/apiSlice";

function App() {
  const navigate = useNavigate();
  const [sessionGet] = useSessionGetMutation();
  useEffect(() => {
    const sessionID = localStorage.getItem("session15000");
    sessionGet({ session: { SessionID: sessionID }, port: "15000" }).then(
      (res: any) => {
        if (res.error) {
          navigate("/");
        }
      }
    );
    if (!localStorage.getItem("session15000")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="dark:bg-[#0E0A1B]">
        <PrimeReactProvider>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/newticket/:id" element={<NewTicket />} />
            <Route path="/TicketOverview" element={<SenderTicket />} />
            <Route path="/TicketZoom/:unit/:id" element={<DetailTicket />} />
          </Routes>
        </PrimeReactProvider>
      </div>
    </>
  );
}

export default App;
