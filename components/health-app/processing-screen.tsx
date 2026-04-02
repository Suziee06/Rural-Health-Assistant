'use client'; 
 
import { useEffect, useState } from 'react'; 
import { Heart, Loader2 } from 'lucide-react'; 
import { Language } from '@/lib/types'; 
 
interface ProcessingScreenProps { 
  language: Language; 
  onComplete: () => void; 
} 
 
export function ProcessingScreen({ language, onComplete }: ProcessingScreenProps) { 
  const [progress, setProgress] = useState(0); 
  const [messageIndex, setMessageIndex] = useState(0); 
 
  const messages = { 
    en: [ 
      'Analyzing your symptoms...', 
      'Checking health patterns...', 
      'Preparing personalized advice...', 
      'Finding natural remedies...', 
    ], 
    hi: [ 
      'आपके लक्षणोों का तवश्लेषण तकया जा िहा है...', 
      'स्वास्थ्य पैटनत की जाोंच हो िही है...', 
      'व्यस्क्तर्ि सलाह िैयाि की जा िही है...', 
      'प्राकृ तिक उपचाि खोजे जा िहे हैं...', 
    ], 
  }; 
 
  useEffect(() => { 
    const progressInterval = setInterval(() => { 
      setProgress((prev) => { 
        if (prev >= 100) { 
          clearInterval(progressInterval); 
          setTimeout(onComplete, 500); 
          return 100; 
        } 
        return prev + 2; 
      }); 
    }, 60); 
 
    const messageInterval = setInterval(() => { 
      setMessageIndex((prev) => (prev + 1) % messages.en.length); 
    }, 800); 
 
    return () => { 
      clearInterval(progressInterval); 
      clearInterval(messageInterval); 
    }; 
  }, [onComplete]); 
 
  return ( 
    <div className="min-h-screen bg-background flex flex-col items-center justify-center 
p-6"> 
      <div className="w-full max-w-md text-center space-y-8"> 
        {/* Animated Icon */} 
        <div className="relative mx-auto w-32 h-32"> 
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" /> 
          <div className="absolute inset-2 bg-primary/30 rounded-full animate-pulse" /> 
          <div className="absolute inset-0 flex items-center justify-center"> 
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify
center"> 
              <Heart className="w-10 h-10 text-primary-foreground animate-pulse" /> 
            </div> 
          </div> 
        </div> 
 
        {/* Title */} 
        <div> 
          <h2 className="text-xl font-bold text-foreground mb-2"> 
            {language === 'en' ? 'AI Analysis' : 'AI तवश्लेषण'} 
          </h2> 
          <p 
            className={`text-lg text-muted-foreground ${ 
              language === 'hi' ? 'font-[family-name:var(--font-devanagari)]' : '' 
            }`} 
          > 
            {messages[language][messageIndex]} 
          </p> 
        </div> 
 
        {/* Progress Bar */} 
        <div className="space-y-2"> 
          <div className="h-3 bg-muted rounded-full overflow-hidden"> 
            <div 
              className="h-full bg-primary rounded-full transition-all duration-100" 
              style={{ width: `${progress}%` }} 
            /> 
          </div> 
          <p className="text-sm text-muted-foreground">{progress}%</p> 
        </div> 
 
        {/* Loading indicator */} 
        <div className="flex items-center justify-center gap-2 text-muted-foreground"> 
          <Loader2 className="w-5 h-5 animate-spin" /> 
          <span className="text-sm"> 
            {language === 'en' ? 'Please wait...' : 'कृ पया प्रिीक्षा किें...'} 
          </span> 
        </div> 
      </div> 
    </div> 
  ); 
} 
