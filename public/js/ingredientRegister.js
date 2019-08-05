(function(params) {
    const createIngredientButton = document.querySelector('#createIngredient');
    const inputsWrapper = document.querySelector('#ingredient-form');
    const ingredientInput = document.querySelector('#ingredient');
    const descriptionInput = document.querySelector('#description');
    const priceInput = document.querySelector('#price');
    const categoryInput = document.querySelector('#ingredientCategory');

    createIngredientButton.addEventListener('click', async function(e) {
        e.preventDefault();
        if (!app.validateInputs(inputsWrapper)) {
            if (window.Swal) {
                Swal.fire({
                    type: 'error',
                    html: 'Por favor complete los espacios en blanco',
                    showCloseButton: true,
                    confirmButtonText: 'Aceptar',
                });
            } else {
                alert('Por favor complete los espacios en blanco');
            }
            return false;
        }

        const ingredient = {
            name: ingredientInput.value,
            description: descriptionInput.value,
            price: priceInput.value,
            category: categoryInput.value,
        }
        const options = {
            method: 'post',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const response = await app.apiService('/api/ingredient', options);
        console.log(response);
        if (response.success) {
            if (window.Swal) {
                Swal.fire({
                    type: 'success',
                    html: 'Se creó el ingrediente con éxito',
                    showCloseButton: true,
                    confirmButtonText: 'Aceptar',
                });
            } else {
                alert('Se creó el ingrediente con éxito');
            }
        } else {
            if (window.Swal) {
                Swal.fire({
                    type: 'error',
                    html: 'No se pudo crear el ingrediente',
                    showCloseButton: true,
                    confirmButtonText: 'Aceptar',
                });
            } else {
                alert('No se pudo crear el ingrediente');
            }
        }
    });

    async function init() {
        const response = await app.apiService('/api/ingredient/category');
        console.log(response);
        if (response.success) {
            if (!!response.data) {
                let ingredientResultList = document.querySelector('#ingredientCategory');
                let ingredientList = '<option value="" disabled selected>Seleccione una categoría</option>';
                // Para crear los cards 
                response.data.forEach(category => {
                    ingredientList += `<option value="${category.name}">${category.name}</option>`;
                });
                ingredientResultList.innerHTML = ingredientList;
            }
        } else {
            if (window.Swal) {
                Swal.fire({
                    type: 'error',
                    html: 'No se pudieron cargar las categorias',
                    showCloseButton: true,
                    confirmButtonText: 'Aceptar',
                });
            } else {
                alert('No se pudieron cargar las categorias');
            }
        }
    }
    init();
})();