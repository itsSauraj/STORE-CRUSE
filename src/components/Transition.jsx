import { motion   } from 'framer-motion';


const Transition = ({ component }) => {
  return (
    <>
        {component}
        <motion.div
            className="fixed w-full h-full bg-primary dark:bg-secondary top-0 left-0
              transform origin-left
            "
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="relative w-full h-full texture"></div>
        </motion.div>
        <motion.div
            className="fixed w-full h-full bg-primary dark:bg-secondary top-0 left-0
              transform origin-top
            "
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="relative w-full h-full texture"></div>
        </motion.div>
    </>
  )
}

export default Transition