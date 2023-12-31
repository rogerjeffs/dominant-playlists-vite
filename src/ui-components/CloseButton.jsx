import { useCtxtData } from "../contexts/appContext";

function CloseButton() {
  const { setIsPlayingAudio, setIsPlayingVideo, currentChapter } =
    useCtxtData();
  function handleClose() {
    setIsPlayingAudio(false);
    setIsPlayingVideo(false);
  }
  return (
    <button
      className='button-close'
      style={{ backgroundColor: currentChapter.color }}
      onClick={() => handleClose()}>
      Lukk
    </button>
  );
}

export default CloseButton;
