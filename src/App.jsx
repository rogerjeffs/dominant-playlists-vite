import Chapter from "./List-components/Chapter";
import { useCtxtData } from "./contexts/appContext";
import AudioPlayerContainer from "./players/AudioPlayerContainer";
import VideoPlayerContainer from "./players/VideoPlayerContainer";
import { Audio } from "react-loader-spinner";

function App() {
  const { lists, loading, error, isPlayingAudio, defaultChapterId } =
    useCtxtData();

  if (loading || !lists) return <Audio color='blue' />;
  return (
    <div id='wrapper'>
      <div id='content'>
        <h2>Samstemt media og ressurser</h2>
        {Object.entries(lists).map(([id, chapter]) => {
          return <Chapter key={id} id={id} chapter={chapter} />;
        })}
      </div>
      <AudioPlayerContainer />
      <VideoPlayerContainer />
    </div>
  );
}

export default App;
