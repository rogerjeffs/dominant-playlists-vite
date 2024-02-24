import CloseButton from "../ui-components/CloseButton";
import { useCtxtData } from "../contexts/appContext";

function SpotifyPlayerContainer() {
  const { isPlayingSpotify, nowPlaying, chapterColor } = useCtxtData();
  const { playUrl, chapterName, sectionName, songName, chapterId } = nowPlaying;

  const src =
    playUrl &&
    playUrl.substring(0, 25) +
      "embed/" +
      playUrl.substring(25, playUrl.indexOf("?")) +
      "?utm_source=generator&theme=0";

  if (!isPlayingSpotify) return <></>;
  return (
    <div
      className='spotify'
      style={{
        backgroundColor: chapterColor(chapterId)?.dark,
        height: "260px",
        textAlign: "center",
        paddingTop: "12px",
      }}>
      <iframe
        style={{
          borderRadius: "12px",
          border: "none",
        }}
        src={src}
        // src='https://open.spotify.com/embed/track/1emdMnglWKwMS8XitagHzT?utm_source=generator&theme=0'
        width='95%'
        height='180'
        allowFullScreen=''
        allow='clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'></iframe>

      <div style={{ color: "white", fontSize: "15px", marginTop: "-18px" }}>
        {/* {chapterId + " "} */}
        {chapterName + " "}
        {sectionName + " "}:{" "}
        <span style={{ fontWeight: "bold" }}>{songName}</span>
        <br />
        <CloseButton />
      </div>
    </div>
  );
}

export default SpotifyPlayerContainer;
