import {ReactNode} from "react";
import Sidebar from "./Sidebar";
import SidebarResponsive from "./SidebarResponsive";

interface AppProps {
    children: ReactNode;
}

const AppLayout = ({children}: AppProps): JSX.Element => {
    return (
        <>
            <div className="h-full">
                <SidebarResponsive/>
                <Sidebar/>
                <div className="md:col-span-3 md:ml-80 min-h-screen bg-gray-50">
                    <div className="px-[20px] pb-6 overflow-hidden lg:mr-7">{children}</div>
                </div>
            </div>
        </>
    );
}

export default AppLayout;