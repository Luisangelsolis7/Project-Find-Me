import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

//imported views
import NoPage from "./Views/NoPageFound";
import Login from "./Views/Login";
import Report from "./Views/Report";
import AdminHome from "./Views/AdminHome";
function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Report />} />
              <Route path="/AdminLogin" element={<Login />} />
              <Route path="/Home" element={<AdminHome />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
