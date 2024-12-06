interface StoredWord {
    word: string;
    timestamp: number;
}

class WordStorageService {
    private static STORAGE_KEY = 'translationWords';

    // Get all stored words
    static getStoredWords(): StoredWord[] {
        if (typeof window === 'undefined') return [];

        const savedWords = localStorage.getItem(this.STORAGE_KEY);
        try {
            const parsedWords = savedWords ? JSON.parse(savedWords) : [];
            return Array.isArray(parsedWords) ? parsedWords : [];
        } catch (error) {
            console.error('Error parsing stored words:', error);
            return [];
        }
    }

    // Add a new word
    static addWord(word: string): void {
        if (typeof window === 'undefined') return;

        const trimmedWord = word.trim();
        if (!trimmedWord) return;

        const storedWords = this.getStoredWords();

        // Check if word already exists (case-insensitive)
        const wordExists = storedWords.some(w =>
            w.word.toLowerCase() === trimmedWord.toLowerCase()
        );

        if (!wordExists) {
            const newWord: StoredWord = {
                word: trimmedWord,
                timestamp: Date.now()
            };

            const updatedWords = [...storedWords, newWord];
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedWords));
        }
    }

    // Clear all words
    static clearWords(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(this.STORAGE_KEY);
    }
}

export default WordStorageService;