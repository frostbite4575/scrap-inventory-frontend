import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SawMaterialService } from '../../services/saw-material.service';
import { SawMaterial, MaterialTypeInfo } from '../../models/saw-material.model';

@Component({
  selector: 'app-search-saw-material',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-saw-material.component.html',
  styleUrl: './search-saw-material.component.css'
})
export class SearchSawMaterialComponent implements OnInit {
  filters = {
    materialType: '',
    materialGrade: '',
    status: '',
    minLength: null as number | null,
    maxLength: null as number | null,
    reservationId: ''
  };

  materials: SawMaterial[] = [];
  materialTypes: MaterialTypeInfo[] = [];
  materialGrades: string[] = [];
  loading = false;
  error: string | null = null;
  searched = false;

  constructor(private sawMaterialService: SawMaterialService) {}

  ngOnInit() {
    // Load filter options
    this.sawMaterialService.getMaterialTypes().subscribe({
      next: (response) => this.materialTypes = response.types,
      error: (err) => console.error('Error loading material types:', err)
    });

    this.sawMaterialService.getMaterialGrades().subscribe({
      next: (response) => this.materialGrades = response.grades,
      error: (err) => console.error('Error loading material grades:', err)
    });
  }

  search() {
    this.loading = true;
    this.error = null;
    this.searched = true;

    // Build filter object (remove empty values)
    const filters: any = {};
    if (this.filters.materialType) filters.materialType = this.filters.materialType;
    if (this.filters.materialGrade) filters.materialGrade = this.filters.materialGrade;
    if (this.filters.status) filters.status = this.filters.status;
    if (this.filters.minLength) filters.minLength = this.filters.minLength;
    if (this.filters.maxLength) filters.maxLength = this.filters.maxLength;
    if (this.filters.reservationId) filters.reservationId = this.filters.reservationId;

    this.sawMaterialService.getSawMaterials(filters).subscribe({
      next: (response) => {
        this.materials = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to search saw materials';
        this.loading = false;
        console.error('Error searching:', err);
      }
    });
  }

  clearFilters() {
    this.filters = {
      materialType: '',
      materialGrade: '',
      status: '',
      minLength: null,
      maxLength: null,
      reservationId: ''
    };
    this.materials = [];
    this.searched = false;
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  formatMaterialType(type: string): string {
    const typeMap: { [key: string]: string } = {
      'angle': 'Angle',
      'tube': 'Tube',
      'square-stock': 'Square Stock',
      'round-stock': 'Round Stock',
      'dom': 'D.O.M.',
      'pipe': 'Pipe',
      'i-beam': 'I-Beam',
      'channel': 'Channel',
      'flat-bar': 'Flat Bar'
    };
    return typeMap[type] || type;
  }
}
