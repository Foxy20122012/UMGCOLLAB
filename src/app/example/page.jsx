'use client';
import { useState } from 'react';

export default function Page() {
  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  const forbiddenWords = ['puta', 'mierda', 'coger'];

  const validateInput = (value) => {
    let containsForbiddenWord = false;
    let highlightedValue = '';
    let forbiddenWordsFound = [];
  
    forbiddenWords.forEach(word => {
      if (value.includes(word)) {
        containsForbiddenWord = true;
        forbiddenWordsFound.push(word);
        const regex = new RegExp(`(${word})`, 'gi');
        highlightedValue = highlightedValue + ' ' + value.match(regex).join(' ');
      }
    
  
    setIsButtonDisabled(containsForbiddenWord);
    setWarningMessage(containsForbiddenWord ? `Las siguientes palabras violan las normas: ${forbiddenWordsFound.join(', ')}.` : '');
    setHighlightedText(highlightedValue.trim());
  })
}

  



  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    validateInput(value);
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Escribe algo..."
      />
      <div
        className="w-full p-2 mt-2 border border-gray-300 rounded-md text-red-600"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      />
      {warningMessage && <p className="text-red-500 mt-2">{warningMessage}</p>}
      <button
        className={`mt-4 px-4 py-2 rounded-md text-white font-semibold ${isButtonDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        disabled={isButtonDisabled}
      >
        Submit
      </button>
    </div>
  );
}
