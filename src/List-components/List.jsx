import { useCtxtData } from "../contexts/appContext";
import Chapter from "./Chapter";

function List() {
  const { lists,title } = useCtxtData();

  return (
    <div id='content'>
      <h2>{title}</h2>
      {Object.entries(lists).map(([id, chapter]) => {
        return <Chapter key={id} id={id} chapter={chapter} />;
      })}
    </div>
  );
}

export default List;
