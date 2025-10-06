const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // FAQ toggle
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            question.addEventListener('click', () => {
                const isOpen = !answer.classList.contains('hidden');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-answer').classList.add('hidden');
                        otherItem.querySelector('.faq-icon').textContent = '+';
                        otherItem.classList.remove('border-orange', 'border-2');
                        otherItem.classList.add('border-gray-200');
                    }
                });

                // Toggle current item
                if (isOpen) {
                    answer.classList.add('hidden');
                    icon.textContent = '+';
                    item.classList.remove('border-orange', 'border-2');
                    item.classList.add('border-gray-200');
                } else {
                    answer.classList.remove('hidden');
                    icon.textContent = '−';
                    item.classList.remove('border-gray-200');
                    item.classList.add('border-orange', 'border-2');
                }
            });
        });

        // Testimonial carousel
        const testimonials = [
            {
                text: "¡La mejor barbería de la ciudad! El equipo de Beto siempre deja mi degradado perfecto. La atención al detalle y el cuidado personalizado son incomparables. ¡No iré a ningún otro lugar, la mejor barbería de la ciudad!",
                name: "Gilberto Assis",
                title: "Cliente",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
                text: "Un servicio impecable. Desde que descubrí esta barbería, no pienso en cambiar. Siempre salgo con el corte exacto que quiero y un trato de primera.",
                name: "Ricardo Silva",
                title: "Cliente",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
                text: "Excelente ambiente y profesionales de verdad. Se nota la pasión por lo que hacen, cada visita es una experiencia completa. ¡Recomendadísimo!",
                name: "Paulo Ricardo",
                title: "Cliente",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
                text: "La barbería de Beto es única: cortes modernos, clásicos y siempre bien hechos. Además, el lugar es cómodo y acogedor, uno se siente en casa.",
                name: "Arthur Gomes",
                title: "Cliente",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            }
        ];

        let currentTestimonialIndex = 0;
        const testimonialContainer = document.getElementById('testimonial-container');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');

        function updateTestimonials() {
            const testimonial1 = testimonials[currentTestimonialIndex];
            const testimonial2 = testimonials[(currentTestimonialIndex + 1) % testimonials.length];

            testimonialContainer.innerHTML = `
                <div class="bg-light-cream p-8 rounded-lg">
                    <p class="text-gray-700 text-lg mb-6 italic">
                        "${testimonial1.text}"
                    </p>
                    <div class="flex items-center space-x-4">
                        <img src="${testimonial1.image}" 
                             alt="${testimonial1.name}" 
                             class="w-16 h-16 rounded-full object-cover">
                        <div>
                            <h4 class="font-bold text-dark-gray">${testimonial1.name}</h4>
                            <p class="text-gray-600">${testimonial1.title}</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-light-cream p-8 rounded-lg">
                    <p class="text-gray-700 text-lg mb-6 italic">
                        "${testimonial2.text}"
                    </p>
                    <div class="flex items-center space-x-4">
                        <img src="${testimonial2.image}" 
                             alt="${testimonial2.name}" 
                             class="w-16 h-16 rounded-full object-cover">
                        <div>
                            <h4 class="font-bold text-dark-gray">${testimonial2.name}</h4>
                            <p class="text-gray-600">${testimonial2.title}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        prevBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex - 2 + testimonials.length) % testimonials.length;
            updateTestimonials();
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex + 2) % testimonials.length;
            updateTestimonials();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 2) % testimonials.length;
            updateTestimonials();
        }, 8000);

        // Header background change on scroll
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('bg-opacity-95', 'backdrop-blur-sm');
            } else {
                nav.classList.remove('bg-opacity-95', 'backdrop-blur-sm');
            }
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('#home .absolute img');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe sections for animations
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Add animation classes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .animate-fade-in {
                animation: fadeIn 0.8s ease-out forwards;
            }
            
            .hover-scale {
                transition: transform 0.3s ease;
            }
            
            .hover-scale:hover {
                transform: scale(1.05);
            }
            
            /* Responsive image containers */
            .image-container {
                position: relative;
                overflow: hidden;
                border-radius: 0.5rem;
            }
            
            .image-container img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .image-container:hover img {
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);

        // Add hover effects to service items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.add('hover-scale');
        });