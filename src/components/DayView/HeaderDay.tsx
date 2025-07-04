import { format } from 'date-fns'
import { es } from 'date-fns/locale';

interface HeaderDayProps {
    handlePrevDay: () => void;
    handleNextDay: () => void;
    diaSemana: string;
    diaMes: string;
    mes: string;
    anio: string;
    date: Date;
    setDate: (date: Date) => void;
}

const HeaderDay = ({handlePrevDay, handleNextDay, diaSemana, diaMes, mes, anio, date, setDate}: HeaderDayProps) => {
  return (
    <header className="flex flex-col items-center gap-3 my-16">
            <section className="flex items-center gap-10">
              <button
                onClick={handlePrevDay}
                className="text-4xl cursor-pointer text-[#9a9fa7] font-bold"
              >
                {"<"}
              </button>
    
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{diaSemana}</span>
                <span className="text-sm text-[#9a9fa7]">
                  {mes} {diaMes}, {anio}
                </span>
              </div>
    
              <button
                onClick={handleNextDay}
                className="text-4xl cursor-pointer text-[#9a9fa7] font-bold"
              >
                {">"}
              </button>
            </section>
    
            <input
              type="date"
              value={format(date, "yyyy-MM-dd", { locale: es })}
              onChange={(e) => setDate(new Date(e.target.value + "T00:00:00"))}
              className="border border-[#9a9fa7] rounded-lg px-2 py-1"
            />
          </header>
  )
}

export default HeaderDay
