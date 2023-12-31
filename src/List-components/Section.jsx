import { useState } from "react";
import Song from "./Song";

function Section({ id, section, chapter, defaultSectionId }) {
  const [isOpen, setIsOpen] = useState(defaultSectionId === id);

  return (
    <div
      className={"section " + (isOpen ? "section-active" : "section-inactive")}
      id={"chapter-" + id}>
      <h5 className={"section-name"} onClick={() => setIsOpen(!isOpen)}>
        {section.name}
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
