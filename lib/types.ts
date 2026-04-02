export type Language = 'en' | 'hi';

export interface Symptom {
  id: string;
  en: string;
  hi: string;
  answered?: boolean;
  value?: boolean;
}

export interface ContextInfo {
  location: string;
  weather: string;
  occupation: string;
  outdoorExposure: boolean;
}

export interface PredictionResult {
  disease: {
    en: string;
    hi: string;
  };
  causes: {
    en: string[];
    hi: string[];
  };
  advice: {
    en: string[];
    hi: string[];
  };
  remedies: {
    en: string[];
    hi: string[];
  };
}

export type Screen = 'home' | 'symptoms' | 'context' | 'processing' | 'results';
