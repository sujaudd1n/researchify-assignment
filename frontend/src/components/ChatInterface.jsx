"use client";

import { CircleHelp, Pencil, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const msgs = [
  { text: "hello", is_user_message: true },
  { text: "hello, how can i help you?", is_user_message: false },
  { text: "I need help with my account.", is_user_message: true },
  { text: "Sure, I can help with that. What seems to be the issue?", is_user_message: false },
  { text: "I can't log in.", is_user_message: true },
  { text: "Let me check that for you. Please hold on.", is_user_message: false },
  { text: "It says my password is incorrect.", is_user_message: true },
  { text: "Have you tried resetting your password?", is_user_message: false },
];

const quickQuestions = [
  { icon: <Pencil />, text: "what are my tasks due today?" },
  { icon: <User />, text: "what's happening with xyz client?" },
  { icon: <CircleHelp />, text: "who has been sick the most?" }
];

export default function ChatInterface({ user }) {
  const [messages, setMessages] = useState(msgs);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behaviour: "smooth"
    })
    if (inputRef) inputRef.current.focus();
  }, [messages]);

  async function messageSubmit() {
    let new_messages = [...messages, { text: input, is_user_message: true }];
    setMessages(new_messages);
    setInput('');
    const response = await get_bot_response(input);
    new_messages = [...new_messages, { text: response, is_user_message: false }];
    setMessages(new_messages);
    console.log(chatRef.current)
  }

  async function get_bot_response(prompt) {
    await new Promise(resolve => { setTimeout(resolve, 2000) })
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  }


  return (
    <>
      {
        (!Boolean(messages.length) || !user) &&
        <>
          <div className="py-4">
            <div className="mb-4">
              <h3 className="flex flex-col text-2xl font-semibold w-max bg-gradient-to-r from-gray-500 to-green-500 text-transparent bg-clip-text">
                <span>Hi! John.</span>
                <span>How can I help you?</span>
              </h3>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                disabled={user ? false : true}
                className={`${user ? '' : 'border-gray-200 text-gray-500 hover:bg-white'} max-w-[200px] border border-foreground rounded-lg p-3 text-left hover:bg-gray-100 transition-colors`}
                onClick={() => { setInput(question.text) }}
              >
                <div className="text-lg mb-1">{question.icon}</div>
                <div className="">"{question.text}"</div>
              </button>
            ))}
          </div>
        </>
      }
      {
        Boolean(messages.length) && user &&
        <div className="max-h-[400px] py-10 px-5 overflow-auto" ref={chatRef}>
          {
            messages.map(message => (
              <p className={`bg-blue-100 mb-2 p-1 rounded max-w-[30dvw]
                ${message.is_user_message ? 'ml-auto' : ''}`}
              >{message.text}</p>
            ))
          }
        </div>
      }

      <div className="flex items-center">
        <Input
          ref={inputRef}
          type="text"
          disabled={user ? false : true}
          placeholder={user ? "Ask me anything about the group conversations..." : "Please sign in to chat"}
          className="flex-1 border border-foreground rounded-lg px-4 py-3 mr-2 focus:outline-none "
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="outline" size="icon" className="border-foreground"
          onClick={messageSubmit}
          disabled={user ? false : true}
        >
          <Send />
        </Button>
      </div>
    </>
  );
}