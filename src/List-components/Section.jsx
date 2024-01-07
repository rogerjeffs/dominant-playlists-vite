// import { useState } from "react";
import Song from "./Song";
import { useCtxtData } from "../contexts/appContext";
import { useEffect, useRef } from "react";
import Chevron from "../svg/Chevron";

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
        style={isOpen ? activeStyle : null}>
        {section.name}
        <Chevron color={chapter.color} isOpen={isOpen} />
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
