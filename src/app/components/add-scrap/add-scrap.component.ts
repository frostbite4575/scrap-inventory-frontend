import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ScrapService } from '../../services/scrap.service';
import { ScrapPiece } from '../../models/scrap.model';

@Component({
  selector: 'app-add-scrap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-scrap.component.html',
  styleUrl: './add-scrap.component.css'
})
export class AddScrapComponent implements OnInit {
  // Form data
  selectedCatalogMaterialId: string = '';
  length: number = 0;
  width: number = 0;
  location: string = '';
  addedBy: string = '';
  notes: string = '';

  // Catalog data
  catalogMaterials: any[] = [];
  selectedCatalogMaterial: any = null;

  // UI state
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private scrapService: ScrapService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load plate materials from catalog
    this.scrapService.getCatalog('plate').subscribe({
      next: (response) => {
        this.catalogMaterials = response.materials || [];
      },
      error: (err) => {
        console.error('Error loading catalog materials:', err);
        this.errorMessage = 'Failed to load material catalog';
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
    if (!this.selectedCatalogMaterialId || !this.length || !this.width || !this.addedBy) {
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

    // Build the scrap piece object from catalog data
    const scrapPiece: any = {
      catalogMaterialId: this.selectedCatalogMaterialId,
      length: this.length,
      width: this.width,
      thickness: this.selectedCatalogMaterial.thickness,
      materialGrade: this.selectedCatalogMaterial.grade,
      location: this.location,
      addedBy: this.addedBy,
      notes: this.notes,
      status: 'available'
    };

    this.scrapService.addScrap(scrapPiece).subscribe({
      next: (result) => {
        this.successMessage = `✅ Scrap piece added successfully! ${this.selectedCatalogMaterial.description} - ${this.length}" x ${this.width}"`;
        this.loading = false;

        // Reset form
        this.clearForm();

        // Scroll to top to show success message
        window.scrollTo(0, 0);
      },
      error: (err) => {
        this.errorMessage = `❌ Error: ${err.error?.message || 'Failed to add scrap piece'}`;
        this.loading = false;
        console.error('Error adding scrap:', err);
      }
    });
  }

  clearForm() {
    this.selectedCatalogMaterialId = '';
    this.selectedCatalogMaterial = null;
    this.length = 0;
    this.width = 0;
    this.location = '';
    this.addedBy = '';
    this.notes = '';
    this.successMessage = '';
    this.errorMessage = '';
  }
}