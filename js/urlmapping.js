const urls = {
    "/": "Home",
    "/index.html": "Home",
    "/login.html": "Login",
    "/register.html": "Register",
    "/contact.html": "Contact",
    "/about.html": "About",
}

document.title = 'Cinematix - ' + urls[location.pathname]