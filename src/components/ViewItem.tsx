
interface ViewItemProps {
    view: string;
    setView: (view: string) => void;
    name: string;
}

const ViewItem = ({ view, setView, name }: ViewItemProps) => {
  return (
    <li
      style={{ borderBottom: view === name ? "4px solid #e25b88" : "" }}
      onClick={() => setView(name)}
      className="px-10 py-2 cursor-pointer"
    >
      {name}
    </li>
  );
};

export default ViewItem;
