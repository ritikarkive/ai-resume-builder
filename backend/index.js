const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Groq = require('groq-sdk')
const mongoose = require('mongoose')
const Resume = require('./models/Resume')

const app = express()
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB error:', err))
app.use(cors())
app.use(express.json())

// Connect to Groq using your API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' })
})

// This route receives form data and sends it to Groq AI
app.post('/generate', ClerkExpressRequireAuth(), async (req, res) => {
  const formData = req.body
  formData.projects = formData.projects || []
  formData.experiences = formData.experiences || []

  try {
  const prompt = `
  You are a professional resume writer. Enhance the following resume details for a fresher applying for tech jobs in India.

  Name: ${formData.fullName}
  Summary: ${formData.summary}
  Skills: ${formData.skills}
  
  Projects: ${JSON.stringify(formData.projects)}
  Work Experience: ${JSON.stringify(formData.experiences)}
  
  Achievements: ${formData.achievements}
  Certifications: ${formData.certifications}

  Return ONLY a JSON object like this, nothing else:
  {
    "summary": "enhanced professional summary in 3-4 lines",
    "skills": "formatted skills list",
    "projects": [
      {
        "title": "same project title",
        "tech": "same tech",
        "link": "same link",
        "description": "enhanced project description in 2-3 professional lines"
      }
    ],
    "experiences": [
      {
        "jobTitle": "same job title",
        "company": "same company",
        "startDate": "same start date",
        "endDate": "same end date",
        "description": "enhanced experience description in 2-3 professional lines"
      }
    ]
  }
`

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
    })

    const aiText = response.choices[0].message.content
    const aiData = JSON.parse(aiText)
 // Save resume to MongoDB
const resume = new Resume({
  ...formData,
  summary: aiData.summary,
  skills: aiData.skills,
  projects: aiData.projects || formData.projects,
  experiences: aiData.experiences || formData.experiences,
  userId: req.auth.userId,
})
await resume.save()

res.json({ success: true, data: aiData, resumeId: resume._id })

  } catch (error) {
    console.error('Groq Error:', error)
    res.status(500).json({ success: false, message: 'AI generation failed' })
  }
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})

// Get all resumes for logged in user
app.get('/resumes', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.auth.userId })
      .sort({ createdAt: -1 }) // newest first
    res.json({ success: true, resumes })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch resumes' })
  }
})