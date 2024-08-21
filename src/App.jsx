import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import SearchPage from "./pages/searchPage";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
