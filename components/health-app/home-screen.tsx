'use client'; 
 
import { Heart, Mic, Globe } from 'lucide-react'; 
import { Button } from '@/components/ui/button'; 
import { Card } from '@/components/ui/card'; 
import { Language } from '@/lib/types'; 
 
interface HomeScreenProps { 
  language: Language; 
  onLanguageChange: (lang: Language) => void; 
  onStartCheck: () => void; 
  onVoiceToggle: () => void; 
  voiceEnabled: boolean; 
} 
 
export function HomeScreen({ 
  language, 
  onLanguageChange, 
  onStartCheck, 
  onVoiceToggle, 
  voiceEnabled, 
}: HomeScreenProps) { 
  const content = { 
    en: { 
      title: 'Rural Health Assistant', 
      subtitle: 'Your trusted health companion', 
      startButton: 'Start Health Check', 
      voiceLabel: 'Voice Mode', 
      languageLabel: 'Language', 
    }, 
    hi: { 
      title: 'ग्रामीण स्वास्थ्य सहायक', 
      subtitle: 'आपका तवश्वसनीय स्वास्थ्य सािी', 
      startButton: 'स्वास्थ्य जाोंच शुरू किें', 
      voiceLabel: 'आवाज़ मोड', 
      languageLabel: 'भाषा', 
    }, 
  }; 
 
  const t = content[language]; 
 
  return ( 
    <div className="min-h-screen bg-background flex flex-col items-center justify-center 
p-6"> 
      <div className="w-full max-w-md space-y-8"> 
        {/* Logo and Title */} 
        <div className="text-center space-y-4"> 
          <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center 
justify-center"> 
            <Heart className="w-12 h-12 text-primary" strokeWidth={1.5} /> 
          </div> 
          <h1 className="text-2xl font-bold text-foreground tracking-tight text-balance"> 
            {t.title} 
          </h1> 
          <p className="text-muted-foreground text-lg">{t.subtitle}</p> 
        </div> 
 
        {/* Main Action Button */} 
        <Button 
          onClick={onStartCheck} 
          size="lg" 
          className="w-full h-16 text-xl font-semibold rounded-2xl shadow-lg 
hover:shadow-xl transition-all" 
        > 
          {t.startButton} 
        </Button> 
 
        {/* Language Selection */} 
        <Card className="p-4"> 
          <div className="flex items-center gap-3 mb-3"> 
            <Globe className="w-5 h-5 text-muted-foreground" /> 
            <span className="text-sm font-medium text-muted-foreground"> 
              {t.languageLabel} 
            </span> 
          </div> 
          <div className="grid grid-cols-2 gap-3"> 
            <Button 
              variant={language === 'en' ? 'default' : 'outline'} 
              onClick={() => onLanguageChange('en')} 
              className="h-14 text-lg rounded-xl" 
            > 
              English 
            </Button> 
            <Button 
              variant={language === 'hi' ? 'default' : 'outline'} 
              onClick={() => onLanguageChange('hi')} 
              className="h-14 text-lg rounded-xl font-[family-name:var(--font-devanagari)]" 
            > 
              तहोंदी 
            </Button> 
          </div> 
        </Card> 
 
        {/* Voice Mode Toggle */} 
        <Card className="p-4"> 
          <button 
            onClick={onVoiceToggle} 
            className="w-full flex items-center justify-between" 
          > 
            <div className="flex items-center gap-3"> 
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition
colors ${ 
                  voiceEnabled ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted foreground' 
                }`} 
              > 
                <Mic className="w-6 h-6" /> 
              </div> 
              <div className="text-left"> 
                <p className="font-medium text-foreground">{t.voiceLabel}</p> 
                <p className="text-sm text-muted-foreground"> 
                  {language === 'en' ? 'Hear results aloud' : 'परिणाम सुनें'} 
                </p> 
              </div> 
            </div> 
            <div 
              className={`w-12 h-7 rounded-full transition-colors relative ${ 
                voiceEnabled ? 'bg-primary' : 'bg-muted' 
              }`} 
            > 
              <div 
                className={`w-5 h-5 bg-card rounded-full absolute top-1 transition-transform 
shadow-sm ${ 
                  voiceEnabled ? 'translate-x-6' : 'translate-x-1' 
                }`} 
              /> 
            </div> 
          </button> 
        </Card> 
 
        {/* Disclaimer */} 
        <p className="text-center text-xs text-muted-foreground px-4"> 
          {language === 'en' 
            ? 'This app provides general health guidance. Always consult a doctor for serious 
conditions.' 
            : 'यह ऐप सामान्य स्वास्थ्य मार्तदशतन प्रदान कििा है। र्ोंभीि स्थितियोों के तलए हमेशा डॉक्टि 
से सलाह लें।'} 
        </p> 
      </div> 
    </div> 
  ); 
}