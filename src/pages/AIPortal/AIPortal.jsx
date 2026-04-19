import React, { useState } from 'react';
import { analyzeSymptoms, askMedicalQuestion } from '../../services/aiService';
import { Brain, Send, Activity, MessageCircle, Loader, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const AIPortal = () => {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [qaLoading, setQaLoading] = useState(false);

  const handleSymptomAnalysis = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast.error('Please enter symptoms');
      return;
    }
    setLoading(true);
    try {
      const response = await analyzeSymptoms(symptoms, '', '', '');
      setAnalysis(response.analysis);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }
    setQaLoading(true);
    try {
      const response = await askMedicalQuestion(question);
      setAnswer(response.answer);
      toast.success('Answer received!');
    } catch (error) {
      toast.error('Failed to get answer');
    } finally {
      setQaLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 gradient-text">
          <Brain size={32} className="text-indigo-600" />
          <h1 className="text-3xl font-bold">AI Medical Assistant</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Powered by advanced AI for medical analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Symptom Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <div className="flex items-center gap-2">
              <Activity size={24} />
              <h2 className="text-lg font-semibold">Symptom Analysis</h2>
            </div>
          </div>
          <form onSubmit={handleSymptomAnalysis} className="p-6 space-y-4">
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe your symptoms... (e.g., Fever, headache, cough for 3 days)"
              required
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Brain size={20} />}
              {loading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          </form>
          {analysis && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-indigo-50 dark:bg-gray-900/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-600" /> 
                Analysis Result:
              </h3>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{analysis}</div>
            </div>
          )}
        </div>

        {/* Medical Q&A */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle size={24} />
              <h2 className="text-lg font-semibold">Medical Q&A</h2>
            </div>
          </div>
          <form onSubmit={handleAskQuestion} className="p-6 space-y-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Ask any medical question..."
              required
            />
            <button 
              type="submit" 
              disabled={qaLoading} 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {qaLoading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
              {qaLoading ? 'Getting Answer...' : 'Ask Question'}
            </button>
          </form>
          {answer && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-purple-50 dark:bg-gray-900/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <MessageCircle size={18} className="text-purple-600" /> 
                AI Response:
              </h3>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{answer}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPortal;