import { lazy, ReactNode, Suspense } from "react"
import { Navigate, useRoutes } from "react-router-dom"
import AuthLayout from "../components/Layouts/AuthLayout"
import HomeLayout from "../components/Layouts/HomeLayout"
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
        // root layout
        {
            path: '/',
            children: [
                // index
                {
                    index: true,
                    element: <Navigate to="/auth/login" />,
                },
                // auth layout
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
                        {
                            path: "update",
                            element: <UpdateUser />
                        }
                    ]
                },

                // home layout
                {
                    path: "home",
                    element: <HomeLayout />,
                    children: [
                        {
                            path: "blogs",
                            element: <Home />
                        },
                        {
                            path: "blogs/:id",
                            element: <Details />
                        }
                    ]
                }
            ]
            ,
        },
        // 404 routes
        {
            path: "*",
            element: <Navigate to={"/auth/login"} replace />,


        }
    ])
}


// auth pages
const Login = Loadable(
    lazy(() => import("../pages/auth/login/Login"))
)

const Register = Loadable(
    lazy(() => import("../pages/auth/register/Register"))
)

const UpdateUser = Loadable(
    lazy(() => import("../pages/auth/updateUser/UpdateUser"))
)

// home pages
const Home = Loadable(
    lazy(() => import("../pages/home/Home"))
)

const Details = Loadable(
    lazy(() => import("../pages/details/Details"))
)

export default Router