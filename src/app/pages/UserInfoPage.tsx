import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useAppContext } from '../contexts/AppContext';

const healthConcerns = [
  { id: 'diet', label: '饮食调理', icon: '🍽️' },
  { id: 'sleep', label: '睡眠质量', icon: '😴' },
  { id: 'exercise', label: '运动健康', icon: '🏃' },
  { id: 'emotion', label: '情绪管理', icon: '🧘' },
];

export function UserInfoPage() {
  const navigate = useNavigate();
  const { setUserInfo } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: '',
    gender: '' as 'male' | 'female' | '',
    age: '50',
    height: '',
    weight: '',
    concerns: [] as string[],
  });

  const [errors, setErrors] = useState({
    name: false,
    gender: false,
    age: false,
  });

  const toggleConcern = (concernId: string) => {
    setFormData((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(concernId)
        ? prev.concerns.filter((id) => id !== concernId)
        : [...prev.concerns, concernId],
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const newErrors = {
      name: !formData.name.trim(),
      gender: !formData.gender,
      age: !formData.age || parseInt(formData.age) <= 0,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Save user info to context
    setUserInfo({
      name: formData.name.trim(),
      gender: formData.gender,
      age: parseInt(formData.age),
      height: formData.height ? parseInt(formData.height) : undefined,
      weight: formData.weight ? parseInt(formData.weight) : undefined,
      concerns: formData.concerns,
    });

    // Navigate directly to chat
    navigate('/app/chat');
  };

  return (
    <div className="bg-gradient-to-b from-[rgba(236,209,180,0.3)] to-white h-full overflow-y-auto">
      <div className="px-6 pt-12 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[32px] text-black mb-2">
            完善个人信息
          </h1>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#8a7a6a]">
            帮助脉医生更好地了解你
          </p>
        </motion.div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-2">
              昵称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, name: false });
              }}
              placeholder="请输入您的昵称"
              className={`w-full bg-white rounded-[16px] px-4 py-4 font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-black outline-none border-2 transition-colors ${
                errors.name
                  ? 'border-red-500'
                  : 'border-transparent focus:border-[#ecd1b4]'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-[13px] text-red-500 font-['Noto_Sans_SC:Regular',sans-serif]">
                请输入昵称
              </p>
            )}
          </motion.div>

          {/* Gender */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className="block font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-3">
              性别 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setFormData({ ...formData, gender: 'male' });
                  setErrors({ ...errors, gender: false });
                }}
                className={`flex-1 py-4 rounded-[16px] font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] transition-all border-2 ${
                  formData.gender === 'male'
                    ? 'bg-[#ecd1b4] text-black border-[#ecd1b4]'
                    : errors.gender
                    ? 'bg-white text-[#8a7a6a] border-red-500'
                    : 'bg-white text-[#8a7a6a] border-transparent'
                }`}
              >
                👨 男
              </button>
              <button
                onClick={() => {
                  setFormData({ ...formData, gender: 'female' });
                  setErrors({ ...errors, gender: false });
                }}
                className={`flex-1 py-4 rounded-[16px] font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] transition-all border-2 ${
                  formData.gender === 'female'
                    ? 'bg-[#ecd1b4] text-black border-[#ecd1b4]'
                    : errors.gender
                    ? 'bg-white text-[#8a7a6a] border-red-500'
                    : 'bg-white text-[#8a7a6a] border-transparent'
                }`}
              >
                👩 女
              </button>
            </div>
            {errors.gender && (
              <p className="mt-1 text-[13px] text-red-500 font-['Noto_Sans_SC:Regular',sans-serif]">
                请选择性别
              </p>
            )}
          </motion.div>

          {/* Age, Height, Weight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <label className="block font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-2">
                年龄 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => {
                    setFormData({ ...formData, age: e.target.value });
                    setErrors({ ...errors, age: false });
                  }}
                  placeholder="0"
                  className={`w-full bg-white rounded-[16px] px-4 py-4 pr-10 font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-black outline-none border-2 transition-colors ${
                    errors.age
                      ? 'border-red-500'
                      : 'border-transparent focus:border-[#ecd1b4]'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7a6a] font-['Noto_Sans_SC:Regular',sans-serif] text-[14px]">
                  岁
                </span>
              </div>
              {errors.age && (
                <p className="mt-1 text-[13px] text-red-500 font-['Noto_Sans_SC:Regular',sans-serif]">
                  请输入年龄
                </p>
              )}
            </div>

            <div>
              <label className="block font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-2">
                身高
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                  placeholder="0"
                  className="w-full bg-white rounded-[16px] px-4 py-4 pr-10 font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-black outline-none border-2 border-transparent focus:border-[#ecd1b4] transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7a6a] font-['Noto_Sans_SC:Regular',sans-serif] text-[14px]">
                  cm
                </span>
              </div>
            </div>

            <div>
              <label className="block font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-2">
                体重
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  placeholder="0"
                  className="w-full bg-white rounded-[16px] px-4 py-4 pr-10 font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-black outline-none border-2 border-transparent focus:border-[#ecd1b4] transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7a6a] font-['Noto_Sans_SC:Regular',sans-serif] text-[14px]">
                  kg
                </span>
              </div>
            </div>
          </motion.div>

          {/* Health Concerns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="block font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-3">
              健康关注
            </label>
            <div className="grid grid-cols-2 gap-3">
              {healthConcerns.map((concern) => (
                <button
                  key={concern.id}
                  onClick={() => toggleConcern(concern.id)}
                  className={`py-4 px-4 rounded-[16px] font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] transition-all flex items-center gap-2 ${
                    formData.concerns.includes(concern.id)
                      ? 'bg-[#ecd1b4] text-black'
                      : 'bg-white text-[#8a7a6a]'
                  }`}
                >
                  <span className="text-[20px]">{concern.icon}</span>
                  <span>{concern.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent"
        >
          <button
            onClick={handleSubmit}
            className="w-full bg-[#ecd1b4] text-black py-4 rounded-full font-['Noto_Sans_SC:Medium',sans-serif] text-[18px] active:scale-[0.98] transition-transform shadow-lg"
          >
            下一步
          </button>
        </motion.div>
      </div>
    </div>
  );
}