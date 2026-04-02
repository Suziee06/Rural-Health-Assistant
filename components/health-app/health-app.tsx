'use client'; 
 
import { useState, useCallback } from 'react'; 
import { HomeScreen } from './home-screen'; 
import { SymptomScreen } from './symptom-screen'; 
import { ContextScreen } from './context-screen'; 
import { ProcessingScreen } from './processing-screen'; 
import { ResultsScreen } from './results-screen'; 
import { Language, Screen, ContextInfo, PredictionResult } from '@/lib/types'; 
import { symptoms, getPrediction } from '@/lib/health-data'; 
 
export function HealthApp() { 
  const [screen, setScreen] = useState<Screen>('home'); 
  const [language, setLanguage] = useState<Language>('en'); 
  const [voiceEnabled, setVoiceEnabled] = useState(false); 
  const [currentSymptomIndex, setCurrentSymptomIndex] = useState(0); 
  const [symptomAnswers, setSymptomAnswers] = useState<Record<string, boolean>>( 
    {} 
  ); 
  const [contextInfo, setContextInfo] = useState<ContextInfo>({ 
    location: '', 
    weather: '', 
    occupation: '', 
    outdoorExposure: false, 
  }); 
  const [result, setResult] = useState<PredictionResult | null>(null); 
 
  const handleStartCheck = useCallback(() => { 
    setScreen('symptoms'); 
    setCurrentSymptomIndex(0); 
    setSymptomAnswers({}); 
  }, []); 
 
  const handleSymptomAnswer = useCallback( 
    (symptomId: string, value: boolean) => { 
      setSymptomAnswers((prev) => ({ ...prev, [symptomId]: value })); 
    }, 
    [] 
  ); 
 
  const handleSymptomNext = useCallback(() => { 
    if (currentSymptomIndex < symptoms.length - 1) { 
      setCurrentSymptomIndex((prev) => prev + 1); 
    } else { 
      setScreen('context'); 
    } 
  }, [currentSymptomIndex]); 
 
  const handleSymptomBack = useCallback(() => { 
    if (currentSymptomIndex > 0) { 
      setCurrentSymptomIndex((prev) => prev - 1); 
    } else { 
      setScreen('home'); 
    } 
  }, [currentSymptomIndex]); 
 
  const handleContextUpdate = useCallback((updates: Partial<ContextInfo>) => { 
    setContextInfo((prev) => ({ ...prev, ...updates })); 
  }, []); 
 
  const handleContextNext = useCallback(() => { 
    setScreen('processing'); 
  }, []); 
 
  const handleContextBack = useCallback(() => { 
    setScreen('symptoms'); 
    setCurrentSymptomIndex(symptoms.length - 1); 
  }, []); 
 
  const handleProcessingComplete = useCallback(() => { 
    const prediction = getPrediction(symptomAnswers, contextInfo); 
    setResult(prediction); 
    setScreen('results'); 
  }, [symptomAnswers, contextInfo]); 
 
  const handleGoHome = useCallback(() => { 
    setScreen('home'); 
    setSymptomAnswers({}); 
    setContextInfo({ 
      location: '', 
      weather: '', 
      occupation: '', 
      outdoorExposure: false, 
    }); 
    setCurrentSymptomIndex(0); 
    setResult(null); 
  }, []); 
 
  const handleStartOver = useCallback(() => { 
    setSymptomAnswers({}); 
    setContextInfo({ 
      location: '', 
      weather: '', 
      occupation: '', 
      outdoorExposure: false, 
    }); 
    setCurrentSymptomIndex(0); 
    setResult(null); 
    setScreen('symptoms'); 
  }, []); 
 
  return ( 
    <div className="max-w-md mx-auto min-h-screen bg-background"> 
      {screen === 'home' && ( 
        <HomeScreen 
          language={language} 
          onLanguageChange={setLanguage} 
          onStartCheck={handleStartCheck} 
          onVoiceToggle={() => setVoiceEnabled((prev) => !prev)} 
          voiceEnabled={voiceEnabled} 
        /> 
      )} 
 
      {screen === 'symptoms' && ( 
        <SymptomScreen 
          language={language} 
          currentSymptomIndex={currentSymptomIndex} 
          answers={symptomAnswers} 
          onAnswer={handleSymptomAnswer} 
          onNext={handleSymptomNext} 
          onBack={handleSymptomBack} 
        /> 
      )} 
 
      {screen === 'context' && ( 
        <ContextScreen 
          language={language} 
          contextInfo={contextInfo} 
          onUpdateContext={handleContextUpdate} 
          onNext={handleContextNext} 
          onBack={handleContextBack} 
        /> 
      )} 
 
      {screen === 'processing' && ( 
        <ProcessingScreen 
          language={language} 
          onComplete={handleProcessingComplete} 
        /> 
      )} 
 
      {screen === 'results' && result && ( 
        <ResultsScreen 
          language={language} 
          result={result} 
          voiceEnabled={voiceEnabled} 
          onGoHome={handleGoHome} 
          onStartOver={handleStartOver} 
        /> 
      )} 
    </div> 
  ); 
} 