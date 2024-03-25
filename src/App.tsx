import { Logos, Title } from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Logos />
      <Title />
    </QueryClientProvider>
  );
}

export default App;
