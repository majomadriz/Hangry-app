const createCategoryButton = document.querySelector('#createCategory');
const inputsWrapper = document.querySelector('#category-form');
const categoryInput = document.querySelector('#category');
createCategoryButton.addEventListener('click', async function() {
    if (!app.validateInputs(inputsWrapper)) {
        if (window.Swal) {
            Swal.fire({
                type: 'error',
                html: 'Por favor ingrese una nueva categoría',
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
            });
        } else {
            alert('Por favor ingrese una nueva categoría');
        }
        return false;
    }

    const category = {
        name: categoryInput.value,
    }
    const options = {
        method: 'post',
        body: JSON.stringify(category),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const response = await app.apiService('/api/category', options);
    console.log(response);
    if (response.success) {
        if (window.Swal) {
            Swal.fire({
                type: 'success',
                html: 'Se creó la categoría con éxito',
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
            });
        } else {
            alert('Error API');
        }
    } else {
        if (window.Swal) {
            Swal.fire({
                type: 'error',
                html: 'No se pudo crear la categoría',
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
            });
        } else {
            alert('Error API');
        }
    }
})