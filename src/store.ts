import { create } from "zustand";

interface FormData {
  name: string;
  phone: string;
  // dates: { date: Date; number: number; color: string }[];
}

type DateStore = {
  formData: FormData | null;
  submit: (FormData: FormData) => void;
  updateColor: (index: number, color: string) => void;
};

export const useDateStore = create<DateStore>((set) => ({
  formData: null,
  submit: (formData: FormData) => set({ formData }),
  updateColor: (index, color) =>
    set((state) => {
      if (state.formData) {
        const updatedFormData = {
          ...state.formData,
          dates: state.formData.dates.map((item, idx) =>
            idx === index ? { ...item, color } : item
          ),
        };
        return { formData: updatedFormData };
      }
      return state;
    }),
}));
