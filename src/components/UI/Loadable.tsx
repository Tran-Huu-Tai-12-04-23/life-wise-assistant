import { Suspense, ComponentType } from "react";
import Loader from "./Loader";

// project imports

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );

export default Loadable;
