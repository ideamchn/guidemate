// GuideMate Website JavaScript

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (!isVisible) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on links
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.style.display = 'none';
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
});

// Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const familyForm = document.getElementById('family-form');
    
    if (familyForm) {
        familyForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = e.target.querySelector('input[type="email"]');
            const button = e.target.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Change button state
            const originalText = button.textContent;
            button.textContent = 'Joining...';
            button.disabled = true;
            button.style.opacity = '0.7';
            
            // Simulate API call
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success state
                button.textContent = '✓ You\'re on the list!';
                button.style.background = '#00B894';
                button.style.color = 'white';
                
                // Show success notification
                showNotification('Thank you for joining our waitlist! We\'ll be in touch soon.', 'success');
                
                // Reset form
                emailInput.value = '';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.opacity = '1';
                    button.style.background = '';
                    button.style.color = '';
                }, 3000);
                
            } catch (error) {
                // Error state
                button.textContent = 'Try Again';
                button.disabled = false;
                button.style.opacity = '1';
                showNotification('Something went wrong. Please try again.', 'error');
                
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            }
        });
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00B894' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
        line-height: 1.4;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Demo Video Function
function playDemo() {
    const modal = createModal();
    modal.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h3 style="margin-bottom: 1rem; color: #FF6B6B;">Demo Video Coming Soon!</h3>
            <p style="margin-bottom: 2rem; color: #666;">
                Imagine watching a 65-year-old easily finding their UPI ID with simple voice guidance like:
            </p>
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                <p style="font-style: italic; color: #2c3e50;">
                    "Help me send money to my son"<br><br>
                    📱 "Opening PhonePe for you..."<br>
                    📱 "Tap the blue 'Send Money' button at the top"<br>
                    📱 "Now tap on your son's contact..."<br>
                    📱 "Enter the amount and tap 'Send'"
                </p>
            </div>
            <button onclick="closeModal()" class="btn btn-primary">Close</button>
        </div>
    `;
}

// Schedule Demo Function
function scheduleDemo() {
    // In a real implementation, this would integrate with Calendly or similar
    const modal = createModal();
    modal.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h3 style="margin-bottom: 1rem; color: #FF6B6B;">Schedule a Business Demo</h3>
            <p style="margin-bottom: 2rem; color: #666;">
                See how GuideMate can reduce training time from months to days for your business.
            </p>
            <div style="margin-bottom: 2rem;">
                <p><strong>What you'll see:</strong></p>
                <ul style="text-align: left; margin: 1rem 0; color: #666;">
                    <li>Live demo with business software</li>
                    <li>ROI calculator for your organization</li>
                    <li>Implementation timeline</li>
                    <li>Custom pricing discussion</li>
                </ul>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="window.open('mailto:hello@guidemate.in?subject=Business Demo Request', '_blank')" class="btn btn-primary">
                    Email Us
                </button>
                <button onclick="window.open('tel:+919652713919', '_blank')" class="btn btn-secondary">
                    Call Now
                </button>
                <button onclick="closeModal()" class="btn btn-outline">Close</button>
            </div>
        </div>
    `;
}

// Download Pitch Deck Function
function downloadDeck() {
    const modal = createModal();
    modal.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h3 style="margin-bottom: 1rem; color: #FF6B6B;">Download Pitch Deck</h3>
            <p style="margin-bottom: 2rem; color: #666;">
                Get detailed insights into GuideMate's market opportunity, technology, and business model.
            </p>
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                <p><strong>Pitch deck includes:</strong></p>
                <ul style="text-align: left; margin: 1rem 0; color: #666;">
                    <li>Market size: ₹6,000 Cr digital help economy</li>
                    <li>Technology architecture and AI approach</li>
                    <li>Go-to-market strategy</li>
                    <li>Financial projections and funding needs</li>
                    <li>Team background and expertise</li>
                </ul>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="window.open('mailto:hello@guidemate.in?subject=Pitch Deck Request', '_blank')" class="btn btn-primary">
                    Request via Email
                </button>
                <button onclick="closeModal()" class="btn btn-outline">Close</button>
            </div>
        </div>
    `;
}

// Modal Helper Functions
function createModal() {
    // Remove existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
        z-index: 1;
    `;
    closeBtn.onclick = closeModal;
    
    modal.appendChild(closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    }
}

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all sections except hero
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
    
    // Observe cards and other elements
    const animatedElements = document.querySelectorAll('.stat-card, .step-card, .pricing-card, .testimonial-card, .feature-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(element);
    });
});

// Animated number counter for statistics
document.addEventListener('DOMContentLoaded', function() {
    const animateNumbers = () => {
        const statCards = document.querySelectorAll('.stat-card h3');
        
        statCards.forEach(statElement => {
            const text = statElement.textContent;
            const hasRupee = text.includes('₹');
            const hasPercent = text.includes('%');
            const hasMillion = text.includes('Million');
            const hasWeek = text.includes('hrs/week');
            
            let finalNumber;
            let suffix = '';
            let increment;
            
            if (hasRupee) {
                finalNumber = 6000;
                suffix = ' Cr';
                increment = 100;
            } else if (hasPercent) {
                finalNumber = 45;
                suffix = '%';
                increment = 1;
            } else if (hasMillion) {
                finalNumber = 10;
                suffix = ' Million';
                increment = 1;
            } else if (hasWeek) {
                finalNumber = 2.5;
                suffix = ' hrs/week';
                increment = 0.1;
            } else {
                return; // Skip if format not recognized
            }
            
            let currentNumber = 0;
            const duration = 2000; // 2 seconds
            const steps = duration / 50; // Update every 50ms
            const incrementPerStep = finalNumber / steps;
            
            const counter = setInterval(() => {
                currentNumber += incrementPerStep;
                
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(counter);
                }
                
                let displayValue;
                if (hasRupee) {
                    displayValue = `₹${Math.floor(currentNumber).toLocaleString('en-IN')}${suffix}`;
                } else if (hasWeek) {
                    displayValue = `${currentNumber.toFixed(1)}${suffix}`;
                } else {
                    displayValue = `${Math.floor(currentNumber)}${suffix}`;
                }
                
                statElement.textContent = displayValue;
            }, 50);
        });
    };
    
    // Trigger animation when stats section is visible
    const statsSection = document.querySelector('.problem');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
});

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

// Smooth reveal animations for pricing cards
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
                pricingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.6s ease-out';
        pricingObserver.observe(card);
    });
});

// Add CSS for fadeOut animation
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .animated {
        animation-fill-mode: both;
    }
    
    /* Enhanced hover effects */
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .btn:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.2);
        transition: left 0.5s;
    }
    
    .btn:hover:before {
        left: 100%;
    }
`;
document.head.appendChild(additionalStyles);