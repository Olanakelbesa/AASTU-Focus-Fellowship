import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type ThemeState = {
  mode: "light" | "dark" | "system"
}

// Initialize state from localStorage if available, otherwise default to system
const getInitialTheme = (): ThemeState => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system")) {
      return { mode: savedTheme }
    }
  }
  return { mode: "system" }
}

const initialState: ThemeState = getInitialTheme()

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.mode = action.payload
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload)
      }
    },
    toggleTheme: (state) => {
      // Toggle between light and dark, preserving system if that's the current mode
      if (state.mode === "system") {
        // If system, we need to check the current system preference
        if (typeof window !== "undefined") {
          const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
          state.mode = systemPrefersDark ? "light" : "dark"
        } else {
          state.mode = "light" // Default if window is not available
        }
      } else {
        state.mode = state.mode === "dark" ? "light" : "dark"
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode)
      }
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
