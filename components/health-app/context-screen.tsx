'use client'; 
import { ArrowLeft, ArrowRight, MapPin, Cloud, Briefcase, Sun } from 'lucide-react'; 
import { Button } from '@/components/ui/button'; 
import { Card } from '@/components/ui/card'; 
import { Language, ContextInfo } from '@/lib/types'; 
import { locations, weatherOptions, occupations } from '@/lib/health-data'; 
interface ContextScreenProps { 
language: Language; 
contextInfo: ContextInfo; 
onUpdateContext: (updates: Partial<ContextInfo>) => void; 
onNext: () => void; 
onBack: () => void; 
} 
export function ContextScreen({ 
  language, 
  contextInfo, 
  onUpdateContext, 
  onNext, 
  onBack, 
}: ContextScreenProps) { 
  const content = { 
    en: { 
      title: 'Additional Information', 
      subtitle: 'Help us understand your situation better', 
      location: 'Your Location', 
      weather: 'Current Weather', 
      occupation: 'Your Occupation', 
      outdoor: 'Do you work outdoors or with crops?', 
      yes: 'Yes', 
      no: 'No', 
      back: 'Back', 
      analyze: 'Analyze Symptoms', 
    }, 
    hi: { 
      title: 'अतिरिक्त जानकािी', 
      subtitle: 'अपनी स्थिति को बेहिि समझने में हमािी मदद किें', 
      location: 'आपका थिान', 
      weather: 'वितमान मौसम', 
      occupation: 'आपका व्यवसाय', 
      outdoor: 'क्या आप बाहि या फसलोों के साि काम कििे हैं?', 
      yes: 'हाों', 
      no: 'नहीों', 
      back: 'वापस', 
      analyze: 'लक्षणोों का तवश्लेषण किें', 
    }, 
  }; 
 
  const t = content[language]; 
  const isComplete = 
    contextInfo.location && contextInfo.weather && contextInfo.occupation; 
 
  return ( 
    <div className="min-h-screen bg-background flex flex-col p-6"> 
      {/* Header */} 
      <div className="flex items-center gap-4 mb-6"> 
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onBack} 
          className="rounded-full h-12 w-12" 
        > 
          <ArrowLeft className="w-5 h-5" /> 
        </Button> 
        <div className="flex-1"> 
          <h1 className="text-xl font-bold text-foreground">{t.title}</h1> 
          <p className="text-sm text-muted-foreground">{t.subtitle}</p> 
        </div> 
      </div> 
 
      {/* Form */} 
      <div className="flex-1 space-y-6 overflow-y-auto"> 
        {/* Location */} 
        <Card className="p-4"> 
          <div className="flex items-center gap-3 mb-4"> 
            <MapPin className="w-5 h-5 text-primary" /> 
            <span className="font-medium text-foreground">{t.location}</span> 
          </div> 
          <div className="grid grid-cols-2 gap-3"> 
            {locations.map((loc) => ( 
              <Button 
                key={loc.en} 
                variant={contextInfo.location === loc.en ? 'default' : 'outline'} 
                onClick={() => onUpdateContext({ location: loc.en })} 
                className={`h-12 rounded-xl ${ 
                  language === 'hi' ? 'font-[family-name:var(--font-devanagari)]' : '' 
                }`} 
              > 
                {language === 'en' ? loc.en : loc.hi} 
              </Button> 
            ))} 
          </div> 
        </Card> 
 
        {/* Weather */} 
        <Card className="p-4"> 
          <div className="flex items-center gap-3 mb-4"> 
            <Cloud className="w-5 h-5 text-accent" /> 
            <span className="font-medium text-foreground">{t.weather}</span> 
          </div> 
          <div className="grid grid-cols-2 gap-3"> 
            {weatherOptions.map((weather) => ( 
              <Button 
                key={weather.en} 
                variant={contextInfo.weather === weather.en ? 'default' : 'outline'} 
                onClick={() => onUpdateContext({ weather: weather.en })} 
                className={`h-12 rounded-xl ${ 
                  language === 'hi' ? 'font-[family-name:var(--font-devanagari)]' : '' 
                }`} 
              > 
                {language === 'en' ? weather.en : weather.hi} 
              </Button> 
            ))} 
          </div> 
        </Card> 
 
        {/* Occupation */} 
        <Card className="p-4"> 
          <div className="flex items-center gap-3 mb-4"> 
            <Briefcase className="w-5 h-5 text-primary" /> 
            <span className="font-medium text-foreground">{t.occupation}</span> 
          </div> 
          <div className="grid grid-cols-2 gap-3"> 
            {occupations.map((occ) => ( 
              <Button 
                key={occ.en} 
                variant={contextInfo.occupation === occ.en ? 'default' : 'outline'} 
                onClick={() => onUpdateContext({ occupation: occ.en })} 
                className={`h-12 rounded-xl ${ 
                  language === 'hi' ? 'font-[family-name:var(--font-devanagari)]' : '' 
                }`} 
              > 
                {language === 'en' ? occ.en : occ.hi} 
              </Button> 
            ))} 
          </div> 
        </Card> 
 
        {/* Outdoor Exposure */} 
        <Card className="p-4"> 
          <div className="flex items-center gap-3 mb-4"> 
            <Sun className="w-5 h-5 text-accent" /> 
            <span 
              className={`font-medium text-foreground ${ 
                language === 'hi' ? 'font-[family-name:var(--font-devanagari)]' : '' 
              }`} 
            > 
              {t.outdoor} 
            </span> 
          </div> 
          <div className="grid grid-cols-2 gap-3"> 
            <Button 
              variant={contextInfo.outdoorExposure === true ? 'default' : 'outline'} 
              onClick={() => onUpdateContext({ outdoorExposure: true })} 
              className="h-14 text-lg rounded-xl" 
            > 
              {t.yes} 
            </Button> 
            <Button 
              variant={contextInfo.outdoorExposure === false ? 'default' : 'outline'} 
              onClick={() => onUpdateContext({ outdoorExposure: false })} 
              className="h-14 text-lg rounded-xl" 
            > 
              {t.no} 
            </Button> 
          </div> 
        </Card> 
      </div> 
 
      {/* Navigation */} 
      <div className="mt-6"> 
        <Button 
          onClick={onNext} 
          disabled={!isComplete} 
          size="lg" 
          className="w-full h-14 text-lg rounded-xl" 
        > 
          {t.analyze} 
          <ArrowRight className="w-5 h-5 ml-2" /> 
        </Button> 
      </div> 
    </div> 
  ); 
} 
