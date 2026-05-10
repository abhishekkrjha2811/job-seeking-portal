import React from 'react'
import { useSelector } from 'react-redux'
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendar, FaUserTag } from 'react-icons/fa'

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-xl text-gray-600'>Please login to view your profile</p>
      </div>
    )
  }

  const profileFields = [
    {
      label: 'First Name',
      value: user.firstName || 'N/A',
      icon: <FaUser className='text-blue-600' />
    },
    {
      label: 'Last Name',
      value: user.lastName || 'N/A',
      icon: <FaUser className='text-blue-600' />
    },
    {
      label: 'Email',
      value: user.email,
      icon: <FaEnvelope className='text-green-600' />
    },
    {
      label: 'Phone Number',
      value: user.phone,
      icon: <FaPhone className='text-purple-600' />
    },
    {
      label: 'Role',
      value: user.role,
      icon: <FaUserTag className='text-orange-600' />
    },
    {
      label: 'Branch',
      value: user.branch?.toUpperCase() || 'N/A',
      icon: <FaGraduationCap className='text-indigo-600' />
    },
    {
      label: 'Year',
      value: user.year || 'N/A',
      icon: <FaCalendar className='text-red-600' />
    },
  ]

  const getBranchFullName = (branch) => {
    const branches = {
      cse: 'Computer Science Engineering',
      me: 'Mechanical Engineering',
      ece: 'Electronics & Communication Engineering'
    }
    return branches[branch?.toLowerCase()] || branch
  }

  const getRoleBadgeColor = (role) => {
    const colors = {
      Student: 'bg-blue-100 text-blue-800',
      Professor: 'bg-green-100 text-green-800',
      Admin: 'bg-red-100 text-red-800'
    }
    return colors[role] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 w-full mt-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header Section */}
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden mb-8'>
          <div className='bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12'>
            <div className='flex items-center space-x-6'>
              {/* Profile Avatar */}
              <div className='flex-shrink-0'>
                <div className='w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg'>
                  <span className='text-4xl font-bold text-indigo-600'>
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0) || ''}
                  </span>
                </div>
              </div>
              
              {/* Profile Info */}
              <div className='flex-1'>
                <h1 className='text-3xl font-bold text-white mb-2'>
                  {user.firstName} {user.lastName}
                </h1>
                <div className='flex items-center space-x-3'>
                  <span className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </span>
                  {user.branch && (
                    <span className='text-blue-100 text-sm'>
                      {getBranchFullName(user.branch)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <div className='px-8 py-6 border-b border-gray-200'>
            <h2 className='text-2xl font-bold text-gray-800'>Profile Information</h2>
            <p className='text-gray-600 mt-1'>Your personal details and information</p>
          </div>

          <div className='px-8 py-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {profileFields.map((field, index) => (
                <div key={index} className='bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow duration-200'>
                  <div className='flex items-start space-x-4'>
                    <div className='flex-shrink-0 mt-1'>
                      {field.icon}
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-gray-500 mb-1'>
                        {field.label}
                      </p>
                      <p className='text-lg font-semibold text-gray-900'>
                        {field.label === 'Branch' && field.value !== 'N/A' 
                          ? getBranchFullName(field.value)
                          : field.value
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info Section */}
          <div className='px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Member since</p>
                <p className='text-lg font-semibold text-gray-800'>
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <button className='px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md'>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section (Optional - can be customized based on role) */}
        {user.role === 'Student' && (
          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
              <div className='text-3xl font-bold text-blue-600 mb-2'>0</div>
              <div className='text-gray-600 font-medium'>Applications</div>
            </div>
            <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
              <div className='text-3xl font-bold text-green-600 mb-2'>0</div>
              <div className='text-gray-600 font-medium'>Interviews</div>
            </div>
            <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
              <div className='text-3xl font-bold text-purple-600 mb-2'>0</div>
              <div className='text-gray-600 font-medium'>Offers</div>
            </div>
          </div>
        )}

        {user.role === 'Professor' && (
          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
              <div className='text-3xl font-bold text-blue-600 mb-2'>0</div>
              <div className='text-gray-600 font-medium'>Jobs Posted</div>
            </div>
            <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
              <div className='text-3xl font-bold text-green-600 mb-2'>0</div>
              <div className='text-gray-600 font-medium'>Applications Received</div>
            </div>
            <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
              <div className='text-3xl font-bold text-purple-600 mb-2'>0</div>
              <div className='text-gray-600 font-medium'>Students Hired</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProfile
