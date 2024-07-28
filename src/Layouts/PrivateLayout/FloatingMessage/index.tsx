import { motion } from "framer-motion";
import { IoChatbox } from "react-icons/io5";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FloatingMessage({ setSelectedId }: any) {
  return (
    <div className="fixed bottom-10 left-12 z-[100000] ">
      <motion.div
        onClick={() => setSelectedId("1")}
        layoutId="1"
        className="btn p-2 rounded-xl h-auto shadow-2xl"
      >
        <IoChatbox className=" text-primary" size={30} />
     
      </motion.div>
    </div>
  );
}

export default FloatingMessage;
