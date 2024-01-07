import { useState } from "react";
import { useCtxtData } from "../contexts/appContext";
import Chapter from "./Chapter";

function List() {
  const { lists, defaultChapterId } = useCtxtData();
  const [visibleIdx, setVisibleIdx] = useState(defaultChapterId);
  return (
    <div id='content'>
      <h2>Samstemt media og ressurser</h2>
      {Object.entries(lists).map(([id, chapter]) => {
        return (
          <Chapter
            key={id}
            id={id}
            chapter={chapter}
            isOpen={visibleIdx == id}
            onExpand={() => setVisibleIdx(id)}
            onCollapse={() => setVisibleIdx("")}
          />
        );
      })}
    </div>
  );
}

export default List;
