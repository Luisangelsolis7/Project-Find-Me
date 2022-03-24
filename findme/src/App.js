import {BrowserRouter, Routes, Route} from "react-router-dom";
import './CSS/App.css';


//imported views
import NoPage from "./Views/NoPageFound";
import Login from "./Views/Login";
import Claimed from "./Views/Claimed";
import Report from "./Views/ReportForm";
import AdminHome from "./Views/AdminHome";
import Reports from "./Views/Reports";
function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Report />} />
              <Route path="/AdminLogin" element={<Login />} />
              <Route path="/Home" element={<AdminHome />} />
              <Route path="/Claimed" element={<Claimed />} />
              <Route path="/Reports" element={<Reports />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
