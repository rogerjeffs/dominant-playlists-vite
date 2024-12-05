import { useCtxtData } from "../contexts/appContext";
import Chapter from "./Chapter";

function List() {
  const { lists,title,hideTitle } = useCtxtData();
  return (
    <div id='content'>
      <h2 style={{display: hideTitle ? "none" : "block"}}>{title}</h2>
      {Object.entries(lists).map(([id, chapter]) => {
        return <Chapter key={id} id={id} chapter={chapter}  />;
      })}
    </div>
  );
}

export default List;
