
import React, { useState, useCallback } from 'react';
import { StyleType, AppState, ScriptOption } from './types';
import { STYLE_CONFIGS, CONTEXTS } from './constants';
import { scriptService } from './services/geminiService';
import StyleCard from './components/StyleCard';
import ResponseOption from './components/ResponseOption';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    input: '',
    selectedStyle: StyleType.PROFESSIONAL,
    context: CONTEXTS[0],
    results: [],
    isLoading: false,
    error: null,
  });

  const handleGenerate = async () => {
    if (!state.input.trim()) {
      setState(prev => ({ ...prev, error: '请输入您想转化的原话' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null, results: [] }));

    try {
      const generatedScripts = await scriptService.generateScripts(
        state.input,
        state.selectedStyle,
        state.context
      );
      setState(prev => ({ ...prev, results: generatedScripts, isLoading: false }));
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err.message, isLoading: false }));
    }
  };

  const setStyle = (style: StyleType) => {
    setState(prev => ({ ...prev, selectedStyle: style }));
  };

  const setContext = (context: string) => {
    setState(prev => ({ ...prev, context }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">灵犀话术 <span className="text-indigo-600">MagicScript</span></h1>
          </div>
          <div className="hidden sm:block text-sm text-gray-500">
            赋能每一位客服，让沟通更具艺术感
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input & Config */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                1. 输入您的原话或核心意图
              </label>
              <textarea
                value={state.input}
                onChange={(e) => setState(prev => ({ ...prev, input: e.target.value, error: null }))}
                placeholder="例如：快递还没到，让他再等等。或者：这个价格已经最低了，没法再便宜了。"
                className="w-full h-40 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2. 沟通场景
                </label>
                <select
                  value={state.context}
                  onChange={(e) => setContext(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  {CONTEXTS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={state.isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2 ${
                state.isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
              }`}
            >
              {state.isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>正在深度润色中...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>立即生成金牌话术</span>
                </>
              )}
            </button>

            {state.error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm flex items-center space-x-2 border border-red-100">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{state.error}</span>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-4 px-2">3. 选择风格偏好</h2>
            <div className="grid grid-cols-2 gap-4">
              {STYLE_CONFIGS.map((config) => (
                <StyleCard
                  key={config.type}
                  {...config}
                  isSelected={state.selectedStyle === config.type}
                  onClick={() => setStyle(config.type)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col min-h-[600px]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                <span>生成结果</span>
                {state.results.length > 0 && <span className="ml-2 text-xs font-normal text-gray-400">已生成 3 个推荐方案</span>}
              </h2>
            </div>

            {state.results.length > 0 ? (
              <div className="space-y-6 flex-1">
                {state.results.map((option) => (
                  <ResponseOption key={option.id} option={option} />
                ))}
                <div className="pt-6 border-t border-dashed border-gray-100 text-center">
                  <p className="text-sm text-gray-400 italic">💡 提示：点击右上角复制按钮即可快速使用话术</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                {state.isLoading ? (
                  <div className="space-y-4">
                    <div className="flex space-x-2 justify-center">
                      <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
                    </div>
                    <p className="text-indigo-600 font-medium">灵犀正在为您构思最佳措辞...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                      <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-gray-900 font-semibold mb-2">等待生成</h3>
                    <p className="text-gray-500 text-sm max-w-xs">
                      在左侧输入您的需求并点击“立即生成”，我们将为您提供多个专业的沟通方案。
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          © 2024 MagicScript AI. 您的专业客户沟通智库。
        </div>
      </footer>
    </div>
  );
};

export default App;
