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
    toggleSpinner(true);
    showAllAiDataTogether();
})


const showAllAiDataTogether = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await response.json();
    toggleSpinner(false);
    displayAiData(data.data.tools);
    document.getElementById('see-more-btn').classList.add('d-none');
}

loadData();

//code for modal description

const loadDetails = async(id) => {
    try{
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
        const response = await fetch(url)
        const data = await response.json()
        showDetails(data.data); 
    }
    catch(error){
        console.log(error);
    }
    
}

const showDetails = aiData => {
    console.log(aiData);
    row = document.getElementById('detailsRow');
    row.innerHTML = `
    
    <div class="col-md-5 border rounded-3 py-5 w-50 left-div">
        <h5 class="text-center">${aiData.description}</h5>
        <div class="d-flex gap-4 mt-3">
            <div class="text-center list-unstyled shadow rounded-3">
            <li class="pt-2 px-1">${aiData.pricing[0].price ? aiData.pricing[0].price : "Free of Cost"}</li>
            <li>${aiData.pricing[0].plan ? aiData.pricing[0].plan : "No Plan"}</li>
            </div>
            
            <div class="text-center list-unstyled shadow rounded-3">
            <li class="pt-2 px-2">${aiData.pricing[1].price ? aiData.pricing[1].price : "Free of Cost"}</li>
            <li>${aiData.pricing[1].plan ? aiData.pricing[1].plan : "No Plan"}</li>
            </div>

            <div class="text-center list-unstyled shadow rounded">
            <li class="px-3">${aiData.pricing[2].price ? aiData.pricing[2].price : "Free of Cost"}</li>
            <li>${aiData.pricing[2].plan ? aiData.pricing[2].plan : "No Plan"}</li>
            </div>
         
        </div>
        <div class="d-flex gap-2 mt-4">
            <div class="features">
                <h5>Features</h5>
                <ul>
                    <li>${aiData.features[1].feature_name}</li>
                    <li>${aiData.features[2].feature_name}</li>
                    <li>${aiData.features[3].feature_name}</li>
                </ul>
            </div>
            <div class="integration">
                <h5 class="text-center">Integrations</h5>
                <ul>
                    <li>${aiData.integrations[0] ? aiData.integrations[0] : "No Data Found"}</li>
                    <li>${aiData.integrations[1] ? aiData.integrations[1] : "No Data Found"}</li>
                    <li>${aiData.integrations[2] ? aiData.integrations[2] : "No Data Found"}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-md-6 ms-auto py-5 rounded-3 text-center">
        <button type="button" id="accuracy-btn" class="btn btn-danger position-absolute top-10 end-0 rounded-3">${aiData.accuracy.score * 100 ? aiData.accuracy.score * 100 : "0"}% accuracy</button>
        <img src="${aiData.image_link[0]}" class="img-fluid rounded-3 mb-3" alt="">
        <h5>${aiData.input_output_examples[0].input}</h5>
        <p>${aiData.input_output_examples[0].output}</p>
    </div>
    `
}

