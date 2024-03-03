import useAxios from "axios-hooks";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import chapterColor from "../assets/chapterColor";
const appContext = createContext();

function AppProvider({ children }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isPlayingSpotify, setIsPlayingSpotify] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("s");
  const [{ data, loading, error }] = useAxios("/data/opptakt.json");
  // const [{ data, loading, error }] = useAxios("/data/samstemt.json");

  // const lists = strToObj(data); //strToObj not needed for json
  const lists = data;
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

  // function strToObj(e) {
  //   if (!e) return;
  //   if (typeof e == "string") {
  //     const obj = new Function("return" + e);
  //     return obj();
  //   } else {
  //     console.log("fetched data is not a string");
  //   }
  // }
  function getChapterIdFromSongId(songId) {
    return flattenedList.find((x) => x.songId === songId)?.chapterId ?? null;
  }

  function getSectionIdFromSongId(songId) {
    return flattenedList.find((x) => x.songId === songId)?.sectionId ?? null;
  }
  function closePlayers() {
    setIsPlayingAudio(false);
    setIsPlayingVideo(false);
    setIsPlayingSpotify(false);
    setNowPlaying({});
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
        isPlayingSpotify,
        setIsPlayingAudio,
        setIsPlayingVideo,
        setIsPlayingSpotify,
        nowPlaying,
        setNowPlaying,
        searchParams,
        setSearchParams,
        currentChapterId,
        currentSectionId,
        chapterColor,
        closePlayers,
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
