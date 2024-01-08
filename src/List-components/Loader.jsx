import { Audio } from "react-loader-spinner";

function Loader() {
  return (
    <div className='spinner'>
      <Audio color='blue' />
    </div>
  );
}

export default Loader;
