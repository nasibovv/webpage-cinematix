const urls = {
    "/": "Home",
    // "/index.html": "Home",
    "/login": "Login",
    "/register": "Register",
    "/contact": "Contact",
    "/about": "About",
}

document.title = 'Cinematix - ' + urls[location.pathname]