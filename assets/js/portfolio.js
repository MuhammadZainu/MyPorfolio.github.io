// Portfolio JavaScript - External File
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Debug project card links
    document.querySelectorAll('.project-card-link').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Project card clicked:', this.href);
            // Don't prevent default for external links
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.menu-bar a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Auto-changing job title animation
    const jobTitles = [
        "Mobile App Developer",
        "React Native Expert", 
        "Full Stack Developer",
        "UI/UX Designer",
        "Software Engineer",
        "Tech Innovator"
    ];

    let currentTitleIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let typeSpeed = 100;
    let deleteSpeed = 50;
    let pauseTime = 2000;

    function animateJobTitle() {
        const jobTitleElement = document.querySelector('.title-text');
        if (!jobTitleElement) return;
        
        const currentJobTitle = jobTitles[currentTitleIndex];
        
        if (isDeleting) {
            // Deleting text
            currentText = currentJobTitle.substring(0, currentText.length - 1);
            jobTitleElement.textContent = currentText;
            
            if (currentText === '') {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % jobTitles.length;
                setTimeout(animateJobTitle, 500);
            } else {
                setTimeout(animateJobTitle, deleteSpeed);
            }
        } else {
            // Typing text
            currentText = currentJobTitle.substring(0, currentText.length + 1);
            jobTitleElement.textContent = currentText;
            
            if (currentText === currentJobTitle) {
                setTimeout(() => {
                    isDeleting = true;
                    animateJobTitle();
                }, pauseTime);
            } else {
                setTimeout(animateJobTitle, typeSpeed);
            }
        }
    }

    // Typing animation for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing animation for name
    const heroName = document.querySelector('.name');
    if (heroName) {
        const originalText = heroName.textContent;
        typeWriter(heroName, originalText, 100);
    }
    
    // Initialize job title animation
    setTimeout(() => {
        animateJobTitle();
    }, 1000);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.project-card, .skill-category, .experience-item').forEach(el => {
        observer.observe(el);
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Counter animation for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // Form validation and submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Resume download functionality
    window.downloadResume = function(format = 'pdf') {
        // Create a temporary link element
        const link = document.createElement('a');
        
        if (format === 'pdf') {
            // For PDF download, using the images folder
            link.href = 'images/03 ResumeMuhammadzain.pdf';
            link.download = 'Muhammad_Zain_Resume.pdf';
        } else if (format === 'doc') {
            // For DOC download, using the images folder
            link.href = 'images/resume.png';
            link.download = 'Muhammad_Zain_Resume.png';
        }
        
        // Check if file exists, if not show message
        fetch(link.href, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    // If file doesn't exist, show the image version
                    showResumeDownloadMessage();
                }
            })
            .catch(() => {
                showResumeDownloadMessage();
            });
    };
    
    function showResumeDownloadMessage() {
        // Create a modal or notification
        const modal = document.createElement('div');
        modal.className = 'resume-download-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Resume Download</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Resume files are being prepared. Please add your resume PDF/DOC files to the <code>assets/documents/</code> folder.</p>
                    <p>For now, you can:</p>
                    <div class="download-options">
                        <a href="images/resume.png" target="_blank" class="btn btn-primary">
                            <i class="fas fa-eye"></i> View Resume Image
                        </a>
                        <button class="btn btn-secondary" onclick="downloadImageAsPDF()">
                            <i class="fas fa-download"></i> Download as Image
                        </button>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 8px;">
                        <strong>Instructions:</strong>
                        <ol style="margin: 0.5rem 0; padding-left: 1.5rem;">
                            <li>Add your resume as <code>Muhammad_Zain_Resume.pdf</code> to <code>assets/documents/</code></li>
                            <li>Add your resume as <code>Muhammad_Zain_Resume.docx</code> to <code>assets/documents/</code></li>
                            <li>Refresh the page to enable downloads</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // Download image as PDF functionality
    window.downloadImageAsPDF = function() {
        // Download the resume image
        const link = document.createElement('a');
        link.href = 'images/resume.png';
        link.download = 'Muhammad_Zain_Resume.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Skill bar animation on hover
    function initializeSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const skillProgress = item.querySelector('.skill-progress');
            
            if (skillProgress) {
                const targetWidth = skillProgress.getAttribute('data-width') || '0%';
                
                // Reset progress bar to 0 initially
                skillProgress.style.width = '0%';
                
                // Add hover event listeners
                item.addEventListener('mouseenter', () => {
                    // Animate progress bar to target width
                    skillProgress.style.transition = 'width 1.5s ease-in-out';
                    skillProgress.style.width = targetWidth;
                });
                
                item.addEventListener('mouseleave', () => {
                    // Reset progress bar to 0
                    skillProgress.style.transition = 'width 0.8s ease-in-out';
                    skillProgress.style.width = '0%';
                });
            }
        });
    }
    
    // Trigger skill bar animation when skills section is visible
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #00FFFF;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to back to top button
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Initialize skill bars on page load
    initializeSkillBars();
    
});
