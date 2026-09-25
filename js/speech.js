/**
 * Native Loom - Speech Synthesis / Audio Assistance Engine
 * Speaks instructions in the user's active regional language (10 Languages supported)
 */

import { i18n } from './i18n.js';

export const AudioAssistance = {
  isSpeaking: false,

  speak(text, lang = null) {
    if (!text) return;
    const targetLocale = lang || i18n.getVoiceLocale();

    if (!('speechSynthesis' in window)) {
      console.log("Audio assistance: " + text);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLocale;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.isSpeaking = true;
        document.body.classList.add('audio-playing');
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        document.body.classList.remove('audio-playing');
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        document.body.classList.remove('audio-playing');
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  },

  playStep1() {
    this.speak(i18n.t('voiceGreetingWelcome'));
  },

  playStep2() {
    this.speak(
      i18n.currentLang === 'hi' 
        ? "पहचान सत्यापन: वस्त्र मंत्रालय के पहचान पत्र को कैमरे के सामने रखें या अपना 14 अंकों का पहचान क्रमांक दर्ज करें।"
        : "Pehchan Verification: Keep your Ministry of Textiles Artisan Card ready to unlock direct government benefits."
    );
  },

  playStep3() {
    this.speak(
      i18n.currentLang === 'hi'
        ? "बैंक खाता जोड़ना: बिना किसी बिचौलिए के सौ प्रतिशत भुगतान सीधे आपके बैंक खाते में पहुंचेगा।"
        : "Bank Khata: 100% direct DBT payouts straight into your account with 0% middleman commission."
    );
  },

  playTrustScore() {
    this.speak(i18n.t('voiceGreetingArtisan'));
  },

  stop() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
      this.isSpeaking = false;
      document.body.classList.remove('audio-playing');
    }
  }
};
