import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Flame, 
  ChevronRight, 
  ChevronLeft,
  Gamepad2,
  Heart,
  Home,
  User,
  Star,
  Mic,
  MicOff,
  Lock
} from 'lucide-react';
import { COURSE_DATA, JapaneseWord } from './constants';

const SPEECH_RATE = 0.8;

// Speech Recognition Setup
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.lang = 'ja-JP';
  recognition.continuous = false;
  recognition.interimResults = false;
}

export default function App() {
  // Persistence
  const [currentDay, setCurrentDay] = useState(() => {
    const saved = localStorage.getItem('anime_day');
    return saved ? parseInt(saved) : 1;
  });
  const [unlockedDays, setUnlockedDays] = useState<number[]>(() => {
    const saved = localStorage.getItem('unlocked_days');
    return saved ? JSON.parse(saved) : [1];
  });
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('anime_streak');
    return saved ? parseInt(saved) : 0;
  });
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('anime_score');
    return saved ? parseInt(saved) : 0;
  });

  const [view, setView] = useState<'lessons' | 'practice' | 'home'>('home');
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  
  // Practice State
  const [challengeWord, setChallengeWord] = useState<JapaneseWord | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);

  // Save progress
  useEffect(() => {
    localStorage.setItem('anime_day', currentDay.toString());
    localStorage.setItem('unlocked_days', JSON.stringify(unlockedDays));
    localStorage.setItem('anime_streak', streak.toString());
    localStorage.setItem('anime_score', score.toString());
  }, [currentDay, unlockedDays, streak, score]);

  // TTS Function
  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = SPEECH_RATE;
    window.speechSynthesis.speak(utterance);
  }, []);

  const [micStatus, setMicStatus] = useState<'unknown' | 'granted' | 'denied'>('unknown');

  // Check microphone permission on mount
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'microphone' as PermissionName }).then((result) => {
        setMicStatus(result.state as any);
        result.onchange = () => setMicStatus(result.state as any);
      });
    }
  }, []);

  // Speech Recognition Logic
  const startListening = async () => {
    if (!recognition) {
      alert("আপনার ব্রাউজার স্পিচ রিকগনিশন সাপোর্ট করে না। অনুগ্রহ করে Google Chrome ব্যবহার করুন।");
      return;
    }
    
    // Request permission explicitly if unknown
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately, just checking
      setMicStatus('granted');
    } catch (err) {
      setMicStatus('denied');
      alert("মাইক্রোফোন পারমিশন দেওয়া হয়নি। ব্রাউজার সেটিং থেকে পারমিশন অ্যালাউ করুন।");
      return;
    }

    try {
      setRecognizedText('');
      setFeedback(null);
      setIsListening(true);
      recognition.start();
    } catch (err) {
      console.error("Recognition start error", err);
      setIsListening(false);
    }
  };

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
      setIsListening(false);
      checkSpeechAnswer(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [challengeWord]);

  const checkSpeechAnswer = (transcript: string) => {
    if (!challengeWord) return;

    // Check if transcript matches kana or kanji
    const isCorrect = 
      transcript.includes(challengeWord.kana) || 
      (challengeWord.kanji && transcript.includes(challengeWord.kanji));

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 20);
      setConsecutiveCorrect(c => c + 1);
      
      // If 5 correct in a row, unlock next day
      if (consecutiveCorrect + 1 >= 5) {
        if (!unlockedDays.includes(currentDay + 1) && currentDay < 10) {
          setUnlockedDays(prev => [...prev, currentDay + 1]);
        }
      }
    } else {
      setFeedback('wrong');
      setConsecutiveCorrect(0);
    }

    setTimeout(() => {
      startNewChallenge();
    }, 2000);
  };

  // Practice Logic
  const startNewChallenge = useCallback(() => {
    const dayData = COURSE_DATA.find(d => d.day === currentDay);
    if (!dayData) return;
    
    const words = dayData.vocabulary;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setChallengeWord(randomWord);
    setFeedback(null);
    setRecognizedText('');
  }, [currentDay]);

  useEffect(() => {
    if (view === 'practice' && !challengeWord) {
      startNewChallenge();
    }
  }, [view, challengeWord, startNewChallenge]);

  const currentModule = COURSE_DATA.find(m => m.day === currentDay)!;

  return (
    <div className="min-h-screen bg-white text-[#4B4B4B] font-sans selection:bg-emerald-100 pb-24 md:pb-0 md:pl-64">
      
      {/* Sidebar Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 py-2 flex justify-around items-center z-50 md:top-0 md:bottom-0 md:right-auto md:w-64 md:flex-col md:justify-start md:gap-4 md:pt-8 md:border-t-0 md:border-r-2">
        <div className="hidden md:flex items-center gap-2 px-4 mb-8">
          <div className="w-10 h-10 bg-[#58CC02] rounded-xl flex items-center justify-center text-white shadow-[0_4px_0_0_#46A302]">
            <BookOpen size={24} />
          </div>
          <h1 className="text-2xl font-black text-[#58CC02] tracking-tight">Nihongo</h1>
        </div>

        <NavButton active={view === 'home'} onClick={() => setView('home')} icon={<Home size={28} />} label="হোম" color="text-[#1CB0F6]" />
        <NavButton active={view === 'lessons'} onClick={() => setView('lessons')} icon={<BookOpen size={28} />} label="পাঠ" color="text-[#FFC800]" />
        <NavButton active={view === 'practice'} onClick={() => setView('practice')} icon={<Gamepad2 size={28} />} label="প্র্যাকটিস" color="text-[#FF4B4B]" />
        <NavButton active={false} onClick={() => {}} icon={<User size={28} />} label="প্রোফাইল" color="text-[#58CC02]" />
      </nav>

      {/* Top Stats Bar */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b-2 border-gray-100">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#FF9600] font-black text-lg">
              <Flame size={24} fill="currentColor" />
              <span>{streak}</span>
            </div>
            <div className="flex items-center gap-4 text-[#58CC02] font-black">
              <div className="flex items-center gap-1">
                <Star size={20} fill="currentColor" />
                <span>{consecutiveCorrect}/5</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#1CB0F6] font-black text-lg">
            <Trophy size={24} />
            <span>{score}</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-[#3C3C3C]">জাপানি ভাষা শিক্ষা</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">ইউনিট ১: অ্যানিমে এবং মুভি</p>
              </div>

              <div className="flex flex-col items-center gap-8 py-8">
                {COURSE_DATA.map((day) => {
                  const isUnlocked = unlockedDays.includes(day.day);
                  return (
                    <div key={day.day} className="relative flex flex-col items-center group">
                      <button
                        disabled={!isUnlocked}
                        onClick={() => {
                          setCurrentDay(day.day);
                          setView('lessons');
                        }}
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all relative z-10 ${
                          isUnlocked 
                          ? 'bg-[#58CC02] text-white shadow-[0_6px_0_0_#46A302] active:shadow-none active:translate-y-1' 
                          : 'bg-[#E5E5E5] text-[#AFAFAF] shadow-[0_6px_0_0_#CFCFCF] cursor-not-allowed'
                        }`}
                      >
                        {isUnlocked ? <Star size={32} fill="currentColor" /> : <Lock size={32} />}
                      </button>
                      <div className="mt-3 bg-white border-2 border-gray-200 px-4 py-1 rounded-xl font-black text-sm shadow-sm">
                        দিন {day.day}: {day.banglaTitle}
                      </div>
                      {day.day < 10 && (
                        <div className="absolute top-24 w-1 h-12 bg-gray-200 -z-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {view === 'lessons' && (
            <motion.div
              key="lessons"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setView('home')} className="p-2 text-gray-400 hover:text-gray-600">
                  <ChevronLeft size={32} />
                </button>
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-[#3C3C3C]">{currentModule.banglaTitle}</h2>
                  <p className="text-gray-500 font-bold">{currentModule.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentModule.vocabulary.map((word, idx) => (
                  <button
                    key={word.romaji + idx}
                    onClick={() => speak(word.kana)}
                    className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-gray-200 border-b-4 hover:bg-gray-50 active:border-b-2 active:translate-y-0.5 transition-all text-left group"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[#1CB0F6] group-hover:bg-[#1CB0F6] group-hover:text-white transition-colors">
                      <Volume2 size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xl font-black text-[#3C3C3C]">{word.kana}</div>
                      <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">{word.romaji}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#4B4B4B]">{word.bangla}</div>
                      <div className="text-xs text-gray-400">{word.english}</div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setConsecutiveCorrect(0);
                  setView('practice');
                }}
                className="w-full mt-8 py-4 bg-[#58CC02] text-white rounded-2xl font-black text-xl shadow-[0_6px_0_0_#46A302] hover:bg-[#46A302] active:shadow-none active:translate-y-1 transition-all"
              >
                প্র্যাকটিস শুরু করুন
              </button>
            </motion.div>
          )}

          {view === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <button onClick={() => setView('lessons')} className="p-2 text-gray-400">
                  <XCircle size={32} />
                </button>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#58CC02]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(consecutiveCorrect / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 text-center space-y-6 shadow-xl">
                <h3 className="text-xl font-black text-[#3C3C3C]">উচ্চারণ করুন:</h3>
                
                {challengeWord && (
                  <div className="space-y-4">
                    <div className="text-6xl font-black text-[#58CC02]">{challengeWord.kana}</div>
                    <div className="text-2xl font-bold text-gray-400">{challengeWord.romaji}</div>
                    <div className="text-xl font-bold text-[#1CB0F6]">{challengeWord.bangla}</div>
                  </div>
                )}

                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={startListening}
                    disabled={isListening || !!feedback}
                    className={`w-32 h-32 rounded-full flex items-center justify-center text-white transition-all shadow-xl ${
                      isListening ? 'bg-red-500 animate-pulse' : 'bg-[#1CB0F6] hover:bg-[#1899D6]'
                    } disabled:opacity-50`}
                  >
                    {isListening ? <MicOff size={64} /> : <Mic size={64} />}
                  </button>
                  <p className="font-bold text-gray-400">
                    {isListening ? "বলুন..." : "মাইক্রোফোন চেপে উচ্চারণ করুন"}
                  </p>
                  {micStatus === 'denied' && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm font-bold border border-red-100">
                      মাইক্রোফোন পারমিশন ব্লক করা আছে। ব্রাউজার সেটিং থেকে এটি অ্যালাউ করুন।
                    </div>
                  )}
                </div>

                {recognizedText && (
                  <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase">আপনি বলেছেন:</span>
                    <p className="text-2xl font-black text-[#3C3C3C]">{recognizedText}</p>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className={`fixed bottom-0 left-0 right-0 p-8 z-50 flex items-center justify-between shadow-2xl ${
                      feedback === 'correct' ? 'bg-[#D7FFB8]' : 'bg-[#FFDADC]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${feedback === 'correct' ? 'text-[#58CC02]' : 'text-[#FF4B4B]'}`}>
                        {feedback === 'correct' ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                      </div>
                      <div>
                        <h4 className={`text-2xl font-black ${feedback === 'correct' ? 'text-[#58CC02]' : 'text-[#FF4B4B]'}`}>
                          {feedback === 'correct' ? 'চমৎকার! সঠিক হয়েছে!' : 'ভুল হয়েছে, আবার চেষ্টা করুন!'}
                        </h4>
                        <p className={`font-bold ${feedback === 'correct' ? 'text-[#58CC02]' : 'text-[#FF4B4B]'}`}>
                          {feedback === 'correct' ? 'পরের ধাপে যাওয়ার জন্য প্রস্তুত হন।' : 'সঠিক উচ্চারণটি শুনুন এবং আবার বলুন।'}
                        </p>
                      </div>
                    </div>
                    {feedback === 'wrong' && (
                      <button onClick={() => challengeWord && speak(challengeWord.kana)} className="p-4 bg-white rounded-xl shadow-md text-[#FF4B4B]">
                        <Volume2 size={32} />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label, color }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, color: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 px-4 py-2 rounded-2xl transition-all w-full md:hover:bg-gray-100 ${
        active ? `bg-gray-100 border-2 border-gray-200 ${color}` : 'text-gray-400'
      }`}
    >
      <div className={active ? color : ''}>{icon}</div>
      <span className="text-[10px] md:text-lg font-black tracking-wider">{label}</span>
    </button>
  );
}
