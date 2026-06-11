// Theme management with localStorage persistence
class ThemeManager {
  constructor() {
    this.htmlElement = document.documentElement
    this.toggleButton = document.querySelector(".theme-toggle")
    this.profileImg = document.getElementById("profileImg")

    // Initialize theme from localStorage or system preference
    this.initializeTheme()

    // Bind event listeners
    this.toggleButton.addEventListener("click", () => this.toggleTheme())

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme-preference")) {
          this.setTheme(e.matches ? "dark" : "light")
        }
      })
  }

  initializeTheme() {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem("theme-preference")

    if (savedTheme) {
      this.setTheme(savedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
      this.setTheme(prefersDark ? "dark" : "light")
    }
  }

  toggleTheme() {
    const currentTheme = this.htmlElement.classList.contains("light")
      ? "light"
      : "dark"
    const newTheme = currentTheme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }

  setTheme(theme) {
    if (theme === "light") {
      this.htmlElement.classList.add("light")
      this.profileImg.src = "./assets/img higilar light.jfif"
    } else {
      this.htmlElement.classList.remove("light")
      this.profileImg.src = "./assets/img darkk mode.jpeg"
    }

    // Save preference
    localStorage.setItem("theme-preference", theme)

    // Update document meta color-scheme
    document.documentElement.style.colorScheme = theme
  }
}

// Initialize theme manager when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
})

// Add ripple effect to links
document
  .querySelectorAll(".link-button, .social-links a")
  .forEach((element) => {
    element.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ripple = document.createElement("span")
      ripple.style.position = "absolute"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.style.width = "0"
      ripple.style.height = "0"
      ripple.style.borderRadius = "50%"
      ripple.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
      ripple.style.pointerEvents = "none"
      ripple.style.animation = "ripple 0.6s ease-out"

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)
    })
  })

// Add ripple animation style
const style = document.createElement("style")
style.textContent = `
  @keyframes ripple {
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// Smooth scroll behavior
document.addEventListener(
  "scroll",
  () => {
    // Add any scroll-based interactions here
  },
  { passive: true },
)
