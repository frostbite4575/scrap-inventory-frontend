import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScrapPiece, DashboardStats } from '../models/scrap.model';

@Injectable({
  providedIn: 'root'
})
export class ScrapService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  // Get all scrap pieces with optional filters
  getScrap(filters?: any): Observable<{ count: number; data: ScrapPiece[] }> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<{ count: number; data: ScrapPiece[] }>(
      `${this.apiUrl}/scrap`,
      { params }
    );
  }

  // Get single scrap piece by ID
  getScrapById(id: string): Observable<ScrapPiece> {
    return this.http.get<ScrapPiece>(`${this.apiUrl}/scrap/${id}`);
  }

  // Add new scrap piece
  addScrap(scrap: Partial<ScrapPiece>): Observable<ScrapPiece> {
    return this.http.post<ScrapPiece>(`${this.apiUrl}/scrap`, scrap);
  }

  // Update scrap piece
  updateScrap(id: string, updates: Partial<ScrapPiece>): Observable<ScrapPiece> {
    return this.http.put<ScrapPiece>(`${this.apiUrl}/scrap/${id}`, updates);
  }

  // Reserve scrap piece
  reserveScrap(id: string, jobNumber: string): Observable<ScrapPiece> {
    return this.http.post<ScrapPiece>(
      `${this.apiUrl}/scrap/${id}/reserve`,
      { reservedFor: jobNumber }
    );
  }

  // Unreserve scrap piece
  unreserveScrap(id: string): Observable<ScrapPiece> {
    return this.http.post<ScrapPiece>(`${this.apiUrl}/scrap/${id}/unreserve`, {});
  }

  // Mark scrap as used (delete)
  markAsUsed(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/scrap/${id}`);
  }

  // Get dashboard statistics
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
  }

  // Get material grades
  getMaterialGrades(): string[] {
    return ['A36', 'A572-50', '304SS', '316SS', '5052-H32', '6061-T6'];
  }

  // Get catalog materials
  getCatalog(type?: string): Observable<any> {
    const params = type ? new HttpParams().set('type', type) : new HttpParams();
    return this.http.get(`${this.apiUrl}/scrap/catalog`, { params });
  }

  // Get specific catalog material by ID
  getCatalogMaterial(materialId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/scrap/catalog/${materialId}`);
  }

  // Location methods
  getAreas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/scrap/locations/areas`);
  }

  getSections(areaId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/scrap/locations/sections/${areaId}`);
  }

  getBins(areaId: string, sectionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/scrap/locations/bins/${areaId}/${sectionId}`);
  }
}