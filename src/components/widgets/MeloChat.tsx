"use client";

import { useState, type FormEvent, type ReactElement } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type Sender = "user" | "bot";

interface Message {
  id: number;
  text: string;
  sender: Sender;
}

interface MeloChatProps {
  onClose: () => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: "Ola! Sou o Melo, a IA do MELEIO. Posso te ajudar a entender o painel, os indicadores ou criar uma intervenção. Por onde quer começar?",
    sender: "bot",
  },
];

export default function MeloChat({ onClose }: MeloChatProps): ReactElement {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    const nextId = messages.length + 1;
    const userMessage: Message = { id: nextId, text: trimmed, sender: "user" };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulated bot reply
    setTimeout(() => {
      const botMessage: Message = {
        id: nextId + 1,
        text: "Obrigado pela mensagem! Esta e uma demo simples.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div
      data-component="melobot-chat"
      className="fixed bottom-24 right-6 w-80 max-h-[60vh] bg-white rounded-lg shadow-2xl border border-yellow-400 flex flex-col z-50"
    >
      <div className="bg-purple-600 text-white p-3 rounded-t-lg flex items-center justify-between">
        <span className="text-sm font-medium">Melo IA</span>
        <Button
          type="button"
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="border-none bg-transparent text-white hover:bg-transparent hover:text-gray-200"
          aria-label="Fechar chat"
        >
          &times;
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 border-t bg-gray-50 max-h-[40vh]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                message.sender === "user"
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-200 text-gray-900"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-3 border-t bg-white rounded-b-lg"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Pergunte algo..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Button
            type="submit"
            variant="warning"
            size="sm"
            className="rounded-lg px-4 py-2"
            aria-label="Enviar mensagem"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
