import { motion   } from 'framer-motion';

import PropTypes from 'prop-types';

const Transition = ({ component }) => {
  return (
    <>
        {component}
        <motion.div
            className="fixed w-full h-full bg-primary dark:bg-secondary top-0 left-0
              transform origin-left z-30
            "
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="relative w-full h-full"></div>
        </motion.div>
        <motion.div
            className="fixed w-full h-full bg-primary dark:bg-secondary top-0 left-0
              transform origin-top z-30
            "
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="relative w-full h-full"></div>
        </motion.div>
    </>
  )
}

Transition.propTypes = {
  component: PropTypes.node.isRequired,
};

export default Transition