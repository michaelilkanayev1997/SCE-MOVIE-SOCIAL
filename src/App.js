import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Detail from "./pages/Detail";
import PersonDetail from "./pages/PersonDetail";
import LoginPage from "./pages/LoginPage";
import AboutUs from "./pages/AboutUs";
import Search from "./pages/Search";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDash from "./pages/AdminDash";
import { useLocation } from "react-router-dom";
import ActiveUsers from "./pages/ActiveUsers";
import AdminRoute from "./components/AdminRoute";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import AdminMessages from "./pages/AdminMessages";
import ContactUs from "./pages/ContactUs";
import Cookies from "./pages/Cookies";
import TermsAndPolicies from "./pages/TermsAndPolicies";
import FavoritesPage from "./pages/FavoritesPage ";
import MediaList from "./pages/MediaList";
import PostsPage from "./pages/PostsPage";
import PostsReports from "./pages/PostsReports";
import AddAdmin from "./pages/AddAdmin";
import Faq from "./pages/Faq";
import ReadMore from "./pages/ReadMore";

const App = () => {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      <AuthContextProvider>
        {location.pathname !== "/admin" &&
          location.pathname !== "/activeusers" &&
          location.pathname !== "/adminMessages" &&
          location.pathname !== "/postsReports" &&
          location.pathname !== "/addAdmin" && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/personDetails" element={<PersonDetail />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/readmore" element={<ReadMore />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/search" element={<Search />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/termsandpolicies" element={<TermsAndPolicies />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/movie" element={<MediaList mediaType="movie" />} />
          <Route path="/tv" element={<MediaList mediaType="tv" />} />
          <Route path="/Posts" element={<PostsPage />} />
          <Route path="/myPosts" element={<PostsPage myPosts={true} />} />
          <Route
            path="/myFavorites"
            element={<PostsPage myFavorites={true} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDash />} />
            <Route path="/activeusers" element={<ActiveUsers />} />
            <Route path="/adminMessages" element={<AdminMessages />} />
            <Route path="/postsReports" element={<PostsReports />} />
            <Route path="/addAdmin" element={<AddAdmin />} />
          </Route>
        </Routes>
        {location.pathname !== "/admin" &&
          location.pathname !== "/activeusers" &&
          location.pathname !== "/adminMessages" &&
          location.pathname !== "/postsReports" &&
          location.pathname !== "/addAdmin" && <Footer />}
      </AuthContextProvider>
    </>
  );
};

export default App;