import React, { useState, useCallback } from 'react';
import { generatePartyThemes } from './services/geminiService';
import type { PartyTheme } from './types';
import { ThemeCard } from './components/ThemeCard';
import { Spinner } from './components/Spinner';

const App: React.FC = () => {
  const [themes, setThemes] = useState<PartyTheme[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>('');

  const handleGenerateThemes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setThemes([]);
    try {
      const newThemes = await generatePartyThemes(userInput);
      setThemes(newThemes);
    } catch (err) {
      setError('Desculpe, não foi possível gerar as ideias. Tente novamente mais tarde!');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  const PartyPopperIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM3 9a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 4a1 1 0 100 2h10a1 1 0 100-2H4z" clipRule="evenodd" />
      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM5.5 3.5a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM14.5 3.5a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707z" />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 transition-all duration-500">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full md:w-5/12 flex-shrink-0">
            <img
              src="https://i.imgur.com/Fd4thuF.jpg"
              alt="Criança com penteado de cabelo maluco em formato de paleta de artista"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>

          <div className="w-full md:w-7/12 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-4 mb-4">
              <PartyPopperIcon />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Gerador de Temas de Festa
              </h1>
            </div>
            <p className="text-gray-600 mb-6 text-lg">
              Sem ideias para a Semana da Criança? Deixe a gente ajudar!
            </p>

            <div className="w-full max-w-md mx-auto md:mx-0 mb-6">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Incluir uma ideia? Ex: cabelo maluco"
                className="w-full text-center md:text-left p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                aria-label="Sugestão de tema de festa"
              />
            </div>

            <button
              onClick={handleGenerateThemes}
              disabled={isLoading}
              className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-all duration-300 disabled:bg-pink-300 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? 'Gerando Magia...' : 'Gerar Novas Ideias!'}
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="mt-12 flex justify-center">
            <Spinner />
          </div>
        )}

        {error && (
          <div className="mt-12 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
            <p className="font-bold">Oops!</p>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && themes.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {themes.map((theme, index) => (
              <ThemeCard key={index} theme={theme} />
            ))}
          </div>
        )}
      </main>
      <footer className="text-center mt-8 text-gray-600/80">
        <p>Criado com diversão e IA 🤖</p>
      </footer>
    </div>
  );
};

export default App;