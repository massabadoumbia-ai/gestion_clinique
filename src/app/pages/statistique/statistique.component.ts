import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard/dashoard.service';
import { Chart } from 'chart.js/auto';
import { DashboardResponseDto, StockEvolutionDto } from '../dto/articles.models.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  @ViewChild('stockChart') stockChartRef!: ElementRef;
  stockChart: any;
  dashboard: DashboardResponseDto[] = [];
  isLoading = false;

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.isLoading = false;

        setTimeout(() => this.loadStockEvolution(), 0);
      },
      error: (err) => {
        console.error('Erreur chargement dashboard:', err);
        this.isLoading = false;
      }
    });
  }

  loadStockEvolution(): void {
    this.dashboardService.getStockEvolution().subscribe({
      next: (data: StockEvolutionDto) => {
        const labels = data.labels;
        const datasets = Object.keys(data.series).map(key => ({
          label: key,
          data: data.series[key],
          fill: false,
          borderWidth: 2,
          borderColor: this.getRandomColor(),
          tension: 0.3
        }));

        if (!this.stockChartRef || !this.stockChartRef.nativeElement) {
          console.warn('Canvas non disponible, graphique non généré.');
          return;
        }

        if (this.stockChart) this.stockChart.destroy();

        this.stockChart = new Chart(this.stockChartRef.nativeElement, {
          type: 'line',
          data: { labels, datasets },
          options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true } }
          }
        });
      },
      error: err => console.error('Erreur chargement évolution stock:', err)
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    return color;
  }

  onCreateArticle(): void { this.router.navigate(['/admin/dashboard/article-add']); }
  onCreateAffectation(): void { this.router.navigate(['/admin/dashboard/affectation-add']); }
  onCreateEmploye(): void { this.router.navigate(['/admin/dashboard/employe-add']); }
  onCreateReception(): void { this.router.navigate(['/admin/dashboard/reception-add']); }

  getCardClass(libelle: string): string {
    const normalized = libelle.toLowerCase().trim();
    if (normalized.includes('stock')) return 'stock';
    if (normalized.includes('rupture')) return 'rupture';
    if (normalized.includes('affectation')) return 'affectation';
    return '';
  }
}
 