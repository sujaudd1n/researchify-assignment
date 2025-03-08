"use client";

import { CircleHelp, Pencil, Send, User } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function ChatInterface({ }) {
  const [message, setMessage] = useState('');
  const user = true;

  const quickQuestions = [
    { icon: <Pencil />, text: "what are my tasks due today?" },
    { icon: <User />, text: "what's happening with xyz client?" },
    { icon: <CircleHelp />, text: "who has been sick the most?" }
  ];

  return (
    <div className="py-4">
      <div className="mb-4">
        <h3 className="flex flex-col text-2xl font-semibold w-max bg-gradient-to-r from-gray-500 to-green-500 text-transparent bg-clip-text">
          <span>Hi! John.</span>
          <span>How can I help you?</span>
        </h3>
      </div>

      <div className="flex gap-3 mb-6">
        {quickQuestions.map((question, index) => (
          <button
            key={index}
            disabled={user ? false : true}
            className={`${user ? '' : 'border-gray-200 text-gray-500 hover:bg-white'} max-w-[200px] border border-foreground rounded-lg p-3 text-left hover:bg-gray-100 transition-colors`}
            onClick={() => { setMessage(question.text) }}
          >
            <div className="text-lg mb-1">{question.icon}</div>
            <div className="">"{question.text}"</div>
          </button>
        ))}
      </div>

      <div className="flex items-center">
        <Input
          type="text"
          disabled={user ? false : true}
          placeholder={user ? "Ask me anything about the group conversations..." : "Please sign in to chat"}
          className="flex-1 border border-foreground rounded-lg px-4 py-3 mr-2 focus:outline-none "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="outline" size="icon" className="border-foreground"
          disabled={user ? false : true}
        >
          <Send />
        </Button>
      </div>
    </div >
  );
}