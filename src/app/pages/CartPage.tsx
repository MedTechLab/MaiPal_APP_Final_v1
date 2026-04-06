import { useNavigate } from 'react-router';
import { ArrowLeft, Trash2, Plus, Minus, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../contexts/AppContext';
import { useState } from 'react';

export function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateCartItemQuantity, removeFromCart, points } = useAppContext();
  const [pointsToUse, setPointsToUse] = useState(0);

  const updateQuantity = (id: string, delta: number) => {
    updateCartItemQuantity(id, delta);
  };

  const removeItem = (id: string) => {
    removeFromCart(id);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate discount based on points used
  // 100 points = ¥10, 200 points = ¥25
  const calculateDiscount = (pts: number) => {
    if (pts >= 200) {
      return 25;
    } else if (pts >= 100) {
      return 10;
    }
    return 0;
  };

  const discount = calculateDiscount(pointsToUse);
  const finalPrice = Math.max(0, totalPrice - discount);

  const handleUse100Points = () => {
    if (points >= 100) {
      setPointsToUse(100);
    }
  };

  const handleUse200Points = () => {
    if (points >= 200) {
      setPointsToUse(200);
    }
  };

  const handleClearPoints = () => {
    setPointsToUse(0);
  };

  return (
    <div className="bg-gradient-to-b from-[rgba(236,209,180,0.2)] to-white h-full flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 active:scale-95 transition-transform"
          >
            <ArrowLeft className="size-6 text-black" />
          </button>
          <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[28px] text-black">
            购物车
          </h1>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-[80px] mb-4">🛒</div>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#8a7a6a] mb-6">
              购物车是空的
            </p>
            <button
              onClick={() => navigate('/app/store')}
              className="bg-[#ecd1b4] text-black px-6 py-3 rounded-full font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] active:scale-95 transition-transform"
            >
              去逛逛
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-[16px] shadow-md p-4"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="size-20 rounded-[12px] bg-gradient-to-br from-[#ecd1b4]/20 to-[#ecd1b4]/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-[40px]">{item.image}</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 active:scale-95 transition-transform"
                      >
                        <Trash2 className="size-5 text-[#8a7a6a]" />
                      </button>
                    </div>
                    <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a] mb-3">
                      {item.description}
                    </p>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <span className="font-['Noto_Sans_SC:Bold',sans-serif] text-[18px] text-[#ecd1b4]">
                        ¥{item.price}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="size-7 rounded-full bg-[#ecd1b4]/20 flex items-center justify-center active:scale-95 transition-transform"
                        >
                          <Minus className="size-4 text-[#8a7a6a]" />
                        </button>
                        <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="size-7 rounded-full bg-[#ecd1b4] flex items-center justify-center active:scale-95 transition-transform"
                        >
                          <Plus className="size-4 text-black" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Bar */}
      {cartItems.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-6 py-4 safe-area-bottom">
          {/* Points Section */}
          <div className="mb-4 p-4 bg-gradient-to-r from-[#ecd1b4]/10 to-[#d4b89e]/10 rounded-[12px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Gift className="size-5 text-[#ecd1b4]" />
                <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[15px] text-black">
                  使用积分优惠
                </span>
              </div>
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a]">
                可用积分: {points}
              </span>
            </div>
            
            <div className="flex gap-2 mb-3">
              <button
                onClick={handleUse100Points}
                disabled={points < 100}
                className={`flex-1 py-2 px-3 rounded-[8px] font-['Noto_Sans_SC:Medium',sans-serif] text-[14px] transition-all ${
                  pointsToUse === 100
                    ? 'bg-[#ecd1b4] text-black shadow-sm'
                    : points >= 100
                    ? 'bg-white border border-[#ecd1b4] text-[#8a7a6a] active:scale-95'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                100积分
                <div className="text-[12px]">抵¥10</div>
              </button>
              <button
                onClick={handleUse200Points}
                disabled={points < 200}
                className={`flex-1 py-2 px-3 rounded-[8px] font-['Noto_Sans_SC:Medium',sans-serif] text-[14px] transition-all ${
                  pointsToUse === 200
                    ? 'bg-[#ecd1b4] text-black shadow-sm'
                    : points >= 200
                    ? 'bg-white border border-[#ecd1b4] text-[#8a7a6a] active:scale-95'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                200积分
                <div className="text-[12px]">抵¥25</div>
              </button>
              {pointsToUse > 0 && (
                <button
                  onClick={handleClearPoints}
                  className="px-4 py-2 rounded-[8px] bg-gray-100 text-[#8a7a6a] font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] active:scale-95 transition-transform"
                >
                  清除
                </button>
              )}
            </div>
            
            {pointsToUse > 0 && (
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-green-600 font-['Noto_Sans_SC:Medium',sans-serif]">
                  已使用 {pointsToUse} 积分
                </span>
                <span className="text-green-600 font-['Noto_Sans_SC:Medium',sans-serif]">
                  节省 ¥{discount}
                </span>
              </div>
            )}
          </div>
          
          {/* Price Summary */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-[#8a7a6a]">
                商品金额
              </span>
              <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black">
                ¥{totalPrice}
              </span>
            </div>
            
            {discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-[#8a7a6a]">
                  积分抵扣
                </span>
                <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-green-600">
                  -¥{discount}
                </span>
              </div>
            )}
            
            <div className="h-px bg-gray-200 my-3" />
            
            <div className="flex items-center justify-between">
              <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black">
                实付金额
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#ecd1b4]">
                  ¥
                </span>
                <span className="font-['Noto_Sans_SC:Bold',sans-serif] text-[28px] text-[#ecd1b4]">
                  {finalPrice}
                </span>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-[#ecd1b4] text-black py-4 rounded-full font-['Noto_Sans_SC:Medium',sans-serif] text-[18px] active:scale-[0.98] transition-transform">
            去结算 ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      )}
    </div>
  );
}