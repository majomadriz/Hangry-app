(function() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const dishId = url.searchParams.get("dish_id");
    const templateHtml = document.querySelector('.contenido-principal');
    let ingredientsSection = document.querySelector('#ingredients');
    let rateSection = document.querySelector('#rate');
    async function getDish() {
        const response = await app.apiService(`/api/dish/${dishId}`);
        console.log(response);
        if (response.success) {
            if (response.data) {
                const dish = response.data;
                templateHtml.innerHTML = templateHtml.innerHTML.replace(/{{id}}/g, dish["_id"])
                    .replace(/{{name}}/g, dish["name"])
                    .replace(/{{steps}}/g, dish["steps"])
                    .replace(/{{price}}/g, dish["price"])
                    .replace(/{{category}}/g, dish["category"]);

                ingredientsSection = document.querySelector('#ingredients');
                rateSection = document.querySelector('#rate');
                let rate = '';
                for (let i = 0; i < 5; i++) {
                    if (dish.level > i) {
                        rate += '<span class="fas fa-circle rate-circle" style="margin-right:2px;"></span>';
                    } else {
                        rate += '<span class="fas fa-circle" style="color:#bebebe; margin-right:2px;"></span>';
                    }
                }
                rateSection.innerHTML = rate;
                const ingredientsList = document.createElement('ul');
                ingredientsList.setAttribute('class', 'list-group');
                let ingredientsItems = '';
                dish.ingredients.forEach(element => {
                    ingredientsItems += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    <strong>${element.name}</strong>
                    ₡${element.price}
                        <span class="badge badge-primary badge-pill">${element.quantity}</span>
                    </li>`
                });
                ingredientsList.innerHTML = ingredientsItems;
                ingredientsSection.appendChild(ingredientsList);

            } else {
                templateHtml.innerHTML = templateHtml.innerHTML.replace(/{{id}}/g, 'id')
                    .replace(/{{name}}/g, "name")
                    .replace(/{{steps}}/g, "steps")
                    .replace(/{{price}}/g, "price")
                    .replace(/{{category}}/g, "category");
            }
        } else {
            if (window.Swal) {
                Swal.fire({
                    type: 'error',
                    html: 'No se pudo cargar el platillo',
                    showCloseButton: true,
                    confirmButtonText: 'Aceptar',
                });
            } else {
                alert('No se pudo cargar el platillo');
            }
        }
    }

    function init() {
        if (dishId) {
            getDish();
        }
    }
    init();
})();