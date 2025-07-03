import { useDateStore } from "../store/useDateStore";
import { useListStore } from "../store/useListStore";
import { format, addDays, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { AddIcon, TresPuntosIcon } from "../assets/IconsSvg";
import { useState, useEffect } from "react";
import type { ListInterface } from "../lib/type";

const DayView = () => {
  const date = useDateStore((state) => state.date);
  const setDate = useDateStore((state) => state.setDate);
  const diaSemana =
    format(date, "EEEE", { locale: es }).charAt(0).toUpperCase() +
    format(date, "EEEE", { locale: es }).slice(1);
  const diaMes = format(date, "d", { locale: es });
  const mes =
    format(date, "MMMM", { locale: es }).charAt(0).toUpperCase() +
    format(date, "MMMM", { locale: es }).slice(1);
  const anio = format(date, "yyyy", { locale: es });

  const list = useListStore((state) => state.list);
  const setList = useListStore((state) => state.setList);
  const [tarea, setTarea] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const handlePrevDay = () => {
    setDate(subDays(date, 1));
  };

  const handleNextDay = () => {
    setDate(addDays(date, 1));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTarea: ListInterface = {
      diaSemana: diaSemana,
      diaMes: diaMes,
      mes: mes,
      anio: anio,
      tarea: tarea,
      checked: checked,
    };
    setList([...list, newTarea]);
    setTarea("");
    setChecked(false);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedList = [...list];
    updatedList[index].checked = e.target.checked;
    setList(updatedList);
  }

  useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(list))
  },[list])

  return (
    <div>
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

      <section className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}>
          <label className="flex items-center gap-2 w-[300px] border bg-[#343a3f] border-[#000000] rounded-lg px-3 py-1">
            <span className="text-[#9a9fa7]">
              <AddIcon />
            </span>
            <input
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
              className="flex-1 outline-none"
              placeholder="Agregar tarea"
              type="text"
            />
          </label>
        </form>

        <ul className="my-5">
          {list.map((item, index) => (
            <li key={index} className="flex w-[300px] items-center justify-between my-2">
              <label>
                <input checked={item.checked} onChange={(e) => handleChecked(e,index)} className="accent-[#9c244c]" type="checkbox" />
                <span className="ml-2">{item.tarea}</span>
              </label>
              <span className="cursor-pointer">
                <TresPuntosIcon />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DayView;
