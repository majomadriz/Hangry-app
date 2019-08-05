(async function() {
    const response = await app.apiService('/api/ingredient');
    if (response.error) {
        console.log('Hubo un error');
    } else {
        console.log(response);
        if (!!response.data) {
            let ingredientResultList = document.querySelector('#ingredient-list');
            let ingredientList = '<div class="row">';
            // Para crear los cards 
            response.data.forEach(result => {
                ingredientList += `
                        <div class="col-sm-6 col-lg-3 col-md-4" style="margin: 20px 0;">
                            <div class="card ">
                                <div class="card-body">
                                <h5 class="card-title">${result.name}</h5>
                                <a href="/ingredientDetail?ingredient_id=${result._id}" target="_blank" class="card-link">Ver Ingrediente</a>
                                </div>
                            </div>
                        </div>
                        `;
            });
            ingredientList += '</div>';
            ingredientResultList.innerHTML = ingredientList;
        }
    };
})();