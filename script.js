document.addEventListener('DOMContentLoaded', function() {
    
    // --- Page Transition Logic ---
    const transitionOverlay = document.getElementById('page-transition-overlay');
    if (transitionOverlay) {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !link.hasAttribute('target')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    transitionOverlay.classList.add('animate');
                    setTimeout(() => { window.location.href = href; }, 700);
                });
            }
        });
    }

    // --- General Slider Initializer ---
    const activeSliders = new Map();

    function initializeSlider(sliderElement, isAutoPlaying) {
        const sliderId = sliderElement.dataset.slider;
        if (!sliderId) return;

        const container = sliderElement.querySelector('.slider-container') || sliderElement;
        const slides = container.querySelectorAll('.slide');
        const prev = container.querySelector('.prev');
        const next = container.querySelector('.next');
        let slideIndex = 0;

        if (slides.length <= 1) {
            if(prev) prev.style.display = 'none';
            if(next) next.style.display = 'none';
            return;
        }

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            slideIndex = (n + slides.length) % slides.length;
            slides[slideIndex].classList.add('active');
        }

        const startSlider = () => {
            if (isAutoPlaying) {
                stopSlider();
                const interval = setInterval(() => showSlide(++slideIndex), 3000);
                activeSliders.set(sliderId, interval);
            }
        };

        const stopSlider = () => {
            if (activeSliders.has(sliderId)) {
                clearInterval(activeSliders.get(sliderId));
                activeSliders.delete(sliderId);
            }
        };

        if (prev && next) {
            prev.addEventListener('click', (e) => { e.stopPropagation(); showSlide(--slideIndex); stopSlider(); });
            next.addEventListener('click', (e) => { e.stopPropagation(); showSlide(++slideIndex); stopSlider(); });
        }
        
        if (isAutoPlaying) {
            container.addEventListener('mouseenter', stopSlider);
            container.addEventListener('mouseleave', startSlider);
        }

        showSlide(slideIndex);
        startSlider();
    }

    // --- Initialize Sliders on Page Load (For Homepage) ---
    document.querySelectorAll('.project-card[data-slider]').forEach(slider => {
        initializeSlider(slider, true); // Autoplay is ON for homepage sliders
    });


    // --- Modal Logic (For Editorial Page) ---
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const body = document.querySelector('body');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modal = document.getElementById(trigger.dataset.modalTarget);
            if(modal) {
                modal.classList.add('active');
                body.style.overflow = 'hidden';
                const modalSliderElement = modal.querySelector('[data-slider]');
                if (modalSliderElement) {
                    initializeSlider(modalSliderElement, false); // Autoplay is OFF for modal sliders
                }
            }
        });
    });

    function closeModal() {
        const activeModal = document.querySelector('.modal.active');
        if(activeModal) {
            const modalSliderElement = activeModal.querySelector('[data-slider]');
            if (modalSliderElement) {
                const sliderId = modalSliderElement.dataset.slider;
                if (activeSliders.has(sliderId)) {
                    clearInterval(activeSliders.get(sliderId));
                    activeSliders.delete(sliderId);
                }
            }
            activeModal.classList.remove('active');
            body.style.overflow = 'auto';
        }
    }

    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', () => {
            closeModal();
        });
    });

    window.addEventListener('click', event => {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });

     window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Page Transition Logic (Runs on all pages) ---
    const transitionOverlay = document.getElementById('page-transition-overlay');
    if (transitionOverlay) {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !link.hasAttribute('target')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    transitionOverlay.classList.add('animate');
                    setTimeout(() => { window.location.href = href; }, 700);
                });
            }
        });
    }

    // --- Homepage Auto-Slider Logic ---
    const autoSliders = document.querySelectorAll('[data-slider]');
    autoSliders.forEach(slider => {
        // This makes sure this code ONLY runs on sliders that are NOT inside a modal
        if (!slider.closest('.modal')) {
            const imageContainer = slider.querySelector('.project-image');
            if (imageContainer) {
                initializeAutoSlider(imageContainer);
            }
        }
    });

    function initializeAutoSlider(sliderContainer) {
        const slides = sliderContainer.querySelectorAll('.slide');
        if (slides.length <= 1) return;
        
        let slideIndex = 0;
        let slideInterval;

        function nextSlide() {
            slideIndex = (slideIndex + 1) % slides.length;
            updateSlides();
        }
        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === slideIndex);
            });
        }
        function startSlider() {
            stopSlider();
            slideInterval = setInterval(nextSlide, 3000);
        }
        function stopSlider() {
            clearInterval(slideInterval);
        }
        sliderContainer.addEventListener('mouseenter', stopSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);
        
        updateSlides();
        startSlider();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Page Transition Logic ---
    const transitionOverlay = document.getElementById('page-transition-overlay');
    if (transitionOverlay) {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !link.hasAttribute('target')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    transitionOverlay.classList.add('animate');
                    setTimeout(() => { window.location.href = href; }, 700);
                });
            }
        });
    }

    // --- Homepage Auto-Slider Logic ---
    const sliders = document.querySelectorAll('.project-card[data-slider]');
    sliders.forEach(slider => {
        const imageContainer = slider.querySelector('.project-image');
        if (!imageContainer) return;
        
        const slides = imageContainer.querySelectorAll('.slide');
        const prev = imageContainer.querySelector('.prev');
        const next = imageContainer.querySelector('.next');
        
        if (slides.length > 1) {
            let slideIndex = 0;
            let slideInterval;

            function showSlide(n) {
                slides.forEach(slide => slide.classList.remove('active'));
                slideIndex = (n + slides.length) % slides.length;
                slides[slideIndex].classList.add('active');
            }

            function nextSlide() {
                showSlide(slideIndex + 1);
            }

            function startSlider() {
                stopSlider();
                slideInterval = setInterval(nextSlide, 3000);
            }

            function stopSlider() {
                clearInterval(slideInterval);
            }

            if (prev && next) {
                prev.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showSlide(slideIndex - 1);
                    stopSlider();
                });

                next.addEventListener('click', (e) => {
                    e.stopPropagation();
                    nextSlide();
                    stopSlider();
                });
            }
            
            imageContainer.addEventListener('mouseenter', stopSlider);
            imageContainer.addEventListener('mouseleave', startSlider);

            showSlide(slideIndex);
            startSlider();
        }
    });

    // Smooth scroll for on-page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Page Transition Logic ---
    const transitionOverlay = document.getElementById('page-transition-overlay');
    if (transitionOverlay) {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !link.hasAttribute('target')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    transitionOverlay.classList.add('animate');
                    setTimeout(() => { window.location.href = href; }, 700);
                });
            }
        });
    }

    // --- Smooth Scroll for on-page anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// --- Custom Video Player Logic ---
const videoPlayer = document.querySelector('.custom-video-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const timeDisplay = document.getElementById('time-display');

if (videoPlayer) {
    // Play/Pause functionality
    function togglePlay() {
        if (videoPlayer.paused || videoPlayer.ended) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }

    function updatePlayButton() {
        playPauseBtn.classList.toggle('paused', !videoPlayer.paused);
    }

    playPauseBtn.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('play', updatePlayButton);
    videoPlayer.addEventListener('pause', updatePlayButton);

    // Progress bar and time display functionality
    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function updateProgress() {
        progressBar.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        timeDisplay.textContent = `${formatTime(videoPlayer.currentTime)} / ${formatTime(videoPlayer.duration || 0)}`;
    }

    videoPlayer.addEventListener('timeupdate', updateProgress);
    
    progressBar.addEventListener('input', () => {
        videoPlayer.currentTime = (progressBar.value / 100) * videoPlayer.duration;
    });
}