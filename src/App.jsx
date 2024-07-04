import List from "./List-components/List";
import Loader from "./List-components/Loader";
import { useCtxtData } from "./contexts/appContext";
import AudioPlayerContainer from "./players/AudioPlayerContainer";
import VideoPlayerContainer from "./players/VideoPlayerContainer";
import SpotifyPlayerContainer from "./players/SpotifyPlayerContainer";

function App() {
  const { lists, loading, error } = useCtxtData();
  if (loading || !lists)
    return (
      <div className='spinner'>
        <Loader />
      </div>
    );
  if (error) return <div>Kunne ikke laste inn data</div>;

  return (
    <div id='wrapper'>
      <List />
      <AudioPlayerContainer />
      <VideoPlayerContainer />
      <SpotifyPlayerContainer />
    </div>
  );
}

export default App;
