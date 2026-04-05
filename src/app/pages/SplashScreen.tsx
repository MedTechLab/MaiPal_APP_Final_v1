import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/userinfo');
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // Remove navigate from dependencies

  return (
    <div className="bg-gradient-to-b from-[#ecd1b4] to-[#f5e6d3] flex flex-col items-center justify-center h-screen w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="bg-white rounded-full size-[120px] flex items-center justify-center mb-6 shadow-lg mx-auto">
          <p className="font-['Noto_Sans_SC:Bold',sans-serif] text-[48px] text-[#ecd1b4]">脉</p>
        </div>
        <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[32px] text-[#5a4a3a] mb-2">MaiPal</h1>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#8a7a6a]">脉伴 - 您的中医健康管家</p>
      </motion.div>
    </div>
  );
}