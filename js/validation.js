var $loginForm = document.querySelector('form#login-form')
var $signupForm = document.querySelector('form#signup-form')
var $contactForm = document.querySelector('form#contact-form')

String.prototype.validation = function (type, { passwordToConfirm = null } = {}) {
    if (type == "confPassword") {
        if (!(this == passwordToConfirm)) {
            throw 'Passwords must be same'
        }
    }
    if (type == "password") {
        var password = this
        if (password.length < 8) {
            throw 'Password have to be at least 8 character long'
        }
        if (!/[A-Z]/g.test(password)) {
            throw 'Password must have at least one uppercase letter'
        }
        if (!/[a-z]/g.test(password)) {
            throw 'Password must have at least one lowercase letter'
        }
        if (!/[0-9]/g.test(password)) {
            throw 'Password must have at least one digit'
        }
        return true
    }
    if (type == "email") {
        var email = this
        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw 'Please enter valid email'
        }
    }
    if (type == 'name') {
        var name = this
        if (!name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðəƏ ,.'-]+$/u)) {
            throw 'Please enter valid name'
        }
    }
}


if ($loginForm) $loginForm.addEventListener('submit', e => {
    var form = e.target
    try {
        const email = form.email.value

        email.validation('email')
    } catch (e) {
        e.preventDefault()
        window.alert(e)
    }
})

if ($signupForm) $signupForm.addEventListener('submit', e => {
    var form = e.target
    try {
        const pwd = form.password.value
        const email = form.email.value
        const name = form.name.value

        email.validation('email')
        name.validation('name')
        pwd.validation('password')
        pwd.validation('confPassword', { passwordToConfirm: form.confPassword.value })
    } catch (e) {
        e.preventDefault()
        window.alert(e)
    }
})

if ($contactForm) $contactForm.addEventListener('submit', e => {
    var form = e.target
    try {
        form.name.value.validation('name')
        form.surname.value.validation('name')
        form.email.value.validation('email')
    } catch (e) {
        e.preventDefault()
        window.alert(e)
    }
})