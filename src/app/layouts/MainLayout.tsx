import { Outlet, useLocation, useNavigate } from 'react-router';
import { Calendar, MessageCircle, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { useEffect } from 'react';

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cameraPermission, micPermission } = useAppContext();

  // Redirect to chat if on /app
  useEffect(() => {
    if (location.pathname === '/app' || location.pathname === '/app/') {
      navigate('/app/chat', { replace: true });
    }
  }, [location.pathname, navigate]);

  const tabs = [
    { id: 'summary', label: '调理', icon: Calendar, path: '/app/summary' },
    { id: 'chat', label: '脉医生', icon: MessageCircle, path: '/app/chat' },
    { id: 'store', label: '医馆', icon: ShoppingBag, path: '/app/store' },
  ];

  const currentPath = location.pathname;

  return (
    <div className="bg-white relative h-screen w-full flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-[#f3f4f6] h-[70px] flex items-center justify-around px-4 relative">
        {/* Active Tab Indicator */}
        <div
          className="absolute top-0 h-[70px] bg-[#ecd1b4] rounded-tl-[12px] rounded-tr-[12px] transition-all duration-300"
          style={{
            left:
              currentPath === '/app/summary'
                ? '16.67%'
                : currentPath.includes('chat')
                ? '41.67%'
                : '66.67%',
            width: '16.67%',
          }}
        />

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPath.includes(tab.id) || (currentPath === '/app' && tab.id === 'chat');

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative z-10"
            >
              <Icon className={`size-5 ${isActive ? 'text-black' : 'text-[#8a7a6a]'}`} />
              <span
                className={`font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] ${
                  isActive ? 'text-black' : 'text-[#8a7a6a]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}