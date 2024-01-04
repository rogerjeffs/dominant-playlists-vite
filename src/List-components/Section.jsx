import { useState } from "react";
import Song from "./Song";

function Section({ id, section, chapter, defaultSectionId, lightColor }) {
  const [isOpen, setIsOpen] = useState(defaultSectionId === id);
  const activeStyle = {
    backgroundColor: isOpen ? lightColor : "inherit",
    paddingTop: "6px",
  };
  return (
    <div
      className={"section " + (isOpen ? "section-active" : "section-inactive")}
      id={"chapter-" + id}>
      <h5
        className={
          !isOpen ? "section-name" : "section-name section-name-active"
        }
        onClick={() => setIsOpen(!isOpen)}
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
              section={section}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Section;
