var app = (function() {
    let loader;
    let body = document.querySelector('body');
    let mainNavigation = document.querySelector('.navigation');
    let logOut = document.querySelector('cerrar-sesion');
    let menuToggle = document.querySelector('#menu-toggle');
    let isMenuOpen = false;
    const inputColorBorde = '#eee';
    const inputColorBordeError = 'red';
    const validateInputs = [
        ...document.querySelectorAll('input[data-required]'),
        ...document.querySelectorAll('textarea[data-required]')
    ];

    if (logOut) {
        logOut.addEventListener('click', async(e) => {
            e.preventDefault();
            let sesionCerrada = await getApi('/logout');
            if (sesionCerrada.success) {
                localStorage.clear();
                window.location.href = "/";
            } else {
                if (window.Swal) {
                    Swal.fire({
                        type: 'alert',
                        html: 'Hubo un error',
                        showCloseButton: true,
                        confirmButtonText: 'Aceptar',
                        confirmButtonAriaLabel: 'Libreria',
                    });
                }
            }
        })
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.childNodes[0].classList.toggle('fa-bars');
            this.childNodes[0].classList.toggle('fa-times');
            isMenuOpen = !isMenuOpen;
            mainNavigation.classList.toggle('nav-hidden')
        })
    }
    return {
        // El api service se utiliza para hacer llamados o requests al servidor (fetch general)
        // Para utlizarse y solo llamar al Api, asi no se tienen que hacer varios fetch, solamente se llama al Api
        apiService: function apiService(url, options) {
            return fetch(url, options)
                .then(
                    async(response) => {
                        if (response.status != 200) return response;
                        else {
                            let data = await response.json();
                            return data;
                        }
                    }
                )
                .catch(
                    function(err) {
                        return err;
                    }
                );
        },
        inicializarLoader: () => {
            if (loader) return false;
            let loaderWrapper = document.createElement('div');
            let loaderHtml = `<div class="loader oculto">
                            <div class="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>`;
            loaderWrapper.innerHTML = loaderHtml;
            body.appendChild(loaderWrapper);
            loader = document.querySelector('.loader')
        },
        agregarLoader: () => {
            if (loader) {
                body.classList.add('cargando');
                loader.classList.remove('oculto');
            }
        },
        removerLoader: () => {
            if (loader) {
                body.classList.remove('cargando');
                loader.classList.add('oculto');
            }
        },
        inicializarModal: () => {
            if (document.querySelector('#modal')) return false;
            let modalWrapper = document.createElement('div');
            let modalHtml = `
            <div id="modal" class="modal" style="display:none">
                <div>
                    <div class="popupCloseButton">X</div>
                    <div class="modal-body">
                    </div>
                <div>
            </div>`;
            modalWrapper.innerHTML = modalHtml;
            body.appendChild(modalWrapper);
            let closeModal = document.querySelector('.popupCloseButton');
            let modal = document.querySelector('#modal');
            closeModal.addEventListener('click', function() {
                body.classList.remove('cargando');
                modal.style.display = 'none';
                modal.querySelector('.modal-body').innerHTML = '';
            });
        },
        mostrarModal: (modalBody) => {
            let modal = document.querySelector('#modal');
            modal.querySelector('.modal-body').innerHTML = '';
            modal.querySelector('.modal-body').appendChild(modalBody);
            modal.style.display = 'block';
            body.classList.add('cargando');
        },
        //Validaciones para los espacios requeridos
        validateInputs: function validateInputs(inputsWrapper) {
            var inputs = [
                ...inputsWrapper.querySelectorAll('input[data-required]'),
                ...inputsWrapper.querySelectorAll('select[data-required]'),
                ...document.querySelectorAll('textarea[data-required]'),
            ];
            var radioButtons = [
                [...document.querySelectorAll('input[type="radio"][name="gender"]')],
            ];
            let isValid = true;
            inputs.forEach(input => {
                if (input.value === '') {
                    if (input.type === 'select-one') {
                        input.parentElement.querySelector('.select-seleccionado').style.borderColor = inputColorBordeError;
                    } else {
                        input.style.borderColor = inputColorBordeError;
                    }
                    isValid = false;
                }
            })
            radioButtons.forEach(radios => {
                if (radios.length) {
                    if (!radios.find(radioSearch => radioSearch.checked)) {
                        radios.forEach(radioToStyle => radioToStyle.parentElement.querySelector('.radio-boton-indicador').style.borderColor = inputColorBordeError);
                        isValid = false;
                    }
                }
            })
            return isValid;
        },
        inputColorBorde: inputColorBorde,
        inputColorBordeError: inputColorBordeError,
        limpiarInput: () => {
            //Validación de inputs radio buttons y checkboxes
            validateInputs.forEach(inputToValidate => {
                inputToValidate.addEventListener("click", function() {
                    if (this.type === 'radio' || this.type === 'checkbox') {
                        document.querySelectorAll(`input[name='${this.name}']`).forEach(radioToStyle => radioToStyle.parentElement.querySelector('.radio-boton-indicador').style.borderColor = app.inputColorBorde);
                        return false;
                    }
                    this.style.borderColor = app.inputColorBorde;
                });
            });
        }
    }
}());

app.inicializarModal();
app.inicializarLoader();