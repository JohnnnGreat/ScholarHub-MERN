export const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const interceptConfigs = {
  triggerOnce: true,
  threshold: 0.2,
};

export const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

export const shakeAnimation = {
  shake: {
    x: [0, -5, 5, -5, 5, 0],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 0.5,
      repeatDelay: 2.5,
    },
  },
};

export const zoomAnimation = {
  zoom: {
    scale: [1, 1.1, 1],
    transition: {
      scale: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },
};
