// eslint-disable-next-line no-unused-vars
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useCtxtData } from "../contexts/appContext";
import CloseButton from "../ui-components/CloseButton";

export default function AudioPlayerContainer() {
  const { isPlayingAudio, nowPlaying, chapterColor } = useCtxtData();
  if (!isPlayingAudio) return <></>;
  const { playUrl, chapterName, sectionName, songName, chapterId } = nowPlaying;
  return (
    <div
      className='audio'
      style={{ borderColor: chapterColor(chapterId)?.light }}>
      <AudioPlayer
        src={playUrl}
        autoPlayAfterSrcChange={false}
        header={`${chapterName}  ${sectionName}: ${songName}`}
        /*   footer='Footer text' */
        customAdditionalControls={[<CloseButton />]}
      />
    </div>
  );
}
