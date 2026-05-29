import { useAuth } from '@clerk/clerk-react'
import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ResumePDF from '../components/ResumePDF.jsx'


function Builder() {
  const { getToken } = useAuth()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', location: '', linkedin: '', github: '',
    summary: '', skills: '',
    degree: '', college: '', eduStart: '', eduEnd: '', cgpa: '',
    school12: '', board12: '', year12: '', percent12: '',
    school10: '', board10: '', year10: '', percent10: '',
    achievements: '', certifications: '',
  })

  // Dynamic experiences array
  const [experiences, setExperiences] = useState([
    { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }
  ])

  // Dynamic projects array
  const [projects, setProjects] = useState([
    { title: '', tech: '', description: '', link: '' }
  ])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle experience field change
  const handleExperienceChange = (index, e) => {
    const updated = experiences.map((exp, i) =>
      i === index ? { ...exp, [e.target.name]: e.target.value } : exp
    )
    setExperiences(updated)
  }

  // Add new experience
  const addExperience = () => {
    setExperiences([...experiences, { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }])
  }

  // Remove experience
  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  // Handle project field change
  const handleProjectChange = (index, e) => {
    const updated = projects.map((proj, i) =>
      i === index ? { ...proj, [e.target.name]: e.target.value } : proj
    )
    setProjects(updated)
  }

  // Add new project
  const addProject = () => {
    setProjects([...projects, { title: '', tech: '', description: '', link: '' }])
  }

  // Remove project
  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const token = await getToken()
const response = await fetch('https://ai-resume-builder-mzyf.onrender.com/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ ...formData, experiences, projects })
})
      const result = await response.json()
      if (result.success) {
        setFormData({ ...formData, summary: result.data.summary, skills: result.data.skills })
        if (result.data.experiences) setExperiences(result.data.experiences)
        if (result.data.projects) setProjects(result.data.projects)
        alert('Resume enhanced by AI! ✨')
      }
    } catch (error) {
      alert('Something went wrong. Try again!')
    }
    setLoading(false)
  }

  const allData = { ...formData, experiences, projects }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Build Your Resume</h2>

        {/* Personal Info */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <input name="fullName" value={formData.fullName} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Full Name" />
            <input name="email" value={formData.email} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Email" />
            <input name="phone" value={formData.phone} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Phone" />
            <input name="location" value={formData.location} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Location" />
            <input name="linkedin" value={formData.linkedin} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="LinkedIn URL" />
            <input name="github" value={formData.github} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="GitHub URL" />
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Professional Summary</h3>
          <textarea name="summary" value={formData.summary} onChange={handleChange}
            className="border rounded-lg p-3 w-full h-32"
            placeholder="Write a short summary about yourself..." />
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Education</h3>
          <p className="font-medium text-gray-600 mb-2">College/University</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input name="degree" value={formData.degree} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Degree (B.Tech CSE)" />
            <input name="college" value={formData.college} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="College Name" />
            <input name="eduStart" value={formData.eduStart} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Start Year" />
            <input name="eduEnd" value={formData.eduEnd} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="End Year" />
            <input name="cgpa" value={formData.cgpa} onChange={handleChange}
              className="border rounded-lg p-3 w-full col-span-2" placeholder="CGPA" />
          </div>

          <p className="font-medium text-gray-600 mb-2">12th Standard</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input name="school12" value={formData.school12} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="School Name" />
            <input name="board12" value={formData.board12} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Board (CBSE/MP Board)" />
            <input name="year12" value={formData.year12} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Passing Year" />
            <input name="percent12" value={formData.percent12} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Percentage" />
          </div>

          <p className="font-medium text-gray-600 mb-2">10th Standard</p>
          <div className="grid grid-cols-2 gap-4">
            <input name="school10" value={formData.school10} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="School Name" />
            <input name="board10" value={formData.board10} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Board (CBSE/MP Board)" />
            <input name="year10" value={formData.year10} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Passing Year" />
            <input name="percent10" value={formData.percent10} onChange={handleChange}
              className="border rounded-lg p-3 w-full" placeholder="Percentage" />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Skills</h3>
          <input name="skills" value={formData.skills} onChange={handleChange}
            className="border rounded-lg p-3 w-full"
            placeholder="e.g. React, Node.js, Python, SQL" />
        </div>

        {/* Projects - Dynamic */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Projects</h3>
          {projects.map((proj, index) => (
            <div key={index} className="border rounded-xl p-4 mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <p className="font-medium text-gray-700">Project {index + 1}</p>
                {projects.length > 1 && (
                  <button onClick={() => removeProject(index)}
                    className="text-red-500 text-sm hover:text-red-700">
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <input name="title" value={proj.title} onChange={(e) => handleProjectChange(index, e)}
                  className="border rounded-lg p-3 w-full" placeholder="Project Title" />
                <input name="tech" value={proj.tech} onChange={(e) => handleProjectChange(index, e)}
                  className="border rounded-lg p-3 w-full" placeholder="Tech Used" />
                <input name="link" value={proj.link} onChange={(e) => handleProjectChange(index, e)}
                  className="border rounded-lg p-3 w-full col-span-2" placeholder="GitHub Link" />
              </div>
              <textarea name="description" value={proj.description} onChange={(e) => handleProjectChange(index, e)}
                className="border rounded-lg p-3 w-full h-24"
                placeholder="Describe your project..." />
            </div>
          ))}
          <button onClick={addProject}
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
            + Add Project
          </button>
        </div>

        {/* Experience - Dynamic */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            Work Experience <span className="text-gray-400 text-sm">(leave blank if fresher)</span>
          </h3>
          {experiences.map((exp, index) => (
            <div key={index} className="border rounded-xl p-4 mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <p className="font-medium text-gray-700">Experience {index + 1}</p>
                {experiences.length > 1 && (
                  <button onClick={() => removeExperience(index)}
                    className="text-red-500 text-sm hover:text-red-700">
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <input name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)}
                  className="border rounded-lg p-3 w-full" placeholder="Job Title" />
                <input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)}
                  className="border rounded-lg p-3 w-full" placeholder="Company Name" />
                <input name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)}
                  className="border rounded-lg p-3 w-full" placeholder="Start Date" />
                <input name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)}
                  className="border rounded-lg p-3 w-full" placeholder="End Date" />
              </div>
              <textarea name="description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)}
                className="border rounded-lg p-3 w-full h-24"
                placeholder="Describe your responsibilities..." />
            </div>
          ))}
          <button onClick={addExperience}
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
            + Add Experience
          </button>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Achievements</h3>
          <textarea name="achievements" value={formData.achievements} onChange={handleChange}
            className="border rounded-lg p-3 w-full h-24"
            placeholder="e.g. Won hackathon, scholarship..." />
        </div>

        {/* Certifications */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Certifications</h3>
          <textarea name="certifications" value={formData.certifications} onChange={handleChange}
            className="border rounded-lg p-3 w-full h-24"
            placeholder="e.g. React Course - Udemy..." />
        </div>

        {/* Generate Button */}
        <button onClick={handleGenerate} disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 mb-4">
          {loading ? 'Generating... ✨' : 'Generate My Resume with AI ✨'}
        </button>

        {/* PDF Download */}
        {formData.summary && (
          <PDFDownloadLink
            document={<ResumePDF data={allData} />}
            fileName={`${formData.fullName}_Resume.pdf`}
            className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-green-700 flex items-center justify-center">
            {({ loading }) => loading ? 'Preparing PDF...' : '📄 Download Resume as PDF'}
          </PDFDownloadLink>
        )}

      </div>
    </div>
  )
}

export default Builder