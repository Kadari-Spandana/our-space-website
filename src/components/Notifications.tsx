import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const messages = [
  "Take a deep breath",
  "You're doing okay",
  "Remember to stay hydrated",
  "Take a moment to stretch",
  "You are stronger than you think",
  "It's okay to take breaks",
  "Your feelings are valid",
  "One step at a time"
];

export function Notifications() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (notificationsEnabled) {
      // Check if browser supports notifications
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            startNotifications();
          }
        });
      }
    }
    return () => {
      // Cleanup interval on component unmount
      if (window.notificationInterval) {
        clearInterval(window.notificationInterval);
      }
    };
  }, [notificationsEnabled]);

  const startNotifications = () => {
    // Show a new message every 30 minutes
    window.notificationInterval = setInterval(() => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(message);
      
      if ('Notification' in window) {
        new Notification('OurSpace Reminder', {
          body: message,
          icon: '/path-to-your-icon.png' // You can add an icon URL here
        });
      }
    }, 1800000); // 30 minutes
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      setCurrentMessage("");
      if (window.notificationInterval) {
        clearInterval(window.notificationInterval);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <Bell className="w-12 h-12 text-purple-500 mx-auto mb-4" />
      <h2 className="text-3xl font-bold mb-4">Mindful Reminders</h2>
      <p className="text-gray-600 mb-8">
        Enable gentle reminders to help you stay mindful throughout your day
      </p>

      <div className="bg-white rounded-lg shadow-md p-8">
        <button
          onClick={toggleNotifications}
          className={`px-8 py-4 rounded-full font-semibold transition-colors duration-300
                    ${notificationsEnabled 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
        >
          {notificationsEnabled ? 'Disable Notifications' : 'Enable Notifications'}
        </button>

        {currentMessage && (
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <p className="text-lg text-purple-800">{currentMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}