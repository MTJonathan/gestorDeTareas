import { forwardRef } from "react";
import type { Ref } from "react";
import { useListStore } from "../../store/useListStore";

interface DeleteDayProps {
  id: number;
}

const DeleteDay = forwardRef(
  ({ id }: DeleteDayProps, ref: Ref<HTMLDivElement>) => {
    const list = useListStore((state) => state.list);
    const setList = useListStore((state) => state.setList);

    console.log(list);
    console.log(id);

    const handleDelete = () => {
      if (confirm("¿Estas seguro de eliminar esta tarea?")) {
        setList(list.filter((item) => item.id !== id));
      }
    };
    return (
      <div ref={ref} className="flex absolute bg-[#484f58] top-5 right-0">
        <div className="flex relative">
          <span className="triangle absolute top-[-7px] right-0 bg-[#484f58] w-[12px] h-[10px]"></span>
          <span className="p-[6px] text-[8px] font-bold" onClick={handleDelete}>
            Eliminar
          </span>
          <span className="p-[6px] text-[8px] font-bold">Editar</span>
        </div>
      </div>
    );
  }
);

export default DeleteDay;
