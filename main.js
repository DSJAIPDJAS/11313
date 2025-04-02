document.addEventListener('DOMContentLoaded', function() {
    // تهيئة جميع المكونات
    initNavbar();
    initScrollSpy();
    initCounters();
    initProjects();
    initClients();
    initTeam();
    initTestimonials();
    initParallax();
    initAnimations();
    initAuthModals();
    initInvestments();
    initScrollAnimations();
    initPropertySearch(); // إضافة دالة البحث هنا
    initParticles();
});


// شريط التنقل المتحرك
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // تغيير لون الشريط عند التمرير
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // تبديل القائمة على الأجهزة المحمولة
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// تتبع القسم الحالي أثناء التمرير
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
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
}

// عداد الأرقام المتزايدة
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounter(counter, target) {
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter, target), 1);
        } else {
            counter.innerText = target;
        }
    }

    function startCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            animateCounter(counter, target);
        });
    }

    // تشغيل العدادات عند ظهورها على الشاشة
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelector('.stats').parentElement.style.visibility = 'hidden';
    setTimeout(() => {
        document.querySelector('.stats').parentElement.style.visibility = 'visible';
        observer.observe(document.querySelector('.stats'));
    }, 500);
}

// عرض المشاريع العقارية
function initProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    const projects = [
        {
            id: 1,
            title: 'Luxury Villa in Riyadh',
            titleAr: 'فيلا فاخرة بالرياض',
            description: 'Modern villa with 500 sqm area in upscale neighborhood, 5 bedrooms and 3 living rooms.',
            descriptionAr: 'فيلا حديثة بمساحة 500 متر مربع في حي راقي، تحتوي على 5 غرف نوم و3 صالات.',
            image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/096f8290363747.5e15979a06759.jpg',
            price: '3,500,000',
            priceAr: '3,500,000 ر.س',
            area: '500 sqm',
            areaAr: '500 م²',
            location: 'Riyadh',
            locationAr: 'الرياض',
            featured: true
        },
        {
            id: 2,
            title: 'Business District Apartment',
            titleAr: 'شقة بمنطقة الأعمال',
            description: 'Elegant apartment in modern commercial tower, 180 sqm area, panoramic city view.',
            descriptionAr: 'شقة أنيقة في برج تجاري حديث، مساحة 180 متر مربع، إطلالة بانورامية على المدينة.',
            image: 'https://algedra.com.tr/assets/imgs/fitout/jsWiVadZxcv82Hr-yEeu4U-riyadh-city-a-luxurious-villa.jpg',
            price: '2,200,000',
            priceAr: '2,200,000 ر.س',
            area: '180 sqm',
            areaAr: '180 م²',
            location: 'Jeddah',
            locationAr: 'جدة',
            featured: true
        },
        {
            id: 3,
            title: 'Beachfront Palace',
            titleAr: 'قصر على البحر',
            description: 'Luxurious palace directly on the beach, 1200 sqm area, private garden and swimming pool.',
            descriptionAr: 'قصر فاخر مباشر على البحر، مساحة 1200 متر مربع، حديقة خاصة وحمام سباحة.',
            image: 'https://cdn.cilomarbella.com/wp-content/uploads/2021/07/W.C.-VILLA-HACIENDA-LAS-CHAPAS-EN_Page_1_Image_0002.jpg',
            price: '12,000,000',
            priceAr: '12,000,000 ر.س',
            area: '1200 sqm',
            areaAr: '1200 م²',
            location: 'Khobar',
            locationAr: 'الخبر',
            featured: true
        },
        {
            id: 4,
            title: 'Investment Land',
            titleAr: 'أرض استثمارية',
            description: 'Residential land with 1000 sqm area in promising area, excellent investment opportunity.',
            descriptionAr: 'أرض سكنية بمساحة 1000 متر مربع في منطقة واعدة، فرصة استثمارية ممتازة.',
            image: 'https://smddecoration.com/smdturkiyedecoration/vi/blog/7541/Villa%20design%20company2.webp',
            price: '1,800,000',
            priceAr: '1,800,000 ر.س',
            area: '1000 sqm',
            areaAr: '1000 م²',
            location: 'Dammam',
            locationAr: 'الدمام',
            featured: false
        },
        {
            id: 5,
            title: 'Commercial Complex',
            titleAr: 'مجمع تجاري',
            description: 'Modern commercial complex with 10 shops and 3 offices in prime location.',
            descriptionAr: 'مجمع تجاري حديث يحتوي على 10 محلات تجارية و3 مكاتب إدارية في موقع مميز.',
            image: 'https://gooceantravel.com/wp-content/uploads/2023/04/Hideaway-Maldives-villas-7-family-villa-one-bedroom-4-1030x579-1.jpg',
            price: '8,500,000',
            priceAr: '8,500,000 ر.س',
            area: '1500 sqm',
            areaAr: '1500 م²',
            location: 'Riyadh',
            locationAr: 'الرياض',
            featured: false
        },
        {
            id: 6,
            title: 'Family Villa',
            titleAr: 'فيلا عائلية',
            description: 'Family villa with 700 sqm area, modern design with garden and guest annex.',
            descriptionAr: 'فيلا عائلية بمساحة 700 متر مربع، تصميم عصري مع حديقة وملحق للضيوف.',
            image: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/f6a6f5fe-b2e7-4d87-990d-c753c983b0d0.jpg?im_w=720',
            price: '4,750,000',
            priceAr: '4,750,000 ر.س',
            area: '700 sqm',
            areaAr: '700 م²',
            location: 'Taif',
            locationAr: 'الطائف',
            featured: false
        },
        {
            id: 7,
            title: 'Penthouse with View',
            titleAr: 'بنتهاوس بإطلالة',
            description: 'Luxury penthouse with 360° view, 400 sqm area, high-end finishes.',
            descriptionAr: 'بنتهاوس فاخر بإطلالة 360 درجة، مساحة 400 متر مربع، تشطيب فاخر.',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/558181698.jpg?k=bb9d27893032deaeeb9f88f7a4232006831fb9b315b43d7f85e86c63c9697e4f&o=&hp=1',
            price: '6,200,000',
            priceAr: '6,200,000 ر.س',
            area: '400 sqm',
            areaAr: '400 م²',
            location: 'Jeddah',
            locationAr: 'جدة',
            featured: true
        },
        {
            id: 8,
            title: 'Villa Star',
            titleAr: 'مزرعة سكنية',
            description: 'Agricultural estate with 5000 sqm area, fruit trees and modern villa.',
            descriptionAr: 'مزرعة سكنية بمساحة 5000 متر مربع، أشجار مثمرة وفيلا حديثة.',
            image: 'https://metropolitan.realestate/wp-content/uploads/2022/04/cavalli-estates-1.jpg',
            price: '5,500,000',
            priceAr: '5,500,000 ر.س',
            area: '5000 sqm',
            areaAr: '5000 م²',
            location: 'Al Kharj',
            locationAr: 'الخرج',
            featured: false
        },
        // المشاريع الجديدة المضافة
        {
            id: 9,
            title: 'Sky Tower Residence',
            titleAr: 'سكن برج السماء',
            description: 'Ultra-modern residence in the heart of the city with breathtaking views and premium amenities.',
            descriptionAr: 'سكن عصري جداً في قلب المدينة بإطلالات خلابة ومرافق فاخرة.',
            image: 'https://images.skyscrapercenter.com/building/The-Address-Residence-Sky-View-Tower-1-Thuc-Bui-1606654012266.jpg',
            price: '9,750,000',
            priceAr: '9,750,000 ر.س',
            area: '650 sqm',
            areaAr: '650 م²',
            location: 'Riyadh',
            locationAr: 'الرياض',
            featured: true
        },
        {
            id: 10,
            title: 'Desert Oasis Resort',
            titleAr: 'منتجع واحة الصحراء',
            description: 'Luxury desert resort with private villas, spa and entertainment facilities.',
            descriptionAr: 'منتجع صحراوي فاخر مع فلل خاصة، منتجع صحي ومرافق ترفيهية.',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/630454226.jpg?k=0d5df06db9fa5fe6a3da818414816f1cf7a16dda0ddbbd12029c868a122fb528&o=&hp=1',
            price: '15,000,000',
            priceAr: '15,000,000 ر.س',
            area: '8000 sqm',
            areaAr: '8000 م²',
            location: 'Al Ula',
            locationAr: 'العلا',
            featured: true
        },
        {
            id: 11,
            title: 'Downtown Office Space',
            titleAr: 'مساحة مكتبية في وسط المدينة',
            description: 'Premium office space in central business district with high-tech infrastructure.',
            descriptionAr: 'مساحة مكتبية مميزة في منطقة الأعمال المركزية مع بنية تحتية عالية التقنية.',
            image: 'https://www.mindspace.me/wp-content/uploads/2022/08/688A8145-1.jpg',
            price: '6,800,000',
            priceAr: '6,800,000 ر.س',
            area: '1200 sqm',
            areaAr: '1200 م²',
            location: 'Jeddah',
            locationAr: 'جدة',
            featured: false
        },
        {
            id: 12,
            title: 'Mountain Retreat',
            titleAr: 'منتجع جبلي',
            description: 'Exclusive mountain retreat with panoramic views and private hiking trails.',
            descriptionAr: 'منتجع جبلي حصري بإطلالات بانورامية ومسارات مشي خاصة.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfvac8q9y3tOhLArpC_Cll_AxXEDhUh4JZog&s',
            price: '7,200,000',
            priceAr: '7,200,000 ر.س',
            area: '3500 sqm',
            areaAr: '3500 م²',
            location: 'Abha',
            locationAr: 'أبها',
            featured: true
        }
    ];
    
    
    projectsGrid.innerHTML = '';

    const featuredProjects = projects.filter(project => project.featured);
    const otherProjects = projects.filter(project => !project.featured);
    const allProjects = [...featuredProjects, ...otherProjects];

    allProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card cloud-card';
        projectCard.innerHTML = `
            <div class="card-content">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" class="cloud-img">
                    ${project.featured ? '<div class="featured-badge">Featured</div>' : ''}
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-meta">
                        <span><i class="fas fa-tag"></i> ${project.price} SAR</span>
                        <span><i class="fas fa-ruler-combined"></i> ${project.area}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                    </div>
                    <button class="details-btn" data-id="${project.id}">View Details</button>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

      
      // استدعاء الدالة عند تحميل الصفحة
      document.addEventListener('DOMContentLoaded', initProjects);
    // معالجة أحداث عرض التفاصيل
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('details-btn')) {
            const projectId = parseInt(e.target.getAttribute('data-id'));
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                // تعبئة البيانات في النافذة المنبثقة
                document.getElementById('modalProjectImage').src = project.image;
                document.getElementById('modalProjectTitle').textContent = project.title;
                document.getElementById('modalProjectDesc').textContent = project.description;
                document.getElementById('modalProjectPrice').textContent = `${project.price} SAR`;
                document.getElementById('modalProjectArea').textContent = project.area;
                document.getElementById('modalProjectLocation').textContent = project.location;
                
                // عرض النافذة المنبثقة
                document.getElementById('projectModal').style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
        
        // عند الضغط على زر الإغلاق أو خارج النافذة
        if (e.target.classList.contains('close-modal') || e.target === document.getElementById('projectModal')) {
            document.getElementById('projectModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Display Premium Clients
function initClients() {
    const clientsGrid = document.querySelector('.clients-grid');
    
    const clients = [
        {
            id: 1,
            name: 'Tech Innovations',
            logo: 'https://cdn-icons-png.flaticon.com/512/2721/2721287.png',
            description: 'Technology Partner'
        },
        {
            id: 2,
            name: 'Global Finance',
            logo: 'https://cdn-icons-png.flaticon.com/512/1965/1965661.png',
            description: 'Financial Services'
        },
        {
            id: 3,
            name: 'Urban Developers',
            logo: 'https://cdn-icons-png.flaticon.com/512/1570/1570887.png',
            description: 'Real Estate Group'
        },
        {
            id: 4,
            name: 'Luxury Brands',
            logo: 'https://cdn-icons-png.flaticon.com/512/2589/2589900.png',
            description: 'Premium Retail'
        },
        {
            id: 5,
            name: 'Skyline Architects',
            logo: 'https://cdn-icons-png.flaticon.com/512/2458/2458246.png',
            description: 'Design Studio'
        },
        {
            id: 6,
            name: 'Ocean Resorts',
            logo: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
            description: 'Hospitality Group'
        }
    ];

    clients.forEach(client => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';
        clientCard.innerHTML = `
            <div class="card-info">
                <img src="${client.logo}" alt="${client.name}" class="client-logo">
                <div class="client-details">
                    <p class="title">${client.name}</p>
                    <p class="description">${client.description}</p>
                </div>
            </div>
        `;
        clientsGrid.appendChild(clientCard);
    });
}
    // إضافة تأثير الجسيمات للقسم
    const particlesDiv = document.createElement('div');
    particlesDiv.className = 'clients-particles';
    document.querySelector('.clients-section').appendChild(particlesDiv);
    particlesJS('clients-particles', {
        particles: {
            number: { value: 30 },
            color: { value: "#e74c3c" },
            opacity: { value: 0.3 },
            size: { value: 3 },
            line_linked: { enable: true, distance: 150, color: "#e74c3c", opacity: 0.2, width: 1 }
        }
    });

// JavaScript
function initTeam() {
    const teamCards = document.querySelector('.team-cards');
    
    const teamMembers = [
        {
            id: 1,
            name: 'John Smith',
            position: 'CEO',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            social: {
                twitter: '#',
                facebook: '#',
                linkedin: '#',
                instagram: '#'
            }
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            position: 'Sales Director',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            social: {
                twitter: '#',
                facebook: '#',
                linkedin: '#',
                instagram: '#'
            }
        },
        {
            id: 3,
            name: 'Michael Brown',
            position: 'Real Estate Expert',
            image: 'https://randomuser.me/api/portraits/men/75.jpg',
            social: {
                twitter: '#',
                facebook: '#',
                linkedin: '#',
                instagram: '#'
            }
        },
        {
            id: 4,
            name: 'Emily Davis',
            position: 'Interior Designer',
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
            social: {
                twitter: '#',
                facebook: '#',
                linkedin: '#',
                instagram: '#'
            }
        }
    ];

    teamMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-card';
        memberCard.innerHTML = `
            <div class="card-content">
                <img src="${member.image}" alt="${member.name}" class="team-img">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p>${member.position}</p>
                    <div class="member-social">
                        <a href="${member.social.twitter}"><i class="fab fa-twitter"></i></a>
                        <a href="${member.social.facebook}"><i class="fab fa-facebook-f"></i></a>
                        <a href="${member.social.linkedin}"><i class="fab fa-linkedin-in"></i></a>
                        <a href="${member.social.instagram}"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        `;
        teamCards.appendChild(memberCard);
    });
}
// Display Client Testimonials
function initTestimonials() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    const testimonials = [
        {
            id: 1,
            content: 'I have worked with many real estate companies, but Elite Real Estate was the best in terms of service, follow-up, and transparency. I highly recommend them to everyone.',
            author: 'Robert Wilson',
            position: 'Businessman',
            image: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        {
            id: 2,
            position: 'Housewife',
            image: 'https://randomuser.me/api/portraits/women/33.jpg'
        },
        {
            id: 3,
            content: 'We were looking for suitable investment land, and thanks to the expertise of Elite Real Estate team, we found exactly what we were looking for at a great price. Thank you.',
            author: 'David Thompson',
            position: 'Investor',
            image: 'https://randomuser.me/api/portraits/men/55.jpg'
        },
        {
            id: 4,
            content: 'Dealing with Elite Real Estate was different - their credibility and professionalism were evident from the first moment. I recommend them to anyone looking for property.',
            author: 'Jennifer Adams',
            position: 'Doctor',
            image: 'https://randomuser.me/api/portraits/women/77.jpg'
        }
    ];

    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <p>${testimonial.content}</p>
            </div>
            <div class="testimonial-author">
                <div class="author-image">
                    <img src="${testimonial.image}" alt="${testimonial.author}">
                </div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.position}</p>
                </div>
            </div>
        `;
        testimonialsSlider.appendChild(testimonialCard);
    });
}
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <p>${testimonial.content}</p>
            </div>
            <div class="testimonial-author">
                <div class="author-image">
                    <img src="${testimonial.image}" alt="${testimonial.author}">
                </div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.position}</p>
                </div>
            </div>
        `;
        testimonialsSlider.appendChild(testimonialCard);
    });


// تأثيرات الحركة البصرية
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-image');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const elementPosition = element.offsetTop;
            const distance = scrollPosition - elementPosition;
            
            if (distance < 1000 && distance > -500) {
                element.style.transform = `translateY(${distance * 0.1}px)`;
            }
        });
    });
}

// تهيئة الأنيميشن عند التمرير
function initAnimations() {
    const animateElements = document.querySelectorAll('.project-card, .client-card, .team-member, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        observer.observe(element);
    });
}


    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });

    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('active');
        forgotModal.classList.add('active');
    });

    // إغلاق النوافذ عند النقر خارجها
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
        if (e.target === forgotModal) {
            forgotModal.classList.remove('active');
        }
    });
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                
                // تأثير خاص لكل قسم
                if (entry.target.id === 'projects') {
                    animateProjects();
                } else if (entry.target.id === 'team') {
                    animateTeamMembers();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
}

function animateProjects() {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach((project, index) => {
        setTimeout(() => {
            project.classList.add('animate');
        }, index * 200);
    });
}

function animateTeamMembers() {
    const members = document.querySelectorAll('.team-member');
    members.forEach((member, index) => {
        setTimeout(() => {
            member.classList.add('animate');
        }, index * 200);
    });
}
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ظهور تدريجي عند التمرير للقسم
                entry.target.classList.add('fade-in-visible');
                entry.target.classList.remove('fade-out-hidden');
                
                // تأثير خاص لكل قسم
                if (entry.target.id === 'projects') {
                    animateProjects('in');
                } else if (entry.target.id === 'team') {
                    animateTeamMembers('in');
                }
            } else {
                // اختفاء تدريجي عند التمرير بعيداً عن القسم
                if (entry.boundingClientRect.top < 0) { // فقط إذا مررنا لأعلى
                    entry.target.classList.add('fade-out-hidden');
                    entry.target.classList.remove('fade-in-visible');
                    
                    if (entry.target.id === 'projects') {
                        animateProjects('out');
                    } else if (entry.target.id === 'team') {
                        animateTeamMembers('out');
                    }
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        section.classList.add('fade-section');
        observer.observe(section);
    });
}

function animateProjects(direction) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach((project, index) => {
        setTimeout(() => {
            if (direction === 'in') {
                project.classList.add('animate-in');
                project.classList.remove('animate-out');
            } else {
                project.classList.add('animate-out');
                project.classList.remove('animate-in');
            }
        }, index * 100);
    });
}

function animateTeamMembers(direction) {
    const members = document.querySelectorAll('.team-member');
    members.forEach((member, index) => {
        setTimeout(() => {
            if (direction === 'in') {
                member.classList.add('animate-in');
                member.classList.remove('animate-out');
            } else {
                member.classList.add('animate-out');
                member.classList.remove('animate-in');
            }
        }, index * 100);
    });
}
function initParticles() {
    // الجسيمات لقسم Our Team
    particlesJS('team-section', {
        "particles": {
            "number": { "value": 40 },
            "color": { "value": "#ffffff" },
            "opacity": { "value": 0.3 },
            "size": { "value": 3 },
            "line_linked": { "enable": false }
        }
    });

    // الجسيمات لقسم Our Clients
    particlesJS('clients-section', {
        "particles": {
            "number": { "value": 30 },
            "color": { "value": "#e74c3c" },
            "opacity": { "value": 0.2 },
            "size": { "value": 4 },
            "line_linked": { "enable": true }
        }
    });
}
function initProjectsParticles() {
    particlesJS('projects-section', {
        "particles": {
            "number": { "value": 40 },
            "color": { "value": "#5c67ff" },
            "opacity": { "value": 0.3 },
            "size": { "value": 3 },
            "line_linked": { 
                "enable": true,
                "distance": 150,
                "color": "#5c67ff",
                "opacity": 0.2,
                "width": 1
            }
        }
    });
}
// دالة تهيئة شريط البحث المعدلة
function initPropertySearch() {
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox.querySelector('input');
    const searchButton = searchBox.querySelector('button');
    
    // إنشاء عنصر نتائج البحث
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchBox.appendChild(searchResults);
    
    // بيانات العقارات (يمكن استبدالها ببيانات حقيقية من API)
    const properties = [
        { title: "Luxury Villa in Riyadh", type: "Villa", price: "3,500,000 SAR", location: "Riyadh" },
        { title: "Modern Apartment in Jeddah", type: "Apartment", price: "2,200,000 SAR", location: "Jeddah" },
        { title: "Beachfront Palace", type: "Palace", price: "12,000,000 SAR", location: "Khobar" },
        { title: "Commercial Space", type: "Commercial", price: "5,800,000 SAR", location: "Riyadh" },
        { title: "Investment Land", type: "Land", price: "1,800,000 SAR", location: "Dammam" }
    ];

    // عرض نتائج البحث
    function showResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No properties found</div>';
            searchResults.classList.add('active');
            return;
        }
        
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <h4>${item.title}</h4>
                <p>${item.type} - ${item.price} - ${item.location}</p>
            `;
            resultItem.addEventListener('click', () => {
                searchInput.value = item.title;
                searchResults.classList.remove('active');
            });
            searchResults.appendChild(resultItem);
        });
        
        searchResults.classList.add('active');
    }

    // البحث عند الكتابة
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        if (query.length > 2) {
            const results = properties.filter(property => 
                property.title.toLowerCase().includes(query) ||
                property.type.toLowerCase().includes(query) ||
                property.location.toLowerCase().includes(query)
            );
            showResults(results);
        } else {
            searchResults.classList.remove('active');
        }
    });

    // البحث عند الضغط على Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim().toLowerCase();
            if (query.length > 0) {
                const results = properties.filter(property => 
                    property.title.toLowerCase().includes(query) ||
                    property.type.toLowerCase().includes(query) ||
                    property.location.toLowerCase().includes(query)
                );
                showResults(results);
            }
        }
    });

    // البحث عند النقر على الزر
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length > 0) {
            const results = properties.filter(property => 
                property.title.toLowerCase().includes(query) ||
                property.type.toLowerCase().includes(query) ||
                property.location.toLowerCase().includes(query)
            );
            showResults(results);
        }
    });

    // إغلاق نتائج البحث عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}
function init() {
    // ... existing code ...
    initInvestments();
    initFAQ();
}

// Initialize Investments Section with enhanced functionality
function initInvestments() {
    // 1. Investment Calculator
    const amountSlider = document.getElementById('investment-amount');
    const amountValue = document.getElementById('amount-value');
    const calculateBtn = document.getElementById('calculate-btn');
    
    // Update amount display
    if (amountSlider && amountValue) {
        const updateAmountValue = () => {
            amountValue.textContent = new Intl.NumberFormat('en-US').format(amountSlider.value) + ' SAR';
        };
        
        amountSlider.addEventListener('input', updateAmountValue);
        updateAmountValue(); // Initial update
    }
    
    // Calculate returns
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateReturns);
        calculateReturns(); // Initial calculation
    }
    
    // 2. Opportunity Cards - Enhanced Interaction
    const opportunityCards = document.querySelectorAll('.opportunity-card');
    
    opportunityCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
        
        // Click handler for details button
        const detailsBtn = card.querySelector('.opportunity-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showOpportunityDetails(card);
            });
        }
        
        // Click handler for entire card (optional)
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('opportunity-btn')) {
                showOpportunityDetails(card);
            }
        });
    });
    
    // 3. Helper Functions
    function calculateReturns() {
        const amount = parseInt(amountSlider.value);
        const period = parseInt(document.getElementById('investment-period').value);
        const type = document.getElementById('property-type').value;
        
        const returnRates = {
            residential: { annual: 8.5, roiYears: 8 },
            commercial: { annual: 10.2, roiYears: 6 },
            land: { annual: 12.5, roiYears: 4 }
        };
        
        const rate = returnRates[type];
        const annualReturn = (amount * rate.annual / 100).toLocaleString('en-US');
        const totalReturn = (amount * rate.annual / 100 * period).toLocaleString('en-US');
        
        document.getElementById('expected-return').textContent = totalReturn + ' SAR';
        document.getElementById('annual-return').textContent = rate.annual + '%';
        document.getElementById('roi-period').textContent = rate.roiYears + ' years';
    }
    
    function showOpportunityDetails(card) {
        const title = card.querySelector('h4').textContent;
        const location = card.querySelector('p').textContent;
        const returnRate = card.querySelector('.opportunity-meta span:nth-child(1)').textContent;
        const period = card.querySelector('.opportunity-meta span:nth-child(2)').textContent;
        const image = card.querySelector('img').src;
        const badge = card.querySelector('.opportunity-badge')?.textContent || '';
        
        // Create modal HTML (replace with your actual modal implementation)
        const modalHTML = `
            <div class="investment-modal">
                <div class="modal-header">
                    ${badge ? `<span class="modal-badge">${badge}</span>` : ''}
                    <h3>${title}</h3>
                    <p class="location">${location}</p>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${image}" alt="${title}">
                    </div>
                    <div class="modal-details">
                        <div class="detail-item">
                            <i class="fas fa-tag"></i>
                            <span>${returnRate}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${period}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-chart-line"></i>
                            <span>Estimated ROI: ${getROI(title)}%</span>
                        </div>
                        <p class="description">${getDescription(title)}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn contact-btn">Contact Advisor</button>
                    <button class="btn invest-btn">Invest Now</button>
                </div>
            </div>
        `;
        
        // Show modal (replace with your actual implementation)
        console.log('Showing opportunity details:', {title, location, returnRate, period});
        // For now we'll use alert - replace with modal show function
        alert(`Opportunity Details:\n\n${title}\n${location}\n${returnRate}\n${period}`);
    }
    
    function getROI(title) {
        // This would come from your data in a real app
        const roiMap = {
            'Sarawat Villas Compound': '8.5',
            'International Business Tower': '10.2',
            'Residential Investment Land': '12.5'
        };
        return roiMap[title] || '8.0';
    }
    
    function getDescription(title) {
        // Custom descriptions for each property
        const descriptions = {
            'Sarawat Villas Compound': 'Luxury residential compound with premium amenities in the heart of Riyadh. Ideal for long-term investment with stable returns.',
            'International Business Tower': 'Prime commercial space in Jeddah\'s business district. High demand with excellent rental yields.',
            'Residential Investment Land': 'Prime land in developing area with high appreciation potential. Perfect for developers or long-term investors.'
        };
        return descriptions[title] || 'Premium investment opportunity with excellent returns.';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
});
 // Initialize modal
 const modal = document.getElementById('opportunityModal');
 const closeBtn = document.querySelector('.close-modal');
 
 // Close modal when clicking X
 closeBtn.addEventListener('click', () => {
     modal.style.display = 'none';
 });
 
 // Close when clicking outside modal
 window.addEventListener('click', (e) => {
     if (e.target === modal) {
         modal.style.display = 'none';
     }
 });
 
 // Make opportunity buttons interactive
 const opportunityBtns = document.querySelectorAll('.opportunity-btn');
 
 opportunityBtns.forEach(btn => {
     btn.addEventListener('click', function(e) {
         e.preventDefault();
         const card = this.closest('.opportunity-card');
         showOpportunityDetails(card);
     });
 });
 
 function showOpportunityDetails(card) {
     // Get card data
     const title = card.querySelector('h4').textContent;
     const location = card.querySelector('p').textContent;
     const returnRate = card.querySelector('.opportunity-meta span:nth-child(1)').textContent;
     const period = card.querySelector('.opportunity-meta span:nth-child(2)').textContent;
     const image = card.querySelector('img').src;
     const badge = card.querySelector('.opportunity-badge')?.textContent || '';
     
     // Set modal content
     document.getElementById('modalTitle').textContent = title;
     document.getElementById('modalLocation').textContent = location;
     document.getElementById('modalImage').src = image;
     document.getElementById('modalImage').alt = title;
     document.getElementById('modalReturn').textContent = returnRate;
     document.getElementById('modalPeriod').textContent = period;
     document.getElementById('modalROI').textContent = 'ROI: ' + getROI(title) + '%';
     document.getElementById('modalType').textContent = getType(title);
     document.getElementById('modalDescription').textContent = getDescription(title);
     
     // Show modal
     modal.style.display = 'block';
 }
 
 function getROI(title) {
     const roiData = {
         'Sarawat Villas Compound': '8.5',
         'International Business Tower': '10.2',
         'Residential Investment Land': '12.5'
     };
     return roiData[title] || '8.0';
 }
 
 function getType(title) {
     const typeData = {
         'Sarawat Villas Compound': 'Residential Compound',
         'International Business Tower': 'Commercial Tower',
         'Residential Investment Land': 'Land Plot'
     };
     return typeData[title] || 'Real Estate';
 }
 
 function getDescription(title) {
     const descriptions = {
         'Sarawat Villas Compound': 'Luxury residential compound with premium amenities in the heart of Riyadh. This project offers villas with modern designs and high-end finishes, suitable for families looking for luxury living.',
         'International Business Tower': 'Prime commercial space in Jeddah\'s business district. The tower features smart offices, conference rooms, and retail spaces with high rental yields and long-term appreciation potential.',
         'Residential Investment Land': 'Prime land in developing area with high appreciation potential. This plot is zoned for residential use and is ideal for developers or long-term investors.'
     };
     return descriptions[title] || 'Premium investment opportunity with excellent returns and growth potential.';
 }
 document.addEventListener('DOMContentLoaded', function() {
    const investmentSection = document.querySelector('.investments-section');
    if(investmentSection) {
        investmentSection.style.backgroundColor = '#f5f7fa';
        console.log('تم تغيير لون الخلفية');
    }
});