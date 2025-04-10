import React, { useState, useEffect } from 'react';
import { Heart, Bell, Calendar, ChevronDown, Send } from 'lucide-react';
import { Quiz } from './components/Quiz';
import { MoodTracker } from './components/MoodTracker';
import { Notifications } from './components/Notifications';

function App() {
  const [showNotification, setShowNotification] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Heart className="w-16 h-16 text-purple-500 mx-auto" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Welcome to OurSpace
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Your safe space for mental health & inner peace
          </p>
          <button
            onClick={() => scrollToSection('quiz')}
            className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold 
                     hover:bg-purple-700 transition-colors duration-300 shadow-lg"
          >
            Take the Quiz
          </button>
        </div>
      </header>

      {/* Quiz Section */}
      <section id="quiz" className="min-h-screen py-20 px-4">
        <Quiz />
      </section>

      {/* Mood Tracker Section */}
      <section id="mood-tracker" className="min-h-screen bg-white py-20 px-4">
        <MoodTracker />
      </section>

      {/* Notifications Section */}
      <section id="notifications" className="py-20 px-4">
        <Notifications />
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">OurSpace</h3>
              <p className="text-gray-400">
                Your journey to mental wellness starts here.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <p className="text-gray-400">
                Follow us on social media for daily wellness tips and updates.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            © 2025 OurSpace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;