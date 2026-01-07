
import React, { useState } from 'react';
import { ScriptOption } from '../types';

interface ResponseOptionProps {
  option: ScriptOption;
}

const ResponseOption: React.FC<ResponseOptionProps> = ({ option }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(option.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition-colors shadow-sm">
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>已复制</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>复制</span>
            </>
          )}
        </button>
      </div>
      <div className="pr-12">
        <span className="inline-block px-2 py-0.5 mb-3 text-[10px] uppercase tracking-wider font-bold bg-indigo-50 text-indigo-600 rounded">
          {option.style}
        </span>
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{option.content}</p>
      </div>
    </div>
  );
};

export default ResponseOption;
