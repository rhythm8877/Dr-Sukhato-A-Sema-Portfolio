// Navigation and Hamburger Menu
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")
const navbar = document.querySelector(".navbar")
const navItems = document.querySelectorAll(".nav-links a")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navLinks.classList.toggle("active")
})

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Scroll animations using Intersection Observer
const animateOnScroll = (elements, className) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className)
        }
      })
    },
    { threshold: 0.1 },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Apply animations
document.addEventListener("DOMContentLoaded", () => {
  // Remove no-js class when JavaScript is available
  document.body.classList.remove("no-js");
  // About section animations
  const aboutImage = document.querySelector(".about-image")
  const aboutText = document.querySelector(".about-text")

  if (aboutImage) animateOnScroll([aboutImage], "animate")
  if (aboutText) animateOnScroll([aboutText], "animate")

  // Initiative cards animations
  const initiativeCards = document.querySelectorAll(".initiative-card")
  if (initiativeCards.length > 0) {
    initiativeCards.forEach((card, index) => {
      setTimeout(() => {
        animateOnScroll([card], "animate")
      }, index * 100)
    })
  }

  // Timeline animations
  const timelineItems = document.querySelectorAll(".timeline-item")
  if (timelineItems.length > 0) {
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        animateOnScroll([item], "animate")
      }, index * 200)
    })
  }
})

// Image Carousel
const carousel = document.querySelector(".carousel")
const carouselItems = document.querySelectorAll(".carousel-item")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")

if (carousel && carouselItems.length > 0) {
  let currentIndex = 0
  const totalItems = carouselItems.length

  // Set initial position
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`
  }

  // Auto slide
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems
    updateCarousel()
  }, 5000)

  // Navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(autoSlide)
      currentIndex = (currentIndex + 1) % totalItems
      updateCarousel()
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems
        updateCarousel()
      }, 5000)
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(autoSlide)
      currentIndex = (currentIndex - 1 + totalItems) % totalItems
      updateCarousel()
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems
        updateCarousel()
      }, 5000)
    })
  }

  // Pause auto-slide on hover
  carousel.addEventListener("mouseenter", () => {
    clearInterval(autoSlide)
  })

  carousel.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems
      updateCarousel()
    }, 5000)
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Add loading animation for images
document.addEventListener("DOMContentLoaded", () => {
  // Exclude about image and carousel images from the fade-in animation
  const images = document.querySelectorAll("img:not(.about-image img):not(.carousel-img)")

  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1"
    })

    // Set initial opacity
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"
  })
  
  // Handle about image separately to ensure it's always visible
  const aboutImage = document.querySelector(".about-image img")
  if (aboutImage) {
    aboutImage.style.opacity = "1"
  }
  
  // Handle carousel images separately to ensure they're always visible
  const carouselImages = document.querySelectorAll(".carousel-img")
  carouselImages.forEach(img => {
    img.style.opacity = "1"
  })
})

// Add scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, #9c4dcc, #38006b);
        z-index: 9999;
        transition: width 0.1s ease;
    `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.offsetHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = scrollPercent + "%"
  })
}

// Initialize scroll progress
createScrollProgress()

// Add intersection observer for section highlighting in navigation
function highlightActiveSection() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id")

          // Remove active class from all nav links
          navLinks.forEach((link) => {
            link.classList.remove("active")
          })

          // Add active class to current section's nav link
          const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`)
          if (activeLink) {
            activeLink.classList.add("active")
          }
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: "-80px 0px -80px 0px",
    },
  )

  sections.forEach((section) => {
    observer.observe(section)
  })
}

// Initialize section highlighting
highlightActiveSection()

// Add CSS for active nav link
const style = document.createElement("style")
style.textContent = `
    .nav-links a.active {
        color: #6a1b9a !important;
    }
    .nav-links a.active::after {
        width: 100% !important;
    }
`
document.head.appendChild(style)
