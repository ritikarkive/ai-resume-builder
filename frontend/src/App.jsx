import { useState } from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import Builder from './pages/builder.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  const [page, setPage] = useState('home')

  if (page === 'builder') return (
    <>
      <SignedIn>
        <Builder onDashboard={() => setPage('dashboard')} />
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Please sign in to continue</h2>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-blue-700">
              Sign In with Google
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  )

  if (page === 'dashboard') return (
    <SignedIn>
      <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 onClick={() => setPage('home')}
          className="text-2xl font-bold text-blue-600 cursor-pointer">ResumeAI</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setPage('builder')}
            className="text-blue-600 font-medium hover:underline">
            Build New
          </button>
          <UserButton />
        </div>
      </div>
      <Dashboard onBuildNew={() => setPage('builder')} />
    </SignedIn>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">ResumeAI</h1>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <button onClick={() => setPage('dashboard')}
              className="text-blue-600 font-medium hover:underline">
              My Resumes
            </button>
            <UserButton />
          </SignedIn>
          <button onClick={() => setPage('builder')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">
          Build Your Resume with AI
        </h2>
        <p className="text-xl text-gray-500 mb-10 max-w-xl">
          Create a professional resume in minutes. AI enhances your content and generates a beautiful PDF instantly.
        </p>
        <button onClick={() => setPage('builder')}
          className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700">
          Build My Resume Free
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8 px-16 pb-24">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-2">AI Powered</h3>
          <p className="text-gray-500">AI enhances your content to sound more professional</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-xl font-bold mb-2">PDF Export</h3>
          <p className="text-gray-500">Download your resume as a clean professional PDF</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">Fast & Easy</h3>
          <p className="text-gray-500">Fill in your details and get a resume in minutes</p>
        </div>
      </div>
    </div>
  )
}

export default App