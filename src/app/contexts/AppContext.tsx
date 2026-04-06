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

interface UserInfo {
  name: string;
  gender: 'male' | 'female';
  age: number;
  height?: number;
  weight?: number;
  concerns: string[];
  phone?: string;
  email?: string;
}

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface TaskCheckIn {
  taskId: string;
  date: string;
  photoUrl?: string;
}

interface DayRecord {
  date: string; // YYYY-MM-DD
  hasReport: boolean;
  tasksCompleted: number;
  totalTasks: number;
}

interface AppContextType {
  // User Info
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  updateUserInfo: (updates: Partial<UserInfo>) => void;
  
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
  healthReports: Record<string, HealthReport>; // date -> report
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  
  // Plan & Tasks
  hasPlan: boolean;
  tasks: Array<{ id: string; text: string; completed: boolean; checkIn?: TaskCheckIn }>;
  toggleTask: (id: string) => void;
  generatePlan: () => void;
  addTaskCheckIn: (taskId: string, photoUrl?: string) => void;
  
  // Points System
  points: number;
  addPoints: (amount: number, reason: string) => void;
  usePoints: (amount: number) => boolean;
  pointsHistory: Array<{ id: string; amount: number; reason: string; date: Date; type: 'earn' | 'spend' }>;
  
  // Cart
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateCartItemQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  
  // Calendar
  dayRecords: Record<string, DayRecord>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);
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
  const [healthReports, setHealthReports] = useState<Record<string, HealthReport>>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [hasPlan, setHasPlan] = useState(false);
  const [tasks, setTasks] = useState<Array<{ id: string; text: string; completed: boolean; checkIn?: TaskCheckIn }>>([]);
  const [points, setPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState<Array<{ id: string; amount: number; reason: string; date: Date; type: 'earn' | 'spend' }>>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [dayRecords, setDayRecords] = useState<Record<string, DayRecord>>({});

  const setUserInfo = (info: UserInfo) => {
    setUserInfoState(info);
  };

  const updateUserInfo = (updates: Partial<UserInfo>) => {
    setUserInfoState((prev) => (prev ? { ...prev, ...updates } : null));
  };

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
    setHealthReports((prev) => ({ ...prev, [report.date]: report }));
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

  const addTaskCheckIn = (taskId: string, photoUrl?: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, checkIn: { taskId, date: new Date().toISOString().split('T')[0], photoUrl } } : task
      )
    );
  };

  const addPoints = (amount: number, reason: string) => {
    setPoints((prev) => prev + amount);
    setPointsHistory((prev) => [...prev, { id: Date.now().toString(), amount, reason, date: new Date(), type: 'earn' }]);
  };

  const usePoints = (amount: number) => {
    if (points >= amount) {
      setPoints((prev) => prev - amount);
      setPointsHistory((prev) => [...prev, { id: Date.now().toString(), amount, reason: '使用积分', date: new Date(), type: 'spend' }]);
      return true;
    }
    return false;
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCartItemQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        updateUserInfo,
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
        healthReports,
        selectedDate,
        setSelectedDate,
        hasPlan,
        tasks,
        toggleTask,
        generatePlan,
        addTaskCheckIn,
        points,
        addPoints,
        usePoints,
        pointsHistory,
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        dayRecords,
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