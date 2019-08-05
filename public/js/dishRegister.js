(function() {
    app.inicializarLoader();
    const autocomplete_result = document.querySelector('#autocomplete_result');
    const createDishButton = document.querySelector('#createDish');
    const inputsWrapper = document.querySelector('#dish-form');
    const dishtInput = document.querySelector('#dish');
    const dishCategory = document.querySelector('#dishCategory');
    const stepsInput = document.querySelector('#steps');
    const rateLabel = document.querySelector('.rate_label');
    const rateRadios = document.querySelectorAll('input[name="rate"]');
    const ingredientName = document.querySelector('#select_ingredient');
    const ingredientList = document.querySelector('#ingredient_list');

    rateRadios.forEach(element => {
        element.addEventListener('change', function() {
            rateLabel.style.color = 'initial';
        });
    });

    createDishButton.addEventListener('click', async function() {
        const rateRadio = document.querySelector('input[name="rate"]:checked');
        const ingredientsList = document.querySelectorAll('#ingredient_list .ingredient_item');
        let valid = true;

        if (!rateRadio) {
            rateLabel.style.color = 'red';
            valid = false;
        }
        valid = app.validateInputs(inputsWrapper) ? valid : false;
        if (!valid) {
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

        if (!ingredientsList.length > 0) {
            if (window.Swal) {
                Swal.fire({
                    type: 'error',
                    html: 'Por favor agregue ingredientes',
                    showCloseButton: true,
                    confirmButtonText: 'Aceptar',
                });
            } else {
                alert('Por favor agregue ingredientes');
            }
            return false;
        }
        app.agregarLoader();
        let price = 0;
        const ingredients = Array.prototype.map.call(ingredientsList, (element) => {
            price += Number(element.querySelector('.ingredient-price').value);
            return {
                quantity: element.querySelector('.ingredient-quantity').value,
                name: element.querySelector('.ingredient-name').value,
                price: element.querySelector('.ingredient-price').value,
            }
        });
        const dish = {
            name: dishtInput.value,
            steps: stepsInput.value,
            level: rateRadio.value,
            ingredients,
            category: dishCategory.value,
            price,
        }
        console.log(dish);
        const options = {
            method: 'post',
            body: JSON.stringify(dish),
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const response = await app.apiService('/api/dish', options);
        console.log(response);
        app.removerLoader();
        if (response.success) {
            if (window.Swal) {
                Swal.fire({
                    type: 'success',
                    html: 'Se creó el plato con éxito',
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
                    html: 'No se pudo crear el plato',
                    showCloseButton: true,
                    confirmButtonText: 'Aceptar',
                });
            } else {
                alert('Error API');
            }
        }
    });

    async function getIngredients() {
        app.inicializarLoader();
        app.agregarLoader();
        let data = await app.apiService('/api/ingredient');
        app.removerLoader();
        if (data.error) {
            console.log(`An error ocurred ${data.message}`);
        } else {
            var db = data.data;

            function popupClearAndHide() {
                autocomplete_result.innerHTML = "";
                autocomplete_result.style.display = "none";
            }

            function updPopup(e) {
                if (!ingredientName.value) {
                    popupClearAndHide();
                    return;
                }

                var a = new RegExp("^" + ingredientName.value, "i");
                for (var x = 0, b = document.createDocumentFragment(), c = false; x < db.length; x++) {
                    if (a.test(db[x].name)) {
                        let item = db[x];
                        c = true;
                        var d = document.createElement("p");
                        d.innerText = item.name;
                        d.addEventListener("click", function() {
                            console.log(item);
                            let ingredientItem = document.createElement('div');
                            let ingredientItemContent = `<div class="form-row ingredient_item">
                            <div class="col-md-2 mb-3">
                                <label for="validationDefault03">Cantidad</label>
                                <input type="number" value="1" class="form-control ingredient-quantity">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="validationDefault04">Nombre</label>
                                <input type="text" value="${item.name}" disabled class="form-control ingredient-name">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="validationDefault05">Precio por unidad</label>
                                <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">₡</div>
                                </div>
                                <input type="text" value="${item.price}" disabled class="form-control ingredient-price">
                                </div>
                            </div>
                        </div>`;
                            ingredientItem.innerHTML = ingredientItemContent;
                            ingredientItem.querySelector('.ingredient-quantity').addEventListener('change', function() {
                                this.closest('.ingredient_item').querySelector('.ingredient-price').value = this.value * item.price;
                            })
                            ingredientList.appendChild(ingredientItem);
                            ingredientName.value = '';
                            popupClearAndHide();
                        });
                        b.appendChild(d);
                    }
                }

                if (c == true) {
                    autocomplete_result.innerHTML = "";
                    autocomplete_result.style.display = "block";
                    autocomplete_result.appendChild(b);
                    return;
                }
                popupClearAndHide();
            }

            ingredientName.addEventListener("keyup", updPopup);
            ingredientName.addEventListener("focus", updPopup);
        }
    };

    async function getCategories() {
        const response = await app.apiService('/api/category');
        console.log(response);
        if (response.success) {
            if (!!response.data) {
                let ingredientResultList = document.querySelector('#dishCategory');
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

    function init() {
        getIngredients();
        getCategories();
    }
    init();
})();