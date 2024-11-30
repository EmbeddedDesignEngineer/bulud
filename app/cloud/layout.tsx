import {ReactNode} from "react"
import root from '@/app/root.module.css'

import NavigationBar from "@/app/(ui)/NavigationBar"

const CloudLayout = ({children}: {children:ReactNode}) => {
    return (
        <main className={root.layout}>
            {children}
            <NavigationBar />
        </main>
    )
}

export default CloudLayout