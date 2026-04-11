import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica', fontSize: 10, color: '#333' },
  header: { marginBottom: 15, borderBottom: '2px solid #2563eb', paddingBottom: 10 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#2563eb' },
  contact: { flexDirection: 'row', gap: 10, marginTop: 5, flexWrap: 'wrap' },
  contactText: { fontSize: 9, color: '#555' },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#2563eb', borderBottom: '1px solid #2563eb', paddingBottom: 3, marginBottom: 6 },
  text: { fontSize: 10, lineHeight: 1.5, color: '#444' },
  bold: { fontFamily: 'Helvetica-Bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  projectTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  projectTech: { fontSize: 9, color: '#2563eb', marginBottom: 3 },
})

function ResumePDF({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.fullName}</Text>
          <View style={styles.contact}>
            <Text style={styles.contactText}>{data.email}</Text>
            <Text style={styles.contactText}>| {data.phone}</Text>
            <Text style={styles.contactText}>| {data.location}</Text>
            {data.linkedin ? <Text style={styles.contactText}>| {data.linkedin}</Text> : null}
            {data.github ? <Text style={styles.contactText}>| {data.github}</Text> : null}
          </View>
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {data.college ? (
            <View style={{ marginBottom: 6 }}>
              <View style={styles.row}>
                <Text style={styles.bold}>{data.degree}</Text>
                <Text style={styles.contactText}>{data.eduStart} - {data.eduEnd}</Text>
              </View>
              <Text style={styles.text}>{data.college} {data.cgpa ? `| CGPA: ${data.cgpa}` : ''}</Text>
            </View>
          ) : null}
          {data.school12 ? (
            <View style={{ marginBottom: 6 }}>
              <View style={styles.row}>
                <Text style={styles.bold}>12th Standard - {data.board12}</Text>
                <Text style={styles.contactText}>{data.year12}</Text>
              </View>
              <Text style={styles.text}>{data.school12} {data.percent12 ? `| ${data.percent12}%` : ''}</Text>
            </View>
          ) : null}
          {data.school10 ? (
            <View style={{ marginBottom: 6 }}>
              <View style={styles.row}>
                <Text style={styles.bold}>10th Standard - {data.board10}</Text>
                <Text style={styles.contactText}>{data.year10}</Text>
              </View>
              <Text style={styles.text}>{data.school10} {data.percent10 ? `| ${data.percent10}%` : ''}</Text>
            </View>
          ) : null}
        </View>

        {/* Skills */}
        {data.skills ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <Text style={styles.text}>{data.skills}</Text>
          </View>
        ) : null}

 {/* Projects - Dynamic */}
{data.projects && data.projects.length > 0 && data.projects[0].title ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>PROJECTS</Text>
    {data.projects.map((proj, index) => (
      <View key={index} style={{ marginBottom: 8 }}>
        <View style={styles.row}>
          <Text style={styles.projectTitle}>{proj.title}</Text>
          <Text style={styles.contactText}>{proj.link}</Text>
        </View>
        <Text style={styles.projectTech}>{proj.tech}</Text>
        <Text style={styles.text}>{proj.description}</Text>
      </View>
    ))}
  </View>
) : null}

{/* Experience - Dynamic */}
{data.experiences && data.experiences.length > 0 && data.experiences[0].jobTitle ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
    {data.experiences.map((exp, index) => (
      <View key={index} style={{ marginBottom: 8 }}>
        <View style={styles.row}>
          <Text style={styles.bold}>{exp.jobTitle} - {exp.company}</Text>
          <Text style={styles.contactText}>{exp.startDate} - {exp.endDate}</Text>
        </View>
        <Text style={styles.text}>{exp.description}</Text>
      </View>
    ))}
  </View>
) : null}
       

        {/* Achievements */}
        {data.achievements ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
            <Text style={styles.text}>{data.achievements}</Text>
          </View>
        ) : null}

        {/* Certifications */}
        {data.certifications ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            <Text style={styles.text}>{data.certifications}</Text>
          </View>
        ) : null}

      </Page>
    </Document>
  )
}

export default ResumePDF