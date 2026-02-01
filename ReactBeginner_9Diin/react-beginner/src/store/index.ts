import {create} from 'zustand'
import {persist} from "zustand/middleware";

// const useStore = create((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({bears: state.bears + 1})),
//     removeAllBears: () => set({bears: 0}),
//     updateBears: (newBears) => set({bears: newBears}),
// }))

// interface AuthStore {
//     id: string | null;
//     email: string;
//     role: string;
//     setId: (v: string) => void;
//     setEmail: (v: string) => void;
//     setRole: (v: string) => void;
//     reset: () => void;
// }

// Zustand에서 persist 기능이란, 상태를 브라우저의 로컬 스토리지나 세션 스토리지에 저장이 가능하도록 구현해주는 함수.
// 페이지를 새로고침 하거나 브라우저를 닫았다가 열어도 상태를 유지할 수 있게 해주는 기능이다.

// Zustand는 리액트에서 사용되는 간단한 글로벌 상태관리 라이브러리 이다.
// export const useAuthStore = create<AuthStore>((set) => ({
//     id: "",
//     email: "",
//     role: "",
//
//     setId: (newId) => set({id: newId}),
//     setEmail: (newEmail) => set({email: newEmail}),
//     setRole: (newRole) => set({role: newRole}),
//
//     reset: () => set({id: "", email: "", role: ""})
// }))


// Persist 미들웨어를 사용하면 store의 데이터를 브라우저 스토리지에 저장할 수 있다.
// 이를 통해, 상태를 유지(persist) 할 수 있고, 예를들어 로그인 상태, 장바구니, 테마설정 등 페이지를 새로고침해도 상태를 유지되게 처리가능 하다.

// 단 브라우저의 쿠키삭제와 같은 브라우저 초기화를 진행할 경우 상태가 초기화 된다.

interface User {
    id: string | null;
    email: string;
    role: string;

}

interface AuthStore {
    user: User;
    setUser: (newUser: User) => void;
    reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: {
                id: "",
                email: "",
                role: "",
            },
            setUser: (newUser: User) => set({user: newUser}),
            reset: () => {
                set({
                    user: {id: "", email: "", role: "",}
                });
                localStorage.removeItem('auth-storage');
            },
        }),
        {name: 'auth-storage'}
    )
)