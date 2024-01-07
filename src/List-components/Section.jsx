// import { useState } from "react";
import Song from "./Song";
import { useCtxtData } from "../contexts/appContext";
import { useEffect, useRef } from "react";

function Section({
  id,
  section,
  chapter,
  chapterId,
  isOpen,
  onExpand,
  onCollapse,
}) {
  // const [isOpen, setIsOpen] = useState(defaultSectionId === id);
  const { chapterColor } = useCtxtData();
  const lightColor = chapterColor(chapterId).light;
  const activeStyle = {
    backgroundColor: isOpen ? lightColor : "inherit",
    paddingTop: "6px",
  };
  const ref = useRef(null);
  function handleClick() {
    if (!isOpen) onExpand();
    if (isOpen) onCollapse();
  }
  useEffect(() => {
    if (ref.current && isOpen) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isOpen]);
  return (
    <div
      className={"section " + (isOpen ? "section-active" : "section-inactive")}
      id={"chapter-" + id}
      ref={ref}>
      <h5
        className={
          !isOpen ? "section-name" : "section-name section-name-active"
        }
        onClick={() => handleClick()}
        style={activeStyle}>
        {section.name}
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
      </h5>
      <div
        className='section-content'
        style={{ display: isOpen ? "" : "none" }}>
        {Object.entries(section.songs).map(([id, song]) => {
          return (
            <Song
              key={id}
              id={id}
              song={song}
              chapter={chapter}
              chapterId={chapterId}
              section={section}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Section;
