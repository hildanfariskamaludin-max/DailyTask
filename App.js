import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';


const createTaskId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;


export default function App() {
  const [tasks, setTasks] = useState([]);


  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;

    return { total, completed, pending: total - completed };
  }, [tasks]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }

    document.title = `DailyTask — ${stats.total} tugas, ${stats.completed} selesai`;
  }, [stats]);

  const addTask = ({ title, description, priority }) => {
    const newTask = {
      id: createTaskId(),
      title,
      description,
      priority,
      completed: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
  
        documentTitle={{ enabled: false }}
      >
        <AppNavigator
          tasks={tasks}
          stats={stats}
          onAddTask={addTask}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
