import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SawMaterialService } from '../../services/saw-material.service';
import { SawMaterial, MaterialType, MaterialTypeInfo } from '../../models/saw-material.model';

@Component({
  selector: 'app-add-saw-material',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-saw-material.component.html',
  styleUrl: './add-saw-material.component.css'
})
export class AddSawMaterialComponent implements OnInit {
  // Form data
  selectedMaterialType: string = '';
  selectedCatalogMaterialId: string = '';
  length: number = 0;
  location: string = '';
  addedBy: string = '';
  notes: string = '';

  // Catalog data
  materialTypes: string[] = [];
  catalogMaterials: any[] = [];
  selectedCatalogMaterial: any = null;

  // UI state
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private sawMaterialService: SawMaterialService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load available material types from catalog
    this.sawMaterialService.getCatalog().subscribe({
      next: (response) => {
        this.materialTypes = response.types;
      },
      error: (err) => {
        console.error('Error loading material types:', err);
        this.errorMessage = 'Failed to load material types';
      }
    });
  }

  // When material type is selected, load catalog materials for that type
  onMaterialTypeChange() {
    this.catalogMaterials = [];
    this.selectedCatalogMaterialId = '';
    this.selectedCatalogMaterial = null;

    if (!this.selectedMaterialType) {
      return;
    }

    this.sawMaterialService.getCatalog(this.selectedMaterialType).subscribe({
      next: (response) => {
        this.catalogMaterials = response.materials || [];
      },
      error: (err) => {
        console.error('Error loading catalog materials:', err);
        this.errorMessage = 'Failed to load materials for this type';
      }
    });
  }

  // When a specific catalog material is selected, store its details
  onCatalogMaterialChange() {
    const selected = this.catalogMaterials.find(m => m.id === this.selectedCatalogMaterialId);
    this.selectedCatalogMaterial = selected || null;
  }

  onSubmit() {
    // Validate required fields
    if (!this.selectedCatalogMaterialId || !this.length || !this.addedBy) {
      this.errorMessage = 'Please fill in all required fields';
      this.successMessage = '';
      return;
    }

    if (!this.selectedCatalogMaterial) {
      this.errorMessage = 'Please select a valid material';
      this.successMessage = '';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Build the material object from catalog data
    const material: any = {
      catalogMaterialId: this.selectedCatalogMaterialId,
      materialType: this.selectedMaterialType,
      length: this.length,
      materialGrade: this.selectedCatalogMaterial.grade,
      location: this.location,
      addedBy: this.addedBy,
      notes: this.notes,
      status: 'available'
    };

    // Set dimensions based on material type
    if (this.selectedMaterialType === 'i-beam') {
      material.dim1 = this.selectedCatalogMaterial.depth;
      material.dim2 = this.selectedCatalogMaterial.weightPerFoot;
      material.dimensionDisplay = this.selectedCatalogMaterial.size;
    } else if (this.selectedMaterialType === 'channel') {
      material.dim1 = this.selectedCatalogMaterial.depth;
      // Standard channels use weightPerFoot, dimensional channels use flange/web
      if (this.selectedCatalogMaterial.weightPerFoot) {
        material.dim2 = this.selectedCatalogMaterial.weightPerFoot;
      } else if (this.selectedCatalogMaterial.flange) {
        material.dim2 = this.selectedCatalogMaterial.flange;
        material.dim3 = this.selectedCatalogMaterial.web;
      }
      material.dimensionDisplay = this.selectedCatalogMaterial.size;
    } else if (this.selectedMaterialType === 'angle') {
      material.dim1 = this.selectedCatalogMaterial.leg1;
      material.dim2 = this.selectedCatalogMaterial.leg2;
      material.dim3 = this.selectedCatalogMaterial.thickness;
      material.dimensionDisplay = this.selectedCatalogMaterial.size;
    } else if (this.selectedMaterialType === 'tube') {
      material.dim1 = this.selectedCatalogMaterial.width;
      material.dim2 = this.selectedCatalogMaterial.height;
      material.dim3 = this.selectedCatalogMaterial.wallThickness;
      material.dimensionDisplay = this.selectedCatalogMaterial.size;
    } else if (this.selectedMaterialType === 'square-stock') {
      material.dim1 = this.selectedCatalogMaterial.width;
      material.dim2 = this.selectedCatalogMaterial.height;
      material.dimensionDisplay = this.selectedCatalogMaterial.size;
    } else if (this.selectedMaterialType === 'round-stock') {
      material.dim1 = this.selectedCatalogMaterial.diameter;
      material.dimensionDisplay = this.selectedCatalogMaterial.size;
    } else if (this.selectedMaterialType === 'dom') {
      material.dim1 = this.selectedCatalogMaterial.outerDiameter;
      material.dim2 = this.selectedCatalogMaterial.wallThickness;
      material.dimensionDisplay = this.selectedCatalogMaterial.size;
    } else if (this.selectedMaterialType === 'pipe') {
      material.dim1 = this.selectedCatalogMaterial.nominalSize;
      material.dimensionDisplay = this.selectedCatalogMaterial.size;
    } else if (this.selectedMaterialType === 'flat-bar') {
      material.dim1 = this.selectedCatalogMaterial.width;
      material.dim2 = this.selectedCatalogMaterial.thickness;
      material.dimensionDisplay = this.selectedCatalogMaterial.size;
    }

    this.sawMaterialService.addSawMaterial(material).subscribe({
      next: (result) => {
        this.successMessage = `✅ Saw material added successfully! ${this.selectedCatalogMaterial.description} - ${this.length}" long`;
        this.loading = false;

        // Reset form
        this.clearForm();

        // Scroll to top to show success message
        window.scrollTo(0, 0);
      },
      error: (err) => {
        this.errorMessage = `❌ Error: ${err.error?.message || 'Failed to add saw material'}`;
        this.loading = false;
        console.error('Error adding saw material:', err);
      }
    });
  }

  clearForm() {
    this.selectedMaterialType = '';
    this.selectedCatalogMaterialId = '';
    this.selectedCatalogMaterial = null;
    this.catalogMaterials = [];
    this.length = 0;
    this.location = '';
    this.addedBy = '';
    this.notes = '';
    this.successMessage = '';
    this.errorMessage = '';
  }
}
