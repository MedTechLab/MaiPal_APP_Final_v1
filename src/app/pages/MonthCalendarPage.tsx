import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../contexts/AppContext';

export function MonthCalendarPage() {
  const navigate = useNavigate();
  const { hasPlan, tasks } = useAppContext();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1)); // April 2026

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Mock data for demonstration
  const hasDetectionOnDate = (date: Date) => {
    const dayOfMonth = date.getDate();
    // Mark 6th and 5th as having detection
    return dayOfMonth === 6 || dayOfMonth === 5;
  };

  const hasCompletedTasksOnDate = (date: Date) => {
    const dayOfMonth = date.getDate();
    // Mark 6th as having completed tasks
    return dayOfMonth === 6 && hasPlan;
  };

  const getDiaryEntry = (date: Date) => {
    const dayOfMonth = date.getDate();
    if (dayOfMonth === 6) {
      return {
        mood: '😊',
        note: '今天感觉不错，完成了大部分调理任务。',
        hasDetection: true,
        tasksCompleted: tasks.filter(t => t.completed).length,
        totalTasks: tasks.length,
      };
    } else if (dayOfMonth === 5) {
      return {
        mood: '😌',
        note: '进行了健康检测，开始了新的调理计划。',
        hasDetection: true,
        tasksCompleted: 0,
        totalTasks: 0,
      };
    }
    return null;
  };

  const days = getDaysInMonth(currentMonth);
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
  const today = new Date();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="bg-gradient-to-b from-[rgba(236,209,180,0.2)] to-white h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 sticky top-0 bg-gradient-to-b from-[rgba(236,209,180,0.3)] to-transparent z-10">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 active:scale-95 transition-transform"
          >
            <ArrowLeft className="size-6 text-black" />
          </button>
          <h1 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[28px] text-black">
            健康日历
          </h1>
        </div>

        {/* Month Selector */}
        <div className="flex items-center justify-between bg-white rounded-[16px] p-3 shadow-sm">
          <button onClick={handlePrevMonth} className="p-2 active:scale-95 transition-transform">
            <ChevronLeft className="size-5 text-[#8a7a6a]" />
          </button>
          <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[18px] text-black">
            {currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月
          </span>
          <button onClick={handleNextMonth} className="p-2 active:scale-95 transition-transform">
            <ChevronRight className="size-5 text-[#8a7a6a]" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-[20px] shadow-md p-4">
          {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day, index) => (
              <div
                key={index}
                className="text-center font-['Noto_Sans_SC:Medium',sans-serif] text-[13px] text-[#8a7a6a] py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const isToday = date.toDateString() === today.toDateString();
              const hasDetection = hasDetectionOnDate(date);
              const hasCompletedTasks = hasCompletedTasksOnDate(date);

              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square rounded-[12px] flex flex-col items-center justify-center relative transition-colors ${
                    isToday
                      ? 'bg-[#ecd1b4] text-black'
                      : hasDetection || hasCompletedTasks
                      ? 'bg-[#ecd1b4]/20 text-black'
                      : 'hover:bg-gray-50 text-[#5a4a3a]'
                  }`}
                >
                  <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[15px]">
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
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 px-2">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-green-500" />
            <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a]">
              有检测
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-blue-500" />
            <span className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] text-[#8a7a6a]">
              完成任务
            </span>
          </div>
        </div>
      </div>

      {/* Diary Entries */}
      <div className="px-6 pb-24">
        <h2 className="font-['Noto_Sans_SC:Bold',sans-serif] text-[20px] text-black mb-4">
          本月记录
        </h2>
        <div className="space-y-4">
          {days
            .filter((date) => date && getDiaryEntry(date))
            .reverse()
            .map((date) => {
              if (!date) return null;
              const entry = getDiaryEntry(date);
              if (!entry) return null;

              return (
                <motion.div
                  key={date.toISOString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[20px] shadow-md p-5"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="bg-[#ecd1b4]/20 rounded-[12px] p-3 flex-shrink-0">
                      <div className="text-center">
                        <div className="font-['Noto_Sans_SC:Bold',sans-serif] text-[20px] text-black">
                          {date.getDate()}
                        </div>
                        <div className="font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#8a7a6a]">
                          {currentMonth.getMonth() + 1}月
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[24px]">{entry.mood}</span>
                        <div className="flex gap-1">
                          {entry.hasDetection && (
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[11px] font-['Noto_Sans_SC:Medium',sans-serif]">
                              已检测
                            </span>
                          )}
                          {entry.totalTasks > 0 && (
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[11px] font-['Noto_Sans_SC:Medium',sans-serif]">
                              {entry.tasksCompleted}/{entry.totalTasks}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] text-[#8a7a6a]">
                        {entry.note}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {days.filter((date) => date && getDiaryEntry(date)).length === 0 && (
          <div className="bg-white rounded-[20px] shadow-md p-6 text-center">
            <div className="text-[48px] mb-3">📔</div>
            <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[16px] text-[#8a7a6a]">
              本月暂无记录
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
