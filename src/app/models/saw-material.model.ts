export type MaterialType = 'angle' | 'tube' | 'square-stock' | 'round-stock' | 'dom' | 'pipe' | 'i-beam' | 'channel' | 'flat-bar';

export interface SawMaterial {
  _id?: string;
  materialType: MaterialType;
  length: number;
  dim1: number;
  dim2?: number;
  dim3?: number;
  dimensionDisplay?: string;
  formattedDimensions?: string;
  materialGrade: string;
  location?: string;
  dateAdded?: Date;
  addedBy: string;
  notes?: string;
  status: 'available' | 'reserved' | 'used';
  reservedFor?: string;
  reservationId?: string;
  reservedDate?: Date;
  usedDate?: Date;
}

export interface MaterialTypeInfo {
  value: MaterialType;
  label: string;
  dimensions: string[];
}

export interface SawDashboardStats {
  summary: {
    totalAvailable: number;
    totalReserved: number;
    totalUsed: number;
    total: number;
  };
  byType: Array<{
    _id: string;
    count: number;
  }>;
  byGrade: Array<{
    _id: string;
    count: number;
  }>;
  recentActivity: {
    addedLast7Days: number;
    usedLast7Days: number;
  };
}
