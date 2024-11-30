"use client"

import {navigations} from "@/app/constants"
import {cloneElement, useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {usePathname} from "next/navigation"

import {cn} from "@/lib/utils"

export const NavigationBar = () => {
    const router = useRouter()
    const pathname = usePathname()

    const [isActive, setIsActive] = useState<string>(pathname)

    useEffect(() => {
        setIsActive(pathname)
    }, [pathname])

    return (
        <div className={"flex absolute w-fit h-fit rounded-[20px] p-[4px] desktop:bottom-[20px] phone:bottom-[16px] bg-background shadow-2xl"}>
            {navigations.map(navigation => (
                <div
                    key={navigation.path}
                    onMouseDown={() => router.push(navigation.path)}
                    className={cn(
                        "flex w-[48px] h-[48px] rounded-[16px] items-center justify-center",
                        navigation.path === isActive && "bg-[#0072FF]"
                    )}
                >
                    {navigation.path === isActive ?
                        cloneElement(navigation.icon, {color: "white"}) :
                        navigation.icon
                    }
                </div>
            ))}
        </div>
    )
}

export default NavigationBar