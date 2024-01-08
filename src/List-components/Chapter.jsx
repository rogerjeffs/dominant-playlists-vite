import Section from "./Section";
import { useCtxtData } from "../contexts/appContext";
import { useEffect, useRef, useState } from "react";
import Chevron from "../svg/Chevron";

function Chapter({ id, chapter }) {
  const { defaultSectionId, currentChapterId, chapterColor, setSearchParams } =
    useCtxtData();
  const chapterId = id;
  // const [isOpen, setIsOpen] = useState(defaultChapterId === id);
  const isOpen = currentChapterId === id || defaultSectionId === id;
  const lightColor = chapterColor(id).light;
  const activeStyle = {
    backgroundColor: isOpen ? lightColor : "inherit",
  };
  const ref = useRef(null);

  function handleClick() {
    setSearchParams(!isOpen ? { kap: id } : {});
  }
  const [visibleIdx, setVisibleIdx] = useState(defaultSectionId);
  useEffect(() => {
    if ((ref.current && currentChapterId === id) || defaultSectionId === id) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isOpen]);
  return (
    <div
      className={"chapter " + (isOpen ? "chapter-active" : "chapter-inactive")}
      id={"chapter-" + id}
      ref={ref}>
      <div style={{ display: "flex", minHeight: 0 }}>
        <div style={{ flex: 1 }}>
          <h4
            className={"chapter-name"}
            style={activeStyle}
            onClick={() => handleClick()}>
            {chapter.name}
            <Chevron color={chapterColor(id).main} isOpen={isOpen} />
          </h4>
          <div
            className='chapter-content'
            style={{ display: isOpen ? "" : "none" }}>
            {Object.entries(chapter.sections).map(([id, section]) => {
              return (
                <Section
                  key={id}
                  id={id}
                  section={section}
                  chapter={chapter}
                  chapterId={chapterId}
                  isOpen={visibleIdx == id}
                  onExpand={() => setVisibleIdx(id)}
                  onCollapse={() => setVisibleIdx("")}
                />
              );
            })}
          </div>
        </div>
        <div
          style={{
            marginLeft: 8,
            alignContent: "stretch",
            width: 20,
            background: chapterColor(id).main,
          }}
        />
      </div>
    </div>
  );
}

export default Chapter;
