// Main JavaScript for Love Story Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentChapter = 1;
    const totalChapters = 6;
    let isArabic = true; // Default language is Arabic
    
    // Show loader
    const loader = document.querySelector('.loader');
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
                
                // Show initial animations
                document.querySelector('.site-title').classList.add('animate');
                document.querySelector('.site-subtitle').classList.add('animate');
                document.querySelector('.chapter-nav').classList.add('animate');
                
                // Show first chapter
                showChapter(1);
                
                // Initialize floating hearts
                initFloatingHearts();
            }, 500);
        }, 1500);
    });
    
    // Chapter navigation
    const chapterBtns = document.querySelectorAll('.chapter-btn');
    chapterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const chapterNum = parseInt(this.getAttribute('data-chapter'));
            showChapter(chapterNum);
        });
    });
    
    // Next and Previous buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('next-btn')) {
            if (currentChapter < totalChapters) {
                showChapter(currentChapter + 1);
            } else if (currentChapter === totalChapters) {
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
    
    // Show specific chapter
    function showChapter(chapterNum) {
        // Create page transition effect
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        
        setTimeout(function() {
            transition.classList.add('active');
            
            setTimeout(function() {
                // Hide all chapters
                const chapters = document.querySelectorAll('.chapter-container');
                chapters.forEach(chapter => {
                    chapter.style.display = 'none';
                    chapter.classList.remove('active');
                });
                
                // Update active chapter button
                chapterBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (parseInt(btn.getAttribute('data-chapter')) === chapterNum) {
                        btn.classList.add('active');
                    }
                });
                
                // Show selected chapter
                const selectedChapter = document.getElementById(`chapter${chapterNum}`);
                selectedChapter.style.display = 'block';
                
                // Hide birthday page if showing a chapter
                const birthdayPage = document.getElementById('birthdayPage');
                birthdayPage.style.display = 'none';
                
                // Update current chapter
                currentChapter = chapterNum;
                
                // Update background image based on chapter
                updateBackground(chapterNum);
                
                // Scroll to top
                window.scrollTo(0, 0);
                
                setTimeout(function() {
                    selectedChapter.classList.add('active');
                    
                    // Exit transition
                    transition.classList.add('exit');
                    
                    setTimeout(function() {
                        document.body.removeChild(transition);
                    }, 800);
                }, 100);
            }, 800);
        }, 50);
    }
    
    // Show birthday page
    function showBirthdayPage() {
        // Create page transition effect
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        
        setTimeout(function() {
            transition.classList.add('active');
            
            setTimeout(function() {
                // Hide all chapters
                const chapters = document.querySelectorAll('.chapter-container');
                chapters.forEach(chapter => {
                    chapter.style.display = 'none';
                    chapter.classList.remove('active');
                });
                
                // Show birthday page
                const birthdayPage = document.getElementById('birthdayPage');
                birthdayPage.style.display = 'block';
                
                // Update background
                document.querySelector('.bg-image').style.filter = 'brightness(0.6) blur(5px)';
                
                // Create heart shower
                createHeartShower();
                
                // Scroll to top
                window.scrollTo(0, 0);
                
                setTimeout(function() {
                    birthdayPage.classList.add('active');
                    
                    // Exit transition
                    transition.classList.add('exit');
                    
                    setTimeout(function() {
                        document.body.removeChild(transition);
                    }, 800);
                }, 100);
            }, 800);
        }, 50);
    }
    
    // Update background based on chapter
    function updateBackground(chapterNum) {
        const bgImage = document.querySelector('.bg-image');
        
        // Reset filters
        bgImage.style.filter = 'brightness(0.8)';
        
        // Apply chapter-specific effects
        switch(chapterNum) {
            case 1:
                bgImage.style.filter = 'brightness(0.8) sepia(0.2)';
                break;
            case 2:
                bgImage.style.filter = 'brightness(0.8) hue-rotate(10deg)';
                break;
            case 3:
                bgImage.style.filter = 'brightness(0.8) saturate(1.2)';
                break;
            case 4:
                bgImage.style.filter = 'brightness(0.8) contrast(1.1)';
                break;
            case 5:
                bgImage.style.filter = 'brightness(0.8) sepia(0.1) hue-rotate(-10deg)';
                break;
            case 6:
                bgImage.style.filter = 'brightness(0.7) saturate(1.3)';
                break;
        }
    }
    
    // Language toggle
    const langToggle = document.querySelector('.language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            isArabic = !isArabic;
            
            if (isArabic) {
                document.body.style.direction = 'rtl';
                langToggle.textContent = 'English';
                // Update all text elements to Arabic
                updateLanguage('ar');
            } else {
                document.body.style.direction = 'ltr';
                langToggle.textContent = 'العربية';
                // Update all text elements to English
                updateLanguage('en');
            }
        });
    }
    
    // Update language function (placeholder - would need actual translations)
    function updateLanguage(lang) {
        // This would be implemented with actual translations
        console.log(`Language changed to ${lang}`);
    }
    
    // Initialize floating hearts
    function initFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts');
        
        // Create initial hearts
        for (let i = 0; i < 10; i++) {
            createHeart(heartsContainer);
        }
        
        // Continue creating hearts
        setInterval(function() {
            createHeart(heartsContainer);
        }, 3000);
    }
    
    // Create a single floating heart
    function createHeart(container) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        
        // Random position
        const startPos = Math.random() * 100;
        heart.style.left = `${startPos}%`;
        heart.style.bottom = '-20px';
        
        // Random size
        const size = Math.random() * 15 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // Random opacity and color variation
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        const hue = Math.random() * 20 - 10; // Slight color variation
        heart.style.backgroundColor = `hsl(0, 100%, ${60 + hue}%)`;
        
        // Random animation duration
        const duration = Math.random() * 10 + 10;
        heart.style.animation = `floatUp ${duration}s ease-in infinite`;
        
        // Add to container
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(function() {
            container.removeChild(heart);
        }, duration * 1000);
    }
    
    // Create heart shower for birthday page
    function createHeartShower() {
        const heartsContainer = document.querySelector('.floating-hearts');
        
        // Create many hearts at once
        for (let i = 0; i < 50; i++) {
            setTimeout(function() {
                createHeart(heartsContainer);
            }, i * 200);
        }
    }
    
    // Handle video playback
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('play', function() {
            // Pause other videos when one starts playing
            videos.forEach(v => {
                if (v !== video && !v.paused) {
                    v.pause();
                }
            });
        });
    });
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // Make global functions available
    window.showChapter = showChapter;
    window.showBirthdayPage = showBirthdayPage;
});
