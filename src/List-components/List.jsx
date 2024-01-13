import { useCtxtData } from "../contexts/appContext";
import Chapter from "./Chapter";

function List() {
  const { lists } = useCtxtData();

  return (
    <div id='content'>
      <h2>Samstemt media og ressurser</h2>
      {Object.entries(lists).map(([id, chapter]) => {
        return <Chapter key={id} id={id} chapter={chapter} />;
      })}
    </div>
  );
}

export default List;
