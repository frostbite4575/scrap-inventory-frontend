import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SawMaterialService } from '../../services/saw-material.service';
import { SawDashboardStats } from '../../models/saw-material.model';

@Component({
  selector: 'app-saw-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saw-dashboard.component.html',
  styleUrl: './saw-dashboard.component.css'
})
export class SawDashboardComponent implements OnInit {
  stats: SawDashboardStats | null = null;
  loading = true;
  error: string | null = null;

  constructor(private sawMaterialService: SawMaterialService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.sawMaterialService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load dashboard statistics';
        this.loading = false;
        console.error('Error loading stats:', err);
      }
    });
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
      'channel': 'Channel'
    };
    return typeMap[type] || type;
  }
}
