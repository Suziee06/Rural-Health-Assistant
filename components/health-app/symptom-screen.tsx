'use client'; 
 
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'; 
import { Button } from '@/components/ui/button'; 
import { Card } from '@/components/ui/card'; 
import { Progress } from '@/components/ui/progress'; 
import { Language, Symptom } from '@/lib/types'; 
import { symptoms } from '@/lib/health-data'; 
 
interface SymptomScreenProps { 
  language: Language; 
  currentSymptomIndex: number; 
  answers: Record<string, boolean>; 
  onAnswer: (symptomId: string, value: boolean) => void; 
  onNext: () => void; 
  onBack: () => void; 
} 
 
export function SymptomScreen({ 
  language, 
  currentSymptomIndex, 
  answers, 
  onAnswer, 
  onNext, 
  onBack, 
}: SymptomScreenProps) { 
  const currentSymptom = symptoms[currentSymptomIndex]; 
  const progress = ((currentSymptomIndex + 1) / symptoms.length) * 100; 
  const hasAnswered = currentSymptom.id in answers; 
 
  const content = { 
    en: { 
      title: 'Symptom Check', 
      question: 'Question', 
      of: 'of', 
      yes: 'Yes', 
      no: 'No', 
      back: 'Back', 
      next: 'Next', 
      finish: 'Finish', 
    }, 
    hi: { 
      title: 'लक्षण जाोंच', 
      question: 'प्रश्न', 
      of: 'में से', 
      yes: 'हाों', 
      no: 'नहीों', 
      back: 'वापस', 
      next: 'आर्े', 
      finish: 'समाप्त', 
    }, 
  }; 
 
  const t = content[language]; 
  const isLastQuestion = currentSymptomIndex === symptoms.length - 1; 
 
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
          <p className="text-sm text-muted-foreground"> 
            {t.question} {currentSymptomIndex + 1} {t.of} {symptoms.length} 
          </p> 
        </div> 
      </div> 
 
      {/* Progress */} 
      <Progress value={progress} className="h-3 mb-8" /> 
 
      {/* Question Card */} 
      <div className="flex-1 flex flex-col justify-center"> 
        <Card className="p-8 text-center"> 
          <p 
            className={`text-2xl font-medium text-foreground leading-relaxed mb-8 ${ 
              language === 'hi' ? 'font-[family-name:var(--font-devanagari)]' : '' 
            }`} 
          > 
            {language === 'en' ? currentSymptom.en : currentSymptom.hi} 
          </p> 
 
          {/* Answer Buttons */} 
          <div className="grid grid-cols-2 gap-4"> 
            <Button 
              variant={answers[currentSymptom.id] === true ? 'default' : 'outline'} 
              onClick={() => onAnswer(currentSymptom.id, true)} 
              className={`h-20 text-xl rounded-2xl flex flex-col items-center justify-center gap
2 transition-all ${ 
                answers[currentSymptom.id] === true 
                  ? 'ring-4 ring-primary/30' 
                  : '' 
              }`} 
            > 
              <Check className="w-8 h-8" /> 
              <span>{t.yes}</span> 
            </Button> 
            <Button 
              variant={answers[currentSymptom.id] === false ? 'destructive' : 'outline'} 
              onClick={() => onAnswer(currentSymptom.id, false)} 
              className={`h-20 text-xl rounded-2xl flex flex-col items-center justify-center gap
2 transition-all ${ 
                answers[currentSymptom.id] === false 
                  ? 'ring-4 ring-destructive/30' 
                  : '' 
              }`} 
            > 
              <X className="w-8 h-8" /> 
              <span>{t.no}</span> 
            </Button> 
          </div> 
        </Card> 
      </div> 
 
      {/* Navigation */} 
      <div className="mt-8"> 
        <Button 
          onClick={onNext} 
          disabled={!hasAnswered} 
          size="lg" 
          className="w-full h-14 text-lg rounded-xl" 
        > 
          {isLastQuestion ? t.finish : t.next} 
          <ArrowRight className="w-5 h-5 ml-2" /> 
        </Button> 
      </div> 
    </div> 
  ); 
}