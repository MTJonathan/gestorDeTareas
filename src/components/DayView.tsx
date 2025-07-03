import { useDateStore } from "../store/useDateStore";
import { format, addDays, subDays } from "date-fns";
import { es } from "date-fns/locale";

const DayView = () => {
  const date = useDateStore((state) => state.date);
  const setDate = useDateStore((state) => state.setDate);
  const diaSemana = format(date, "EEEE", { locale: es }).charAt(0).toUpperCase() + format(date, "EEEE", { locale: es }).slice(1);
  const diaMes = format(date, "d", { locale: es });
  const mes = format(date, "MMMM", { locale: es }).charAt(0).toUpperCase() + format(date, "MMMM", { locale: es }).slice(1);
  const anio = format(date, "yyyy", { locale: es });


  const handlePrevDay = () => {
    setDate(subDays(date, 1));
  };

  const handleNextDay = () => {
    setDate(addDays(date, 1));
  };
  return (
    <div>
      <header className="flex flex-col items-center gap-3 my-16">
        <section className="flex items-center gap-10">
          <button onClick={handlePrevDay} className="text-4xl cursor-pointer text-[#9a9fa7] font-bold">
            {"<"}
          </button>

          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{diaSemana}</span>
            <span className="text-sm text-[#9a9fa7]">{mes} {diaMes}, {anio}</span>
          </div>

          <button onClick={handleNextDay} className="text-4xl cursor-pointer text-[#9a9fa7] font-bold">
            {">"}
          </button>
        </section>

        <input 
          type="date" 
          value={format(date, "yyyy-MM-dd", { locale: es })} 
          onChange={(e) => setDate(new Date(e.target.value + "T00:00:00"))}
          className="border border-[#9a9fa7] rounded-2xl px-2 py-1"
        />
      </header>
      <section>
        
      </section>
    </div>
  );
};

export default DayView;
