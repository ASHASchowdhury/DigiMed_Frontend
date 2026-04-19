import React from 'react';
import { Brain } from 'lucide-react';

const AIPortal = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2">
          <Brain size={32} className="text-indigo-600" />
          <h1 className="text-3xl font-bold">AI Medical Assistant</h1>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
        <p className="text-center text-gray-500">AI Portal content will appear here</p>
      </div>
    </div>
  );
};

export default AIPortal;
