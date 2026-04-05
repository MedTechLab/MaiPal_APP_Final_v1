import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface HealthReport {
  date: string;
  faceAnalysis: string;
  voiceAnalysis: string;
  suggestions: string[];
}

interface AppContextType {
  // Permissions
  cameraPermission: boolean | null;
  micPermission: boolean | null;
  requestCameraPermission: () => void;
  requestMicPermission: () => void;
  denyCameraPermission: () => void;
  denyMicPermission: () => void;
  
  // Chat
  messages: Message[];
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  
  // Health Report
  healthReport: HealthReport | null;
  generateHealthReport: () => void;
  
  // Plan
  hasPlan: boolean;
  tasks: Array<{ id: string; text: string; completed: boolean }>;
  toggleTask: (id: string) => void;
  generatePlan: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好呀，今天需要脉医生帮你看一下身体状况吗？',
      timestamp: new Date(),
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null);
  const [hasPlan, setHasPlan] = useState(false);
  const [tasks, setTasks] = useState<Array<{ id: string; text: string; completed: boolean }>>([]);

  const requestCameraPermission = () => {
    setCameraPermission(true);
  };

  const requestMicPermission = () => {
    setMicPermission(true);
  };

  const denyCameraPermission = () => {
    setCameraPermission(false);
  };

  const denyMicPermission = () => {
    setMicPermission(false);
  };

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const generateHealthReport = () => {
    const report: HealthReport = {
      date: new Date().toLocaleDateString('zh-CN'),
      faceAnalysis: '气色略偏淡，面部气血运行稍显不足',
      voiceAnalysis: '声音略显疲惫，可能存在睡眠不足问题',
      suggestions: [
        '建议每晚11点前入睡，保证7-8小时睡眠',
        '可适当食用枸杞、红枣等补气血食材',
        '每天进行30分钟轻度运动，如散步、太极',
      ],
    };
    setHealthReport(report);
  };

  const generatePlan = () => {
    setHasPlan(true);
    setTasks([
      { id: '1', text: '早上8点：枸杞红枣茶', completed: false },
      { id: '2', text: '中午12点：午休30分钟', completed: false },
      { id: '3', text: '下午5点：散步30分钟', completed: false },
      { id: '4', text: '晚上9点：足浴泡脚20分钟', completed: false },
      { id: '5', text: '晚上10:30：准备睡眠', completed: false },
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        cameraPermission,
        micPermission,
        requestCameraPermission,
        requestMicPermission,
        denyCameraPermission,
        denyMicPermission,
        messages,
        addMessage,
        isRecording,
        setIsRecording,
        healthReport,
        generateHealthReport,
        hasPlan,
        tasks,
        toggleTask,
        generatePlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
