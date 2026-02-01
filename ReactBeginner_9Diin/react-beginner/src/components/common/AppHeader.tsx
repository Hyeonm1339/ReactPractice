import {Separator} from "@/components/ui";
import {NavLink, useNavigate} from "react-router";
import {useAuthStore} from "@/store";
import {useShallow} from "zustand/react/shallow";

function AppHeader() {
    const navigate = useNavigate();

    // const {email, reset} = useAuthStore(useShallow((state) => ({
    //     email: state.email,
    //     reset: state.reset
    // })));
    const {user, reset} = useAuthStore(useShallow((state) => ({
        user: state.user,
        reset: state.reset
    })));


    return (
        <header className="fixed top-0 z-20 w-full flex items-center justify-center bg-[#121212]">
            <div className="w-full max-w-[1328px] flex items-center justify-between px-6 py-3">
                {/*로고 & 네비게이션 메뉴 UI*/}
                <div className="flex items-center gap-5">
                    <img src="https://github.com/9diin.png" alt="@LOGO" className="w-6 h-6 cursor-pointer"
                         onClick={() => navigate('/')}/>
                    <div className="flex items-center gap-5">
                        <div className="font-semibold">토픽 인사이트</div>
                        <Separator orientation="vertical" className="!h-4"/>
                        <div className="font-semibold">포트폴리오</div>
                    </div>
                </div>
                {/*로그인UI*/}
                {user.id ?
                    (
                        <div className="flex items-center gap-5">
                            <span>{user.email}</span>
                            <Separator orientation={"vertical"} className="!h-4"/>
                            <span onClick={reset}>로그아웃</span>
                        </div>
                    ) :
                    (
                        <NavLink to={"/sign-in"}
                                 className="font-semibold text-muted-foreground hover:text-white transition-all duration-500">로그인
                        </NavLink>
                    )
                }
            </div>
        </header>
    )
}

export {AppHeader}