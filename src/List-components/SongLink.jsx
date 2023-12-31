import { useCtxtData } from "../contexts/appContext";
import { songTypeConfig } from "../songTypeConfig";

function SongLink({ link, name, chapter, section, id }) {
  const config = songTypeConfig[link.type];
  const {
    setIsPlayingAudio,
    setIsPlayingVideo,
    setPlayUrl,
    setSongName,
    setCurrentChapter,
    setCurrentSection,
    setCurrentId,
    setSearchParams,
  } = useCtxtData();

  if (config.download) {
    return (
      <a href={encodeURI(link.url)} download title={config.hovertext}>
        {config.name}
      </a>
    );
  } else {
    return config.name !== "mp3" &&
      config.name !== "YouTube" &&
      config.name !== "video" ? (
      <a
        href={encodeURI(link.url)}
        target='_blank'
        rel='noreferrer noopener'
        title={config.hovertext}>
        {config.name}
      </a>
    ) : (
      <a
        onClick={(e) => {
          e.preventDefault();
          if (config.name === "mp3") {
            setIsPlayingVideo(false);
            setIsPlayingAudio(true);
          }
          if (config.name === "YouTube" || config.name === "video") {
            setIsPlayingAudio(false);
            setIsPlayingVideo(true);
          }
          setPlayUrl(link.url);
          setSongName(name);
          setCurrentChapter(chapter);
          setCurrentId(id);
          setCurrentSection(section);
          setSearchParams({ s: id });
        }}
        href={encodeURI(link.url)}
        target='_blank'
        rel='noreferrer noopener'
        title={config.hovertext}>
        {config.name}
      </a>
    );
  }
}

export default SongLink;
