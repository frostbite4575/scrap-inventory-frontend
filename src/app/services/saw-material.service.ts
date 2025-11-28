import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SawMaterial, SawDashboardStats, MaterialTypeInfo } from '../models/saw-material.model';

@Injectable({
  providedIn: 'root'
})
export class SawMaterialService {
  private apiUrl = 'https://scrap-inventory-backend.onrender.com/api';

  constructor(private http: HttpClient) { }

  // Get all saw materials with optional filters
  getSawMaterials(filters?: any): Observable<{ count: number; data: SawMaterial[] }> {
    let params = new HttpParams();

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<{ count: number; data: SawMaterial[] }>(
      `${this.apiUrl}/saw-material`,
      { params }
    );
  }

  // Get single saw material by ID
  getSawMaterialById(id: string): Observable<SawMaterial> {
    return this.http.get<SawMaterial>(`${this.apiUrl}/saw-material/${id}`);
  }

  // Add new saw material
  addSawMaterial(material: Partial<SawMaterial>): Observable<SawMaterial> {
    return this.http.post<SawMaterial>(`${this.apiUrl}/saw-material`, material);
  }

  // Update saw material
  updateSawMaterial(id: string, updates: Partial<SawMaterial>): Observable<SawMaterial> {
    return this.http.put<SawMaterial>(`${this.apiUrl}/saw-material/${id}`, updates);
  }

  // Reserve saw material
  reserveSawMaterial(id: string, jobNumber: string): Observable<SawMaterial> {
    return this.http.post<SawMaterial>(
      `${this.apiUrl}/saw-material/${id}/reserve`,
      { reservedFor: jobNumber }
    );
  }

  // Unreserve saw material
  unreserveSawMaterial(id: string): Observable<SawMaterial> {
    return this.http.post<SawMaterial>(`${this.apiUrl}/saw-material/${id}/unreserve`, {});
  }

  // Mark saw material as used (delete)
  markAsUsed(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/saw-material/${id}`);
  }

  // Get dashboard statistics
  getDashboardStats(): Observable<SawDashboardStats> {
    return this.http.get<SawDashboardStats>(`${this.apiUrl}/saw-dashboard/stats`);
  }

  // Get material types
  getMaterialTypes(): Observable<{ types: MaterialTypeInfo[] }> {
    return this.http.get<{ types: MaterialTypeInfo[] }>(
      `${this.apiUrl}/saw-material/meta/types`
    );
  }

  // Get material grades
  getMaterialGrades(): Observable<{ grades: string[] }> {
    return this.http.get<{ grades: string[] }>(
      `${this.apiUrl}/saw-material/meta/grades`
    );
  }
}
