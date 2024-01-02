import { useState } from "react";
import Section from "./Section";
import { useCtxtData } from "../contexts/appContext";

function Chapter({ id, chapter }) {
  const { defaultChapterId, defaultSectionId } = useCtxtData();
  const [isOpen, setIsOpen] = useState(defaultChapterId === id);

  return (
    <div
      className={"chapter " + (isOpen ? "chapter-active" : "chapter-inactive")}
      id={"chapter-" + id}>
      <div style={{ display: "flex", minHeight: 0 }}>
        <div style={{ flex: 1 }}>
          <h4 className={"chapter-name "} onClick={() => setIsOpen(!isOpen)}>
            {chapter.name}
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
                  defaultSectionId={defaultSectionId}
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
