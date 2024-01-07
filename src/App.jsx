import List from "./List-components/List";
import { useCtxtData } from "./contexts/appContext";
import AudioPlayerContainer from "./players/AudioPlayerContainer";
import VideoPlayerContainer from "./players/VideoPlayerContainer";
import { Audio } from "react-loader-spinner";

function App() {
  const { lists, loading, error, isPlayingAudio, defaultChapterId } =
    useCtxtData();
  if (loading || !lists) return <Audio color='blue' />;
  if (error) return <div>Kunne ikke laste inn data</div>;
  return (
    <div id='wrapper'>
      <List />
      <AudioPlayerContainer />
      <VideoPlayerContainer />
    </div>
  );
}

export default App;
