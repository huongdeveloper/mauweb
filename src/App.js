import Header from "./components/Header/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.scss";
import { useEffect } from "react";
import Home from "./components/Home/Home";
import News from "./components/News/News";
import Auction from "./components/Auction/Auction";
import Search from "./components/Search/Search";
import AdminPage from "./pages/Admin/Dashboard";
import NotFound from "./components/NotFound";
import LayoutAdmin from "./pages/Admin/LayoutAdmin";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import TableBox from "./pages/Admin/ListBox";
import TableGroup from "./pages/Admin/ListGroup";
import TablePost from "./pages/Admin/ListPost";
import PostPage from "./components/News/PostPage";
import TableUser from "./pages/Admin/ListUser";
import UserProfile from "./pages/ProfileUser/UserProfile";
import Profile from "./pages/ProfileUser/Profile";
import { useSelector } from 'react-redux';

const Layout = () => {
  return (
    <div className="App">
      <div className='app-header'>
        <Header />
      </div>
      <div className='app-content'>
        <Outlet />
        {/* app content */}
      </div>
    </div>
  );
}

function App() {
  const datauser = useSelector(state => state.account.dataUser);
const item = [
  {
    path: "/",
    element: <Layout/>,
    errorElement: <NotFound/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/news',
        element: <News/>
      },
      {
        path: 'news/:slug',
        element: <PostPage/>
      },
      {
        path: '/auction',
        element: <Auction/>
      },
      {
        path: '/search',
        element: <Search/>
      },
      {
        path: "/userprofile",
        element: <Profile/>,
      },
  
    ]
  },

  
  // {
  //   path: "/history",
  //   element: <HistoryOrder/>,
  // },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },

  {
    path: "/forgotPassword",
    element: <ForgotPassword/>,
  }
]
 

  if(datauser?.role === true) {
    item.unshift(

      {
        path: "/admin",
        element: <LayoutAdmin/>,
        errorElement: <NotFound/>,
        children: [
          {
            index: true,
            element: <AdminPage/>
          },
          {
            path: '/admin/listbox',
            element: <TableBox/>
          },
          {
            path: '/admin/listgroup',
            element: <TableGroup/>
          },
          {
            path: '/admin/listpost',
            element: <TablePost/>
          },
          {
            path: '/admin/listuser',
            element: <TableUser/>
          },
          
        ]
      },
    )
}

const router = createBrowserRouter(
  item
);
  return (
    <>
      {
        <RouterProvider router={router} /> 
      }
      
    </>
  );
}

export default App;
