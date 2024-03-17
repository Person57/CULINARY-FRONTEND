import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Loader from "../pages/loader/Loader";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "/",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        {
          path: "forgot",
          element: (
            <GuestGuard>
              <Forget />
            </GuestGuard>
          ),
        },
        {
          path: "otp/:email",
          element: (
            <GuestGuard>
              <Otp />
            </GuestGuard>
          ),
        },
        {
          path: "reset/:email",
          element: (
            <GuestGuard>
              <Reset />
            </GuestGuard>
          ),
        },
      ],
    },
    {

      children: [
        {
          path: "/home",
          element: (
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          ),
          children: [

          ]
        },
        {
          path: "community",
          element: (
            <AuthGuard>
              <Community />
            </AuthGuard>
          ),
          children: [

          ]
        },
        {
          path: "create",
          element: (
            <AuthGuard>
              <CreatePost />
            </AuthGuard>
          ),
          children: [

          ]
        },
        {
          path: "profile",
          element: (
            <AuthGuard>
              <Profile />
            </AuthGuard>
          ),
          children: [

          ]
        },

        {
          path: "notification",
          element: (
            <AuthGuard>
              <Notification />
            </AuthGuard>
          ),
          children: [

          ]
        },
        {
          path: "search",
          element: (
            <AuthGuard>
              <Search />
            </AuthGuard>
          ),
          children: [

          ]
        },
        {
          path: "cart",
          element: (
            <AuthGuard>
              <Yourcart />
            </AuthGuard>
          ),
          children: [

          ]
        }

      ],
    },
    {
      path: "*",
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

const Login = Loadable(lazy(() => import("../pages/loginForms/Login")));

const Register = Loadable(lazy(() => import("../pages/loginForms/Register")));
const Forget = Loadable(lazy(() => import("../pages/loginForms/Forget")));
const Otp = Loadable(lazy(() => import("../pages/loginForms/Otp")));
const Reset = Loadable(lazy(() => import("../pages/loginForms/Reset")));

const DashboardLayout = Loadable(lazy(() => import("../pages/dashboard/home")));

const Community = Loadable(lazy(() => import("../pages/community/community")));

const CreatePost = Loadable(lazy(() => import("../pages/createpost/create")));

// const Profile = Loadable(lazy(() => import("../pages/dashboard/profile")));

const Profile = Loadable(lazy(()=>import("../pages/Profile/Profile")));

const Notification = Loadable(lazy(() => import("../pages/notfications/notification")));

const Search = Loadable(lazy(() => import("../pages/search/search")));

const Yourcart = Loadable(lazy(() => import("../pages/dashboard/yourcart")));


const NotFound = Loadable(lazy(() => import("../pages/404/Page404")));

