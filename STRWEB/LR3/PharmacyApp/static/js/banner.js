class Slider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.prevButton = container.querySelector('.prev');
        this.nextButton = container.querySelector('.next');
        this.pagination = container.querySelector('.pagination');
        this.status = container.querySelector('.status');
        this.currentIndex = 0;

        // Settings
        const settings = JSON.parse(container.dataset.settings);
        this.auto = settings.auto;
        this.delay = settings.delay * 1000 || 5000;
        this.loop = settings.loop;
        this.navs = settings.navs;
        this.pags = settings.pags;
        this.stopMouseHover = settings.stopMouseHover;

        // Init
        this.setup();
        this.autoRotate();
    }

    setup() {
        if (this.navs) {
            this.prevButton.addEventListener('click', () => this.moveSlide(-1));
            this.nextButton.addEventListener('click', () => this.moveSlide(1));
        } else {
            this.prevButton.style.display = 'none';
            this.nextButton.style.display = 'none';
        }

        if (this.pags) {
            this.createPagination();
        }

        this.updateStatus();
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                const link = slide.dataset.link;
                if (link) {
                    window.location.href = link;
                }
            });
        });

        if (this.stopMouseHover && this.auto) {
            this.container.addEventListener('mouseenter', () => clearInterval(this.interval));
            this.container.addEventListener('mouseleave', () => this.autoRotate());
        }
    }

    createPagination() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'pagination-dot';
            dot.addEventListener('click', () => this.goToSlide(index));
            this.pagination.appendChild(dot);
        });
        this.updatePagination();
    }

    updatePagination() {
        if (!this.pags) return;
        this.pagination.querySelectorAll('.pagination-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex); // add class
        });
    }

    moveSlide(direction) {
        const newIndex = this.currentIndex + direction;
        if (newIndex < 0 && this.loop) {
            this.currentIndex = this.slides.length - 1;
        } else if (newIndex >= this.slides.length && this.loop) {
            this.currentIndex = 0;
        } else {
            this.currentIndex = Math.max(0, Math.min(newIndex, this.slides.length - 1));
        }
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }

    updateSlider() {
        const offset = -this.currentIndex * 100;
        this.container.querySelector('.slides').style.transform = `translateX(${offset}%)`;
        this.updateStatus();
        this.updatePagination();
    }

    updateStatus() {
        this.status.textContent = `${this.currentIndex + 1} / ${this.slides.length}`;
    }

    autoRotate() {
        if (!this.auto) return;
        this.interval = setInterval(() => this.moveSlide(1), this.delay);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
   console.log("starting");
    const slider = new Slider(document.getElementById('slider'));

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;
        
        // Нахождение всех элементов с классом .bottle
        const bottles = document.querySelectorAll('.bottle');
        
        bottles.forEach((bottle, index) => {
           // Медленное покачивание влево/вправ, с уменьшенной амплитудой
            const shakeAmount = Math.sin(scrollY * 0.01 + index) * 30; // Очень медленное покачивание (меньший множитель для замедления)
            const moveAmount = scrollY * 0.1; // Движение вверх/вниз по оси Y
      
          // Применение стилей для перемещения и покачивания
          bottle.style.transform = `translateY(-${moveAmount}px) rotate(${shakeAmount}deg)`;
        });
      });
});

