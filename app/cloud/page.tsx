"use client"

import {useStoredWords} from "@/app/(hooks)/useStoredWords";

const CloudPage = () => {
    const { storedWords } = useStoredWords();

    return (
        <>
            {storedWords.map(word => (
                <div key={word.timestamp} className={"bg-[#0072FF] rounded-[12px] p-[10px] text-white"}>
                    {word.word}
                </div>
            ))}
        </>
    )
}

export default CloudPage