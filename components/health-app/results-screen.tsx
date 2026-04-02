'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Home,
  Volume2,
  VolumeX,
  AlertTriangle,
  Leaf,
  Stethoscope,
  Lightbulb,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Language, PredictionResult } from '@/lib/types';

interface ResultsScreenProps {
  language: Language;
  result: PredictionResult;
  voiceEnabled: boolean;
  onGoHome: () => void;
  onStartOver: () => void;
}

export function ResultsScreen({
  language,
  result,
  voiceEnabled,
  onGoHome,
  onStartOver,
}: ResultsScreenProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const content = {
    en: {
      title: 'Health Assessment',
      diagnosis: 'Possible Condition',
      causes: 'Possible Causes',
      advice: 'Health Advice',
      remedies: 'Natural & Ayurvedic Remedies',
      disclaimer:
        'This is not a medical diagnosis. Please consult a healthcare professional for serious 
conditions.', 
      listenResults: 'Listen to Results',
      stopListening: 'Stop',
      startOver: 'Check Again',
      home: 'Home',
    },
    hi: {
      title: 'स्वास्थ्य मूल्ाोंकन',
      diagnosis: 'सोंभातवि स्थिति',
      causes: 'सोंभातवि कािण',
      advice: 'स्वास्थ्य सलाह',
      remedies: 'प्राकृ तिक औि आयुवेतदक उपचाि',
      disclaimer:
        'यह तचतकत्सा तनदान नहीों है। र्ोंभीि स्थितियोों के तलए कृ पया स्वास्थ्य तवशेषज्ञ से पिामशत लें।',
      listenResults: 'परिणाम सुनें',
      stopListening: 'िोकें ',
      startOver: 'तफि से जाोंचें',
      home: 'होम',
    },
  };

  const t = content[language];

  useEffect(() => {
    setSpeechSupported('speechSynthesis' in window);
  }, []);

  const speakResults = useCallback(() => {
    if (!speechSupported) return;

    window.speechSynthesis.cancel();

    const langCode = language === 'hi' ? 'hi-IN' : 'en-US';
    const diseaseText =
      language === 'en' ? result.disease.en : result.disease.hi;
    const adviceText =
      language === 'en'
        ? result.advice.en.join('. ')
        : result.advice.hi.join('. ');
    const remediesText =
      language === 'en'
        ? result.remedies.en.join('. ')
        : result.remedies.hi.join('. ');

    const fullText = `${language === 'en' ? 'Possible condition:' : 'सोंभातवि स्थिति:'
      } ${diseaseText}. ${language === 'en' ? 'Health advice:' : 'स्वास्थ्य सलाह:'
      } ${adviceText}. ${language === 'en' ? 'Natural remedies:' : 'प्राकृ तिक उपचाि:'
      } ${remediesText}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = langCode;
    utterance.rate = 0.9;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [language, result, speechSupported]);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (voiceEnabled && speechSupported) {
      const timer = setTimeout(speakResults, 500);
      return () => clearTimeout(timer);
    }
  }, [voiceEnabled, speechSupported, speakResults]);

  useEffect(() => {
    return () => {
      if (speechSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechSupported]);

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1
          className={`text-xl font-bold text-foreground ${language === 'hi' ? 'font-[family-name:var(--font-devanagari)]' : ''
            }`}
        >
          {t.title}
        </h1>
        {speechSupported && (
          <Button
            variant={isSpeaking ? 'default' : 'outline'}
            size="sm"
            onClick={isSpeaking ? stopSpeaking : speakResults}
            className="rounded-full"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 mr-2" />
                {t.stopListening}
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 mr-2" />
                {t.listenResults}
              </>
            )}
          </Button>
        )}
      </div>

      {/* Results Content */}
      <div className="flex-1 space-y-4 overflow-y-auto pb-4">
        {/* Diagnosis */}
        <Card className="p-5 border-primary/30 bg-primary/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify
center">
              <Stethoscope className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">{t.diagnosis}</span>
          </div>
          <p
            className={`text-xl font-bold text-primary ${language === 'hi' ? 'font-[family-name:var(--font-devanagari)]' : ''
              }`}
          >
            {language === 'en' ? result.disease.en : result.disease.hi}
          </p>
        </Card>

        {/* Causes */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify
center">
              <AlertTriangle className="w-5 h-5 text-accent" />
            </div>
            <span className="font-semibold text-foreground">{t.causes}</span>
          </div>
          <ul className="space-y-2">
            {(language === 'en' ? result.causes.en : result.causes.hi).map(
              (cause, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-2 text-muted-foreground ${language === 'hi'
                      ? 'font-[family-name:var(--font-devanagari)]'
                      : ''
                    }`}
                >
                  <span className="text-accent mt-1">•</span>
                  {cause}
                </li>
              )
            )}
          </ul>
        </Card>

        {/* Advice */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify
center">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">{t.advice}</span>
          </div>
          <ul className="space-y-2">
            {(language === 'en' ? result.advice.en : result.advice.hi).map(
              (advice, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-2 text-muted-foreground ${language === 'hi'
                      ? 'font-[family-name:var(--font-devanagari)]'
                      : ''
                    }`}
                >
                  <span className="text-primary mt-1">✓</span>
                  {advice}
                </li>
              )
            )}
          </ul>
        </Card>

        {/* Remedies */}
        <Card className="p-5 border-primary/30 bg-secondary/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify
center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">{t.remedies}</span>
          </div>
          <ul className="space-y-3">
            {(language === 'en' ? result.remedies.en : result.remedies.hi).map(
              (remedy, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-2 text-foreground ${language === 'hi'
                      ? 'font-[family-name:var(--font-devanagari)]'
                      : ''
                    }`}
                >
                  <span className="text-lg">🌿</span>
                  {remedy}
                </li>
              )
            )}
          </ul>
        </Card>

        {/* Disclaimer */}
        <div className="bg-muted/50 rounded-xl p-4 mt-4">
          <p
            className={`text-xs text-muted-foreground text-center ${language === 'hi' ? 'font-[family-name:var(--font-devanagari)]' : ''
              }`}
          >
            ⚠️ {t.disclaimer}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button
          variant="outline"
          onClick={onGoHome}
          className="h-14 text-lg rounded-xl"
        >
          <Home className="w-5 h-5 mr-2" />
          {t.home}
        </Button>
        <Button onClick={onStartOver} className="h-14 text-lg rounded-xl">
          <RefreshCw className="w-5 h-5 mr-2" />
          {t.startOver}
        </Button>
      </div>
    </div>
  );
}
