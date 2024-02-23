import { useEffect } from "react";
import { create } from "zustand";

interface AccessIdState {
  localAccessId: string | null;
  setLocalAccessId: (newAccessId: string | null) => void;
  clearAccessId: () => void;
}

// Define a Zustand store for managing accessId
const useLocalAccessIdStore = create<AccessIdState>((set) => ({
  localAccessId: null,
  setLocalAccessId: (newAccessId) => {
    if (newAccessId) localStorage.setItem("localAccessId", newAccessId);
    else localStorage.removeItem("localAccessId");
    set({ localAccessId: newAccessId });
  },
  clearAccessId: () => {
    localStorage.removeItem("localAccessId");
    set({ localAccessId: null });
  },
}));

const useLocalAccessId = () => {
  const { localAccessId, setLocalAccessId, clearAccessId } =
    useLocalAccessIdStore();

  useEffect(() => {
    try {
      const value = localStorage.getItem("localAccessId");
      setLocalAccessId(value);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { localAccessId, setLocalAccessId, clearAccessId };
};

export default useLocalAccessId;
