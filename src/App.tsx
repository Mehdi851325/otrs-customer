//router
import { Route, Routes } from "react-router-dom";
//components
import LogIn from "./components/LogIn";
//style
import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";

import Dashboard from "./components/Dashboard";
import NewTicket from "./components/NewTicket";
import SenderTicket from "./components/SenderTicket";
import DetailTicket from "./components/DetailTicket";



function App() {
  
  
  return (
    <>
    <div className="dark:bg-[#0E0A1B]">
      <PrimeReactProvider>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newticket/:id" element={<NewTicket />} />
          <Route path="/myticket" element={<SenderTicket />} />
          <Route path="/ticket/:unit/:id" element={<DetailTicket />} />
        </Routes>
      </PrimeReactProvider>
      </div>
    </>
  );
}

export default App;
