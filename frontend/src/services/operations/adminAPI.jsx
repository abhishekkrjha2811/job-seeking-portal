import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { ADMIN_USERS_API, ADMIN_JOBS_API, ADMIN_DELETE_JOB_API, ADMIN_STATS_API, ADMIN_TOGGLE_USER_BLOCK_API } = endpoints;

export function getAdminUsers() {
    return async () => {
        const toastId = toast.loading("Loading users...");
        let result = null;
        try {
            const response = await apiConnector("GET", ADMIN_USERS_API);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            result = response.data;
        } catch (error) {
            console.log("ADMIN_USERS_API ERROR............", error);
            toast.error(error?.response?.data?.message || "Could not load users");
        }
        toast.dismiss(toastId);
        return result;
    };
}

export function getAdminStats() {
    return async () => {
        let result = null;
        try {
            const response = await apiConnector("GET", ADMIN_STATS_API);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            result = response.data.stats;
        } catch (error) {
            console.log("ADMIN_STATS_API ERROR............", error);
        }
        return result;
    };
}

export function getAdminJobs() {
    return async () => {
        const toastId = toast.loading("Loading jobs...");
        let result = null;
        try {
            const response = await apiConnector("GET", ADMIN_JOBS_API);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            result = response.data;
        } catch (error) {
            console.log("ADMIN_JOBS_API ERROR............", error);
            toast.error(error?.response?.data?.message || "Could not load jobs");
        }
        toast.dismiss(toastId);
        return result;
    };
}

export function deleteAdminJob(jobId) {
    return async () => {
        const toastId = toast.loading("Deleting job...");
        let result = false;
        try {
            const response = await apiConnector("DELETE", `${ADMIN_DELETE_JOB_API}/${jobId}`);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            result = true;
            toast.success(response.data.message);
        } catch (error) {
            console.log("ADMIN_DELETE_JOB_API ERROR............", error);
            toast.error(error?.response?.data?.message || "Could not delete job");
        }
        toast.dismiss(toastId);
        return result;
    };
}

export function toggleAdminUserBlock(userId) {
    return async () => {
        const toastId = toast.loading("Updating access...");
        let result = null;
        try {
            const response = await apiConnector("PUT", `${ADMIN_TOGGLE_USER_BLOCK_API}/${userId}`);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            result = response.data.user;
            toast.success(response.data.message);
        } catch (error) {
            console.log("ADMIN_TOGGLE_USER_BLOCK_API ERROR............", error);
            toast.error(error?.response?.data?.message || "Could not update user access");
        }
        toast.dismiss(toastId);
        return result;
    };
}