import {create} from 'zustand'

// const useStore = create((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({bears: state.bears + 1})),
//     removeAllBears: () => set({bears: 0}),
//     updateBears: (newBears) => set({bears: newBears}),
// }))

interface AuthStore {
    id: string | null;
    email: string;
    role: string;
    setId: (v: string) => void;
    setEmail: (v: string) => void;
    setRole: (v: string) => void;
    reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    id: "",
    email: "",
    role: "",

    setId: (newId) => set({id: newId}),
    setEmail: (newEmail) => set({email: newEmail}),
    setRole: (newRole) => set({role: newRole}),

    reset: () => set({id: "", email: "", role: ""})
}))