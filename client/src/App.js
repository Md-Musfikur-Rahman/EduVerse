import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import LoginPage from "./pages/loginPage/loginPage";
import ProfilePage from "./pages/profilePage/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import FriendPage from "./pages/friend/friendPage";
import UpdatePage from "./pages/profilePage/updatePage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" Component={LoginPage} />
            <Route
              path="/home"
              Component={isAuth ? HomePage : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              Component={isAuth ? ProfilePage : <Navigate to="/" />}
            />
            <Route
              path="/friend"
              Component={isAuth ? FriendPage : <Navigate to="/" />}
            />
            <Route
              path="/update/:userId"
              Component={isAuth ? UpdatePage : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
