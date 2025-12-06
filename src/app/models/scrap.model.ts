export interface ScrapPiece {
  _id?: string;
  length: number;
  width: number;
  thickness: number;
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
  area?: number;
}

export interface DashboardStats {
  summary: {
    totalAvailable: number;
    totalReserved: number;
    totalUsed: number;
    total: number;
  };
  byGrade: Array<{
    _id: string;
    count: number;
    totalArea: number;
  }>;
  byThickness: Array<{
    _id: number;
    count: number;
  }>;
  recentActivity: {
    addedLast7Days: number;
    usedLast7Days: number;
  };
}