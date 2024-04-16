import { create } from 'zustand';

// Define the interface for the sidebar drawer store
interface SideBarDrawerStore {
  isSideBarOpen: boolean;
  onSideBarOpen: () => void;
  onSideBarClose: () => void;
}

// Create and export the custom hook useSideBarDrawer using Zustand
export const useSideBarDrawer = create<SideBarDrawerStore>((set) => ({
  isSideBarOpen: false, // Initially, the sidebar drawer is closed
  onSideBarOpen: () => set({ isSideBarOpen: true }), // Function to open the sidebar drawer
  onSideBarClose: () => set({ isSideBarOpen: false }), // Function to close the sidebar drawer
}));