document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
    
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links'); // Renomeado para evitar conflito
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link'); // Agora é a única declaração
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });
    
    // Restante do seu código permanece o mesmo...
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animate elements when scrolling
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.timeline-item, .expectation-card, .reality-card, .form-group');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.timeline-item, .expectation-card, .reality-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    document.querySelectorAll('.form-group').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(' + (index % 2 === 0 ? '-20px' : '20px') + ')';
        element.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.elements['name'].value;
            const email = this.elements['email'].value;
            const message = this.elements['message'].value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            
            // Reset form
            this.reset();
        });
    }
    

// Initialize Skills Chart
const skillsChart = document.getElementById('skillsChart');

if (skillsChart) {
    const ctx = skillsChart.getContext('2d');
    
    // Definir cores baseadas no tema
    const isDarkTheme = body.getAttribute('data-theme') === 'dark';
    const initialSkillsColor = isDarkTheme ? 'rgba(240, 230, 221, 1)' : 'rgba(43, 29, 44, 1)';
    const initialSkillsBgColor = isDarkTheme ? 'rgba(240, 230, 221, 0.2)' : 'rgba(43, 29, 44, 0.2)';
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML', 'CSS', 'Git', 'Figma', 'Design', 'Prototipagem'],
            datasets: [{
                label: 'Habilidades Atuais',
                data: [70, 65, 50, 70, 80, 70],
                backgroundColor: 'rgba(238, 97, 31, 0.2)',
                borderColor: 'rgba(238, 97, 31, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(238, 97, 31, 1)',
                pointRadius: 4
            }, {
                label: 'Habilidades Iniciais',
                data: [30, 25, 15, 20, 40, 20],
                backgroundColor: initialSkillsBgColor,
                borderColor: initialSkillsColor,
                borderWidth: 2,
                pointBackgroundColor: initialSkillsColor,
                pointRadius: 4,
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20,
                        backdropColor: 'transparent'
                    },
                    pointLabels: {
                        font: {
                            family: 'Poppins',
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Poppins',
                            size: 12
                        },
                        usePointStyle: true
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.1
                }
            }
        }
    });

    // Atualizar cores do gráfico quando o tema mudar
    themeToggle.addEventListener('click', () => {
        if (skillsChart.chart) {
            const isDark = body.getAttribute('data-theme') === 'dark';
            const newColor = isDark ? 'rgba(240, 230, 221, 1)' : 'rgba(43, 29, 44, 1)';
            const newBgColor = isDark ? 'rgba(240, 230, 221, 0.2)' : 'rgba(43, 29, 44, 0.2)';
            
            skillsChart.chart.data.datasets[1].borderColor = newColor;
            skillsChart.chart.data.datasets[1].backgroundColor = newBgColor;
            skillsChart.chart.data.datasets[1].pointBackgroundColor = newColor;
            skillsChart.chart.update();
        }
    });
}
    // Set active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});