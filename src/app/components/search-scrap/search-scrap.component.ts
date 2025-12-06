import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrapService } from '../../services/scrap.service';
import { ScrapPiece } from '../../models/scrap.model';

@Component({
  selector: 'app-search-scrap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-scrap.component.html',
  styleUrl: './search-scrap.component.css'
})
export class SearchScrapComponent {
  // Search filters
  filters = {
    materialGrade: '',
    thickness: null as number | null,
    minLength: null as number | null,
    minWidth: null as number | null,
    location: '',
    reservationId: ''
  };

  searchResults: ScrapPiece[] = [];
  materialGrades: string[] = [];
  loading = false;
  searched = false;

  constructor(private scrapService: ScrapService) {
    this.materialGrades = this.scrapService.getMaterialGrades();
  }

  onSearch() {
    this.loading = true;
    this.searched = true;

    // Build filter object (only include non-empty values)
    const searchParams: any = { status: 'available' };
    
    if (this.filters.materialGrade) {
      searchParams.materialGrade = this.filters.materialGrade;
    }
    if (this.filters.thickness) {
      searchParams.thickness = this.filters.thickness;
    }
    if (this.filters.minLength) {
      searchParams.minLength = this.filters.minLength;
    }
    if (this.filters.minWidth) {
      searchParams.minWidth = this.filters.minWidth;
    }
    if (this.filters.location) {
      searchParams.location = this.filters.location;
    }
    if (this.filters.reservationId) {
      searchParams.reservationId = this.filters.reservationId;
    }

    this.scrapService.getScrap(searchParams).subscribe({
      next: (response) => {
        this.searchResults = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error searching:', err);
        this.loading = false;
      }
    });
  }

  clearSearch() {
    this.filters = {
      materialGrade: '',
      thickness: null,
      minLength: null,
      minWidth: null,
      location: '',
      reservationId: ''
    };
    this.searchResults = [];
    this.searched = false;
  }

  reservePiece(piece: ScrapPiece) {
    const jobNumber = prompt('Enter job or nest number:');
    if (!jobNumber || !piece._id) return;

    this.scrapService.reserveScrap(piece._id, jobNumber).subscribe({
      next: () => {
        alert('✅ Piece reserved successfully!');
        this.onSearch(); // Refresh results
      },
      error: (err) => {
        alert(`❌ Error: ${err.error?.message || 'Failed to reserve piece'}`);
      }
    });
  }

  unreservePiece(piece: ScrapPiece) {
    if (!confirm('Are you sure you want to unreserve this piece?') || !piece._id) return;

    this.scrapService.unreserveScrap(piece._id).subscribe({
      next: () => {
        alert('✅ Piece unreserved successfully!');
        this.onSearch(); // Refresh results
      },
      error: (err) => {
        alert(`❌ Error: ${err.error?.message || 'Failed to unreserve piece'}`);
      }
    });
  }

  markAsUsed(piece: ScrapPiece) {
    if (!confirm('Mark this piece as used? This will remove it from available inventory.') || !piece._id) return;

    this.scrapService.markAsUsed(piece._id).subscribe({
      next: () => {
        alert('✅ Piece marked as used!');
        this.onSearch(); // Refresh results
      },
      error: (err) => {
        alert(`❌ Error: ${err.error?.message || 'Failed to mark as used'}`);
      }
    });
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }
}