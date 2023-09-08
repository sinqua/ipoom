import { motion } from "framer-motion";

export default function Grid({ captureMode }: { captureMode: boolean }) {
  return (
    <motion.div
      className="absolute w-full h-full top-0 right-0"
      animate={captureMode ? { opacity: 1 } : { opacity: 0 }}
    >
      <div className="absolute flex justify-evenly w-full h-full">
        <div className="w-[1px] h-full bg-[#B2B2B2]"></div>
        <div className="w-[1px] h-full bg-[#B2B2B2]"></div>
      </div>
      <div className="absolute flex flex-col justify-evenly w-full h-full">
        <div className="w-full h-[1px] bg-[#B2B2B2]"></div>
        <div className="w-full h-[1px] bg-[#B2B2B2]"></div>
      </div>
    </motion.div>
  );
}
