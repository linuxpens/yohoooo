/* =====================================================
   BIRTHDAY COUNTDOWN
===================================================== */

function updateBirthdayCountdown() {

    const now = new Date();

    let birthday = new Date(
        now.getFullYear(),
        10,
        13,
        0,
        0,
        0
    );

    // If this year's birthday already passed,
    // count toward next year's birthday.
    if (now >= birthday) {
        birthday = new Date(
            now.getFullYear() + 1,
            10,
            13,
            0,
            0,
            0
        );
    }

    const difference = birthday - now;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(3, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateBirthdayCountdown();

setInterval(updateBirthdayCountdown, 1000);


/* =====================================================
   NAVIGATION SOUND EFFECT
===================================================== */

let audioContext;

function playNavigationSound() {

    if (!audioContext) {
        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        420,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        720,
        audioContext.currentTime + 0.08
    );

    gain.gain.setValueAtTime(
        0.06,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.15
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.15
    );
}


/* =====================================================
   NAVIGATION
===================================================== */

const navigationLinks =
    document.querySelectorAll(".nav-sound");

navigationLinks.forEach(link => {

    link.addEventListener("click", function () {

        playNavigationSound();

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(".page");

const navLinks =
    document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }

        });

    },
    {
        threshold: 0.6
    }
);

sections.forEach(section => {
    observer.observe(section);
});