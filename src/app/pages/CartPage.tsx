import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: '枸杞红枣茶',
      description: '补气养血，改善气色',
      price: 68,
      image: '🍵',
      quantity: 2,
    },
    {
      id: '3',
      name: '安神助眠茶',
      description: '舒缓神经，改善睡眠',
      price: 88,
      image: '🌿',
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
          <div className="flex items-center justify-between mb-4">
            <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#8a7a6a]">
              合计
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#ecd1b4]">
                ¥
              </span>
              <span className="font-['Noto_Sans_SC:Bold',sans-serif] text-[28px] text-[#ecd1b4]">
                {totalPrice}
              </span>
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
