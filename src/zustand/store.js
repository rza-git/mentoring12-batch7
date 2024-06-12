import { create } from 'zustand'

const useStore = create((set) => ({
    products: [],
    setProducts: (data) => set(() => ({products: data}))
}))


export default useStore;