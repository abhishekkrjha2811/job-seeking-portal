import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice";
// import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { SIGNUP_API, VERIFY_EMAIL_API, LOGIN_API } = endpoints;

export function signUp(signupData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        console.log(SIGNUP_API);
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName: signupData.firstName,
                lastName: signupData.lastName,
                email: signupData.email,
                phone: signupData.phone,
                password: signupData.createPassword,
                role: signupData.accountType,
                branch: signupData.branch,
                year: signupData.year,
            });

            console.log("SIGNUP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("OTP sent to your email. Please verify.");
            dispatch(setLoading(false));
            toast.dismiss(toastId);
            // Don't navigate yet, wait for OTP verification
            return response.data;
        } catch (error) {
            console.log("SIGNUP API ERROR............", error);
            toast.error(error?.response?.data?.message || "Signup Failed");
            dispatch(setLoading(false));
            toast.dismiss(toastId);
            return null;
        }
    };
}

export function login(email, password, role, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
                role,
            });

            console.log("LOGIN API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            dispatch(setUser({ ...response.data.user, image: userImage }));

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            toast.error(error?.response?.data?.message || "Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function logout(navigate) {
    return (dispatch) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setToken(null));
        dispatch(setUser(null));
        toast.success("Logged Out");
        navigate("/login");
    };
}

export function verifyEmail(otp, signupData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Verifying...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", VERIFY_EMAIL_API, {
                otp,
            });

            console.log("VERIFY EMAIL API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Email Verified Successfully");
            navigate("/login");
        } catch (error) {
            console.log("VERIFY EMAIL API ERROR............", error);
            toast.error(error?.response?.data?.message || "Verification Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

// export function sendOtp(email, navigate) {
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading...");
//         dispatch(setLoading(true));
//         try {
//             const response = await apiConnector("POST", SENDOTP_API, {
//                 email,
//                 checkUserPresent: true,
//             });
//             console.log("SENDOTP API RESPONSE............", response);

//             console.log(response.data.success);

//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }

//             toast.success("OTP Sent Successfully");
//             navigate("/verify-email");
//         } catch (error) {
//             console.log("SENDOTP API ERROR............", error);
//             toast.error("Could Not Send OTP");
//         }
//         dispatch(setLoading(false));
//         toast.dismiss(toastId);
//     };
// }

// export function getPasswordResetToken(email, setEmailSent) {
//     return async (dispatch) => {
//         dispatch(setLoading(true));
//         try {
//             const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });

//             console.log("RESET PASSWORD TOKEN RESPONSE....", response);

//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }

//             toast.success("Reset Email Sent");
//             setEmailSent(true);
//         } catch (error) {
//             console.log("RESET PASSWORD TOKEN Error", error);
//             toast.error("Failed to send email for resetting password");
//         }
//         dispatch(setLoading(false));
//     };
// }

// export function resetPassword(password, confirmPassword, token) {
//     return async (dispatch) => {
//         dispatch(setLoading(true));
//         try {
//             const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });

//             console.log("RESET Password RESPONSE ... ", response);

//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }

//             toast.success("Password has been reset successfully");
//         } catch (error) {
//             console.log("RESET PASSWORD TOKEN Error", error);
//             toast.error("Unable to reset password");
//         }
//         dispatch(setLoading(false));
//     };
// }
