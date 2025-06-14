document.addEventListener('DOMContentLoaded', function () {
    let currentChapter = 1;
    const totalChapters = 6;
    let isArabic = true;

    const chapterMessages = {
        1: "❤️ أحــــــــــــــبك ❤️",
        2: "❤️ أعشقـــــــــــــــــك ❤️",
        3: "❤️ أمــــــــــــــــــــوت فيكي ❤️",
        4: "❤️ أهـــــــــــــــواكي ❤️",
        5: "❤️ مَتـــــــــــــــــيم فيكي ❤️",
        6: "❤️ أنتي حقي وانا حقك ❤️"
    };

    const chapterSounds = {
        1: new Audio('sounds/ch1.ogg'),
        2: new Audio('sounds/ch2.ogg'),
        3: new Audio('sounds/ch3.ogg'),
        4: new Audio('sounds/ch4.ogg'),
        5: new Audio('sounds/ch5.ogg'),
        6: new Audio('sounds/ch6.ogg'),
    };

    const loader = document.querySelector('.loader');

    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.style.opacity = '0';
            setTimeout(function () {
                loader.style.display = 'none';

                document.querySelector('.site-title').classList.add('animate');
                document.querySelector('.site-subtitle').classList.add('animate');
                document.querySelector('.chapter-nav').classList.add('animate');

                showChapter(1);
                initFloatingHearts();
            }, 500);
        }, 1500);
    });

    const chapterBtns = document.querySelectorAll('.chapter-btn');
    chapterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const chapterNum = parseInt(this.getAttribute('data-chapter'));
            showChapter(chapterNum);
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('next-btn')) {
            if (currentChapter < totalChapters) {
                showChapter(currentChapter + 1);
            } else {
                showBirthdayPage();
            }
        } else if (e.target.classList.contains('prev-btn')) {
            if (currentChapter > 1) {
                showChapter(currentChapter - 1);
            }
        } else if (e.target.classList.contains('surprise-btn')) {
            showBirthdayPage();
        } else if (e.target.classList.contains('back-to-story')) {
            showChapter(totalChapters);
        }
    });

    function showChapter(chapterNum) {
        const transition = document.createElement('div');
        transition.className = 'page-transition';

        const sparkleContainer = document.createElement('div');
        sparkleContainer.className = 'sparkle-container';
        transition.appendChild(sparkleContainer);

        for (let i = 0; i < 25; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 2}s`;
            sparkleContainer.appendChild(sparkle);
        }

        const transitionMessage = document.createElement('div');
        transitionMessage.className = 'transition-message magic';
        const messageText = chapterMessages[chapterNum] || '...';

        const animatedText = createArabicTextNode(messageText, 0, false);
        transitionMessage.appendChild(animatedText);
        transition.appendChild(transitionMessage);
        document.body.appendChild(transition);

        // Stop any other audio
        Object.values(chapterSounds).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });

        const sound = chapterSounds[chapterNum];
        if (sound) {
            sound.volume = 0.5;
            sound.play();
        }

        setTimeout(function () {
            transition.classList.add('active');

            setTimeout(function () {
                const chapters = document.querySelectorAll('.chapter-container');
                chapters.forEach(chapter => {
                    chapter.style.display = 'none';
                    chapter.classList.remove('active');
                });

                chapterBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (parseInt(btn.getAttribute('data-chapter')) === chapterNum) {
                        btn.classList.add('active');
                    }
                });

                const selectedChapter = document.getElementById(`chapter${chapterNum}`);
                selectedChapter.style.display = 'block';

                const birthdayPage = document.getElementById('birthdayPage');
                birthdayPage.style.display = 'none';

                currentChapter = chapterNum;
                updateBackground(chapterNum);
                window.scrollTo(0, 0);

                setTimeout(function () {
                    selectedChapter.classList.add('active');
                    transition.classList.add('exit');

                    if (sound) {
                        sound.pause();
                        sound.currentTime = 0;
                    }

                    setTimeout(function () {
                        document.body.removeChild(transition);
                    }, 1000);
                }, 2500);
            }, 2000);
        }, 50);
    }

    function showBirthdayPage() {
        const transition = document.createElement('div');
        transition.className = 'page-transition';

        const sparkleContainer = document.createElement('div');
        sparkleContainer.className = 'sparkle-container';
        transition.appendChild(sparkleContainer);

        for (let i = 0; i < 25; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 2}s`;
            sparkleContainer.appendChild(sparkle);
        }

        const transitionMessage = document.createElement('div');
        transitionMessage.className = 'transition-message magic';
        const messageText = "مفاجأة صغيرة لكِ 🎁❤️";
        const animatedText = createArabicTextNode(messageText, 0, false);
        transitionMessage.appendChild(animatedText);
        transition.appendChild(transitionMessage);
        document.body.appendChild(transition);

        const chime = new Audio('sounds/chime.mp3');
        chime.volume = 0.5;
        chime.play();

        setTimeout(function () {
            transition.classList.add('active');

            setTimeout(function () {
                const chapters = document.querySelectorAll('.chapter-container');
                chapters.forEach(chapter => {
                    chapter.style.display = 'none';
                    chapter.classList.remove('active');
                });

                const birthdayPage = document.getElementById('birthdayPage');
                birthdayPage.style.display = 'block';

                document.querySelector('.bg-image').style.filter = 'brightness(0.6) blur(5px)';
                createHeartShower();
                window.scrollTo(0, 0);

                setTimeout(function () {
                    birthdayPage.classList.add('active');
                    transition.classList.add('exit');

                    chime.pause();
                    chime.currentTime = 0;

                    setTimeout(function () {
                        document.body.removeChild(transition);
                    }, 1000);
                }, 2500);
            }, 2000);
        }, 50);
    }

    function createArabicTextNode(text, delay = 0, animateWords = false) {
        const container = document.createElement('span');
        container.className = 'arabic-transition';

        if (animateWords) {
            const words = text.split(' ');
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.className = 'fade-in-word';
                span.style.animationDelay = `${delay + index * 0.3}s`;
                container.appendChild(span);
            });
        } else {
            const span = document.createElement('span');
            span.textContent = text;
            span.className = 'fade-in-block';
            span.style.animationDelay = `${delay}s`;
            container.appendChild(span);
        }

        return container;
    }

    function updateBackground(chapterNum) {
        const bgImage = document.querySelector('.bg-image');
        bgImage.style.filter = 'brightness(0.8)';

        switch (chapterNum) {
            case 1: bgImage.style.filter = 'brightness(0.8) sepia(0.2)'; break;
            case 2: bgImage.style.filter = 'brightness(0.8) hue-rotate(10deg)'; break;
            case 3: bgImage.style.filter = 'brightness(0.8) saturate(1.2)'; break;
            case 4: bgImage.style.filter = 'brightness(0.8) contrast(1.1)'; break;
            case 5: bgImage.style.filter = 'brightness(0.8) sepia(0.1) hue-rotate(-10deg)'; break;
            case 6: bgImage.style.filter = 'brightness(0.7) saturate(1.3)'; break;
        }
    }

    const langToggle = document.querySelector('.language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function () {
            isArabic = !isArabic;
            document.body.style.direction = isArabic ? 'rtl' : 'ltr';
            langToggle.textContent = isArabic ? 'English' : 'العربية';
            updateLanguage(isArabic ? 'ar' : 'en');
        });
    }

    function updateLanguage(lang) {
        console.log(`Language changed to ${lang}`);
    }

    function initFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts');
        for (let i = 0; i < 10; i++) createHeart(heartsContainer);
        setInterval(() => createHeart(heartsContainer), 3000);
    }

    function createHeart(container) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.bottom = '-20px';
        const size = Math.random() * 15 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        const hue = Math.random() * 20 - 10;
        heart.style.backgroundColor = `hsl(0, 100%, ${60 + hue}%)`;
        const duration = Math.random() * 10 + 10;
        heart.style.animation = `floatUp ${duration}s ease-in infinite`;
        container.appendChild(heart);
        setTimeout(() => container.removeChild(heart), duration * 1000);
    }

    function createHeartShower() {
        const heartsContainer = document.querySelector('.floating-hearts');
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createHeart(heartsContainer), i * 200);
        }
    }

    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('play', () => {
            videos.forEach(v => {
                if (v !== video && !v.paused) v.pause();
            });
        });
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            scrollIndicator.style.opacity = window.scrollY > 300 ? '0' : '1';
        });
    }

    window.showChapter = showChapter;
    window.showBirthdayPage = showBirthdayPage;
});
