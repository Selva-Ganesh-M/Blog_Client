import { lazy, ReactNode, Suspense } from "react"
import { useRoutes } from "react-router-dom"
import AuthLayout from "../components/Layouts/AuthLayout"
import RegisterLoadingScreen from "../components/loadingScreens/RegisterLoadingScreen"

const Loadable = (Component: React.FC) => (props: any) => {
    return (
        <Suspense fallback={<RegisterLoadingScreen />}>
            <Component {...props} />
        </Suspense>
    )
}


const Router = () => {
    return useRoutes([
        {
            path: '/',
            // element: <AuthLayout />,
            children: [
                {
                    path: 'auth',
                    element: <AuthLayout />,
                    children: [
                        {
                            path: "login",
                            element: <Login />
                        },
                        {
                            path: "register",
                            element: <Register />
                        },
                    ]
                }
            ]
            ,
        },
        {
            path: '/auth',
            element: <AuthLayout />,
            children: [
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "register",
                    element: <Register />
                },
            ]
        }
    ])
}


const Login = Loadable(
    lazy(() => import("../pages/login/Login"))
)

const Register = Loadable(
    lazy(() => import("../../src/pages/register/register"))
)

export default Router