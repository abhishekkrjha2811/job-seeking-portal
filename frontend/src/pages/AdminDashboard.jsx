import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStats, getAdminUsers, toggleAdminUserBlock } from "../services/operations/adminAPI";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const [usersResult, statsResult] = await Promise.all([
                dispatch(getAdminUsers()),
                dispatch(getAdminStats()),
            ]);

            if (usersResult) {
                setUsers(usersResult.users || []);
            }
            if (statsResult) {
                setStats(statsResult);
            }
            setLoading(false);
        };

        load();
    }, [dispatch]);

    const handleToggleBlock = async (userId) => {
        const result = await dispatch(toggleAdminUserBlock(userId));
        if (result) {
            setUsers((prev) => prev.map((item) => (item._id === userId ? result : item)));
        }
    };

    if (user?.role !== "Admin") {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-14 w-full flex items-center justify-center">
                <div className="max-w-xl rounded-2xl bg-white px-8 py-10 shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Admin access only</h2>
                    <p className="text-gray-600">This area is reserved for admin users.</p>
                </div>
            </div>
        );
    }

    return (
        <div id="overview" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-14 w-full scroll-mt-20">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-8 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
                        <p className="text-slate-600">View students and professors, and control account access.</p>
                    </div>
                </div>

                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-2xl shadow p-5">
                            <p className="text-sm text-slate-500">Total Users</p>
                            <p className="text-3xl font-bold text-slate-900">{stats.users?.total ?? 0}</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow p-5">
                            <p className="text-sm text-slate-500">Students</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.users?.students ?? 0}</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow p-5">
                            <p className="text-sm text-slate-500">Professors</p>
                            <p className="text-3xl font-bold text-emerald-600">{stats.users?.Professors ?? 0}</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow p-5">
                            <p className="text-sm text-slate-500">Total Jobs Posted</p>
                            <p className="text-3xl font-bold text-violet-600">{stats.jobs?.total ?? 0}</p>
                        </div>
                    </div>
                )}

                <div id="users" className="bg-white rounded-2xl shadow-lg overflow-hidden scroll-mt-20">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-900">Users</h2>
                        <p className="text-sm text-slate-500">Student and professor profiles with block controls.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wide">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Branch</th>
                                    <th className="px-6 py-4">Year</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td className="px-6 py-6 text-slate-500" colSpan="7">
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : (
                                    users
                                        .filter((item) => item.role !== "Admin")
                                        .map((item) => (
                                            <tr key={item._id} className="border-t border-slate-100">
                                                <td className="px-6 py-4 font-medium text-slate-900">
                                                    {item.firstName} {item.lastName}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">{item.email}</td>
                                                <td className="px-6 py-4 text-slate-700">{item.role}</td>
                                                <td className="px-6 py-4 text-slate-600">{item.branch}</td>
                                                <td className="px-6 py-4 text-slate-600">{item.year}</td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                            item.isBlocked ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                                                        }`}
                                                    >
                                                        {item.isBlocked ? "Blocked" : "Active"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleToggleBlock(item._id)}
                                                        className={`rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer ${
                                                            item.isBlocked
                                                                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                                                : "bg-red-500 text-white hover:bg-red-600"
                                                        }`}
                                                    >
                                                        {item.isBlocked ? "Unblock" : "Block"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
