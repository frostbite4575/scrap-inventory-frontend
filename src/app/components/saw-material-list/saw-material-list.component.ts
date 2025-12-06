import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SawMaterialService } from '../../services/saw-material.service';
import { SawMaterial } from '../../models/saw-material.model';

@Component({
  selector: 'app-saw-material-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saw-material-list.component.html',
  styleUrl: './saw-material-list.component.css'
})
export class SawMaterialListComponent implements OnInit {
  sawMaterials: SawMaterial[] = [];
  loading = true;
  error: string | null = null;

  constructor(private sawMaterialService: SawMaterialService) {}

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
    this.loading = true;
    this.error = null;

    // Show both available and reserved materials (exclude only 'used')
    this.sawMaterialService.getSawMaterials({}).subscribe({
      next: (response) => {
        this.sawMaterials = response.data.filter(m => m.status !== 'used');
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load saw materials inventory';
        this.loading = false;
        console.error('Error loading saw materials:', err);
      }
    });
  }

  reserveMaterial(material: SawMaterial) {
    const jobNumber = prompt('Enter job or order number:');
    if (!jobNumber || !material._id) return;

    this.sawMaterialService.reserveSawMaterial(material._id, jobNumber).subscribe({
      next: () => {
        alert('✅ Material reserved successfully!');
        this.loadMaterials();
      },
      error: (err) => {
        alert(`❌ Error: ${err.error?.message || 'Failed to reserve material'}`);
      }
    });
  }

  unreserveMaterial(material: SawMaterial) {
    if (!confirm('Are you sure you want to unreserve this material?') || !material._id) return;

    this.sawMaterialService.unreserveSawMaterial(material._id).subscribe({
      next: () => {
        alert('✅ Material unreserved successfully!');
        this.loadMaterials();
      },
      error: (err) => {
        alert(`❌ Error: ${err.error?.message || 'Failed to unreserve material'}`);
      }
    });
  }

  markAsUsed(material: SawMaterial) {
    if (!confirm('Mark this material as used? This will remove it from available inventory.') || !material._id) return;

    this.sawMaterialService.markAsUsed(material._id).subscribe({
      next: () => {
        alert('✅ Material marked as used!');
        this.loadMaterials();
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
