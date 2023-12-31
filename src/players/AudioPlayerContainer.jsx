// eslint-disable-next-line no-unused-vars
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useCtxtData } from "../contexts/appContext";
import CloseButton from "../ui-components/CloseButton";
export default function AudioPlayerContainer() {
  const { isPlayingAudio, playUrl, songName, currentChapter, currentSection } =
    useCtxtData();
  if (!isPlayingAudio) return <></>;
  return (
    <div className='audio' style={{ borderColor: currentChapter.color }}>
      <AudioPlayer
        src={playUrl}
        autoPlayAfterSrcChange={false}
        header={`${currentChapter.name}  ${currentSection.name}: ${songName}`}
        /*   footer='Footer text' */
        customAdditionalControls={[<CloseButton />]}
      />
    </div>
  );
}
