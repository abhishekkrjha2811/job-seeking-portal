import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { 
  FiMapPin, 
  FiDollarSign, 
  FiClock, 
  FiBriefcase, 
  FiHome,
  FiArrowRight,
  FiSearch,
  FiFilter,
  FiHeart
} from "react-icons/fi";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/job/getall",
          { withCredentials: true }
        );
        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };

    fetchJobs();
  }, [isAuthorized, navigateTo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Absolutely Stunning Header Section */}
      <div className="relative bg-white shadow-2xl border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 text-center">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-full text-sm font-bold mb-10 tracking-wider uppercase shadow-2xl transform hover:scale-105 transition-all duration-300">
              <FiBriefcase className="w-5 h-5 mr-3" />
              Premium Career Opportunities
            </div>
            <h1 className="text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-none">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                Discover Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Dream Career
              </span>
            </h1>
            <p className="text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed mb-16 font-medium">
              Connect with world-class companies and unlock opportunities that will transform your professional journey forever.
            </p>
            
            {/* Mind-blowing Search Interface */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 backdrop-blur-sm">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-2">
                    <div className="relative group">
                      <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 z-10" />
                      <input
                        type="text"
                        placeholder="Job title, keywords, or company..."
                        className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md font-medium placeholder-gray-400"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <div className="relative group">
                      <select className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md font-medium appearance-none cursor-pointer">
                        <option>All Categories</option>
                        <option>🎨 Design</option>
                        <option>💻 Technology</option>
                        <option>💰 Finance</option>
                        <option>🏥 Healthcare</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <div className="relative group">
                      <FiMapPin className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 z-10" />
                      <input
                        type="text"
                        placeholder="Location"
                        className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md font-medium placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <button className="w-full px-8 py-5 bg-gradient-to-r from-slate-800 via-slate-900 to-black text-white font-bold rounded-2xl hover:from-slate-900 hover:via-black hover:to-slate-800 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg">
                      🚀 Find Jobs
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl font-extrabold text-blue-600 mb-2">{jobs.length}+</div>
                <div className="text-slate-600 font-semibold">Active Jobs</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl font-extrabold text-purple-600 mb-2">500+</div>
                <div className="text-slate-600 font-semibold">Top Companies</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl font-extrabold text-green-600 mb-2">25K+</div>
                <div className="text-slate-600 font-semibold">Success Stories</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl font-extrabold text-orange-600 mb-2">99%</div>
                <div className="text-slate-600 font-semibold">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Jobs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {jobs.length > 0 ? (
          <div className="space-y-8">
            {jobs.map((job) => (
              <div 
                key={job._id} 
                className="group bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02]"
              >
                {/* Premium Job Card Header */}
                <div className="relative p-10 border-b border-gray-100">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600"></div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mr-8 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <FiHome className="w-10 h-10 text-slate-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                            {job.title}
                          </h2>
                          <p className="text-xl text-slate-600 font-semibold mb-4">
                            {job.postedBy?.name || 'Confidential Premium Client'}
                          </p>
                          <div className="flex flex-wrap items-center gap-4">
                            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl text-blue-700 font-bold shadow-sm hover:shadow-md transition-all duration-300">
                              💼 {job.category}
                            </span>
                            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl text-green-700 font-bold shadow-sm hover:shadow-md transition-all duration-300">
                              ⚡ Full-Time
                            </span>
                            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl text-purple-700 font-bold shadow-sm hover:shadow-md transition-all duration-300">
                              🌟 Featured
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:ml-8 lg:text-right bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-inner">
                      <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2">
                        {job.fixedSalary 
                          ? `$${job.fixedSalary.toLocaleString()}` 
                          : `$${job.salaryFrom?.toLocaleString()} - $${job.salaryTo?.toLocaleString()}`
                        }
                      </div>
                      <div className="text-slate-500 font-semibold text-lg">per annum</div>
                      <div className="mt-3 inline-flex items-center px-4 py-2 bg-green-100 border border-green-200 rounded-xl text-green-700 font-bold text-sm">
                        💰 Competitive Package
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Job Details Grid */}
                <div className="p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
                    <div className="flex items-center group/item">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-blue-200 transition-colors duration-300">
                        <FiMapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Location</div>
                        <div className="text-lg font-bold text-slate-900">{job.city}, {job.country}</div>
                      </div>
                    </div>
                    <div className="flex items-center group/item">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-green-200 transition-colors duration-300">
                        <FiClock className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Type</div>
                        <div className="text-lg font-bold text-slate-900">Full-Time</div>
                      </div>
                    </div>
                    <div className="flex items-center group/item">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-purple-200 transition-colors duration-300">
                        <FiBriefcase className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Experience</div>
                        <div className="text-lg font-bold text-slate-900">Senior Level</div>
                      </div>
                    </div>
                    <div className="flex items-center group/item">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-orange-200 transition-colors duration-300">
                        <FiHome className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Work Model</div>
                        <div className="text-lg font-bold text-slate-900">Hybrid</div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Job Description with Proper Text Handling */}
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                      <FiHome className="w-6 h-6 mr-3 text-blue-600" />
                      Position Overview
                    </h3>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                      <div className="prose prose-slate max-w-none">
                        <p className="text-slate-700 leading-relaxed text-lg font-medium">
                          <span className="line-clamp-4">
                            {job.description}
                          </span>
                        </p>
                        {job.description.length > 300 && (
                          <button className="mt-4 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300">
                            Read more →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Premium Benefits Section */}
                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">What We Offer</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="text-2xl mb-2">🏥</div>
                        <div className="text-sm font-semibold text-slate-700">Health Coverage</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="text-2xl mb-2">🏖️</div>
                        <div className="text-sm font-semibold text-slate-700">Unlimited PTO</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="text-2xl mb-2">📈</div>
                        <div className="text-sm font-semibold text-slate-700">401(k) Match</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="text-2xl mb-2">🌍</div>
                        <div className="text-sm font-semibold text-slate-700">Remote Work</div>
                      </div>
                    </div>
                  </div>

                  {/* Premium Action Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pt-8 border-t-2 border-gray-100">
                    <div className="flex flex-wrap gap-3 mb-6 lg:mb-0">
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold">
                        🌟 Top Company
                      </span>
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-bold">
                        ⚡ Fast Growing
                      </span>
                      <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl text-sm font-bold">
                        🚀 Funded Startup
                      </span>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="group flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <FiHeart className="w-5 h-5 mr-2 group-hover:text-red-500 transition-colors duration-300" />
                        Save Job
                      </button>
                      <Link 
                        to={`/job/${job._id}`}
                        className="group flex items-center px-10 py-4 bg-gradient-to-r from-slate-800 via-slate-900 to-black text-white font-bold rounded-2xl hover:from-slate-900 hover:via-black hover:to-slate-800 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                      >
                        🚀 Apply Now
                        <FiArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Mind-blowing Empty State */
          <div className="text-center py-24">
            <div className="max-w-2xl mx-auto">
              <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl">
                <FiSearch className="w-20 h-20 text-blue-500" />
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-6">
                No Opportunities Found
              </h3>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                We're continuously sourcing exclusive opportunities. Create your profile to be notified 
                when positions matching your expertise become available.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-12 py-5 bg-gradient-to-r from-slate-800 via-slate-900 to-black text-white font-bold rounded-2xl hover:from-slate-900 hover:via-black hover:to-slate-800 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg">
                  🚀 Create Profile
                </button>
                <button className="px-12 py-5 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
                  📋 Browse Categories
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium CTA Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-5xl lg:text-6xl font-extrabold mb-8">
              Ready to Transform Your Career?
            </h2>
            <p className="text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join our exclusive network of top-tier professionals and access opportunities 
              that aren't available anywhere else.
            </p>
            <div className="flex flex-col lg:flex-row gap-8 justify-center">
              <button className="px-16 py-6 bg-white text-slate-900 font-extrabold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 text-xl">
                🌟 Join Elite Network
              </button>
              <button className="px-16 py-6 border-2 border-white text-white font-extrabold rounded-2xl hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-xl hover:shadow-2xl text-xl">
                💬 Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;