import {ReactNode} from "react"
import NavigationBar from "@/app/(ui)/NavigationBar"
import root from "@/app/root.module.css"

const TranslateLayout = ({children}: {children:ReactNode}) => {
    return (
        <main className={root.layout}>
            {children}
            <NavigationBar />
        </main>
    )
}

export default TranslateLayout


