import TheSideBar from "../components/common/TheSideBar"
import TheHeader from "../components/common/TheHeader"
import { Outlet } from "react-router-dom";
import TheFooter from "../components/common/TheFooter"
import { useState } from "react";

const TheLayout = () => {
    const [handle, setHandler] = useState<boolean>(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    const changed = (test: boolean) => {
        setHandler(test)
    }
    return (
        <div className="layout-wrapper ">
            {/****************** SideBar  *******************/}
            <aside className={handle ? "sidebar" : "sidebar mobile-screen"}>
                <TheSideBar handled={handle}  />
            </aside>


            {/****************** Main  *******************/}

            <main className={`d-flex flex-column h-100 ${handle === true ? 'dashboad-pages-wrapper' : 'dashboard-mobile-pages'}`}>

                {/****************** Header  *******************/}
                <header>
                    <TheHeader changeDiv={changed} />
                </header>

                {/****************** Pages  *******************/}
                <div className="pager-warapper mb-5">
                    {/* Pages */}
                    <Outlet />
                </div>

                {/****************** Footer  *******************/}
                <footer>
                    <TheFooter />
                </footer>
            </main>
        </div>
    )
}

export default TheLayout