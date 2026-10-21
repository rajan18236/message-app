import React from 'react'
import { Link } from 'react-router-dom'
import {
  RiChatVoiceAiLine,
  RiShieldKeyholeLine,
  RiMessage3Line,
  RiGroupLine,
  RiNotification3Line,
  RiRocket2Line,
} from 'react-icons/ri'

const Body = () => {
  const features = [
    {
      icon: <RiMessage3Line size={28} className='text-blue-500' />,
      title: 'Real-time Messaging',
      desc: 'Send and receive messages instantly with seamless WebSocket-powered delivery.',
    },
    {
      icon: <RiGroupLine size={28} className='text-blue-500' />,
      title: 'Group Conversations',
      desc: 'Create and join group chats to stay connected with multiple people at once.',
    },
    {
      icon: <RiShieldKeyholeLine size={28} className='text-blue-500' />,
      title: 'Secure Authentication',
      desc: 'Your conversations are protected with JWT-based secure login and session handling.',
    },
    {
      icon: <RiNotification3Line size={28} className='text-blue-500' />,
      title: 'Instant Notifications',
      desc: 'Never miss a message with live in-app notifications for new activity.',
    },
  ]

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '500K+', label: 'Messages Sent' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      {/* Hero Section */}
      <section className='flex flex-col items-center text-center px-6 py-20'>
        <div className='flex items-center gap-2 mb-4'>
          <RiChatVoiceAiLine size={50} className='text-blue-500' />
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 font-serif'>
            Let's Chats
          </h1>
        </div>
        <p className='text-lg md:text-xl text-gray-600 max-w-2xl mb-8'>
          A modern, fast, and secure chat application that keeps you connected
          with friends, family, and teams — anytime, anywhere.
        </p>
        <div className='flex gap-4'>
          <Link
            to='/register'
            className='bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:scale-105 transition-all duration-200 shadow-md'
          >
            Get Started
          </Link>
          <Link
            to='/login'
            className='border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-200'
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className='px-6 py-12 max-w-5xl mx-auto'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-10'>
          Why Choose Let's Chats?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100'
            >
              <div className='mb-4'>{feature.icon}</div>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                {feature.title}
              </h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className='px-6 py-12 bg-blue-500'>
        <div className='max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
          {stats.map((stat, index) => (
            <div key={index}>
              <p className='text-3xl md:text-4xl font-bold text-white'>
                {stat.value}
              </p>
              <p className='text-sm text-blue-100 mt-1'>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className='px-6 py-12 max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
          Built With Modern Tech
        </h2>
        <div className='flex flex-wrap justify-center gap-4'>
          {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Socket.io'].map(
            (tech, index) => (
              <span
                key={index}
                className='bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full font-mono text-sm shadow-sm hover:shadow-md transition-shadow'
              >
                {tech}
              </span>
            )
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className='px-6 py-16 text-center'>
        <div className='flex justify-center mb-4'>
          <RiRocket2Line size={40} className='text-blue-500' />
        </div>
        <h2 className='text-3xl font-bold text-gray-800 mb-4'>
          Ready to Start Chatting?
        </h2>
        <p className='text-gray-600 mb-8 max-w-xl mx-auto'>
          Join the Let's Chats community today and experience seamless
          communication like never before.
        </p>
        <Link
          to='/register'
          className='inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:scale-105 transition-all duration-200 shadow-md'
        >
          Create Your Account
        </Link>
      </section>

      {/* Footer */}
      <footer className='bg-gray-800 text-center py-6'>
        <p className='text-gray-400 text-sm'>
          &copy; {new Date().getFullYear()} Let's Chats. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Body
