import React, { useState } from 'react';
import { Brain, Send, AlertCircle, Loader, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const AIPortal = () => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

 
    if (!symptoms.trim()) {
      toast.error("Please describe your symptoms");
      return;
    }

    setLoading(true);
    // Simulate AI analysis (connect to your backend when ready)
    setTimeout(() => {
      const mockResponse = {
        analysis: "Based on the symptoms described, this may indicate a common viral infection, seasonal allergies, or mild respiratory condition. Common symptoms include fever, fatigue, and body aches, which typically resolve within 3-5 days with proper rest and hydration.",
        recommendations: "1. Get plenty of rest (7-8 hours of sleep)\n2. Stay hydrated with warm fluids\n3. Monitor body temperature\n4. Use over-the-counter fever reducers if needed\n5. Consult a doctor if symptoms persist beyond 5 days or worsen",
        suggestedSpecialization: "General Medicine / Primary Care Physician",
        severity: "Mild to Moderate",
        disclaimer: "⚠️ This is an AI-generated preliminary analysis for informational purposes only. It is not a medical diagnosis. Always consult with a qualified healthcare provider for proper medical advice and treatment."
      };
      setResult(mockResponse);
      setLoading(false);
      toast.success("Analysis complete");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="inline-flex p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-lg mb-4">
          <Brain className="text-white" size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Medical Assistant</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Describe your symptoms for instant AI-powered analysis</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Describe your symptoms in detail
        </label>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="E.g., I have been experiencing fever (101°F), dry cough, headache, and fatigue for the past 3 days. No difficulty breathing..."
          className="w-full h-40 p-4 text-base rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white"
        />

        <button
          onClick={analyzeSymptoms}
          disabled={loading}
          className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
          {loading ? 'Analyzing with AI...' : 'Get AI Analysis'}
        </button>

        {result && (
          <div className="mt-8 space-y-6 animate-fade-in">
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-3 flex items-center gap-2">
                <Sparkles size={18} /> AI Analysis
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{result.analysis}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommended Actions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{result.recommendations}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Specialization</h4>
                <p className="text-purple-600 dark:text-purple-400 font-semibold">{result.suggestedSpecialization}</p>
                <h4 className="font-medium text-gray-900 dark:text-white mt-3 mb-1">Severity</h4>
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">{result.severity}</span>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
              <p className="text-amber-700 dark:text-amber-400 text-sm flex items-start gap-2">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                {result.disclaimer}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPortal;
