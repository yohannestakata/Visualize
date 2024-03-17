import { ThemeProvider } from "@/components/theme-provider"
import Login from "./features/auth/Login"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Login/>
    </ThemeProvider>
  )
}

export default App
