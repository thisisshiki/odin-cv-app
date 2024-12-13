import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import type { CVData } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  nameTitle: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  contactInfo: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 5,
  },
  contact: {
    fontSize: 12,
  },
  links: {
    fontSize: 12,
    color: '#0066cc',
    textDecoration: 'underline',
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 3,
  },
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 12,
    marginBottom: 3,
  },
  itemLocation: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  dates: {
    fontSize: 10,
    color: '#666',
    textAlign: 'right',
  },
  skills: {
    fontSize: 11,
    marginTop: 2,
  },
  languagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  languageItem: {
    flexDirection: 'row',
    gap: 5,
  },
});

const CVDocument = ({ data }: { data: CVData }) => {
  const hasSecondPage = data.projects.length > 0 || data.certifications.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* First page content */}
        <View style={styles.header}>
          <View style={styles.nameTitle}>
            <Text style={styles.name}>{data.generalInfo.name}</Text>
            <Text style={styles.jobTitle}>{data.generalInfo.title}</Text>
          </View>
        </View>

        {/* Rest of first page content */}
        {/* ... (previous content remains the same until education section) ... */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>{edu.school}</Text>
                  <Text style={styles.itemSubtitle}>{edu.degree}</Text>
                  <Text style={styles.itemLocation}>{edu.location}</Text>
                </View>
                <Text style={styles.dates}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  <Text style={styles.itemLocation}>{exp.location}</Text>
                </View>
                <Text style={styles.dates}>
                  {exp.startDate} - {exp.endDate}
                </Text>
              </View>
              <Text style={{ fontSize: 11, marginTop: 3 }}>{exp.responsibilities}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.pageNumber}>Page 1{hasSecondPage ? ' of 2' : ''}</Text>
      </Page>

      {hasSecondPage && (
        <Page size="A4" style={styles.page}>
          {data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((project) => (
                <View key={project.id} style={styles.item}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>{project.name}</Text>
                      <Text style={styles.itemLocation}>{project.location}</Text>
                    </View>
                    <Text style={styles.dates}>
                      {project.startDate} - {project.endDate}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 11, marginTop: 3 }}>{project.description}</Text>
                  <Text style={styles.skills}>Technologies: {project.technologies.join(', ')}</Text>
                </View>
              ))}
            </View>
          )}

          {data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.item}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>{cert.name}</Text>
                      <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
                      <Text style={styles.itemLocation}>{cert.location}</Text>
                    </View>
                    <Text style={styles.dates}>
                      {cert.date}
                      {cert.expiryDate && ` (Expires: ${cert.expiryDate})`}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.pageNumber}>Page 2 of 2</Text>
        </Page>
      )}
    </Document>
  );
};

interface PreviewProps {
  data: CVData;
}

export function CVPreview({ data }: PreviewProps) {
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const hasSecondPage = data.projects.length > 0 || data.certifications.length > 0;

  React.useEffect(() => {
    const checkOverflow = () => {
      if (previewRef.current) {
        const isOver = previewRef.current.scrollHeight > (297 * 2 * 3.7795275591);
        setIsOverflowing(isOver);
      }
    };

    checkOverflow();
  }, [data]);

  return (
    <>
      {isOverflowing && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p className="font-bold">Content exceeds two pages</p>
          <p>Please reduce the content to fit within two pages.</p>
        </div>
      )}
      <div className="space-y-8">
        {/* First Page */}
        <div className="bg-white shadow-lg w-[210mm] mx-auto relative p-8">
          <div className="absolute top-4 right-4">
            <PDFDownloadLink
              document={<CVDocument data={data} />}
              fileName="cv.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </PDFDownloadLink>
          </div>

          {/* First page content */}
          <div className="space-y-8" ref={previewRef}>
            {/* Header section remains the same */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold inline-block mr-4">{data.generalInfo.name}</h1>
                <span className="text-xl text-gray-600">{data.generalInfo.title}</span>
              </div>
            </div>

            {/* Contact info and other sections */}
            {/* ... Previous sections remain the same until Education ... */}

            {/* Education section with updated layout */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-300">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{edu.school}</h3>
                      <p className="text-gray-700">{edu.degree}</p>
                      <p className="text-gray-500">{edu.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience section with updated layout */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-300">Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="flex justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                      <p className="text-gray-500">{exp.location}</p>
                      <p className="mt-2 text-gray-600 whitespace-pre-line">{exp.responsibilities}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 w-full text-center text-gray-500">
            Page 1{hasSecondPage ? ' of 2' : ''}
          </div>
        </div>

        {/* Page Divider */}
        {hasSecondPage && (
          <div className="h-8 bg-gray-100 w-[210mm] mx-auto border-t border-b border-gray-200" />
        )}

        {/* Second Page */}
        {hasSecondPage && (
          <div className="bg-white shadow-lg w-[210mm] mx-auto relative p-8">
            {/* Projects section with updated layout */}
            {data.projects.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-300">Projects</h2>
                <div className="space-y-6">
                  {data.projects.map((project) => (
                    <div key={project.id} className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-gray-500">{project.location}</p>
                        <p className="mt-2 text-gray-600 whitespace-pre-line">{project.description}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Technologies: {project.technologies.join(', ')}
                        </p>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm text-gray-500">
                          {project.startDate} - {project.endDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications section with updated layout */}
            {data.certifications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-300">
                  Certifications
                </h2>
                <div className="space-y-4">
                  {data.certifications.map((cert) => (
                    <div key={cert.id} className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{cert.name}</h3>
                        <p className="text-gray-700">{cert.issuer}</p>
                        <p className="text-gray-500">{cert.location}</p>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {cert.date}
                          {cert.expiryDate && ` (Expires: ${cert.expiryDate})`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="absolute bottom-4 w-full text-center text-gray-500">Page 2 of 2</div>
          </div>
        )}
      </div>
    </>
  );
}