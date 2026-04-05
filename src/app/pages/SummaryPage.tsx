import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function SummaryPage() {
  const { healthReport, hasPlan, tasks, toggleTask, generatePlan } = useAppContext();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate week days
  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  const handleGeneratePlan = () => {
    generatePlan();
    setShowPlanModal(false);
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="bg-gradient-to-b from-[rgba(236,209,180,0.3)] to-white h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[28px] text-black mb-2">
          调理计划
        </h1>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a]">
          查看您的健康报告和调理建议
        </p>
      </div>

      {/* Calendar Slider */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-[20px] shadow-md p-4">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2">
              <ChevronLeft className="size-5 text-[#8a7a6a]" />
            </button>
            <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black">
              {selectedDate.getFullYear()}年 {selectedDate.getMonth() + 1}月
            </span>
            <button className="p-2">
              <ChevronRight className="size-5 text-[#8a7a6a]" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((date, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center py-2 rounded-[12px] transition-colors ${
                    isSelected
                      ? 'bg-[#ecd1b4]'
                      : isToday
                      ? 'bg-[#ecd1b4]/30'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-[12px] text-[#8a7a6a] mb-1">
                    {dayNames[date.getDay()]}
                  </span>
                  <span
                    className={`text-[16px] font-['Noto_Sans_SC:Medium',sans-serif] ${
                      isSelected ? 'text-black' : 'text-[#5a4a3a]'
                    }`}
                  >
                    {date.getDate()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Health Report */}
      {healthReport && (
        <div className="px-6 mb-6">
          <div className="bg-white rounded-[20px] shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[20px] text-black">
                今日检测报告
              </h2>
              <span className="text-[12px] text-[#8a7a6a]">{healthReport.date}</span>
            </div>

            <div className="space-y-4">
              <div className="bg-[#ecd1b4]/10 p-4 rounded-[12px]">
                <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-2">
                  📷 面诊分析
                </h3>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#5a4a3a] leading-relaxed">
                  {healthReport.faceAnalysis}
                </p>
              </div>

              <div className="bg-[#ecd1b4]/10 p-4 rounded-[12px]">
                <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-2">
                  🎤 声音分析
                </h3>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#5a4a3a] leading-relaxed">
                  {healthReport.voiceAnalysis}
                </p>
              </div>

              <div className="bg-[#ecd1b4]/10 p-4 rounded-[12px]">
                <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-3">
                  💡 健康建议
                </h3>
                <ul className="space-y-2">
                  {healthReport.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#5a4a3a] leading-relaxed"
                    >
                      <span className="text-[#ecd1b4] mt-1">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {!hasPlan && (
              <button
                onClick={() => setShowPlanModal(true)}
                className="bg-[#ecd1b4] text-black font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] py-3 px-6 rounded-full w-full mt-6 active:scale-95 transition-transform"
              >
                生成7天调理计划
              </button>
            )}
          </div>
        </div>
      )}

      {/* Daily Plan */}
      {hasPlan && (
        <div className="px-6 pb-24">
          <div className="bg-white rounded-[20px] shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[20px] text-black">
                今日任务
              </h2>
              <span className="text-[14px] font-['Noto_Sans_SC:Medium',sans-serif] text-[#ecd1b4]">
                {completedTasks}/{totalTasks} 已完成
              </span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <motion.button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 w-full p-4 rounded-[12px] bg-[#f9f9f9] hover:bg-[#f5f5f5] transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  {task.completed ? (
                    <CheckCircle2 className="size-6 text-green-500 shrink-0" />
                  ) : (
                    <Circle className="size-6 text-[#d0d0d0] shrink-0" />
                  )}
                  <span
                    className={`font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-left ${
                      task.completed
                        ? 'text-[#8a7a6a] line-through'
                        : 'text-black'
                    }`}
                  >
                    {task.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Report Message */}
      {!healthReport && (
        <div className="px-6 pb-24">
          <div className="bg-white rounded-[20px] shadow-md p-8 text-center">
            <div className="bg-[#ecd1b4]/20 size-[80px] rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="size-10 text-[#ecd1b4]" />
            </div>
            <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18px] text-black mb-2">
              暂无检测报告
            </h3>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a] mb-6">
              前往"脉医生"页面开始健康检测
            </p>
          </div>
        </div>
      )}

      {/* Generate Plan Modal */}
      <AnimatePresence>
        {showPlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[20px] w-full max-w-[320px] p-6"
            >
              <h3 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[20px] text-black mb-3 text-center">
                生成调理计划
              </h3>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a] text-center mb-6 leading-relaxed">
                根据您的检测报告，我将为您定制一份为期7天的中医调理计划，帮助改善身体状况。
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPlanModal(false)}
                  className="flex-1 border border-[#e5e5e5] text-[#8a7a6a] font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] py-3 rounded-full active:scale-95 transition-transform"
                >
                  取消
                </button>
                <button
                  onClick={handleGeneratePlan}
                  className="flex-1 bg-[#ecd1b4] text-black font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] py-3 rounded-full active:scale-95 transition-transform"
                >
                  生成
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
