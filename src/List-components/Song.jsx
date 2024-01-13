import { useEffect, useRef } from "react";
import { useCtxtData } from "../contexts/appContext";
import SongLink from "./SongLink";

function Song({ id, song, chapter, chapterId, section, sectionId }) {
  const { setCurrentId, searchParams, chapterColor } = useCtxtData();
  const query = searchParams.get("s");
  const songIsInQueryParam = id === query;
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && songIsInQueryParam) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [songIsInQueryParam, id, setCurrentId]);

  return (
    <div
      style={
        !songIsInQueryParam
          ? { backgroundColor: chapterColor(chapterId)?.lightest }
          : {
              backgroundColor: chapterColor(chapterId)?.dark,
              color: "white",
              fontSize: "15px",
              borderBottom: "none",
            }
      }
      ref={ref}
      className={
        "song " + (songIsInQueryParam ? "song-active" : "song-inactive")
      }
      id={"song-" + id}>
      <div className='song-name'>{song.name}</div>
      <div style={{ display: "flex" }}>
        {song.links.map((link) => {
          return (
            <div
              key={link.url}
              style={{
                marginRight: 8,
              }}>
              <SongLink
                active={songIsInQueryParam}
                link={link}
                name={song.name}
                chapter={chapter}
                chapterId={chapterId}
                section={section}
                sectionId={sectionId}
                id={id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Song;
