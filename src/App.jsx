import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./pages/errorPage"
import SearchPage from "./pages/searchPage"
import { Provider } from "react-redux"
import store from "./redux/store"

const router = createBrowserRouter([
    {
        path: "/",
        element: <SearchPage />,
        errorElement: <ErrorPage />
    }
])

function App() {

    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>

    )
}

export default App
