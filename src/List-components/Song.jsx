import { useEffect, useRef } from "react";
import { useCtxtData } from "../contexts/appContext";
import SongLink from "./SongLink";
// import { useSearchParams } from "react-router-dom";
// import qs from "qs";
// const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });

function Song({ id, song, chapter, section }) {
  const { currentId, setCurrentId, searchParams, lightenDarkenColor } =
    useCtxtData();
  const query = searchParams.get("s");
  const songIsInQueryParam = id === query;
  const ref = useRef(null);
  const lightestColor = lightenDarkenColor(chapter.color, 60);
  useEffect(() => {
    if (ref.current && songIsInQueryParam) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setCurrentId(id);
    }
  }, [songIsInQueryParam, id, setCurrentId]);

  return (
    <div
      style={{ backgroundColor: lightestColor }}
      ref={ref}
      className={"song " + (id === currentId ? "song-active" : "song-inactive")}
      id={"song-" + id}>
      <div className='song-name'>{song.name}</div>
      <div style={{ display: "flex" }}>
        {song.links.map((link) => {
          return (
            <div
              key={link.url}
              className='song-link'
              style={{ marginRight: 8 }}>
              <SongLink
                link={link}
                name={song.name}
                chapter={chapter}
                section={section}
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
