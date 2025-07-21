import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react'; // Import router

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export function AIChatbot() {
  const [messages, setMessages] = React.useState<Message[]>([
    { id: 1, text: 'Halo! Ada yang bisa saya bantu terkait aplikasi ini?', sender: 'ai' },
  ]);
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = React.useState(false); // State to manage sending status

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessageText = input;
    const newUserMessage: Message = { id: messages.length + 1, text: userMessageText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsSending(true); // Set sending status to true

    router.visit(route('ai-chatbot.process'), {
      method: 'post',
      data: { message: userMessageText },
      onSuccess: (page) => {
        const aiResponse = (page.props as any).response; // Assuming backend sends response in props.response
        const newAIMessage: Message = { id: messages.length + 2, text: aiResponse, sender: 'ai' };
        setMessages((prevMessages) => [...prevMessages, newAIMessage]);
        setIsSending(false); // Reset sending status
      },
      onError: (errors) => {
        const errorMessage = errors.message || 'Terjadi kesalahan saat memproses permintaan Anda.';
        const newAIMessage: Message = { id: messages.length + 2, text: errorMessage, sender: 'ai' };
        setMessages((prevMessages) => [...prevMessages, newAIMessage]);
        setIsSending(false); // Reset sending status
      },
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <div className="flex h-[500px] w-full max-w-md flex-col rounded-lg border bg-card text-card-foreground shadow-lg">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-2 ${message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
                }`}
                dangerouslySetInnerHTML={{ __html: message.text }}
              >
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="flex items-center border-t p-4">
        <Input
          placeholder="Ketik pesan Anda..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isSending) {
              handleSendMessage();
            }
          }}
          className="flex-1 mr-2"
          disabled={isSending}
        />
        <Button onClick={handleSendMessage} disabled={isSending}>Kirim</Button>
      </div>
    </div>
  );
}
