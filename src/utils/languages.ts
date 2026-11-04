import { LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    speechCode: 'en-US',
    sampleGreeting: 'What can I help with today?',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    speechCode: 'hi-IN',
    sampleGreeting: 'आज मैं आपकी क्या सहायता कर सकता हूँ?',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    speechCode: 'es-ES',
    sampleGreeting: '¿En qué puedo ayudarte hoy?',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    speechCode: 'fr-FR',
    sampleGreeting: 'Comment puis-je vous aider aujourd’hui ?',
  },
  {
    code: 'zh',
    name: 'Mandarin Chinese',
    nativeName: '中文 (简体)',
    speechCode: 'zh-CN',
    sampleGreeting: '今天有什么我可以帮您的？',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    speechCode: 'de-DE',
    sampleGreeting: 'Wie kann ich Ihnen heute helfen?',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    speechCode: 'ja-JP',
    sampleGreeting: '今日はお手伝いできることはありますか？',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    speechCode: 'ar-SA',
    sampleGreeting: 'كيف يمكنني مساعدتك اليوم؟',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    speechCode: 'bn-IN',
    sampleGreeting: 'আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    speechCode: 'ru-RU',
    sampleGreeting: 'Чем я могу помочь вам сегодня?',
  },
];

// Quick localized prompt suggestions for the welcome screen
export const LOCALIZED_SUGGESTIONS: Record<string, Array<{ title: string; subtitle: string; prompt: string }>> = {
  en: [
    {
      title: 'Analyze & Debug Code',
      subtitle: 'Write an asynchronous pipeline in TypeScript with error boundaries',
      prompt: 'Write an asynchronous worker queue in TypeScript with concurrency limits, exponential backoff retries, and comprehensive error handling.',
    },
    {
      title: 'Multilingual Polyglot Conversation',
      subtitle: 'Compare poetic concepts across Sanskrit, Hindi, and English',
      prompt: 'Can you compare the philosophical concept of "Dharma" and "Karma" with their Western equivalents, providing examples in Hindi and English?',
    },
    {
      title: 'Data Privacy & Security Audit',
      subtitle: 'How does client-side AES-GCM encryption safeguard data?',
      prompt: 'Explain how client-side AES-GCM 256-bit encryption protects user records from interception, and outline a zero-knowledge architectural model.',
    },
    {
      title: 'Explore Chitragupt Lore & AI Ethics',
      subtitle: 'Who is Chitragupt and what are the ethical virtues of truth?',
      prompt: 'Explain the celestial significance of Chitragupt in Indian heritage as the incorruptible scribe of cosmic karma, and how those ideals map to modern ethical AI.',
    },
  ],
  hi: [
    {
      title: 'कोडिंग और डिबगिंग',
      subtitle: 'जावास्क्रिप्ट और रिएक्ट में स्टेट मैनेजमेंट कैसे काम करता है?',
      prompt: 'रिएक्ट (React) में स्टेट मैनेजमेंट और कस्टम हुक्स (Custom Hooks) का सर्वोत्तम तरीका उदाहरण सहित समझाइए।',
    },
    {
      title: 'चित्रगुप्त का दिव्य इतिहास',
      subtitle: 'धर्म और न्याय के दिव्य लेखाकार की प्रेरणा',
      prompt: 'चित्रगुप्त जी के इतिहास और उनके सत्य व निष्पक्ष न्याय के सिद्धांतों पर एक ज्ञानवर्धक और प्रेरक निबंध प्रस्तुत करें।',
    },
    {
      title: 'डेटा गोपनीयता और सुरक्षा',
      subtitle: 'शून्य-ज्ञान (Zero-Knowledge) आर्किटेक्चर क्या है?',
      prompt: 'उपयोगकर्ता डेटा गोपनीयता के लिए एंड-टू-एंड एन्क्रिप्शन (E2EE) और डेटा एनोनिमाइज़ेशन का क्या महत्व है?',
    },
    {
      title: 'साहित्य और विचार-विमर्श',
      subtitle: 'काव्य, दर्शन और आधुनिक तकनीकी संतुलन',
      prompt: 'कवि दिनकर की रश्मिरथी के प्रमुख प्रसंग और उनका आधुनिक नेतृत्व में महत्व बताइए।',
    },
  ],
  es: [
    {
      title: 'Escribir y Optimizar Código',
      subtitle: 'Estructurar una API REST limpia con validación',
      prompt: 'Crea una arquitectura escalable para una API en Node.js y Express con autenticación segura y buenas prácticas.',
    },
    {
      title: 'Privacidad y Criptografía',
      subtitle: '¿Cómo funciona el cifrado AES-256-GCM en el cliente?',
      prompt: 'Explica en detalle los beneficios de la privacidad por diseño y el cifrado local sin almacenamiento en servidores externos.',
    },
    {
      title: 'Traducción y Literatura',
      subtitle: 'Analizar metáforas en el realismo mágico',
      prompt: 'Analiza los temas principales de Cien años de soledad de Gabriel García Márquez y su impacto en la literatura mundial.',
    },
    {
      title: 'Estrategia y Creatividad',
      subtitle: 'Diseñar un plan de producto para una startup SaaS',
      prompt: 'Diseña una propuesta de valor y un roadmap de lanzamiento para una herramienta de productividad impulsada por IA.',
    },
  ],
  fr: [
    {
      title: 'Développement & Algorithmique',
      subtitle: 'Concevoir un système distribué résilient',
      prompt: 'Expliquez comment concevoir une architecture microservices hautement disponible avec gestion des pannes et traçabilité.',
    },
    {
      title: 'Protection des Données & RGPD',
      subtitle: 'Principes de minimisation et de chiffrement',
      prompt: 'Quels sont les piliers essentiels de la confidentialité des données selon le RGPD et comment les implémenter techniquement ?',
    },
    {
      title: 'Philosophie & Intelligence Artificielle',
      subtitle: 'Éthique de la mémoire et de la vérité numérique',
      prompt: 'Analysez les enjeux éthiques de la mémoire algorithmique et de la préservation de la vie privée chez l’humain.',
    },
    {
      title: 'Rédaction Créative & Culture',
      subtitle: 'Explorer la prose poétique française',
      prompt: 'Rédigez un court essai philosophique sur le temps, la mémoire et le destin dans le style d’Albert Camus.',
    },
  ],
  zh: [
    {
      title: '编写与优化高并发代码',
      subtitle: '构建高性能异步队列与数据管道',
      prompt: '请用 TypeScript 编写一个支持重试、并发控制和死信队列的高性能异步任务执行器。',
    },
    {
      title: '数据隐私与本地加密架构',
      subtitle: '深入理解客户端端到端加密与数据去标识化',
      prompt: '请详细阐述客户端零知识加密（Zero-Knowledge Encryption）与脱敏过滤（Anonymization）在保护用户隐私方面的技术原理。',
    },
    {
      title: '多语言翻译与语义理解',
      subtitle: '古诗文与现代科技的跨语言融会贯通',
      prompt: '请将《道德经》中关于“道法自然”与“大智若愚”的哲学思想用中英文对比解析，并阐释其对现代人工智能伦理的启发。',
    },
    {
      title: '智者 Chitragupt 的智慧考量',
      subtitle: '记录因果与公正真理的智慧之灵',
      prompt: '请介绍印度神话中记录善恶因果的文仙 Chitragupt（考量一切真实的守护者），并探讨其在人工智能公正性上的象征意义。',
    },
  ],
};

// Automatic language detection heuristic based on scripts and character distributions
export function detectLanguageFromText(text: string): string {
  if (!text || text.trim().length === 0) return 'en';

  // Devanagari script (Hindi, Marathi, Sanskrit)
  if (/[\u0900-\u097F]/.test(text)) return 'hi';

  // Bengali script
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';

  // Arabic script
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';

  // Chinese Hanzi
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';

  // Japanese Kana
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja';

  // Cyrillic (Russian)
  if (/[\u0400-\u04FF]/.test(text)) return 'ru';

  // Spanish indicators (inverted exclamation, question, specific letters)
  if (/[¿¡áéíóúñü]/i.test(text) || /\b(hola|por favor|gracias|cómo|qué|amigo)\b/i.test(text)) {
    return 'es';
  }

  // French indicators
  if (/[àâçéèêëîïôûùüÿœæ]/i.test(text) || /\b(bonjour|merci|s'il vous plaît|comment|avec|pourquoi)\b/i.test(text)) {
    return 'fr';
  }

  // German indicators
  if (/[äöüß]/i.test(text) || /\b(hallo|bitte|danke|wie|warum|nicht)\b/i.test(text)) {
    return 'de';
  }

  return 'en';
}

// Find language by code
export function getLanguageOption(code: string): LanguageOption {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
}
