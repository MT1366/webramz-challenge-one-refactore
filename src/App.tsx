import { QueryClientProvider } from "@tanstack/react-query";
import MainComponent from "./components/MainComponent";
import { LanguageProvider } from "./context/language/LanguageProvider";
import { queryClient } from "./lib/reactQuery/queryClient";

function App() {
  return (
    <>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <MainComponent />
        </QueryClientProvider>
      </LanguageProvider>
    </>
  );
}

export default App;
