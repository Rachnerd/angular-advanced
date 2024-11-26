import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
  });

  const setupComponent = (rating: number, count = 0) => {
    fixture.componentRef.setInput('rating', rating);
    fixture.componentRef.setInput('count', count);
    fixture.detectChanges();
  };

  const getStarElements = (): SVGElement[] =>
    fixture.nativeElement.querySelectorAll('.star');

  it('should create', () => {
    setupComponent(4.5, 128);
    expect(component).toBeTruthy();
  });

  describe('aria-label tests', () => {
    it('should have correct aria-label for integer ratings', () => {
      setupComponent(3);
      const ratingElement = fixture.nativeElement.querySelector('.rating');
      expect(ratingElement.getAttribute('aria-label')).toBe('3 out of 5 stars');
    });

    it('should have correct aria-label for decimal ratings', () => {
      setupComponent(4.25);
      const ratingElement = fixture.nativeElement.querySelector('.rating');
      expect(ratingElement.getAttribute('aria-label')).toBe(
        '4.25 out of 5 stars'
      );
    });

    it('should handle zero rating', () => {
      setupComponent(0);
      const ratingElement = fixture.nativeElement.querySelector('.rating');
      expect(ratingElement.getAttribute('aria-label')).toBe('0 out of 5 stars');
    });

    it('should handle maximum rating', () => {
      setupComponent(5);
      const ratingElement = fixture.nativeElement.querySelector('.rating');
      expect(ratingElement.getAttribute('aria-label')).toBe('5 out of 5 stars');
    });
  });

  describe('star rendering tests', () => {
    it('should always render exactly 5 stars', () => {
      setupComponent(3.75);
      expect(getStarElements().length).toBe(5);
    });

    describe('star classes for different ratings', () => {
      it('should handle zero rating (all empty)', () => {
        setupComponent(0);
        const stars = getStarElements();
        stars.forEach((star) => {
          expect(star.classList.contains('star--empty')).toBeTruthy();
        });
      });

      it('should handle maximum rating (all filled)', () => {
        setupComponent(5);
        const stars = getStarElements();
        stars.forEach((star) => {
          expect(star.classList.contains('star--filled')).toBeTruthy();
        });
      });

      it('should handle 0.25 star rating', () => {
        setupComponent(3.25);
        const stars = getStarElements();

        // First 3 stars should be filled
        for (let i = 0; i < 3; i++) {
          expect(stars[i].classList.contains('star--filled')).toBeTruthy();
        }

        // Fourth star should be 25% filled
        expect(stars[3].classList.contains('star--25')).toBeTruthy();

        // Last star should be empty
        expect(stars[4].classList.contains('star--empty')).toBeTruthy();
      });

      it('should handle 0.5 star rating', () => {
        setupComponent(3.5);
        const stars = getStarElements();

        // First 3 stars should be filled
        for (let i = 0; i < 3; i++) {
          expect(stars[i].classList.contains('star--filled')).toBeTruthy();
        }

        // Fourth star should be 50% filled
        expect(stars[3].classList.contains('star--50')).toBeTruthy();

        // Last star should be empty
        expect(stars[4].classList.contains('star--empty')).toBeTruthy();
      });

      it('should handle 0.75 star rating', () => {
        setupComponent(3.75);
        const stars = getStarElements();

        // First 3 stars should be filled
        for (let i = 0; i < 3; i++) {
          expect(stars[i].classList.contains('star--filled')).toBeTruthy();
        }

        // Fourth star should be 75% filled
        expect(stars[3].classList.contains('star--75')).toBeTruthy();

        // Last star should be empty
        expect(stars[4].classList.contains('star--empty')).toBeTruthy();
      });

      it('should ensure only one state class is applied per star', () => {
        setupComponent(3.25);
        const stars = getStarElements();

        const stateClasses = [
          'star--filled',
          'star--75',
          'star--50',
          'star--25',
          'star--empty',
        ];

        stars.forEach((star) => {
          const appliedStates = stateClasses.filter((cls) =>
            star.classList.contains(cls)
          );
          expect(appliedStates.length).toBe(1);
        });
      });
    });
  });

  describe('review count tests', () => {
    it('should display review count when provided', () => {
      setupComponent(4, 128);
      const countElement = fixture.nativeElement.querySelector('.count');
      expect(countElement.textContent).toBe('(128)');
    });

    it('should handle single review', () => {
      setupComponent(4, 1);
      const countElement = fixture.nativeElement.querySelector('.count');
      expect(countElement.textContent).toBe('(1)');
    });

    it('should handle zero reviews', () => {
      setupComponent(4, 0);
      const countElement = fixture.nativeElement.querySelector('.count');
      expect(countElement.textContent).toBe('(0)');
    });

    it('should handle large review counts', () => {
      setupComponent(4, 999999);
      const countElement = fixture.nativeElement.querySelector('.count');
      expect(countElement.textContent).toBe('(999999)');
    });
  });

  describe('SVG gradient definitions', () => {
    it('should include all required gradient definitions', () => {
      setupComponent(3);
      const gradients =
        fixture.nativeElement.querySelectorAll('linearGradient');
      const gradientIds = Array.from<HTMLElement>(gradients).map((g) => g.id);

      expect(gradientIds).toContain('star-gradient-25');
      expect(gradientIds).toContain('star-gradient-50');
      expect(gradientIds).toContain('star-gradient-75');
    });

    it('should define correct stop points for each gradient', () => {
      setupComponent(3);
      const gradientElements =
        fixture.nativeElement.querySelectorAll('linearGradient');

      const gradients = Array.from<HTMLElement>(gradientElements);

      // Check 25% gradient
      const gradient25 = gradients.find((g) => g.id === 'star-gradient-25');
      const stops25 = gradient25?.querySelectorAll('stop');
      expect(stops25?.[0].getAttribute('offset')).toBe('25%');
      expect(stops25?.[1].getAttribute('offset')).toBe('25%');

      // Check 50% gradient
      const gradient50 = gradients.find((g) => g.id === 'star-gradient-50');
      const stops50 = gradient50?.querySelectorAll('stop');
      expect(stops50?.[0].getAttribute('offset')).toBe('50%');
      expect(stops50?.[1].getAttribute('offset')).toBe('50%');

      // Check 75% gradient
      const gradient75 = gradients.find((g) => g.id === 'star-gradient-75');
      const stops75 = gradient75?.querySelectorAll('stop');
      expect(stops75?.[0].getAttribute('offset')).toBe('75%');
      expect(stops75?.[1].getAttribute('offset')).toBe('75%');
    });
  });
});
