import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrapService } from '../../services/scrap.service';
import { ScrapPiece } from '../../models/scrap.model';

@Component({
  selector: 'app-scrap-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrap-list.component.html',
  styleUrl: './scrap-list.component.css'
})
export class ScrapListComponent implements OnInit {
  scrapPieces: ScrapPiece[] = [];
  loading = true;
  error: string | null = null;

  constructor(private scrapService: ScrapService) {}

  ngOnInit() {
    this.loadScrap();
  }

  loadScrap() {
    this.loading = true;
    this.error = null;

    // Only show available pieces by default
    this.scrapService.getScrap({ status: 'available' }).subscribe({
      next: (response) => {
        this.scrapPieces = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load scrap inventory';
        this.loading = false;
        console.error('Error loading scrap:', err);
      }
    });
  }

  reservePiece(piece: ScrapPiece) {
    const jobNumber = prompt('Enter job or nest number:');
    if (!jobNumber || !piece._id) return;

    this.scrapService.reserveScrap(piece._id, jobNumber).subscribe({
      next: () => {
        alert('✅ Piece reserved successfully!');
        this.loadScrap();
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
        this.loadScrap();
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
        this.loadScrap();
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