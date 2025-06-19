document.addEventListener('DOMContentLoaded', function() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const body = document.querySelector('body');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modal = document.getElementById(trigger.dataset.modalTarget);
            if(modal) {
                openModal(modal);
            }
        });
    });

    function openModal(modal) {
        modal.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function closeModal() {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            body.style.overflow = 'auto';
        }
    }
    
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', () => {
            closeModal();
        });
    });

    document.addEventListener('click', event => {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Manual Slider controls for ALL sliders inside modals
    document.querySelectorAll('.modal-slider-container').forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const prev = slider.querySelector('.prev');
        const next = slider.querySelector('.next');
        let slideIndex = 0;

        if (slides.length <= 1) {
            if (prev) prev.style.display = 'none';
            if (next) next.style.display = 'none';
            return;
        }

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            slideIndex = (n + slides.length) % slides.length;
            slides[slideIndex].classList.add('active');
        }

        prev.addEventListener('click', e => {
            e.stopPropagation();
            showSlide(--slideIndex);
        });

        next.addEventListener('click', e => {
            e.stopPropagation();
            showSlide(++slideIndex);
        });
        
        showSlide(slideIndex);
    });
});