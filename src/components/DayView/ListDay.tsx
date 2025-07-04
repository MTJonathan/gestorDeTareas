import { TresPuntosIcon } from "../../assets/IconsSvg";
import DeleteDay from "./DeleteDay";
import type { ListInterface } from "../../lib/type";

interface ListDayProps {
    item: ListInterface;
    index: number;
    handleChecked: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleOpenDialog: (index: number) => void;
    openDialogIndex: number | null;
}

const ListDay = ({item, index, handleChecked, handleOpenDialog, openDialogIndex}: ListDayProps) => {
  return (
    <li className="flex relative w-[300px] items-center justify-between my-5">
      <label>
        <input
          checked={item.checked}
          onChange={(e) => handleChecked(e, index)}
          className="accent-[#9c244c]"
          type="checkbox"
        />
        <span className="ml-2">{item.tarea}</span>
      </label>
      <span className="cursor-pointer" onClick={() => handleOpenDialog(index)}>
        {openDialogIndex === index && <DeleteDay id={item.id} />}
        <TresPuntosIcon />
      </span>
    </li>
  );
};

export default ListDay;
