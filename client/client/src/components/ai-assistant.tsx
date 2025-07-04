import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Bot, User, X, Minimize2 } from 'lucide-react';
import doctorsData from '@/data/doctors.json';
import reviewsData from '@/data/reviews.json';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIResponse {
  message: string;
  suggestions?: string[];
}

export default function AIAssistant() {
  const { t, currentLang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Welcome message based on language
  const welcomeMessage = currentLang === 'hi' 
    ? "नमस्ते! मैं समद नर्सिंग होम का AI सहायक हूं। मैं आपकी स्वास्थ्य संबंधी जानकारी, डॉक्टर के समय, और अपॉइंटमेंट में मदद कर सकता हूं। आप क्या जानना चाहते हैं?"
    : "Hello! I'm the AI Assistant for Samad Nursing Home. I can help you with health information, doctor timings, and appointments. What would you like to know?";

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        text: welcomeMessage,
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, welcomeMessage, messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // AI Response logic
  const getAIResponse = (userMessage: string): AIResponse => {
    const message = userMessage.toLowerCase();
    
    // Doctor-related queries
    if (message.includes('doctor') || message.includes('डॉक्टर')) {
      const doctorsList = doctorsData.map(doc => 
        `${doc.name} - ${doc.specialty} (${doc.mobile})`
      ).join('\n');
      
      return {
        message: currentLang === 'hi' 
          ? `हमारे डॉक्टर:\n${doctorsList}\n\nक्या आप किसी विशेष डॉक्टर के बारे में जानना चाहते हैं?`
          : `Our Doctors:\n${doctorsList}\n\nWould you like to know about any specific doctor?`,
        suggestions: currentLang === 'hi' 
          ? ['डॉक्टर का समय', 'अपॉइंटमेंट', 'विशेषता']
          : ['Doctor timings', 'Appointment', 'Specialization']
      };
    }

    // Timing-related queries
    if (message.includes('time') || message.includes('timing') || message.includes('समय') || message.includes('खुला')) {
      return {
        message: currentLang === 'hi' 
          ? `समद नर्सिंग होम खुला है:\n\n🕘 सुबह: 9:00 AM - 03:00 PM\n🕔 शाम: 5:00 PM - 10:00 PM\n📅 सोमवार से शनिवार\n\n🕔 सुबह: 09:00 AM - 02:00 PM\n📅 रविवार\n\nआपातकाल के लिए 24/7 उपलब्ध: +91 7860120688`
          : `Samad Nursing Home is open:\n\n🕘 Morning: 9:00 AM - 03:00 PM\n🕔 Evening: 5:00 PM - 08:00 PM\n📅 Monday to Saturday\n\n🕔 Morning: 09:00 AM - 02:00 PM\n📅 Sunday\n\nEmergency 24/7: +91 7860120688`,
        suggestions: currentLang === 'hi' 
          ? ['अपॉइंटमेंट बुक करें', 'आपातकाल', 'पता']
          : ['Book appointment', 'Emergency', 'Address']
      };
    }

    // Appointment-related queries
    if (message.includes('appointment') || message.includes('अपॉइंटमेंट') || message.includes('book')) {
      return {
        message: currentLang === 'hi' 
          ? `अपॉइंटमेंट बुक करने के लिए:\n\n📞 कॉल करें: +91 786120688\n💬 व्हाट्सऐप: +91 786120688\n\nया सीधे क्लिनिक आएं:\nसुबह 9:00 AM - 03:00 PM\nशाम 5:00 PM - 08:00 PM`
          : `To book an appointment:\n\n📞 Call: +91 786120688\n💬 WhatsApp: +91 786120688\n\nOr visit directly:\nMorning 9:00 AM - 03:00 PM\nEvening 5:00 PM - 08:00 PM`,
        suggestions: currentLang === 'hi' 
          ? ['व्हाट्सऐप पर चैट', 'कॉल करें', 'पता']
          : ['Chat on WhatsApp', 'Call now', 'Address']
      };
    }

    // Emergency queries
    if (message.includes('emergency') || message.includes('आपातकाल') || message.includes('urgent')) {
      return {
        message: currentLang === 'hi' 
          ? `🚨 आपातकाल के लिए तुरंत कॉल करें:\n\n📞 +91 786120688\n\nया पास के सरकारी अस्पताल जाएं`
          : `🚨 For Emergency, Call Immediately:\n\n📞 +91 786120688\n\nOr visit nearest government hospital`,
        suggestions: currentLang === 'hi' 
          ? ['तुरंत कॉल करें', '108 एम्बुलेंस', 'नजदीकी अस्पताल']
          : ['Call now', '108 Ambulance', 'Nearest hospital']
      };
    }

    // Address/Location queries
    if (message.includes('address') || message.includes('location') || message.includes('पता') || message.includes('कहां')) {
      return {
        message: currentLang === 'hi' 
          ? `📍 समद नर्सिंग होम का पता:\n\nहेंगईपुर रोड, शहाबुद्दीनपुर, बिलरियागंज\nजिला आज़मगढ़, उत्तर प्रदेश, पिन: 276121\n\n🗺️ दिशा निर्देश के लिए Google Maps का उपयोग करें`
          : `📍 Samad Nursing Home Address:\n\nHengaipur Road, Shahabuddinpur, Bilariyaganj\nDistrict Azamgarh, UttarPradesh, PIN: 276121\n\n🗺️ Use Google Maps for directions`,
        suggestions: currentLang === 'hi' 
          ? ['Google Maps', 'दिशा निर्देश', 'कॉल करें']
          : ['Google Maps', 'Get directions', 'Call us']
      };
    }

    // Health tips
    if (message.includes('health') || message.includes('tip') || message.includes('स्वास्थ्य') || message.includes('सुझाव')) {
      const tips = currentLang === 'hi' 
        ? [
          '💧 दिन में 8-10 गिलास पानी पिएं',
          '🚶‍♂️ रोज 30 मिनट टहलें',
          '🥗 संतुलित आहार लें',
          '😴 7-8 घंटे नींद लें',
          '🧘‍♀️ तनाव कम करने के लिए योग करें'
        ]
        : [
          '💧 Drink 8-10 glasses of water daily',
          '🚶‍♂️ Walk for 30 minutes daily',
          '🥗 Eat balanced diet',
          '😴 Get 7-8 hours of sleep',
          '🧘‍♀️ Practice yoga to reduce stress'
        ];
      
      return {
        message: (currentLang === 'hi' ? 'स्वास्थ्य सुझाव:\n\n' : 'Health Tips:\n\n') + tips.join('\n'),
        suggestions: currentLang === 'hi' 
          ? ['डॉक्टर से सलाह', 'नियमित जांच', 'अपॉइंटमेंट']
          : ['Consult doctor', 'Regular checkup', 'Appointment']
      };
    }

    // Default response
    return {
      message: currentLang === 'hi' 
        ? `मैं आपकी मदद करना चाहता हूं! आप पूछ सकते हैं:\n\n• डॉक्टर की जानकारी\n• समय और अपॉइंटमेंट\n• आपातकालीन संपर्क\n• अस्पताल का पता\n• स्वास्थ्य सुझाव\n\nकृपया अपना सवाल पूछें।`
        : `I'd like to help you! You can ask about:\n\n• Doctor information\n• Timings and appointments\n• Emergency contacts\n• Hospital address\n• Health tips\n\nPlease ask your question.`,
      suggestions: currentLang === 'hi' 
        ? ['डॉक्टर', 'समय', 'अपॉइंटमेंट', 'आपातकाल']
        : ['Doctors', 'Timings', 'Appointment', 'Emergency']
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(input.trim());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.message,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-medical-teal hover:bg-medical-purple text-white shadow-lg transition-all duration-300 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'}`}>
      <Card className="h-full bg-white shadow-2xl border-2 border-medical-teal/20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-medical-teal to-medical-purple text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">
                {currentLang === 'hi' ? 'AI सहायक' : 'AI Assistant'}
              </h3>
              <p className="text-xs opacity-90">
                {currentLang === 'hi' ? 'ऑनलाइन' : 'Online'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1 h-8 w-8"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 p-4 h-[360px] overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isUser ? 'bg-medical-purple' : 'bg-medical-teal'}`}>
                      {message.isUser ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl ${message.isUser ? 'bg-medical-purple text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-medical-teal rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={currentLang === 'hi' ? 'अपना सवाल टाइप करें...' : 'Type your question...'}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-medical-purple hover:bg-medical-purple text-white px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}