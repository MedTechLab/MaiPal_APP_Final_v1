import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../contexts/AppContext';
import { Settings, Mic, Send, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import imgJimeng2026030266462D3D1 from "figma:asset/d834302f12a4aa666948d09ac39a5777f92044aa.png";

// Chat page component
export function ChatPage() {
  const navigate = useNavigate();
  const {
    userInfo,
    messages,
    addMessage,
    isRecording,
    setIsRecording,
    cameraPermission,
    generateHealthReport,
  } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage('user', inputValue);
    const userMessage = inputValue.toLowerCase();
    setInputValue('');
    setShowQuickReplies(false);

    // Simulate AI response based on conversation flow
    setTimeout(() => {
      if (conversationStep === 0) {
        if (userMessage.includes('需要') && !userMessage.includes('不需要')) {
          addMessage('assistant', '我先看看你的气色。');
          setConversationStep(1);

          setTimeout(() => {
            setIsAnalyzing(true);
            setTimeout(() => {
              setIsAnalyzing(false);
              addMessage('assistant', '我看你今天气色略偏淡。');
              setTimeout(() => {
                addMessage('assistant', '可以和我说两句话吗？点击麦克风按钮开始。');
                setConversationStep(2);
              }, 1000);
            }, 2000);
          }, 1000);
        } else if (userMessage.includes('不需要')) {
          addMessage('assistant', '好的，有需要随时来找我，我会一直陪伴着你。😊');
          setConversationStep(-1); // End conversation
        }
      } else if (conversationStep === 3) {
        if (userMessage.includes('睡') || userMessage.includes('失眠')) {
          addMessage(
            'assistant',
            '了解了。建议您每晚11点前入睡，睡前可以泡泡脚放松身心。我已经为您准备了详细的检测报告。'
          );
        } else {
          addMessage(
            'assistant',
            '感谢您的回答。我已经收集了足够的信息,为您准备了详细的健康建议。'
          );
        }
        setTimeout(() => {
          generateHealthReport();
          addMessage('assistant', '检测完成！');
          setConversationStep(4);
        }, 1500);
      } else {
        addMessage('assistant', '我明白了，让我继续为您分析。');
      }
    }, 800);
  };

  const handleQuickReply = (text: string) => {
    addMessage('user', text);
    const userMessage = text.toLowerCase();
    setShowQuickReplies(false);

    // Simulate AI response based on conversation flow
    setTimeout(() => {
      if (conversationStep === 0) {
        if (userMessage.includes('需要') && !userMessage.includes('不需要')) {
          addMessage('assistant', '我先看看你的气色。');
          setConversationStep(1);

          setTimeout(() => {
            setIsAnalyzing(true);
            setTimeout(() => {
              setIsAnalyzing(false);
              addMessage('assistant', '我看你今天气色略偏淡。');
              setTimeout(() => {
                addMessage('assistant', '可以和我说两句话吗？点击麦克风按钮开始。');
                setConversationStep(2);
              }, 1000);
            }, 2000);
          }, 1000);
        } else if (userMessage.includes('不需要')) {
          addMessage('assistant', '好的，有需要随时来找我，我会一直陪伴着你。😊');
          setConversationStep(-1); // End conversation
        }
      } else if (conversationStep === 3) {
        if (userMessage.includes('睡') || userMessage.includes('失眠')) {
          addMessage(
            'assistant',
            '了解了。建议您每晚11点前入睡，睡前可以泡泡脚放松身心。我已经为您准备了详细的检测报告。'
          );
        } else {
          addMessage(
            'assistant',
            '感谢您的回答。我已经收集了足够的信息,为您准备了详细的健康建议。'
          );
        }
        setTimeout(() => {
          generateHealthReport();
          addMessage('assistant', '检测完成！');
          setConversationStep(4);
        }, 1500);
      } else {
        addMessage('assistant', '我明白了，让我继续为您分析。');
      }
    }, 800);
  };

  const handleMicPress = () => {
    if (conversationStep !== 2) return;

    setIsRecording(true);

    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      addMessage('assistant', '声音略显疲惫，最近睡眠如何？');
      setConversationStep(3);
      setShowQuickReplies(true);
    }, 3000);
  };

  const handleViewReport = () => {
    navigate('/app/summary');
  };

  return (
    <div className="bg-gradient-to-b from-[rgba(236,209,180,0.6)] via-[rgba(236,209,180,0.3)] to-transparent h-full flex flex-col relative">
      {/* Background Blur Effect */}
      <div className="absolute bg-[rgba(236,209,180,0.1)] blur-[64px] left-[-101px] rounded-full size-[700px] top-[43px]" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-12 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[24px] text-black mb-1">
              你好 {userInfo?.name || '朋友'}!
            </h1>
            <p className="font-['Noto_Sans_SC:Medium',sans-serif] text-[24px] text-black">
              我是脉医生！
            </p>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="bg-[rgba(236,209,180,0.8)] p-3 rounded-[12px] active:scale-95 transition-transform"
          >
            <Settings className="size-6 text-black" />
          </button>
        </div>
      </div>

      {/* Camera View Simulation */}
      {cameraPermission && (
        <div className="absolute top-[140px] left-0 right-0 h-[200px] z-0 overflow-hidden">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50" />
          </div>
        </div>
      )}

      {/* Messages - scrollable area */}
      <div className="flex-1 overflow-y-auto px-6 relative z-20 min-h-0">
        <div className="space-y-4 mb-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[280px] p-4 rounded-[20px] shadow-md ${
                  message.role === 'user'
                    ? 'bg-[#ecd1b4] text-black'
                    : 'bg-white/80 text-black'
                }`}
              >
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] leading-relaxed">
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Analyzing Animation */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/80 p-4 rounded-[20px] shadow-md">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                      className="size-2 bg-[#ecd1b4] rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                      className="size-2 bg-[#ecd1b4] rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                      className="size-2 bg-[#ecd1b4] rounded-full"
                    />
                  </div>
                  <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a]">
                    正在分析中...
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* View Report Button */}
          {conversationStep === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center pt-4"
            >
              <button
                onClick={handleViewReport}
                className="bg-[#ecd1b4] text-black font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] py-3 px-6 rounded-full shadow-lg active:scale-95 transition-transform"
              >
                查看检测报告
              </button>
            </motion.div>
          )}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Character Image - fixed above input, does NOT scroll */}
      <div className="relative z-10 flex justify-center pointer-events-none" style={{ height: '320px' }}>
        {isRecording && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 px-4 py-2 rounded-full shadow-lg z-20 pointer-events-none"
          >
            <span className="text-white text-[14px] font-['Noto_Sans_SC:Medium',sans-serif]">
              正在聆听...
            </span>
          </motion.div>
        )}
        <img
          src={imgJimeng2026030266462D3D1}
          alt="脉医生"
          className="w-[3360px] h-auto absolute left-1/2 -translate-x-1/2"
          style={{ bottom: '-50px' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Input Area */}
      <div className="bg-white/75 px-6 py-4 shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)] relative z-10">
        {/* Quick Reply Buttons */}
        {showQuickReplies && conversationStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 mb-3 overflow-x-auto pb-2"
          >
            <button
              onClick={() => handleQuickReply('需要')}
              className="bg-white border border-[#ecd1b4] text-black font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] py-2 px-4 rounded-full whitespace-nowrap active:scale-95 transition-transform"
            >
              需要
            </button>
            <button
              onClick={() => handleQuickReply('暂时不需要')}
              className="bg-white border border-[#ecd1b4] text-black font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] py-2 px-4 rounded-full whitespace-nowrap active:scale-95 transition-transform"
            >
              暂时不需要
            </button>
          </motion.div>
        )}
        
        {showQuickReplies && conversationStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 mb-3 overflow-x-auto pb-2"
          >
            <button
              onClick={() => handleQuickReply('睡眠不太好')}
              className="bg-white border border-[#ecd1b4] text-black font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] py-2 px-4 rounded-full whitespace-nowrap active:scale-95 transition-transform"
            >
              睡眠不太好
            </button>
            <button
              onClick={() => handleQuickReply('还可以')}
              className="bg-white border border-[#ecd1b4] text-black font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] py-2 px-4 rounded-full whitespace-nowrap active:scale-95 transition-transform"
            >
              还可以
            </button>
          </motion.div>
        )}

        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/90 border border-[#ecd1b4] rounded-[24px] px-5 py-3 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="输入您的回答..."
              className="flex-1 bg-transparent outline-none font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-black placeholder:text-[rgba(10,10,10,0.5)]"
            />
            <button onClick={handleMicPress} disabled={isRecording}>
              <Mic
                className={`size-5 ${
                  isRecording ? 'text-red-500' : 'text-[rgba(0,0,0,0.6)]'
                }`}
              />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-[#ecd1b4] p-3 rounded-[12px] disabled:opacity-50 active:scale-95 transition-transform"
          >
            <Send className="size-6 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}