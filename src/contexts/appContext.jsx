import useAxios from "axios-hooks";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import chapterColor from "../assets/chapterColor";
const appContext = createContext();

function AppProvider({ children }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  // const [playUrl, setPlayUrl] = useState("");
  // const [songName, setSongName] = useState("");
  const [nowPlaying, setNowPlaying] = useState({});
  // const [currentId, setCurrentId] = useState("");
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

  // const defaultChapterId = query
  //   ? getChapterIdFromSongId(query)
  //   : flattenedList[0].chapterId;
  // const defaultSectionId = query
  //   ? getSectionIdFromSongId(query)
  //   : flattenedList[0].sectionId;
  const defaultChapterId = query ? getChapterIdFromSongId(query) : "";
  const defaultSectionId = query ? getSectionIdFromSongId(query) : "";
  const currentChapterId = defaultChapterId
    ? defaultChapterId
    : searchParams.get("kap");
  const currentSectionId = defaultSectionId
    ? defaultSectionId
    : searchParams.get("sec");

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
        // playUrl,
        // setPlayUrl,
        nowPlaying,
        setNowPlaying,
        // songName,
        // setSongName,
        // currentId,
        // setCurrentId,
        searchParams,
        setSearchParams,
        currentChapterId,
        currentSectionId,
        defaultChapterId,
        defaultSectionId,
        chapterColor,
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
