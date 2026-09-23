import { Component, OnDestroy, OnInit } from '@angular/core';

interface Slide {
  title: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private timerId?: number;

  slides: Slide[] = [
    {
      title: 'Signature Pasta',
      subtitle: 'Creamy, rich, and made to comfort every craving.',
      image:
        'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Fresh Burger Feast',
      subtitle: 'Sizzling flavours layered with premium ingredients.',
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Cozy Dessert Table',
      subtitle: 'Sweet moments made for celebrations and late-night cravings.',
      image:
        'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Vibrant Biryani Bowl',
      subtitle: 'Bold spices, fragrant rice, and unforgettable aroma.',
      image:
        'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Healthy Salad Bar',
      subtitle: 'Fresh greens and vibrant ingredients for a lighter mood.',
      image:
        'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Weekend Brunch',
      subtitle: 'The perfect mix of freshness, flavour, and energy.',
      image:
        'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Chef’s Grill Special',
      subtitle: 'Fire-grilled flavours crafted with passion and precision.',
      image:
        'https://images.unsplash.com/photo-1554679665-f5537f187268?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.timerId = window.setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000);
  }

  stopAutoPlay(): void {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.restartTimer();
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.restartTimer();
  }

  selectSlide(index: number): void {
    this.currentSlide = index;
    this.restartTimer();
  }

  private restartTimer(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
