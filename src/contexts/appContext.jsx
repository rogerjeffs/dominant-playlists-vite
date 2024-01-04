import useAxios from "axios-hooks";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const appContext = createContext();

function AppProvider({ children }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [playUrl, setPlayUrl] = useState("");
  const [songName, setSongName] = useState("");
  const [currentChapter, setCurrentChapter] = useState({});
  const [currentId, setCurrentId] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("s");
  const [{ data, loading, error }] = useAxios("/data/list_data.txt");
  const lists = strToObj(data); //strToObj not needed for jsons

  if (loading || !lists)
    return (
      <appContext.Provider
        value={{
          lists,
          loading,
          error,
        }}>
        {children}
      </appContext.Provider>
    );
  // Only continue when we have lists from the API-fetch
  const flattenedList = Object.entries(lists).flatMap(
    ([chapterId, chapter]) => {
      return Object.entries(chapter.sections).flatMap(
        ([sectionId, section]) => {
          return Object.entries(section.songs).map(([songId, song]) => ({
            chapterId,
            chapter,
            sectionId,
            section,
            songId,
            song,
          }));
        }
      );
    }
  );

  function strToObj(e) {
    if (!e) return;
    if (typeof e == "string") {
      const obj = new Function("return" + e);
      return obj();
    } else {
      console.log("fetched data is not a string");
    }
  }
  function getChapterIdFromSongId(songId) {
    return flattenedList.find((x) => x.songId === songId)?.chapterId ?? null;
  }

  function getSectionIdFromSongId(songId) {
    return flattenedList.find((x) => x.songId === songId)?.sectionId ?? null;
  }

  const defaultChapterId = query
    ? getChapterIdFromSongId(query)
    : flattenedList[0].chapterId;
  const defaultSectionId = query
    ? getSectionIdFromSongId(query)
    : flattenedList[0].sectionId;

  function lightenDarkenColor(col, amt) {
    //used to lighten chapter colors as background-colors
    var usePound = false;
    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    var b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    var newCol =
      (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    return newCol;
  }
  return (
    <appContext.Provider
      value={{
        lists,
        loading,
        error,
        isPlayingAudio,
        isPlayingVideo,
        setIsPlayingAudio,
        setIsPlayingVideo,
        playUrl,
        setPlayUrl,
        songName,
        setSongName,
        currentChapter,
        setCurrentChapter,
        currentSection,
        setCurrentSection,
        currentId,
        setCurrentId,
        searchParams,
        setSearchParams,
        defaultChapterId,
        defaultSectionId,
        lightenDarkenColor,
      }}>
      {children}
    </appContext.Provider>
  );
}

function useCtxtData() {
  const context = useContext(appContext);
  if (context === undefined)
    throw new Error("appContext was used outside the appProvider");
  return context;
}

export { AppProvider, useCtxtData };
