import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HowItWorks from "./pages/HowItWorks";
import HowItWorks1 from "./pages/HowItWorks1";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import MyProfile from "./pages/MyProfile";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Category from "./pages/Category";
import ScrollToTop from "./components/common/ScrollToTop";
import MyPostedJobs from "./pages/MyPostedJobs";
import MyApplications from "./pages/MyApplications";
import AllJobs from "./pages/AllJobs";
import PostJob from "./pages/PostJob";
import AllCategories from "./pages/AllCategories";
import OpenRoute from "./components/core/auth/OpenRoute";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Message from "./pages/Message"
// import Message from "./pages/Message"
import useLenis from "./hooks/useLenis";
// import Message from "./pages/Message"

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    useLenis();
    return (
        <div className="w-full min-h-screen flex flex-col items-center font-inter overflow-x-hidden">
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <OpenRoute>
                            <Home />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/Login"
                    element={
                        <OpenRoute restricted={true}>
                            <Login />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/Signup"
                    element={
                        <OpenRoute restricted={true}>
                            <Signup />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/how-it-works"
                    element={
                        <OpenRoute>
                            <HowItWorks1 />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <OpenRoute>
                            <AboutUs />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/category/:categoryName"
                    element={
                        <OpenRoute>
                            <Category />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/categories"
                    element={
                        <OpenRoute>
                            <AllCategories />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/my-posted-jobs"
                    element={
                        <PrivateRoute>
                            <MyPostedJobs />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/my-applications"
                    element={
                        <PrivateRoute>
                            <MyApplications />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/my-profile"
                    element={
                        <PrivateRoute>
                            <MyProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/job"
                    element={
                        <OpenRoute>
                            <AllJobs />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/post-job"
                    element={
                        <PrivateRoute>
                            <PostJob />
                        </PrivateRoute>
                    }
                />

                <Route path="/messages"
                element={
                    <PrivateRoute>
                        <Message/>
                    </PrivateRoute>
                }
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
