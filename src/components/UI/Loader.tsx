// material-ui

import Spinner from "./Spinner";

// ==============================|| LOADER ||============================== //
const Loader = () => (
  <div className="loading_wrapper  min-h-[40rem] z-[1000] flex justify-center items-center">
    <Spinner />
  </div>
);

export default Loader;
