import { Component, inject } from '@angular/core';
import { InputComponent } from '@angular-advanced/ui-components/input/input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { ProductService } from '../../products/product.service';

@Component({
  selector: 'app-products-search',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './products-search.component.html',
  styleUrl: './products-search.component.scss',
})
export class ProductsSearchComponent {
  private productService = inject(ProductService);
  private fb = new FormBuilder();

  protected search = this.fb.nonNullable.control(
    this.productService.queryParams().search ?? '',
    [Validators.required, Validators.minLength(3)],
  );

  protected form = this.fb.nonNullable.group({
    search: this.search,
  });

  constructor() {
    this.search.valueChanges
      .pipe(
        // Prevent memory leaks by cleaning up the subscription if navigated elsewhere
        takeUntilDestroyed(),
        // Only let valid input or empty input pass
        filter((search) => this.search.valid || search === ''),
        // Reduce calls to backend by waiting for 300ms of no input updates
        debounceTime(300),
        // Only continue if the value is not the same as the previous
        distinctUntilChanged(),
      )
      .subscribe((search) =>
        this.productService.updateParams({ search, page: 1 }),
      );
  }

  protected reset() {
    this.search.setValue('');
  }
}
