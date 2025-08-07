import { ChangeDetectorRef, Component, computed, effect, Input, signal } from '@angular/core';
import { NgClass, NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import { SortConfig } from "../../models/sort.interface";

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [
    TitleCasePipe,
    NgIf,
    NgForOf,
    NgClass
  ],
  styleUrls: [ './table.component.scss' ]
})


export class TableComponent {
  @Input() set data(value: any[]) {
    this.dataSignal.set(value);
  }

  private dataSignal = signal<any[]>([]);
  protected sortConfig = signal<SortConfig>({ key: '', direction: null });
  protected currentPage = signal<number>(1);
  private pageSize = signal<number>(10);

  columns = signal<string[]>([]);
  paginatedData = computed(() => {
    const sortedData = this.computeSortedData();
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return sortedData.slice(start, end);
  });
  totalPages = computed(() => Math.ceil(this.dataSignal().length / this.pageSize()));
  pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  constructor(private cdr: ChangeDetectorRef) {
    // Effect to update columns when data changes
    effect(() => {
      const data = this.dataSignal();
      if (data && data.length > 0) {
        this.columns.set(Object.keys(data[0]));
      } else {
        this.columns.set([]);
      }
      this.cdr.markForCheck();
    }, { allowSignalWrites: true });
  }

  sortBy(column: string): void {
    this.sortConfig.update(current => {
      if (current.key === column) {
        return {
          key: column,
          direction:
            current.direction === 'asc' ? 'desc' :
              current.direction === 'desc' ? null : 'asc'
        };
      }
      return { key: column, direction: 'asc' };
    });
    this.cdr.markForCheck();
  }

  changePage(page: number): void {
    this.currentPage.set(page);
    this.cdr.markForCheck();
  }

  private computeSortedData(): any[] {
    const data = [...this.dataSignal()];
    const sort = this.sortConfig();

    if (sort.direction) {
      data.sort((a, b) => {
        const valueA = a[sort.key];
        const valueB = b[sort.key];
        if (valueA < valueB) return sort.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }
}
