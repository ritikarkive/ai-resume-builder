import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ResumePDF from '../components/ResumePDF.jsx'

function Dashboard({ onBuildNew }) {
  const { getToken } = useAuth()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = await getToken()
       const response = await fetch('https://ai-resume-builder-mzyf.onrender.com/resumes', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const result = await response.json()
        if (result.success) setResumes(result.resumes)
      } catch (error) {
        console.error('Failed to fetch resumes')
      }
      setLoading(false)
    }
    fetchResumes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Resumes</h2>
          <button onClick={onBuildNew}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">
            + Build New Resume
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-500 text-xl">
            Loading your resumes...
          </div>
        )}

        {/* No resumes */}
        {!loading && resumes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No resumes yet</h3>
            <p className="text-gray-500 mb-6">Build your first AI powered resume!</p>
            <button onClick={onBuildNew}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700">
              Build My Resume
            </button>
          </div>
        )}

        {/* Resume Cards */}
        <div className="grid grid-cols-1 gap-6">
          {resumes.map((resume) => (
            <div key={resume._id} className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{resume.fullName}</h3>
                  <p className="text-gray-500 mt-1">{resume.email} | {resume.phone}</p>
                  <p className="text-gray-500">{resume.degree} — {resume.college}</p>
                  <p className="text-sm text-blue-600 mt-2">{resume.skills}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-3">
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    ✅ AI Enhanced
                  </span>
                </div>
              </div>

              {/* Projects */}
              {resume.projects && resume.projects.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Projects:</p>
                  <div className="flex gap-2 flex-wrap">
                    {resume.projects.map((proj, i) => (
                      <span key={i} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                        {proj.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Download Button */}
              <div className="mt-4 pt-4 border-t flex gap-3">
                <PDFDownloadLink
                  document={<ResumePDF data={resume} />}
                  fileName={`${resume.fullName}_Resume.pdf`}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
                  {({ loading }) => loading ? 'Preparing...' : '📄 Download PDF'}
                </PDFDownloadLink>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard