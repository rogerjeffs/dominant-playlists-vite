import { useCtxtData } from "../contexts/appContext";

function CloseButton() {
  const { closePlayers, currentChapterId, chapterColor } = useCtxtData();
  function handleClose() {
    closePlayers();
  }
  return (
    <button
      className='button-close'
      style={{
        backgroundColor: chapterColor(currentChapterId)?.main,
        color: "white",
      }}
      onClick={() => handleClose()}>
      Lukk
    </button>
  );
}

export default CloseButton;
