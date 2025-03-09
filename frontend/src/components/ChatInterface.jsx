"use client";

import { CircleHelp, LoaderCircle, Pencil, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { marked } from 'marked';

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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behaviour: "smooth"
    })
    if (inputRef) inputRef.current.focus();
  }, [messages]);

  useEffect(() => {
    if (!user) return;
    get_history();
  }, [user]);

  async function get_history() {
    const idToken = await user.getIdToken();
    try {
      const res = await fetch("http://localhost:8000/api/v1/chats", {
        headers: {
          Authorization: `Bearer ${idToken}`
        },
      })
      if (res.ok) {
        const data = await res.json();
        console.log(data.messages)
        setMessages(data.messages)
      }
      else
        setMessages([])
    }
    catch (err) {
      console.log(err);
      setMessages([])
    }
  }

  async function messageSubmit() {
    setLoading(true);
    let new_messages = [...messages, { text: input, is_user_message: true, timestamp: new Date().toISOString() }];
    setMessages(new_messages);
    setInput('');
    const response = await get_bot_response(input);
    new_messages = [...new_messages, response];
    setMessages(new_messages);
    setLoading(false);
  }

  async function get_bot_response(input) {
    // await new Promise(resolve => { setTimeout(resolve, 6000) })
    const idToken = await user.getIdToken();
    try {
      const res = await fetch("http://localhost:8000/api/v1/chats", {
        method: "post",
        headers: {
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ message: input })
      })
      if (res.ok) {
        const data = await res.json();
        return data.message;
      }
      return "<error>"
    }
    catch (err) {
      console.log(err);
      return "<error>"
    }
  }


  return (
    <div className='mt-auto'>
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
              <p key={message.timestamp} className={`bg-blue-100 mb-2 p-2 pb-5 rounded w-max max-w-[30dvw] min-w-[100px]
                ${message.is_user_message ? 'ml-auto' : ''} relative`}
              >
                <span dangerouslySetInnerHTML={{ __html: marked.parse(message.text) }}></span>
                {/* {message.text} */}
                <span className="text-xs absolute right-2 bottom-1">{new Date(message.timestamp).toLocaleTimeString()}</span>
              </p>
            ))
          }
        </div>
      }

      <div className="flex items-center">
        <Input
          ref={inputRef}
          type="text"
          disabled={user && !loading ? false : true}
          placeholder={user ? "Ask me anything about the group conversations..." : "Please sign in to chat"}
          className="flex-1 border border-foreground rounded-lg px-4 py-3 mr-2 focus:outline-none "
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => { e.key === 'Enter' && !loading && messageSubmit() }}
        />
        <Button variant="outline" size="icon" className="border-foreground"
          onClick={messageSubmit}
          disabled={user && !loading ? false : true}
        >

          {loading ? <LoaderCircle className="animate-spin" /> : <Send />}
        </Button>
      </div>
    </div>
  );
}