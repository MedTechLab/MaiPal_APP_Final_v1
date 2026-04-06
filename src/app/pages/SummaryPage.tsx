import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../contexts/AppContext';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Plus, Camera, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function SummaryPage() {
  const navigate = useNavigate();
  const { healthReport, hasPlan, tasks, toggleTask, generatePlan, addTaskCheckIn, selectedDate: contextSelectedDate, setSelectedDate: setContextSelectedDate, healthReports, points, addPoints } = useAppContext();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPointsToast, setShowPointsToast] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

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

  // Mock detection data for demonstration
  const hasDetectionOnDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    // Mark today and yesterday as having detection
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    return dateStr === today || dateStr === yesterdayStr;
  };

  const hasCompletedTasksOnDate = (date: Date) => {
    // Mock: show some dates have completed tasks
    const dateStr = date.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today && hasPlan && tasks.some(t => t.completed);
  };

  const handleGeneratePlan = () => {
    generatePlan();
    setShowPlanModal(false);
  };

  const handleCheckInClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setShowCheckInModal(true);
  };

  const handleUploadPhoto = async () => {
    // In real app, this would open camera/photo picker
    // For demo, we'll use a placeholder
    const photoUrl = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400';
    if (selectedTaskId) {
      addTaskCheckIn(selectedTaskId, photoUrl);
      toggleTask(selectedTaskId); // Auto-mark as completed
      setEarnedPoints(10); // Add 10 points for uploading a photo
      addPoints(10, '完成任务打卡');
      setShowPointsToast(true);
      setTimeout(() => setShowPointsToast(false), 3000);
    }
    setShowCheckInModal(false);
    setSelectedTaskId(null);
  };

  const handleSkipPhoto = () => {
    if (selectedTaskId) {
      addTaskCheckIn(selectedTaskId);
      toggleTask(selectedTaskId); // Auto-mark as completed
    }
    setShowCheckInModal(false);
    setSelectedTaskId(null);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setContextSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleMonthClick = () => {
    navigate('/month-calendar');
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  // Get report for selected date
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const hasReport = hasDetectionOnDate(selectedDate);
  const currentReport = isToday ? healthReport : null;

  return (
    <div className="bg-gradient-to-b from-[rgba(236,209,180,0.3)] to-white h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[28px] text-black">
            调理计划
          </h1>
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#ecd1b4] to-[#d4b89e] px-4 py-2 rounded-full shadow-sm">
            <Gift className="size-5 text-white" />
            <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-white">
              {points} 积分
            </span>
          </div>
        </div>
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
            <button 
              onClick={handleMonthClick}
              className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black active:scale-95 transition-transform"
            >
              {selectedDate.getFullYear()}年 {selectedDate.getMonth() + 1}月
            </button>
            <button className="p-2">
              <ChevronRight className="size-5 text-[#8a7a6a]" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((date, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const hasDetection = hasDetectionOnDate(date);
              const hasCompletedTasks = hasCompletedTasksOnDate(date);

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`flex flex-col items-center py-2 rounded-[12px] transition-colors relative ${
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
                  {/* Indicators */}
                  <div className="flex gap-0.5 mt-1">
                    {hasDetection && (
                      <div className="size-1.5 rounded-full bg-green-500" />
                    )}
                    {hasCompletedTasks && (
                      <div className="size-1.5 rounded-full bg-blue-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Health Report - Only show for selected date */}
      {isToday && currentReport && (
        <div className="px-6 mb-6">
          <div className="bg-white rounded-[20px] shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[20px] text-black">
                今日健康检测
              </h2>
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a]">
                {currentReport.date}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-2">
                  面部分析
                </h3>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a]">
                  {currentReport.faceAnalysis}
                </p>
              </div>

              <div>
                <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-2">
                  声音分析
                </h3>
                <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a]">
                  {currentReport.voiceAnalysis}
                </p>
              </div>

              <div>
                <h3 className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black mb-2">
                  调理建议
                </h3>
                <ul className="space-y-2">
                  {currentReport.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a]"
                    >
                      <span className="text-[#ecd1b4] mt-1">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isToday && !hasReport && (
        <div className="px-6 mb-6">
          <div className="bg-white rounded-[20px] shadow-md p-6 text-center">
            <div className="text-[48px] mb-3">📅</div>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#8a7a6a]">
              {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日暂无检测记录
            </p>
          </div>
        </div>
      )}

      {/* Tasks */}
      {isToday && hasPlan && (
        <div className="px-6 pb-24">
          <div className="bg-white rounded-[20px] shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[20px] text-black">
                今日任务
              </h2>
              <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a]">
                {completedTasks}/{totalTasks}
              </span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[#ecd1b4]/5 rounded-[12px]">
                    <button onClick={() => toggleTask(task.id)}>
                      {task.completed ? (
                        <CheckCircle2 className="size-5 text-[#ecd1b4]" />
                      ) : (
                        <Circle className="size-5 text-[#8a7a6a]" />
                      )}
                    </button>
                    <span
                      className={`flex-1 font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] ${
                        task.completed ? 'text-[#8a7a6a] line-through' : 'text-black'
                      }`}
                    >
                      {task.text}
                    </span>
                    <button
                      onClick={() => handleCheckInClick(task.id)}
                      className={`p-2 rounded-full transition-colors ${
                        task.checkIn
                          ? 'bg-green-100 text-green-600'
                          : 'bg-[#ecd1b4]/20 text-[#8a7a6a]'
                      }`}
                    >
                      <Camera className="size-4" />
                    </button>
                  </div>
                  
                  {/* Display photo if checked in with photo */}
                  {task.checkIn?.photoUrl && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="ml-8 overflow-hidden rounded-[12px]"
                    >
                      <img
                        src={task.checkIn.photoUrl}
                        alt="打卡照片"
                        className="w-full h-[200px] object-cover rounded-[12px] shadow-sm"
                      />
                      <p className="text-[12px] text-[#8a7a6a] mt-2 font-['Noto_Sans_SC:Regular',sans-serif]">
                        打卡时间: {new Date(task.checkIn.date).toLocaleString('zh-CN', {
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Plan State */}
      {!hasPlan && (
        <div className="px-6 pb-24">
          <div className="bg-white rounded-[20px] shadow-md p-6 text-center">
            <div className="text-[48px] mb-3">📋</div>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#8a7a6a] mb-4">
              还没有调理计划哦
            </p>
            <button
              onClick={() => setShowPlanModal(true)}
              className="bg-[#ecd1b4] text-black px-6 py-3 rounded-full font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] active:scale-95 transition-transform"
            >
              生成计划
            </button>
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
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setShowPlanModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[20px] p-6 max-w-sm w-full"
            >
              <h3 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[20px] text-black mb-3">
                生成调理计划
              </h3>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-[#8a7a6a] mb-6">
                根据您的健康检测结果，为您生成个性化的调理计划吗？
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPlanModal(false)}
                  className="flex-1 py-3 rounded-full border border-[#ecd1b4] font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-[#8a7a6a] active:scale-95 transition-transform"
                >
                  取消
                </button>
                <button
                  onClick={handleGeneratePlan}
                  className="flex-1 py-3 rounded-full bg-[#ecd1b4] font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black active:scale-95 transition-transform"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Check-in Modal */}
      <AnimatePresence>
        {showCheckInModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setShowCheckInModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[20px] p-6 max-w-sm w-full"
            >
              <h3 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[20px] text-black mb-3">
                打卡照片
              </h3>
              <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[15px] text-[#8a7a6a] mb-6">
                是否要上传打卡照片？
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleSkipPhoto}
                  className="flex-1 py-3 rounded-full border border-[#ecd1b4] font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-[#8a7a6a] active:scale-95 transition-transform"
                >
                  不用了
                </button>
                <button
                  onClick={handleUploadPhoto}
                  className="flex-1 py-3 rounded-full bg-[#ecd1b4] font-['Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black active:scale-95 transition-transform"
                >
                  上传照片
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Points Toast */}
      {showPointsToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ecd1b4] to-[#d4b89e] text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
        >
          <Gift className="size-5" />
          <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[16px]">
            获得 {earnedPoints} 积分！
          </span>
        </motion.div>
      )}
    </div>
  );
}