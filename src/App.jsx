import { useState } from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Manager />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
