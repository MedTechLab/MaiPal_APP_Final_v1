import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingCart, MapPin, Star, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../contexts/AppContext';

type TabType = 'food' | 'doctor';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Clinic {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  rating: number;
  distance: string;
  image: string;
}

export function StorePage() {
  const navigate = useNavigate();
  const { cartItems, addToCart, points } = useAppContext();
  const [activeTab, setActiveTab] = useState<TabType>('food');

  const foodProducts: Product[] = [
    {
      id: '1',
      name: '枸杞红枣茶',
      description: '补气养血，改善气色',
      price: 68,
      image: '🍵',
    },
    {
      id: '2',
      name: '养生炖盅',
      description: '滋补脾胃，增强体质',
      price: 128,
      image: '🍲',
    },
    {
      id: '3',
      name: '安神助眠茶',
      description: '舒缓神经，改善睡眠',
      price: 88,
      image: '🌿',
    },
    {
      id: '4',
      name: '补气养血膏',
      description: '温补气血，提升精气',
      price: 158,
      image: '🍯',
    },
  ];

  const partnerClinics: Clinic[] = [
    {
      id: 'c1',
      name: '和善堂中医诊所',
      location: '中环皇后大道中88号',
      specialties: ['脾胃调理', '失眠调理', '妇科调理'],
      rating: 4.8,
      distance: '1.2km',
      image: '🏥',
    },
    {
      id: 'c2',
      name: '仁心中医馆',
      location: '铜锣湾轩尼诗道126号',
      specialties: ['针灸理疗', '颈椎腰椎', '慢性疼痛'],
      rating: 4.9,
      distance: '2.5km',
      image: '🏥',
    },
    {
      id: 'c3',
      name: '康泰中医诊疗中心',
      location: '尖沙咀弥敦道201号',
      specialties: ['心血管调理', '高血压', '糖尿病'],
      rating: 4.7,
      distance: '3.8km',
      image: '🏥',
    },
    {
      id: 'c4',
      name: '本草堂中医',
      location: '旺角西洋菜南街68号',
      specialties: ['儿科调理', '小儿推拿', '增强体质'],
      rating: 4.6,
      distance: '4.2km',
      image: '🏥',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[rgba(236,209,180,0.2)] to-white h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[28px] text-black">
            中医馆
          </h1>
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#ecd1b4] to-[#d4b89e] px-4 py-2 rounded-full shadow-sm">
            <Gift className="size-5 text-white" />
            <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-white">
              {points} 积分
            </span>
          </div>
        </div>
        
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a] mb-6">
          100积分可抵扣¥10，200积分可抵扣¥25
        </p>

        {/* Tab Switcher */}
        <div className="bg-white rounded-[16px] p-1 flex shadow-sm">
          <button
            onClick={() => setActiveTab('food')}
            className={`flex-1 py-3 rounded-[12px] font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] transition-colors ${
              activeTab === 'food'
                ? 'bg-[#ecd1b4] text-black'
                : 'text-[#8a7a6a]'
            }`}
          >
            药膳房
          </button>
          <button
            onClick={() => setActiveTab('doctor')}
            className={`flex-1 py-3 rounded-[12px] font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] transition-colors ${
              activeTab === 'doctor'
                ? 'bg-[#ecd1b4] text-black'
                : 'text-[#8a7a6a]'
            }`}
          >
            看医生
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 pb-24">
        {activeTab === 'food' ? (
          <div className="grid grid-cols-2 gap-4">
            {foodProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[16px] shadow-md overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-[#ecd1b4]/20 to-[#ecd1b4]/5 flex items-center justify-center">
                  <span className="text-[64px]">{product.image}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-1">
                    {product.name}
                  </h3>
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#8a7a6a] mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-['Noto_Sans_SC:Bold',sans-serif] text-[18px] text-[#ecd1b4]">
                      ¥{product.price}
                    </span>
                    <button
                      className="bg-[#ecd1b4] text-black px-4 py-1.5 rounded-full text-[14px] font-['Noto_Sans_SC:Medium',sans-serif] active:scale-95 transition-transform"
                      onClick={() => addToCart(product)}
                    >
                      加入
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {partnerClinics.map((clinic) => (
              <motion.div
                key={clinic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/clinic/${clinic.id}`)}
                className="bg-white rounded-[16px] shadow-md p-5 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex gap-4">
                  {/* Clinic Icon */}
                  <div className="size-16 rounded-[12px] bg-gradient-to-br from-[#ecd1b4]/20 to-[#ecd1b4]/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-[32px]">{clinic.image}</span>
                  </div>

                  {/* Clinic Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[17px] text-black">
                        {clinic.name}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <Star className="size-4 fill-[#ecd1b4] text-[#ecd1b4]" />
                        <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black">
                          {clinic.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-1.5 mb-2">
                      <MapPin className="size-4 text-[#8a7a6a] flex-shrink-0 mt-0.5" />
                      <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a] leading-tight">
                        {clinic.location}
                      </p>
                      <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a] flex-shrink-0 ml-auto">
                        {clinic.distance}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {clinic.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-[#ecd1b4]/15 text-[#8a7a6a] px-2.5 py-1 rounded-full text-[12px] font-['Noto_Sans_SC:Regular',sans-serif]"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Button - Only show in food tab */}
      {activeTab === 'food' && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => navigate('/cart')}
          className="fixed bottom-[100px] right-6 z-50 bg-[#ecd1b4] rounded-full size-[56px] shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        >
          <ShoppingCart className="size-6 text-white" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold rounded-full size-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </motion.button>
      )}
    </div>
  );
}