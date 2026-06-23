import { motion } from "framer-motion";

export default function Scene({ children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
      style={{
        padding: 20,
        fontFamily: "sans-serif",
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </motion.div>
  );
}
