import "./App.css";
import { useState } from "react";
import ViewItem from "./components/ViewItem";
import DayView from "./components/DayView/DayView";
import WeekView from "./components/WeekView";
import MonthView from "./components/MonthView";
import YearView from "./components/YearView";

function App() {
  const [view, setView] = useState("Dia");

  return (
    <main className="grid justify-center items-center min-h-screen">
      <div
        className="flex flex-col bg-[#3d434b] w-[90vw] 
      items-center rounded-xl"
      >
        <header className="flex justify-center w-full border-b-[1.5px] border-[#000000]">
          <ul className="flex">
            <ViewItem view={view} setView={setView} name="Dia" />
            <ViewItem view={view} setView={setView} name="Semana" />
            <ViewItem view={view} setView={setView} name="Mes" />
            <ViewItem view={view} setView={setView} name="Año" />
          </ul>
        </header>
        <section>
          {view === "Dia" && <DayView />}
          {view === "Semana" && <WeekView />}
          {view === "Mes" && <MonthView />}
          {view === "Año" && <YearView />}
        </section>
      </div>
    </main>
  );
}

export default App;
