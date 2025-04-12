// components/ContactSVG.js
import { motion } from 'framer-motion';

const ContactSVG = () => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 900 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Elements */}
      <circle cx="450" cy="300" r="250" fill="#EBF4FF" />
      <circle cx="450" cy="300" r="200" fill="#DBEAFE" />
      
      {/* Envelope Base */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        d="M300 200H600C622.091 200 640 217.909 640 240V400C640 422.091 622.091 440 600 440H300C277.909 440 260 422.091 260 400V240C260 217.909 277.909 200 300 200Z"
        stroke="#3B82F6"
        strokeWidth="5"
        fill="white"
      />
      
      {/* Envelope Flap */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        d="M260 240L430 340C442.6 348 457.4 348 470 340L640 240"
        stroke="#3B82F6"
        strokeWidth="5"
        fill="transparent"
      />
      
      {/* Message Content Lines */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <rect x="320" y="280" width="260" height="10" rx="5" fill="#BFDBFE" />
        <rect x="320" y="310" width="200" height="10" rx="5" fill="#BFDBFE" />
        <rect x="320" y="340" width="230" height="10" rx="5" fill="#BFDBFE" />
      </motion.g>
      
      {/* Globe and Connection */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <circle cx="700" cy="150" r="60" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="3" />
        <path d="M700 90C673.5 90 650 103.5 637.5 124.5C650 138 674 148.5 700 148.5C726 148.5 750 138 762.5 124.5C750 103.5 726.5 90 700 90Z" fill="#93C5FD" />
        <path d="M675 150H725C725 175 715 200 700 200C685 200 675 175 675 150Z" fill="#93C5FD" />
        <path d="M700 90V200" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5 5" />
        <path d="M637.5 124.5H762.5" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5 5" />
      </motion.g>
      
      {/* Connection Line between Envelope and Globe */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        d="M640 280C670 280 680 230 700 230C720 230 730 200 730 180"
        stroke="#3B82F6"
        strokeWidth="3"
        strokeDasharray="8 8"
        fill="transparent"
      />
      
      {/* Decorative Elements */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <circle cx="600" cy="500" r="30" fill="#93C5FD" />
        <circle cx="200" cy="180" r="25" fill="#93C5FD" />
        <circle cx="750" cy="400" r="20" fill="#BFDBFE" />
        <circle cx="250" cy="480" r="15" fill="#BFDBFE" />
      </motion.g>
      
      {/* Small Paper Airplane */}
      <motion.g
        initial={{ x: -100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ 
          duration: 2,
          delay: 3.5,
          type: "spring",
          stiffness: 50
        }}
      >
        <path d="M180 300L230 270L200 320L180 300Z" fill="white" stroke="#3B82F6" strokeWidth="2" />
        <path d="M230 270L200 320L240 310L230 270Z" fill="white" stroke="#3B82F6" strokeWidth="2" />
      </motion.g>
    </svg>
  );
};

export default ContactSVG;