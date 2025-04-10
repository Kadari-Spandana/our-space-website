import React, { useState, useEffect } from 'react';
import { Calendar, Smile, Meh, Frown } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: string;
}

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "😴", label: "Tired" },
  { emoji: "🤗", label: "Grateful" }
];

export function MoodTracker() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState("");

  useEffect(() => {
    const savedMoods = localStorage.getItem('moodHistory');
    if (savedMoods) {
      setMoodHistory(JSON.parse(savedMoods));
    }
  }, []);

  const saveMood = () => {
    if (selectedMood) {
      const newEntry = {
        date: new Date().toISOString().split('T')[0],
        mood: selectedMood
      };
      
      const updatedHistory = [...moodHistory, newEntry];
      setMoodHistory(updatedHistory);
      localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
      setSelectedMood("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Mood Tracker</h2>
        <p className="text-gray-600">Track your daily emotional journey</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">How are you feeling today?</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              className={`p-4 rounded-lg text-center transition-all duration-300 
                ${selectedMood === mood.label 
                  ? 'bg-purple-100 border-2 border-purple-500' 
                  : 'bg-gray-50 hover:bg-purple-50'}`}
            >
              <div className="text-2xl mb-2">{mood.emoji}</div>
              <div className="text-sm">{mood.label}</div>
            </button>
          ))}
        </div>
        <button
          onClick={saveMood}
          disabled={!selectedMood}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold
                   hover:bg-purple-700 transition-colors duration-300 
                   disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Log Mood
        </button>
      </div>

      {moodHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Your Mood History</h3>
          <div className="space-y-4">
            {moodHistory.slice().reverse().map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">{entry.date}</span>
                <span className="font-medium">{entry.mood}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}