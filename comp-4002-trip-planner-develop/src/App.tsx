import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PackingTableDisplay from "./components/packing/PackingTableDisplay";
import { SharedPhotoGallery } from "./components/sharedPhotoGallery/sharedPhotoGallery";
import Itinerary from "./components/itinerary/Itinerary";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import Nav from "./components/layout/Nav";


function App() {
  // shared state for T.3 and lives up here so every page can see and change it
  const [selectedTrip, setSelectedTrip] = useState("Paris Trip");

  return (
    <BrowserRouter>
            <div className="flex min-h-screen flex-col">
        <Header />
        <Nav />
        <main className="flex-1">
          <Routes>
            {/* passing the shared trip and its the setter down to every page */}
            <Route
              path="/itinerary"
              element={
                <Itinerary
                  selectedTrip={selectedTrip}
                  setSelectedTrip={setSelectedTrip}
                />
              }
            />
            <Route
              path="/packing"
              element={
                <PackingTableDisplay
                  selectedTrip={selectedTrip}
                  setSelectedTrip={setSelectedTrip}
                />
              }
            />
            <Route
              path="/photos"
              element={
                <SharedPhotoGallery
                  selectedTrip={selectedTrip}
                  setSelectedTrip={setSelectedTrip}
                />
              }
            />
            <Route path="*" element={<Navigate to="/itinerary" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
