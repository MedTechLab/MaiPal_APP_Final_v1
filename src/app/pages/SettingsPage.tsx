import { useNavigate } from 'react-router';
import { ChevronLeft, User, Heart, Bell, Shield, Palette, HelpCircle, LogOut, Volume2, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

export function SettingsPage() {
  const navigate = useNavigate();
  const { userInfo, updateUserInfo, generateHealthReport, hasPlan } = useAppContext();
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [editPhone, setEditPhone] = useState(userInfo?.phone || '');
  const [editEmail, setEditEmail] = useState(userInfo?.email || '');
  const [preferences, setPreferences] = useState({
    faceAnalysis: true,
    voiceAnalysis: true,
    pulseAnalysis: true,
    questionnaire: true,
  });
  const [notificationFrequency, setNotificationFrequency] = useState<'daily' | 'weekly' | 'off'>('daily');
  const [companionNotification, setCompanionNotification] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleResetDetection = () => {
    // Reset detection state for demo purposes
    window.location.reload();
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAccountInfo = () => {
    updateUserInfo({
      phone: editPhone || undefined,
      email: editEmail || undefined,
    });
    setIsEditingAccount(false);
  };

  return (
    <div className="bg-gradient-to-b from-[rgba(236,209,180,0.3)] via-[rgba(236,209,180,0.15)] to-transparent min-h-screen overflow-y-auto pb-8">
      {/* Header */}
      <div className="px-7 pt-8 pb-4 flex items-center justify-between sticky top-0 bg-gradient-to-b from-[rgba(236,209,180,0.3)] to-transparent z-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent p-2 rounded-full active:scale-95 transition-transform"
        >
          <ChevronLeft className="size-8 text-black" />
        </button>
        <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[32px] text-black tracking-[0.67px]">
          设置
        </h1>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      <div className="px-7 space-y-4">
        {/* Debug Tool - Demo Only */}
        <div className="bg-[#eff6ff] rounded-[21px] p-4 border border-[#bedbff] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] text-[18.67px] text-[#193cb8] tracking-[0.67px]">
              ⚙️ 调试工具
            </p>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14.67px] text-[#155dfc] tracking-[0.67px]">
              （演示用）
            </p>
          </div>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#1447e6] mb-3 tracking-[0.67px]">
            当前检测状态：{hasPlan ? '✅ 已完成' : '⭕ 未检测'}
          </p>
          <button
            onClick={handleResetDetection}
            className="bg-[#155dfc] w-full py-3 rounded-[13px] font-['Noto_Sans_SC:Medium',sans-serif] text-[18.67px] text-white tracking-[0.67px] active:scale-95 transition-transform"
          >
            重置为未检测
          </button>
          <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14.67px] text-[#155dfc] text-center mt-2 tracking-[0.67px]">
            点击可切换检测状态，查看不同界面效果
          </p>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-[21px] shadow-md p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[rgba(236,209,180,0.3)] p-3 rounded-full">
              <User className="size-5 text-black" />
            </div>
            <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[21.33px] text-black tracking-[0.67px]">
              账户信息
            </h2>
          </div>
          
          <div className="bg-[rgba(236,209,180,0.1)] rounded-[16px] p-3 mb-3 flex items-center gap-4">
            <div className="bg-[#ecd1b4] rounded-full size-16 flex items-center justify-center text-[32px]">
              {userInfo?.gender === 'male' ? '👨' : userInfo?.gender === 'female' ? '👩' : '👤'}
            </div>
            <div className="flex-1">
              <p className="font-['Noto_Sans_SC:Bold',sans-serif] text-[21.33px] text-black tracking-[0.67px]">
                {userInfo?.name || '未设置'}
              </p>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[17.33px] text-[rgba(0,0,0,0.6)] tracking-[0.67px]">
                {userInfo?.gender === 'male' ? '男' : userInfo?.gender === 'female' ? '女' : ''} · {userInfo?.age ? `${userInfo.age}岁` : '未设置年龄'}
              </p>
            </div>
            <button 
              onClick={() => setIsEditingAccount(!isEditingAccount)}
              className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18.67px] text-[#d3b697] tracking-[0.67px]"
            >
              {isEditingAccount ? '取消' : '编辑'}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2 text-[rgba(0,0,0,0.7)]">
                <Phone className="size-4" />
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[18.67px] tracking-[0.67px]">
                  手机号
                </span>
              </div>
              {isEditingAccount ? (
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="请输入手机号"
                  className="font-['Noto_Sans_SC:Regular',sans-serif] text-[18.67px] text-black tracking-[0.67px] bg-[rgba(236,209,180,0.1)] px-3 py-1 rounded-lg outline-none focus:ring-2 focus:ring-[#ecd1b4]"
                />
              ) : (
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[18.67px] text-[rgba(0,0,0,0.4)] tracking-[0.67px]">
                  {userInfo?.phone || '未设置'}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2 text-[rgba(0,0,0,0.7)]">
                <Mail className="size-4" />
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[18.67px] tracking-[0.67px]">
                  邮箱
                </span>
              </div>
              {isEditingAccount ? (
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="请输入邮箱"
                  className="font-['Noto_Sans_SC:Regular',sans-serif] text-[18.67px] text-black tracking-[0.67px] bg-[rgba(236,209,180,0.1)] px-3 py-1 rounded-lg outline-none focus:ring-2 focus:ring-[#ecd1b4]"
                />
              ) : (
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[18.67px] text-[rgba(0,0,0,0.4)] tracking-[0.67px]">
                  {userInfo?.email || '未设置'}
                </span>
              )}
            </div>
          </div>

          {isEditingAccount && (
            <button
              onClick={handleSaveAccountInfo}
              className="w-full mt-3 bg-[#ecd1b4] text-black py-3 rounded-[13px] font-['Noto_Sans_SC:Medium',sans-serif] text-[18.67px] tracking-[0.67px] active:scale-95 transition-transform"
            >
              保存
            </button>
          )}
        </div>

        {/* Health Preferences */}
        <div className="bg-white rounded-[21px] shadow-md p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[rgba(236,209,180,0.3)] p-3 rounded-full">
              <Heart className="size-5 text-black" />
            </div>
            <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[21.33px] text-black tracking-[0.67px]">
              健康偏好
            </h2>
          </div>

          <p className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18.67px] text-[rgba(0,0,0,0.8)] mb-3 tracking-[0.67px]">
            四诊偏好
          </p>

          <div className="space-y-2">
            {[
              { key: 'faceAnalysis', label: '望诊', desc: '通过面色观察健康' },
              { key: 'voiceAnalysis', label: '闻诊', desc: '通过声音判断状态' },
              { key: 'pulseAnalysis', label: '切诊', desc: '通过脉搏了解体质' },
              { key: 'questionnaire', label: '问诊', desc: '通过问答全面了解' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18.67px] text-black tracking-[0.67px]">
                    {item.label}
                  </p>
                  <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[rgba(0,0,0,0.5)] tracking-[0.67px]">
                    {item.desc}
                  </p>
                </div>
                <button
                  onClick={() => togglePreference(item.key as keyof typeof preferences)}
                  className={`w-11 h-6 rounded-full transition-colors ${
                    preferences[item.key as keyof typeof preferences] ? 'bg-[#ecd1b4]' : 'bg-gray-300'
                  } flex items-center px-0.5`}
                >
                  <div
                    className={`size-[18px] bg-white rounded-full shadow-sm transition-transform ${
                      preferences[item.key as keyof typeof preferences] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-[21px] shadow-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="size-4 text-[rgba(0,0,0,0.6)]" />
            <p className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18.67px] text-[rgba(0,0,0,0.8)] tracking-[0.67px]">
              通知设置
            </p>
          </div>

          <div className="mb-4">
            <p className="font-['Noto_Sans_SC:Medium',sans-serif] text-[17.33px] text-black mb-2 tracking-[0.67px]">
              检测提醒
            </p>
            <div className="flex gap-2">
              {(['daily', 'weekly', 'off'] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setNotificationFrequency(freq)}
                  className={`flex-1 py-3 rounded-[10.67px] font-['Noto_Sans_SC:Medium',sans-serif] text-[17.33px] tracking-[0.67px] transition-colors ${
                    notificationFrequency === freq
                      ? 'bg-[#ecd1b4] text-black'
                      : 'bg-[#f3f4f6] text-[rgba(0,0,0,0.6)]'
                  }`}
                >
                  {freq === 'daily' ? '每日' : freq === 'weekly' ? '每周' : '关闭'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <p className="font-['Noto_Sans_SC:Medium',sans-serif] text-[17.33px] text-black tracking-[0.67px]">
              陪伴消息提醒
            </p>
            <button
              onClick={() => setCompanionNotification(!companionNotification)}
              className={`w-11 h-6 rounded-full transition-colors ${
                companionNotification ? 'bg-[#ecd1b4]' : 'bg-gray-300'
              } flex items-center px-0.5`}
            >
              <div
                className={`size-[18px] bg-white rounded-full shadow-sm transition-transform ${
                  companionNotification ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <p className="font-['Noto_Sans_SC:Medium',sans-serif] text-[17.33px] text-black tracking-[0.67px]">
              情绪关注提醒
            </p>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[17.33px] text-[rgba(0,0,0,0.5)] tracking-[0.67px]">
              70%
            </p>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-[21px] shadow-md p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[rgba(236,209,180,0.3)] p-3 rounded-full">
              <Shield className="size-5 text-black" />
            </div>
            <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[21.33px] text-black tracking-[0.67px]">
              隐私与安全
            </h2>
          </div>
          <div className="space-y-3">
            {['修改密码', '导出健康数据', '清除所有记录'].map((item) => (
              <button
                key={item}
                className="w-full flex items-center justify-between py-2 active:bg-gray-50 rounded-lg px-2"
              >
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[17.33px] text-black tracking-[0.67px]">
                  {item}
                </span>
                <ChevronLeft className="size-5 text-[rgba(0,0,0,0.3)] rotate-180" />
              </button>
            ))}
          </div>
        </div>

        {/* Theme & Sound */}
        <div className="bg-white rounded-[21px] shadow-md p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[rgba(236,209,180,0.3)] p-3 rounded-full">
              <Palette className="size-5 text-black" />
            </div>
            <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[21.33px] text-black tracking-[0.67px]">
              主题与声音
            </h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[17.33px] text-black tracking-[0.67px]">
                深色模式
              </span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-11 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-[#ecd1b4]' : 'bg-gray-300'
                } flex items-center px-0.5`}
              >
                <div
                  className={`size-[18px] bg-white rounded-full shadow-sm transition-transform ${
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <button className="w-full flex items-center justify-between py-2 active:bg-gray-50 rounded-lg px-2">
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[17.33px] text-black tracking-[0.67px]">
                脉医生人格
              </span>
              <div className="flex items-center gap-2">
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[17.33px] text-[rgba(0,0,0,0.5)] tracking-[0.67px]">
                  😊
                </span>
                <ChevronLeft className="size-5 text-[rgba(0,0,0,0.3)] rotate-180" />
              </div>
            </button>
          </div>

          <div className="mt-4 bg-[#f5f5dc] rounded-[13px] p-3 flex items-center justify-around">
            {['温柔', '标准', '活泼'].map((mood) => (
              <button
                key={mood}
                className="bg-[#ecd1b4] px-4 py-2 rounded-full font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-black tracking-[0.67px] active:scale-95 transition-transform"
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-[21px] shadow-md p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[rgba(236,209,180,0.3)] p-3 rounded-full">
              <HelpCircle className="size-5 text-black" />
            </div>
            <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[21.33px] text-black tracking-[0.67px]">
              使用与帮助
            </h2>
          </div>
          <div className="space-y-3">
            {['常见问题', '使用教程', '意见反馈'].map((item) => (
              <button
                key={item}
                className="w-full flex items-center justify-between py-2 active:bg-gray-50 rounded-lg px-2"
              >
                <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[17.33px] text-black tracking-[0.67px]">
                  {item}
                </span>
                <ChevronLeft className="size-5 text-[rgba(0,0,0,0.3)] rotate-180" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-[21px] shadow-md p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[rgba(236,209,180,0.3)] p-3 rounded-full">
              <LogOut className="size-5 text-black" />
            </div>
            <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[21.33px] text-black tracking-[0.67px]">
              退出登录
            </h2>
          </div>
          <button className="w-full py-3 font-['Noto_Sans_SC:Medium',sans-serif] text-[18.67px] text-[#ff3b30] tracking-[0.67px] active:scale-95 transition-transform">
            销账号
          </button>
        </div>

        {/* Version */}
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[rgba(0,0,0,0.3)] text-center py-4 tracking-[0.67px]">
          MaiPal v1.0.0
        </p>
      </div>
    </div>
  );
}