"use client"

import {useState} from "react"
import { GoogleGenerativeAI } from "@google/generative-ai";
import TranslationInput from "@/app/translate/(components)/TranslationInput";
import TranslationField from "@/app/translate/(components)/TranslationField";
import root from "@/app/root.module.css";


const genAI = new GoogleGenerativeAI("AIzaSyDKwDS2MaOPq9BMMnnBNtDQOp3COaZe9jM");

const TranslatePage = () => {
    const [translation, setTranslation] = useState<string>('')
    const [generatedSentence, setGeneratedSentence] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleTranslation = async (word: string) => {
        if (!word) return;

        setIsLoading(true)
        try {
            // Translate the word and generate a sentence
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});

            const translationPrompt = `Translate this word to English. The word is already in Azərbaycan language. Word: ${word}`;
            const translationResult = await model.generateContent(translationPrompt);
            const translatedWord = translationResult.response.text().trim();
            setTranslation(translatedWord);

            const sentencePrompt = `Create a natural and easy-to-understand example sentence using the word: ${translatedWord}`;
            const sentenceResult = await model.generateContent(sentencePrompt);
            const sentence = sentenceResult.response.text().trim();
            setGeneratedSentence(sentence);

            setIsLoading(false)
        } catch (error) {
            console.error('Translation error:', error);
            setTranslation('Translation failed');
            setGeneratedSentence('Sentence generation failed');
            setIsLoading(false)
        }
    }

    return (
        <div className={root.layout && "flex w-full h-full relative desktop:flex-row phone:flex-col"}>
            <div className={"flex w-full desktop:h-full phone:p-[40px] items-center justify-center"}>
                <TranslationInput onChange={handleTranslation} />
            </div>

            <div className={"desktop:w-[600px] mobile:w-full h-full desktop:p-[20px] phone:p-[10px]"}>
                <TranslationField
                    translation={translation}
                    generatedSentence={generatedSentence}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default TranslatePage