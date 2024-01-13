import { useCtxtData } from "../contexts/appContext";

function CloseButton() {
  const {
    setIsPlayingAudio,
    setIsPlayingVideo,
    currentChapterId,
    chapterColor,
  } = useCtxtData();
  function handleClose() {
    setIsPlayingAudio(false);
    setIsPlayingVideo(false);
  }
  return (
    <button
      className='button-close'
      style={{ backgroundColor: chapterColor(currentChapterId)?.light }}
      onClick={() => handleClose()}>
      Lukk
    </button>
  );
}

export default CloseButton;
