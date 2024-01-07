import Section from "./Section";
import { useCtxtData } from "../contexts/appContext";
import { useEffect, useRef, useState } from "react";

function Chapter({ id, chapter, isOpen, onExpand, onCollapse }) {
  const { defaultSectionId, chapterColor } = useCtxtData();
  const chapterId = id;
  // const [isOpen, setIsOpen] = useState(defaultChapterId === id);
  const lightColor = chapterColor(id).light;
  const activeStyle = {
    backgroundColor: isOpen ? lightColor : "inherit",
  };
  const ref = useRef(null);
  function handleClick() {
    if (!isOpen) onExpand();
    if (isOpen) onCollapse();
  }
  const [visibleIdx, setVisibleIdx] = useState(defaultSectionId);
  useEffect(() => {
    if (ref.current && isOpen && defaultSectionId === null) {
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={!isOpen ? "chevron" : "chevron chevron-open"}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              strokeWidth='2'
              // stroke='currentColor'
              stroke={chapter.color}
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M0 0h24v24H0z' stroke='none'></path>
              <path d='m6 9 6 6 6-6'></path>
            </svg>
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
            background: chapter.color,
          }}
        />
      </div>
    </div>
  );
}

export default Chapter;
