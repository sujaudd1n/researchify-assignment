"use client";

import { useState } from 'react';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="flex flex-col m-[max(5px,min(3dvw,100px))]">
      <Header
        name="John"
        messageCount={132}
        notificationCount={23}
      />
    </div>
  );
}
