const loadData = async () =>  {

    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await response.json();
    displayAiData(data.data.tools.slice(0, 6));

}

const displayAiData = (aiDatas) => {

    const aiDataContainer = document.getElementById('aiData-Container');
    aiDataContainer.textContent = '';
    aiDatas.forEach(aiData => {
        const aiDataDiv = document.createElement('div');
        aiDataDiv.classList.add('col');
        aiDataDiv.innerHTML = `
        <div class="card h-100">
            <img src="${aiData.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <p class="card-text">
                    <p>1. ${aiData.features[0]}</p>
                    <p>2. ${aiData.features[1]}</p>
                    <p>3. ${aiData.features[2]}</p>   
                </p>
            </div>

            <div class="card-footer">
                <h4>${aiData.name}</h4>
                <div class="d-flex justify-content-between">
                    <p><i class="fa-solid fa-calendar-days"></i>&nbsp;${aiData.published_in}</p>
                    <button onClick="loadDetails('${aiData.id}')" id="details-btn" class="btn btn-lightrounded-5" style="color:red" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                </div> 
            </div>
        </div>
        `;
        aiDataContainer.appendChild(aiDataDiv);

    });
    toggleSpinner(false);
};

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if(isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}

const seeMoreBtn = document.getElementById('see-more-btn').addEventListener('click', function(){
    showAllAiDataTogether();
    toggleSpinner(true);

})

const showAllAiDataTogether = () => {

    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(response => response.json())
    .then(data => displayAiData(data.data.tools))


}

loadData();


const loadDetails = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => showDetails(data.data)); 
}

const showDetails = aiData => {
    console.log(aiData);
    row = document.getElementById('detailsRow');
    row.innerHTML = `
    
    <div class="col-md-6 border rounded-3 py-5 w-50">
        <h5>${aiData.description}</h5>
        <div class="d-flex gap-5 mt-3">
            <div class="text-center">
            <p>${aiData.pricing[0].price}</p>
            <p>${aiData.pricing[0].plan}</p>
            </div>
            
            <div class="text-center">
            <p>${aiData.pricing[1].price}</p>
            <p>${aiData.pricing[1].plan}</p>
            </div>

            <div class="text-center">
            <p>${aiData.pricing[2].price}</p>
            <p>${aiData.pricing[2].plan}</p>
            </div>
         
        </div>
        <div class="d-flex mt-3">
            <div class="features">
                <h5>Features</h5>
                <ul>
                    <li>${aiData.features[1].feature_name}</li>
                    <li>${aiData.features[2].feature_name}</li>
                    <li>${aiData.features[3].feature_name}</li>
                </ul>
            </div>
            <div class="integration">
                <h5>Integrations</h5>
                <ul>
                    <li>${aiData.integrations[0]}</li>
                    <li>${aiData.integrations[1]}</li>
                    <li>${aiData.integrations[2]}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-md-6 py-5 rounded-3 text-center  w-10">
        <button type="button" class="btn btn-danger position-absolute top-10 end-0 rounded-3">${aiData.accuracy.score} accuracy</button>
        <img src="${aiData.image_link[0]}" class="img-fluid rounded-3 mb-3" alt="">
        <h5>${aiData.input_output_examples[0].input}</h5>
        <p>${aiData.input_output_examples[0].output}</p>
    </div>
    `
}




