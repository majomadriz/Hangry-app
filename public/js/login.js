const loginButton = document.querySelector('#login');
const inputsWrapper = document.querySelector('#login-form');
const emailInput = document.querySelector('#exampleInputEmail1');
const passwordInput = document.querySelector('#exampleInputPassword1');
loginButton.addEventListener('click', async function(e) {
    e.preventDefault();
    console.log(validateEmail(emailInput.value), passwordInput.value);
    if (!app.validateInputs(inputsWrapper)) {
        if (window.Swal) {
            Swal.fire({
                type: 'error',
                html: 'Por favor complete todos los espacios',
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
            });
        } else {
            alert('Por favor complete todos los espacios');
        }
        return false;
    }
    if (!validateEmail(emailInput.value)) {
        if (window.Swal) {
            Swal.fire({
                type: 'error',
                html: 'Email Invalido',
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
            });
        } else {
            alert('Email Invalido');
        }
        return false;
    }

    const user = {
        email: emailInput.value,
        password: passwordInput.value
    }
    const options = {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const response = await app.apiService('/api/user/login', options);
    console.log(response);
    if (response.success) {
        window.location = '/home';
    } else {
        if (window.Swal) {
            Swal.fire({
                type: 'error',
                html: 'Credenciales incorrectas',
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
            });
        } else {
            alert('Error API');
        }
    }


})

//Validacion email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}