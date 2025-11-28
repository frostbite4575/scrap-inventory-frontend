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
  material: Partial<SawMaterial> = {
    materialType: 'angle',
    length: 0,
    dim1: 0,
    dim2: 0,
    dim3: 0,
    materialGrade: '',
    location: '',
    addedBy: '',
    notes: '',
    status: 'available'
  };

  materialTypes: MaterialTypeInfo[] = [];
  materialGrades: string[] = [];
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private sawMaterialService: SawMaterialService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load material types from API
    this.sawMaterialService.getMaterialTypes().subscribe({
      next: (response) => {
        this.materialTypes = response.types;
      },
      error: (err) => {
        console.error('Error loading material types:', err);
        // Fallback to hardcoded types
        this.materialTypes = [
          { value: 'angle', label: 'Angle', dimensions: ['leg1', 'leg2', 'wall'] },
          { value: 'tube', label: 'Tube (Rectangular)', dimensions: ['width', 'height', 'wall'] },
          { value: 'square-stock', label: 'Square Stock', dimensions: ['width', 'height'] },
          { value: 'round-stock', label: 'Round Stock', dimensions: ['diameter'] },
          { value: 'dom', label: 'D.O.M.', dimensions: ['OD', 'wall'] },
          { value: 'pipe', label: 'Pipe', dimensions: ['ID'] },
          { value: 'i-beam', label: 'I-Beam', dimensions: ['depth', 'weight/ft'] },
          { value: 'channel', label: 'Channel', dimensions: ['depth', 'weight/ft'] }
        ];
      }
    });

    // Load material grades from API
    this.sawMaterialService.getMaterialGrades().subscribe({
      next: (response) => {
        this.materialGrades = response.grades;
      },
      error: (err) => {
        console.error('Error loading material grades:', err);
        // Fallback to hardcoded grades
        this.materialGrades = ['A36', 'A572-50', '304SS', '316SS', '5052-H32', '6061-T6', 'A500', 'A513'];
      }
    });
  }

  get currentMaterialType(): MaterialTypeInfo | undefined {
    return this.materialTypes.find(t => t.value === this.material.materialType);
  }

  get dimensionLabels(): string[] {
    return this.currentMaterialType?.dimensions || [];
  }

  // Check if we need dimension fields based on material type
  get needsDim2(): boolean {
    const type = this.material.materialType;
    return type === 'angle' || type === 'tube' || type === 'square-stock' ||
           type === 'dom' || type === 'i-beam' || type === 'channel';
  }

  get needsDim3(): boolean {
    const type = this.material.materialType;
    return type === 'angle' || type === 'tube';
  }

  onMaterialTypeChange() {
    // Reset dimension values when type changes
    this.material.dim2 = 0;
    this.material.dim3 = 0;
  }

  onSubmit() {
    // Validate required fields
    if (!this.material.length || !this.material.dim1 ||
        !this.material.materialGrade || !this.material.addedBy) {
      this.errorMessage = 'Please fill in all required fields';
      this.successMessage = '';
      return;
    }

    // Validate dimension 2 if needed
    if (this.needsDim2 && !this.material.dim2) {
      this.errorMessage = 'Please fill in all required dimension fields';
      this.successMessage = '';
      return;
    }

    // Validate dimension 3 if needed
    if (this.needsDim3 && !this.material.dim3) {
      this.errorMessage = 'Please fill in all required dimension fields';
      this.successMessage = '';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.sawMaterialService.addSawMaterial(this.material).subscribe({
      next: (result) => {
        this.successMessage = `✅ Saw material added successfully! ${result.formattedDimensions}`;
        this.loading = false;

        // Reset form
        this.material = {
          materialType: 'angle',
          length: 0,
          dim1: 0,
          dim2: 0,
          dim3: 0,
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
        this.errorMessage = `❌ Error: ${err.error?.message || 'Failed to add saw material'}`;
        this.loading = false;
        console.error('Error adding saw material:', err);
      }
    });
  }

  clearForm() {
    this.material = {
      materialType: 'angle',
      length: 0,
      dim1: 0,
      dim2: 0,
      dim3: 0,
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
