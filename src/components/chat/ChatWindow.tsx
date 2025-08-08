import { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';

type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
};

type ChatWindowProps = {
  recipient: string;
  onClose: () => void;
};

export const ChatWindow = ({ recipient, onClose }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cargar mensajes guardados
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${recipient}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [recipient]);

  // Guardar mensajes cuando cambian
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${recipient}`, JSON.stringify(messages));
    }
  }, [messages, recipient]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'yo', // En una implementación real, esto vendría del usuario autenticado
      text: message,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  // Simular respuesta automática (en producción, esto vendría de un WebSocket o API)
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'yo') {
      const timer = setTimeout(() => {
        const response: Message = {
          id: Date.now().toString(),
          sender: recipient,
          text: `Gracias por tu mensaje. Este es un mensaje automático de ${recipient}.`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, response]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [messages, recipient]);

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white dark:bg-gray-800 rounded-t-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col" style={{ height: '70vh', zIndex: 1000 }}>
      {/* Encabezado del chat */}
      <div className="bg-primary text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Chat con {recipient}</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
        </button>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 h-full flex items-center justify-center">
            <p>Envía un mensaje para comenzar la conversación</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'yo' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === 'yo'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de mensaje */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            disabled={!message.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
