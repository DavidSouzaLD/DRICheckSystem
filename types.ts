export interface ChecklistItemData {
  id: string;
  category: string;
  item: string;
}

export type Checklist = ChecklistItemData[];

export type Device = 'iPhone' | 'MacBook' | 'iPad' | 'iPod' | 'AirPods';
