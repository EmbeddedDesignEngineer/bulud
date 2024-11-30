"use client"

import {useEffect, useState} from "react"
import {ArrowUp} from "@/public/icons/arrowUp"

const TranslationInput = ({ onChange }: {onChange: (value: string) => void}) => {
    const [value, setValue] = useState<string>('')

    const onSubmit = () => {
        setValue('')
    }

    useEffect(() => {
        onChange(value)
    }, [onChange, value])

    return (
        <form
            onSubmit={onSubmit}
            className={"flex w-fit h-[48px] rounded-[16px] items-center font-medium text-[12px] border-[2px] border-[#0072FF]"}
        >
            <input
                type={"text"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={"flex w-[300px] h-full rounded-[14px] pl-[16px] focus:border-none focus:outline-none bg-transparent"}
            />
            <button type={"submit"} className={"flex w-[48px] h-full rounded-[14px] items-center justify-center bg-transparent"}>
                <ArrowUp/>
            </button>
        </form>
    )
}

export default TranslationInput