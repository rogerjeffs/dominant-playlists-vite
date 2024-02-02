import Song from "./Song";
import { useCtxtData } from "../contexts/appContext";
import { useEffect, useRef, useState } from "react";
import Chevron from "../svg/Chevron";

function Section({ id, section, chapter, chapterId }) {
  const { chapterColor, currentSectionId, setSearchParams, closePlayers } =
    useCtxtData();
  const sectionId = id;
  const isOpen = currentSectionId === id;
  const lightColor = chapterColor(chapterId).light;
  const activeStyle = {
    backgroundColor: isOpen ? lightColor : "inherit",
  };
  const ref = useRef(null);
  const [clicked, setClicked] = useState(false);
  function handleClick() {
    setSearchParams(!isOpen ? { kap: chapterId, sec: id } : { kap: chapterId });
    setClicked(true);
    closePlayers();
  }
  useEffect(() => {
    if (ref.current && isOpen && clicked) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setClicked(false);
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
        <Chevron color={chapterColor(chapterId).main} isOpen={isOpen} />
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
              sectionId={sectionId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Section;
