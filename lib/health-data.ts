import { Symptom, PredictionResult } from './types';
export const symptoms: Symptom[] = [
    { id: 'fever', en: 'Do you have a fever?', hi: 'क्य ा आपको बुखाि है?' },
    { id: 'cough', en: 'Do you have a cough?', hi: 'क्य ा आपको खाोंसी है?' },
    {
        id: 'fatigue', en: 'Do you feel tired or weak?', hi: 'क्य ा आप िकान या कमजोिी महसूस
कििे हैं?' },
{ id: 'headache', en: 'Do you have a headache?', hi: 'क्य ा आपके तसि में ददत है?' },
{ id: 'bodyPain', en: 'Do you have body pain?', hi: 'क्या आपके शिीि में ददत है?' },
    { id: 'dizziness', en: 'Do you feel dizzy?', hi: 'क्य ा आपको चक्कि आिा है?' },
];
export const locations = [
    { en: 'Village', hi: 'र् ााँव ' },
    { en: 'Town', hi: 'कस्बा ' },
    { en: 'City', hi: 'शहि' },
    { en: 'Farm Area', hi: 'खेिी का क्षेत्र ' },
];
export const weatherOptions = [
    { en: 'Hot & Humid', hi: 'र् मत औि नमी वाला' },
    { en: 'Cold', hi: 'ठोंडा' },
    { en: 'Rainy', hi: 'बिसािी' },
    { en: 'Dry', hi: 'सूखा' },
];
export const occupations = [
    { en: 'Farmer', hi: 'तकसान' },
    { en: 'Laborer', hi: 'मजदूि' },
    { en: 'Shopkeeper', hi: 'दुकानदाि' },
    { en: 'Homemaker', hi: 'र्ृ तहणी ' },
    { en: 'Student', hi: 'तवद्यािी ' },
    { en: 'Other', hi: 'अन्य ' },
];
export function getPrediction(
    answeredSymptoms: Record<string, boolean>,
    context: {
        location: string; weather: string; occupation: string; outdoorExposure:
            boolean
    }
): PredictionResult {
    const hasSymptoms = answeredSymptoms;
    // Simple rule-based prediction for demonstration
    if (hasSymptoms.fever && hasSymptoms.cough) {
        return {
            disease: {
                en: 'Common Cold / Flu',
                hi: 'सामान्य सदी / फ्लू '
            },
            causes: {
                en: [
                    'Viral infection spread through air',
                    'Exposure to cold weather',
                    'Low immunity due to fatigue'
                ],
                hi: [
                    'हवा से फैलने वाला वायिल सोंक्रमण ',
                    'ठोंडे मौसम में िहना',
                    'िकान के कािण कम िोर् प्र तििोधक क्ष मिा '
                ]
            },
            advice: {
                en: [
                    'Take complete rest for 2-3 days',
                    'Drink plenty of warm fluids',
                    'Avoid cold food and drinks',
                    'Consult a doctor if fever persists beyond 3 days'
                ],
                hi: [
                    '2-3 तदनोों के तलए पूिा आिाम किें',
                    'र्मत पेय पदाित खूब तपएों',
                    'ठोंडा खाना औि पेय पदािों से बचें',
                    'अर्ि बुखाि 3 तदनोों से ज्य ादा िहे िो डॉक्टि से तमलें'
                ]
            },
            remedies: {
                en: [
                    'Tulsi (Holy Basil) tea - Boil 5-6 leaves in water',
                    'Ginger and honey mixture - Take twice daily',
                    'Steam inhalation with eucalyptus oil',
                    'Turmeric milk (Haldi Doodh) before sleeping',
                    'Kadha - Boil tulsi, ginger, pepper, and cloves'
                ],
                hi: [
                    'िुलसी की चाय - 5-6 पत्ोों को पानी में उबालें',
                    'अदिक औि शहद का तमश्रण - तदन में दो बाि लें',
                    'नीलतर्िी िेल के साि भाप लें',
                    'सोने से पहले हल्दी वाला दूध तपएों',
                    'काढा - िुलसी, अदिक, काली तमचत औि लौोंर् उबालें'
                ]
            }
        };
    }
    if (hasSymptoms.headache && hasSymptoms.dizziness) {
        return {
            disease: {
                en: 'Dehydration / Heat Exhaustion',
                hi: 'तनजतलीकिण / र् मी से िकावट'
            },
            causes: {
                en: [
                    'Not drinking enough water',
                    'Working in hot sun for long hours',
                    'Loss of body salts through sweating'
                ],
                hi: [
                    'पयातप्त पानी नहीों पीना',
                    'लोंबे समय िक धूप में काम किना',
                    'पसीने से शिीि के नमक का कम होना'
                ]
            },
            advice: {
                en: [
                    'Drink ORS (Oral Rehydration Solution) immediately',
                    'Rest in a cool, shaded area',
                    'Avoid going out in peak sun hours (12-4 PM)',
                    'Wear a cap or turban while working outdoors'
                ],
                hi: [
                    'िुिोंि ORS (ओआिएस) तपएों',
                    'ठोंडी छायादाि जर्ह पि आिाम किें',
                    'दोपहि (12-4 बजे) में बाहि जाने से बचें',
                    'बाहि काम कििे समय टोपी या पर्डी पहनें'
                ]
            },
            remedies: {
                en: [
                    'Homemade ORS: 1L water + 6 tsp sugar + ½ tsp salt',
                    'Buttermilk (Chaas) with roasted cumin and salt',
                    'Raw mango drink (Aam Panna)',
                    'Coconut water - Nature\'s electrolyte',
                    'Watermelon and cucumber for hydration'
                ],
                hi: [
                    'घि का ORS: 1L पानी + 6 चम्मच चीनी + ½ चम्मच नमक',
                    'भुने जीिे औि नमक वाली छाछ',
                    'कच्चे आम का पना (आम पन्ना )',
                    'नारियल पानी - प्र ाकृतिक इलेक्टरोलाइट ',
                    'ििबूज औि खीिा खाएों'
                ]
            }
        };
    }
    if (hasSymptoms.bodyPain && hasSymptoms.fatigue) {
        return {
            disease: {
                en: 'Muscle Fatigue / General Weakness',
                hi: 'माोंसपेतशयोों की िकान / सामान्य कमजोिी'
            },
            causes: {
                en: [
                    'Overexertion from physical labor',
                    'Poor nutrition and diet',
                    'Lack of proper rest and sleep'
                ],
                hi: [
                    'शािीरिक श्र म से अतधक िकान',
                    'खिाब पोषण औि आहाि',
                    'उतचि आिाम औि नीोंद की कमी'
                ]
            },
            advice: {
                en: [
                    'Get 7-8 hours of sleep every night',
                    'Eat balanced meals with dal, roti, and vegetables',
                    'Take short breaks during heavy work',
                    'Do light stretching exercises in the morning'
                ],
                hi: [
                    'हि िाि 7-8 घोंटे की नीोंद लें',
                    'दाल, िोटी औि सस्ियोों का सोंिुतलि भोजन किें',
                    'भािी काम के दौिान छोटे-छोटे आिाम किें',
                    'सुबह हल्के स्ट् रे तचोंर् व्य ायाम किें'
                ]
            },
            remedies: {
                en: [
                    'Ashwagandha powder with warm milk',
                    'Massage with warm mustard oil',
                    'Soak feet in warm salt water',
                    'Eat soaked almonds and dates for energy',
                    'Chyawanprash - 1 teaspoon daily'
                ],
                hi: [
                    'र् मत दूध के साि अश्वर्ोंधा पाउडि',
                    'र्मत सिसोों के िेल से मातलश',
                    'र्मत नमक के पानी में पैि डालें',
                    'ऊजात के तलए भीर्े बादाम औि खजूि खाएों',
                    'च्यवनप्राश - िोज 1 चम्मच '
                ]
            }
        };
    }
    // Default response
    return {
        disease: {
            en: 'General Health Concern',
            hi: 'सामान्य स्व ास्थ्य तचोंिा'
        },
        causes: {
            en: [
                'Various factors may be contributing',
                'Seasonal changes affecting health',
                'Lifestyle and work-related stress'
            ],
            hi: [
                'तवतभन्न कािक योर्दान कि िहे हो सकिे हैं',
                'मौसमी बदलाव स्व ास्थ्य को प्र भातवि कि िहे हैं',
                'जीवनशैली औि काम से सोंबोंतधि िनाव'
            ]
        },
        advice: {
            en: [
                'Maintain a regular daily routine',
                'Eat fresh, home-cooked meals',
                'Stay hydrated throughout the day',
                'Visit the nearest health center if symptoms worsen'
            ],
            hi: [
                'तनयतमि दैतनक तदनचयात बनाए िखें',
                'िाजा, घि का बना खाना खाएों',
                'तदन भि पानी पीिे िहें',
                'लक्षण बढने पि नजदीकी स्व ास्थ्य केंद्र जाएों'
            ]
        },
        remedies: {
            en: [
                'Start your day with warm water and lemon',
                'Include seasonal fruits in your diet',
                'Practice deep breathing for 10 minutes daily',
                'Apply coconut oil for general body care',
                'Drink herbal tea with tulsi and ginger'
            ],
            hi: [
                'अपने तदन की शुरुआि र् मत पानी औि नीोंबू से किें',
                'अपने आहाि में मौसमी फल शातमल किें',
                'िोजाना 10 तमनट र् हिी साोंस लेने का अभ्यास किें',
                'सामान्य शिीि की देखभाल के तलए नारियल िेल लर्ाएों ',
                'िुलसी औि अदिक की हबतल चाय तपएों'
            ]
        }
    };
}
