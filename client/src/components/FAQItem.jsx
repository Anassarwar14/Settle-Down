import React, { useState } from 'react';
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";


const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4">
      <button
        onClick={toggleOpen}
        className={`${isOpen && 'text-teal-600'} group mt-2 font-light text-sm sm:text-2xl max-sm:gap-2 text-left w-full flex justify-between items-center rounded-lg py-8 px-1 hover:bg-teal-600 hover:text-zinc-50 transition`}
      >
        <div className='flex items-center gap-3'>{isOpen ? <VscDebugBreakpointLogUnverified />: <VscDebugBreakpointLog className='text-purple-800 group-hover:text-white'/>}{question}</div>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="bg-gray-100 text-zinc-700 text-sm tracking-[0.01em] font-light p-4 rounded-b-2xl shadow-inner">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
