import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, MapPin, Star, Clock, Phone, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface ClinicData {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  rating: number;
  distance: string;
  image: string;
  phone: string;
  hours: string;
  description: string;
  doctors: { name: string; title: string }[];
  services: string[];
}

const clinicsData: Record<string, ClinicData> = {
  c1: {
    id: 'c1',
    name: '和善堂中医诊所',
    location: '中环皇后大道中88号',
    specialties: ['脾胃调理', '失眠调理', '妇科调理'],
    rating: 4.8,
    distance: '1.2km',
    image: '🏥',
    phone: '+852 2123 4567',
    hours: '周一至周六 9:00-18:00',
    description:
      '和善堂中医诊所成立于1985年，秉承"以人为本，医者仁心"的理念，为香港市民提供专业的中医诊疗服务。诊所拥有多位资深中医师，擅长运用传统中医理论结合现代诊疗技术，为患者提供个性化的调理方案。',
    doctors: [
      { name: '陈医师', title: '主治中医师' },
      { name: '李医师', title: '中医内科专家' },
    ],
    services: ['中医诊疗', '针灸', '推拿', '拔罐', '中药配方'],
  },
  c2: {
    id: 'c2',
    name: '仁心中医馆',
    location: '铜锣湾轩尼诗道126号',
    specialties: ['针灸理疗', '颈椎腰椎', '慢性疼痛'],
    rating: 4.9,
    distance: '2.5km',
    image: '🏥',
    phone: '+852 2234 5678',
    hours: '周一至周日 10:00-20:00',
    description:
      '仁心中医馆专注于针灸理疗和疼痛管理，运用传统针灸、推拿等技法，结合现代康复理念，帮助患者缓解颈椎、腰椎等慢性疼痛问题。诊所环境舒适，设备齐全，深受患者信赖。',
    doctors: [
      { name: '王医师', title: '针灸专科医师' },
      { name: '张医师', title: '推拿理疗师' },
    ],
    services: ['针灸治疗', '推拿按摩', '艾灸', '刮痧', '中医理疗'],
  },
  c3: {
    id: 'c3',
    name: '康泰中医诊疗中心',
    location: '尖沙咀弥敦道201号',
    specialties: ['心血管调理', '高血压', '糖尿病'],
    rating: 4.7,
    distance: '3.8km',
    image: '🏥',
    phone: '+852 2345 6789',
    hours: '周一至周六 8:30-17:30',
    description:
      '康泰中医诊疗中心专注于慢性病管理和心血管健康调理，采用中西医结合的方式，为高血压、糖尿病等慢性病患者提供全面的健康管理方案。中心配备专业的检测设备，提供个性化的调理计划。',
    doctors: [
      { name: '刘医师', title: '中医内科主任' },
      { name: '黄医师', title: '心血管调理专家' },
    ],
    services: ['中医诊疗', '健康评估', '中药调理', '饮食指导', '生活方式管理'],
  },
  c4: {
    id: 'c4',
    name: '本草堂中医',
    location: '旺角西洋菜南街68号',
    specialties: ['儿科调理', '小儿推拿', '增强体质'],
    rating: 4.6,
    distance: '4.2km',
    image: '🏥',
    phone: '+852 2456 7890',
    hours: '周一至周日 9:30-19:00',
    description:
      '本草堂中医专注于儿童健康调理，拥有丰富的小儿推拿和儿科调理经验。采用温和的中医调理方法，帮助儿童增强体质，改善常见的健康问题。诊所环境温馨，深受家长和孩子们的喜爱。',
    doctors: [
      { name: '周医师', title: '小儿推拿专家' },
      { name: '吴医师', title: '儿科中医师' },
    ],
    services: ['小儿推拿', '中医儿科', '体质调理', '食疗指导', '保健咨询'],
  },
};

export function ClinicDetailPage() {
  const navigate = useNavigate();
  const { clinicId } = useParams<{ clinicId: string }>();
  const clinic = clinicId ? clinicsData[clinicId] : null;

  if (!clinic) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#8a7a6a]">
          诊所信息不存在
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[rgba(236,209,180,0.2)] to-white h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 active:scale-95 transition-transform mb-4"
        >
          <ArrowLeft className="size-6 text-black" />
        </button>

        {/* Clinic Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[20px] shadow-lg p-6"
        >
          <div className="flex gap-4 mb-4">
            <div className="size-20 rounded-[16px] bg-gradient-to-br from-[#ecd1b4]/20 to-[#ecd1b4]/5 flex items-center justify-center flex-shrink-0">
              <span className="text-[40px]">{clinic.image}</span>
            </div>
            <div className="flex-1">
              <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[24px] text-black mb-2">
                {clinic.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="size-5 fill-[#ecd1b4] text-[#ecd1b4]" />
                  <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black">
                    {clinic.rating}
                  </span>
                </div>
                <span className="text-[#8a7a6a]">·</span>
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a]">
                  {clinic.distance}
                </span>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-4">
            {clinic.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-[#ecd1b4]/15 text-[#8a7a6a] px-3 py-1.5 rounded-full text-[13px] font-['Noto_Sans_SC:Regular',sans-serif]"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Contact Info */}
          <div className="space-y-3 border-t border-gray-100 pt-4">
            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-[#8a7a6a] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-black">
                  {clinic.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-[#8a7a6a] flex-shrink-0" />
              <a
                href={`tel:${clinic.phone}`}
                className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-black"
              >
                {clinic.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-[#8a7a6a] flex-shrink-0" />
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-black">
                {clinic.hours}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 pb-24 space-y-6">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[20px] shadow-md p-6"
        >
          <h2 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18px] text-black mb-3">
            诊所介绍
          </h2>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-[#8a7a6a] leading-relaxed">
            {clinic.description}
          </p>
        </motion.div>

        {/* Doctors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[20px] shadow-md p-6"
        >
          <h2 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18px] text-black mb-4">
            医师团队
          </h2>
          <div className="space-y-3">
            {clinic.doctors.map((doctor, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-[#ecd1b4]/5 rounded-[12px]"
              >
                <div className="size-12 rounded-full bg-[#ecd1b4]/20 flex items-center justify-center text-[20px]">
                  👨‍⚕️
                </div>
                <div>
                  <p className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black">
                    {doctor.name}
                  </p>
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a]">
                    {doctor.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[20px] shadow-md p-6"
        >
          <h2 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18px] text-black mb-4">
            服务项目
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {clinic.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-[#ecd1b4]/5 rounded-[12px]"
              >
                <div className="size-2 rounded-full bg-[#ecd1b4]" />
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-black">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
