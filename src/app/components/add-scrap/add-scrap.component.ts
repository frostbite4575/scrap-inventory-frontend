import { Component } from '@angular/core';
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
export class AddScrapComponent {
  scrap: Partial<ScrapPiece> = {
    length: 0,
    width: 0,
    thickness: 0,
    materialGrade: '',
    location: '',
    addedBy: '',
    notes: '',
    status: 'available'
  };

  materialGrades: string[] = [];
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private scrapService: ScrapService,
    private router: Router
  ) {
    this.materialGrades = this.scrapService.getMaterialGrades();
  }

  onSubmit() {
    // Validate required fields
    if (!this.scrap.length || !this.scrap.width || !this.scrap.thickness || 
        !this.scrap.materialGrade || !this.scrap.addedBy) {
      this.errorMessage = 'Please fill in all required fields';
      this.successMessage = '';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.scrapService.addScrap(this.scrap).subscribe({
      next: (result) => {
        this.successMessage = `✅ Scrap piece added successfully! Area: ${result.area?.toFixed(2)} sq in`;
        this.loading = false;
        
        // Reset form
        this.scrap = {
          length: 0,
          width: 0,
          thickness: 0,
          materialGrade: '',
          location: '',
          addedBy: '',
          notes: '',
          status: 'available'
        };

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
    this.scrap = {
      length: 0,
      width: 0,
      thickness: 0,
      materialGrade: '',
      location: '',
      addedBy: '',
      notes: '',
      status: 'available'
    };
    this.successMessage = '';
    this.errorMessage = '';
  }
}