import React from "react";
import Root from "Pages/index";
import { Provider } from "react-redux";

import { store } from "Store";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";

const theme = createMuiTheme({
  palette: {
    primary: {
      ...blue,
      main: '#7563FF',
    },
    secondary: pink
  },
  typography: {
    fontFamily: [
      "Google Sans",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ThemeProvider theme={theme}>
            <Root />
          </ThemeProvider>
        </div>
      </Provider>
    );
  }
}

export default App;
