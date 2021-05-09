import Pages from "pages";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#0294F2" as any,
      },
    },
  });
  return (
    <div className="fixed left-0 top-0 w-full h-full">
      <ThemeProvider theme={theme}>
        <Pages></Pages>
      </ThemeProvider>
    </div>
  );
}

export default App;
