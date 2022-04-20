import React from 'react';
import {Routes, Route} from "react-router-dom";
import './CSS/App.css';
import RequireAuth from "./components/RequireAuth";


//imported views
import NoPage from "./Views/NoPageFound";
import Claimed from "./Views/Claimed";
import Report from "./Views/ReportForm";
import AdminHome from "./Views/AdminHome";
import Reports from "./Views/Reports";
import Layout from "./components/Layout";
function App() {
    let locations = ["N/A", "Alumni Hall", "Bookstore", "Campus Public Safety", "Business Office", "Centennial Hall",
        "Parking Garage", "Institute for Collaboration",
        "The Community Foundation of the Fox River Valley Center for Cultural Enrichment and Perry Theatre",
        "Copy Center", "Dunham Hall", "Davis Hall", "Dining Hall", "Eckhart Hall", "Fitness Center", "Founders Annex",
        "Founders House", "Hill Welcome Center and Ethel Tapper Recital Hall", "Human Resources",
        "Crimi Auditorium", "Jenks Hall", "John C. Dunham STEM Partnership School", "Kimberly and James Hill Center for Student Success",
        "Labyrinth", "Mail Center", "Memorial Hall", "Michael J. Birck Collaboration Center for Innovation",
        "Office of Admission and Financial Aid", "Phillips Library", "Quad", "Roger and Marilyn Parolini Music Center",
        "Schingoethe Center", "Spartan Spot", "Spartan Statue/Bedrosian Plaza", "Spartan Terrace", "Stephens Hall",
        "Thornton Gymnasium", "Tru Blu Coffee", "University Banquet Hall", "University Communications", "Vago Field",
        "Wackerlin Center for Faith and Action", "Watkins Hall", "Wellness Center", "Wilkinson Hall"];
  return (
          <Routes>
              <Route path="/" element={<Layout />}>

                  <Route path="/" element={<Report locations={locations}/>} />

             <Route element={<RequireAuth/>}>
              <Route path="/Home" element={<AdminHome />} />
              <Route path="/Claimed" element={<Claimed />} />
              <Route path="/Reports" element={<Reports />} />
             </Route>

              <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
  );
}

export default App;
