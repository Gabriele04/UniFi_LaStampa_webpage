document.addEventListener("DOMContentLoaded", function() {
    const stickyNavbar = document.getElementById('stickyNavbar');
    const headerDesktop = document.getElementById('header-trigger');

    if (stickyNavbar && headerDesktop) {
        window.addEventListener('scroll', function() {
            const headerBottom = headerDesktop.getBoundingClientRect().bottom + window.scrollY;
            if (window.scrollY > headerBottom) {
                stickyNavbar.style.transform = 'translateY(0)';
            } else {
                stickyNavbar.style.transform = 'translateY(-100%)';
            }
        });
    }

    function setupSliderControls(trackId, prevBtnId, nextBtnId) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (track && prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -340, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: 340, behavior: 'smooth' });
            });
        }
    }

    setupSliderControls('newsletterTrack', 'nl-prev', 'nl-next');
    setupSliderControls('podcastTrack', 'pod-prev', 'pod-next');

    const scrollTracks = [document.getElementById('newsletterTrack'), document.getElementById('podcastTrack')];

    scrollTracks.forEach(track => {
        if (!track) return;

        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;

        track.addEventListener('dragstart', (e) => e.preventDefault());

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            track.style.cursor = 'grabbing';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5;

            if (Math.abs(walk) > 3) {
                isDragging = true;
            }
            track.scrollLeft = scrollLeft - walk;
        });

        track.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        });

        track.style.cursor = 'grab';
    });
});

// ora attuale negli header
const now = new Date(); const optionsData = {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
};
const optionsOra = {
    hour: '2-digit',
    minute: '2-digit'
};
const data = now.toLocaleDateString('it-IT', optionsData);
const ora = now.toLocaleTimeString('it-IT', optionsOra);
document.querySelectorAll(".time").forEach(el => {
    el.innerHTML = `${data} - Aggiornato alle ${ora}`;
});
