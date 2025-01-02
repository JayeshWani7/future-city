export type ComplaintCategory = 'water' | 'security' | 'sanitation' | 'other';

export interface Complaint {
  id: string;
  category: ComplaintCategory;
  description: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: Date;
}