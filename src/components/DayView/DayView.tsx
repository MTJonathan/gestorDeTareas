import { useDateStore } from "../../store/useDateStore";
import { useListStore } from "../../store/useListStore";
import { format, addDays, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { AddIcon } from "../../assets/IconsSvg";
import { useState, useEffect } from "react";
import type { ListInterface } from "../../lib/type";
import HeaderDay from "./HeaderDay";
import ListDay from "./ListDay";

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

  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null);

  const handlePrevDay = () => {
    setDate(subDays(date, 1));
  };

  const handleNextDay = () => {
    setDate(addDays(date, 1));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTarea: ListInterface = {
      id: Date.now(),
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

  const handleOpenDialog = (index: number) => {
    if (openDialogIndex === index) {
      setOpenDialogIndex(null); // Cierra si ya está abierto
    } else {
      setOpenDialogIndex(index); // Abre el actual
    }
  };
  

  useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(list))
  },[list])

  return (
    <div>
      <HeaderDay 
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
        diaSemana={diaSemana}
        diaMes={diaMes}
        mes={mes}
        anio={anio}
        date={date}
        setDate={setDate}
      />

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

        <ul className="mt-5 mb-8">
          {list.filter((item) => item.mes === mes && item.diaMes === diaMes && item.anio === anio).map((item, index) => (
            <ListDay 
              key={index}
              item={item}
              index={index}
              handleChecked={handleChecked}
              handleOpenDialog={handleOpenDialog}
              openDialogIndex={openDialogIndex}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DayView;
