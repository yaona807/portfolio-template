import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
// dompurifyの型エラー対策
// @ts-ignore

interface ProjectDetail {
  name: string;
  role: string;
  tech: string;
  description?: string;
  descriptionFile?: string;
}

interface Job {
  company: string;
  title: string;
  duration: string;
  description: string;
  projects?: ProjectDetail[];
}

interface WorkExperienceProps {
  workExperience: Job[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ workExperience }) => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [projectDescriptions, setProjectDescriptions] = useState<{ [key: string]: string }>({});

  // descriptionFileが指定されている場合はfetchしてキャッシュ
  React.useEffect(() => {
    if (!open || !selectedJob) return;
    const fetchDescriptions = async () => {
      const promises = (selectedJob.projects || []).map(async (proj) => {
        if (proj.descriptionFile && !projectDescriptions[proj.descriptionFile]) {
          const res = await fetch(`/${proj.descriptionFile}`);
          const text = await res.text();
          return { file: proj.descriptionFile, text };
        }
        return null;
      });
      const results = await Promise.all(promises);
      const newDescs: { [key: string]: string } = {};
      results.forEach((r) => {
        if (r) newDescs[r.file] = r.text;
      });
      if (Object.keys(newDescs).length > 0) {
        setProjectDescriptions((prev) => ({ ...prev, ...newDescs }));
      }
    };
    fetchDescriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedJob]);

  const handleOpen = (job: Job) => {
    setSelectedJob(job);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  return (
    <Container id="work-experience" sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Work Experience
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {workExperience.map((job, index) => (
          <div key={index} style={{ width: '100%' }}>
            <Card onClick={() => handleOpen(job)} style={{ cursor: 'pointer', maxWidth: 700, margin: '0 auto' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }}>
                  {job.title} at {job.company}
                </Typography>
                <Typography sx={{ mb: 1.5, fontSize: { xs: 14, sm: 15, md: 16 } }} color="text.secondary">
                  {job.duration}
                </Typography>
                <Typography variant="body2" noWrap sx={{ fontSize: { xs: 13, sm: 14, md: 15 } }}>
                  {job.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedJob?.title} at {selectedJob?.company}
        </DialogTitle>
        <DialogContent dividers>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {selectedJob?.duration}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedJob?.description}
          </Typography>
          <hr style={{ border: 0, borderTop: '1px solid #e0e0e0', margin: '16px 0' }} />
        {selectedJob?.projects && selectedJob.projects.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              担当プロジェクト
            </Typography>
            {selectedJob.projects.map((proj, idx) => (
              <React.Fragment key={idx}>
                <div style={{ marginBottom: 16 }}>
                <Typography variant="body1" fontWeight="bold">
                  {proj.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  役割: {proj.role}
                </Typography>
                {proj.tech && (
                  <Typography variant="body2" color="text.secondary">
                    技術: {proj.tech}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  詳細:
                </Typography>
                {proj.descriptionFile ? (
                  <div
                    style={{ marginTop: 2 }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        marked.parse(projectDescriptions[proj.descriptionFile] || '', { async: false })
                          .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g, '<strong>$1</strong>')
                      )
                    }}
                  />
                ) : (
                  <div
                    style={{ marginTop: 2 }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        marked.parse(proj.description || '', { async: false })
                          .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g, '<strong>$1</strong>')
                      )
                    }}
                  />
                )}
                </div>
                {selectedJob?.projects && idx !== selectedJob.projects.length - 1 && (
                  <hr style={{ border: 0, borderTop: '1px solid #e0e0e0', margin: '16px 0' }} />
                )}
              </React.Fragment>
            ))}
          </>
        )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">閉じる</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WorkExperience;