import MainComponent from "./components/MainComponent";
import { LanguageProvider } from "./context/language/LanguageProvider";

function App() {
  return (
    <>
      <LanguageProvider>
        <MainComponent />
      </LanguageProvider>
    </>
  );
}

export default App;
