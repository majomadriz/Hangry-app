(function() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const ingredientId = url.searchParams.get("ingredient_id");
    const templateHtml = document.querySelector('.contenido-principal');
    let ingredientsSection = document.querySelector('#ingredients');
    async function getIngredient() {
        const response = await app.apiService(`/api/ingredient/${ingredientId}`);
        console.log(response);
        if (response.success) {
            if (response.data) {
                const ingredient = response.data;
                templateHtml.innerHTML = templateHtml.innerHTML.replace(/{{id}}/g, ingredient["_id"])
                    .replace(/{{name}}/g, ingredient["name"])
                    .replace(/{{description}}/g, ingredient["description"])
                    .replace(/{{price}}/g, ingredient["price"])
                    .replace(/{{category}}/g, ingredient["category"]);

            } else {
                templateHtml.innerHTML = templateHtml.innerHTML.replace(/{{id}}/g, 'id')
                    .replace(/{{name}}/g, "name")
                    .replace(/{{description}}/g, "description")
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
        if (ingredientId) {
            getIngredient();
        }
    }
    init();
})();