import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddTaskScreen from '../screens/AddTaskScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TaskListScreen from '../screens/TaskListScreen';
import { colors } from '../styles/globalStyles';

const Tab = createBottomTabNavigator();


const TAB_ICONS = {
  Dashboard: { active: 'home', inactive: 'home-outline' },
  Tugas: { active: 'list', inactive: 'list-outline' },
  Tambah: { active: 'add-circle', inactive: 'add-circle-outline' },
};


export default function AppNavigator({
  tasks,
  stats,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Every screen renders its own <Header /> on top.
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarHideOnKeyboard: true,
        // Keep the compact label size, but stop the flex container from
        // shrinking the label height so the text is not clipped.
        tabBarLabelStyle: {
          fontSize: 10,
          lineHeight: 12,
          fontWeight: '600',
          flexShrink: 0,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];

          return (
            <Ionicons
              name={focused ? icons.active : icons.inactive}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      {/* The screen name is also used as the tab label. */}
      <Tab.Screen name="Dashboard">
        {() => (
          <DashboardScreen
            tasks={tasks}
            stats={stats}
            onToggleTask={onToggleTask}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Tugas">
        {() => (
          <TaskListScreen
            tasks={tasks}
            stats={stats}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Tambah">
        {({ navigation }) => (
          <AddTaskScreen onAddTask={onAddTask} navigation={navigation} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
