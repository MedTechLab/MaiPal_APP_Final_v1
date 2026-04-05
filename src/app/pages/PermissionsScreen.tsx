import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../contexts/AppContext';
import { Camera, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type PermissionModal = 'camera' | 'mic' | null;

export function PermissionsScreen() {
  const navigate = useNavigate();
  const {
    requestCameraPermission,
    requestMicPermission,
    denyCameraPermission,
    denyMicPermission,
  } = useAppContext();
  const [showModal, setShowModal] = useState<PermissionModal>(null);

  const handleAgree = () => {
    // Show camera permission modal first
    setShowModal('camera');
  };

  const handleSkip = () => {
    navigate('/app');
  };

  const handleCameraAllow = () => {
    requestCameraPermission();
    setShowModal('mic');
  };

  const handleCameraDeny = () => {
    denyCameraPermission();
    setShowModal('mic');
  };

  const handleMicAllow = () => {
    requestMicPermission();
    setShowModal(null);
    setTimeout(() => {
      navigate('/app');
    }, 500);
  };

  const handleMicDeny = () => {
    denyMicPermission();
    setShowModal(null);
    setTimeout(() => {
      navigate('/app');
    }, 500);
  };

  return (
    <div className="bg-gradient-to-b from-[#ecd1b4] to-[#f5e6d3] flex flex-col items-center justify-between h-screen w-full p-8 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center"
      >
        <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[28px] text-[#5a4a3a] mb-8 text-center">
          欢迎来到MaiPal
        </h1>

        <div className="space-y-6 w-full max-w-[320px]">
          <div className="bg-white/80 p-6 rounded-[20px] shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-[#ecd1b4]/30 p-3 rounded-full">
                <Camera className="size-6 text-[#5a4a3a]" />
              </div>
              <div>
                <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18px] text-[#5a4a3a] mb-2">
                  摄像头权限
                </h3>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a] leading-relaxed">
                  用于面诊，帮助脉医生分析您的气色和面部状态
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-6 rounded-[20px] shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-[#ecd1b4]/30 p-3 rounded-full">
                <Mic className="size-6 text-[#5a4a3a]" />
              </div>
              <div>
                <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18px] text-[#5a4a3a] mb-2">
                  麦克风权限
                </h3>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a] leading-relaxed">
                  用于声音分析，帮助脉医生了解您的健康状况
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-4 rounded-[16px] shadow-sm">
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a] text-center leading-relaxed">
              🔒 您的数据仅用于健康建议
              <br />
              我们承诺保护您的隐私安全
            </p>
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-[320px] space-y-4">
        <button
          onClick={handleAgree}
          className="bg-[#ecd1b4] text-[#5a4a3a] font-['Noto_Sans_SC:Medium',sans-serif] text-[18px] py-4 px-8 rounded-full w-full shadow-lg active:scale-95 transition-transform"
        >
          同意并继续
        </button>
        <button
          onClick={handleSkip}
          className="text-[#8a7a6a] font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] py-2 w-full"
        >
          稍后再说
        </button>
      </div>

      {/* iOS-style Permission Modals */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[20px] w-[280px] overflow-hidden shadow-2xl"
            >
              <div className="p-6 text-center">
                <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[18px] text-black mb-3">
                  "MaiPal"想要访问您的{showModal === 'camera' ? '相机' : '麦克风'}
                </h2>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#666] leading-relaxed">
                  {showModal === 'camera'
                    ? '用于面诊分析，帮助了解您的健康状况'
                    : '用于声音分析，提供更准确的健康建议'}
                </p>
              </div>
              <div className="border-t border-[#e5e5e5]">
                <button
                  onClick={showModal === 'camera' ? handleCameraDeny : handleMicDeny}
                  className="w-full py-3 font-['Noto_Sans_SC:Regular',sans-serif] text-[17px] text-[#007AFF] border-b border-[#e5e5e5] active:bg-[#f5f5f5]"
                >
                  不允许
                </button>
                <button
                  onClick={showModal === 'camera' ? handleCameraAllow : handleMicAllow}
                  className="w-full py-3 font-['Noto_Sans_SC:Bold',sans-serif] text-[17px] text-[#007AFF] active:bg-[#f5f5f5]"
                >
                  允许
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
