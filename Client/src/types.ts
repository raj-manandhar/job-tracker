export type JobType = 'Internship' | 'Full-time' | 'Part-time'
export type ApplicationStatus =
  | 'Applied'
  | 'Interviewing'
  | 'Offer'
  | 'Rejected'

export interface Application {
  id: string
  company_name: string
  job_title: string
  job_type: JobType
  status: ApplicationStatus
  applied_date: string // YYYY-MM-DD
  notes?: string
  created_at: string // ISO string
  updated_at: string // ISO string
}

export type CreateApplicationInput = Omit<
  Application,
  'id' | 'created_at' | 'updated_at'
>
export type UpdateApplicationInput = Partial<CreateApplicationInput>
