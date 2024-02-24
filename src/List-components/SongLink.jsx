import { useCtxtData } from "../contexts/appContext";
import { songTypeConfig } from "../songTypeConfig";

function SongLink({
  link,
  name,
  chapter,
  chapterId,
  section,
  sectionId,
  id,
  active,
}) {
  const config = songTypeConfig[link.type];
  const linkstyle = { color: active ? "white" : "" };
  const embedSpotify = false;
  const {
    setIsPlayingAudio,
    setIsPlayingVideo,
    setIsPlayingSpotify,
    setNowPlaying,
    setSearchParams,
  } = useCtxtData();

  if (config.download) {
    return (
      <a
        href={encodeURI(link.url)}
        download
        title={config.hovertext}
        style={linkstyle}>
        {config.name}
      </a>
    );
  } else {
    return (config.name !== "mp3" &&
      config.name !== "YouTube" &&
      config.name !== "video" &&
      config.name !== "Spotify") ||
      !embedSpotify ? (
      <a
        href={encodeURI(link.url)}
        target='_blank'
        rel='noreferrer noopener'
        title={config.hovertext}
        style={linkstyle}>
        {config.name}
      </a>
    ) : (
      <a
        onClick={(e) => {
          e.preventDefault();
          if (config.name === "mp3") {
            setIsPlayingVideo(false);
            setIsPlayingAudio(true);
            setIsPlayingSpotify(false);
          }
          if (config.name === "YouTube" || config.name === "video") {
            setIsPlayingAudio(false);
            setIsPlayingSpotify(false);
            setIsPlayingVideo(true);
          }
          if (config.name === "Spotify" && embedSpotify) {
            setIsPlayingAudio(false);
            setIsPlayingVideo(false);
            setIsPlayingSpotify(true);
          }
          setNowPlaying({
            playUrl: link.url,
            songName: name,
            chapterId: chapterId,
            chapterName: chapter.name,
            sectionName: section.name,
          });
          setSearchParams({ s: id, kap: chapterId, sec: sectionId });
        }}
        href={encodeURI(link.url)}
        target='_blank'
        rel='noreferrer noopener'
        title={config.hovertext}
        style={linkstyle}>
        {config.name}
      </a>
    );
  }
}

export default SongLink;
