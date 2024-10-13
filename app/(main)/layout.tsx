import React from "react"
import { NavigationSidebar } from "../../components/navigation/navigation-sidebar"
const MainLayout = async({
    children
}:{
    children:React.ReactNode
})=>{
    return(
        <div className="h-full">
            <div className="block md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div>
            <main className="pl-[72px] h-full">
            {children}
            </main>
        </div>
    )
}

export default MainLayout