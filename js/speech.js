/**
 * Hastshilp Sangam - Speech Synthesis / Audio Assistance Engine
 * Speaks instructions in Hindi or English when users click "Play Instructions"
 */

export const AudioAssistance = {
  isSpeaking: false,

  speak(text, lang = 'hi-IN') {
    if (!('speechSynthesis' in window)) {
      alert("Audio assistance: " + text);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
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
  },

  playStep1() {
    this.speak(
      "नमस्ते। हस्तशिल्प संगम में आपका स्वागत है। अगर आप शिल्पकार हैं तो कारीगर चुनें, और सीधे शून्य प्रतिशत कमीशन पर अपना सामान बेचें। अपना मोबाइल नंबर और चार अंकों का ओटीपी दर्ज करें।",
      "hi-IN"
    );
  },

  playStep2() {
    this.speak(
      "पहचान सत्यापन: वस्त्र मंत्रालय के पहचान पत्र को कैमरे के सामने रखें या अपना 14 अंकों का पहचान क्रमांक दर्ज करें, ताकि सरकारी अनुदान सीधे आपके खाते में आए।",
      "hi-IN"
    );
  },

  playStep3() {
    this.speak(
      "बैंक खाता जोड़ना: अपने पासबुक की फोटो अपलोड करें या खाता संख्या और आईएफएससी कोड भरें। बिना किसी बिचौलिए के सौ प्रतिशत भुगतान सीधे आपके बैंक खाते में पहुंचेगा।",
      "hi-IN"
    );
  },

  playTrustScore() {
    this.speak(
      "कारीगर ट्रस्ट स्कोर अट्ठानवे प्रतिशत है। पहचान प्रमाणित होने से आपको इंडिया पोस्ट का दैनिक पिकअप और शून्य बाज़ार शुल्क मिलता है।",
      "hi-IN"
    );
  },

  stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      document.body.classList.remove('audio-playing');
    }
  }
};
