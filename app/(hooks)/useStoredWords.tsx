import { useState, useEffect } from 'react';

interface StoredWord {
    word: string;
    timestamp: number;
}

export const useStoredWords = () => {
    const [storedWords, setStoredWords] = useState<StoredWord[]>([]);

    useEffect(() => {
        // Load words from localStorage when hook is used
        const savedWords = localStorage.getItem('translationWords');
        if (savedWords) {
            try {
                const parsedWords = JSON.parse(savedWords);
                setStoredWords(Array.isArray(parsedWords) ? parsedWords : []);
            } catch (error) {
                console.error('Error parsing stored words:', error);
            }
        }
    }, []);

    const addWord = (word: string) => {
        const trimmedWord = word.trim();
        if (!trimmedWord) return;

        const newWord: StoredWord = {
            word: trimmedWord,
            timestamp: Date.now()
        };

        // Check if word already exists (case-insensitive)
        const wordExists = storedWords.some(w =>
            w.word.toLowerCase() === trimmedWord.toLowerCase()
        );

        if (!wordExists) {
            const updatedWords = [...storedWords, newWord];
            setStoredWords(updatedWords);
            localStorage.setItem('translationWords', JSON.stringify(updatedWords));
        }
    };

    const clearWords = () => {
        setStoredWords([]);
        localStorage.removeItem('translationWords');
    };

    return {
        storedWords,
        addWord,
        clearWords
    };
};