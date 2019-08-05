(function() {
    function init() {
        getDishes();
        getCategories();
    }
    async function getCategories() {
        const response = await app.apiService('/api/category');
        console.log(response);
        if (response.success) {
            if (!!response.data) {
                let ingredientResultList = document.querySelector('#category-list');
                let ingredientList = '<div class="row">';
                // Para crear los cards 
                response.data.forEach(result => {
                    ingredientList += `
                        <div class="col-sm-6 col-lg-3 col-md-4" style="margin: 20px 0;">
                            <div class="card ">
                                <div class="card-body">
                                <h5 class="card-title color-secondary">${result.name}</h5>
                                <a href="/dishList?category_name=${result.name}" target="_blank" class="card-link">Ver Platos</a>
                                </div>
                            </div>
                        </div>
                        `;
                });
                ingredientList += '</div>';
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
    async function getDishes() {
        const dishListArray = await app.apiService('/api/dish');
        if (dishListArray.success) {
            console.log(dishListArray);
            if (!!dishListArray.data.length > 0) {
                let dishListWrapper = document.querySelector('#dish-list');
                let dishList = '';
                dishList += '<div class="row">';
                dishListArray.data.forEach(result => {
                    let ingredientsItems = '<ul style="padding:0;">'
                    result.ingredients.forEach(element => {
                        ingredientsItems += `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>${element.name}</strong>
                        ₡${element.price}
                            <span class="badge badge-primary badge-pill">${element.quantity}</span>
                        </li>`
                    });
                    let rate = '';
                    for (let i = 0; i < 5; i++) {
                        if (result.level > i) {
                            rate += '<span class="fas fa-circle rate-circle" style="margin-right:2px;"></span>';
                        } else {
                            rate += '<span class="fas fa-circle" style="color:#bebebe; margin-right:2px;"></span>';
                        }
                    }
                    ingredientsItems += '</ul>';
                    let resultadoCard = `
                        <div class="col-sm-6" style="margin: 20px 0;">
                            <div class="card">
                                <div class="card-body">
                                <h3 class="card-title">${result.name}</h3>
                                <p><strong>Categoria:</strong> ${result.category}</p>
                                <p class="text-preview"><strong>Pasos:</strong> ${result.steps}</p>
                                <p><strong>Nivel:</strong> ${rate}</p>
                                <p><strong>Precio:</strong> ₡${result.price}</p>
                                ${ingredientsItems}
                                <a href="/dishDetail?dish_id=${result._id}" target="_blank" class="card-link">Ver Plato</a>
                                </div>
                            </div>
                        </div>`;
                    dishList += resultadoCard;
                });
                dishList += '</div>';
                dishListWrapper.innerHTML = dishList;
            } else {
                if (window.Swal) {
                    Swal.fire({
                        type: 'error',
                        html: 'No se encontraron platos',
                        showCloseButton: true,
                        confirmButtonText: 'Aceptar',
                    });
                } else {
                    alert('No se encontraron platos');
                }
            }
        } else {
            if (window.Swal) {
                Swal.fire({
                    type: 'error',
                    html: 'No se pudieron cargar los platos',
                    showCloseButton: true,
                    confirmButtonText: 'Aceptar',
                });
            } else {
                alert('No se pudieron cargar los platos');
            }
        }
    }

    init();
})()