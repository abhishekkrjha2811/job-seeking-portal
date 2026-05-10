const BASE_URL = "http://localhost:4000/api/v1";

export const endpoints = {
    SIGNUP_API: BASE_URL + "/user/register",
    VERIFY_EMAIL_API: BASE_URL + "/user/verify-email",
    LOGIN_API: BASE_URL + "/user/login",
    GET_ALL_JOBS_API: BASE_URL + "/job/getall",
    APPLY_JOB_API: BASE_URL + "/application/apply",
    GET_STUDENT_APPLICATIONS_API: BASE_URL + "/application/student/applications",
    DELETE_APPLICATION_API: BASE_URL + "/application/student/delete",
    POST_JOB_API: BASE_URL + "/job/post",
    GET_MY_JOBS_API: BASE_URL + "/job/getmyjobs",
    DELETE_JOB_API: BASE_URL + "/job/delete",
    GET_PROFESSOR_APPLICATIONS_API: BASE_URL + "/application/professor/applications",
    UPDATE_APPLICATION_STATUS_API: BASE_URL + "/application/update-status",
    UPDATE_JOB_API: BASE_URL + "/job/update",
};

//////