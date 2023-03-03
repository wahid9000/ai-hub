const loadData = async (aiHub) =>  {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await response.json();
    displayAiData(data.data.tools);
}

const displayAiData = (aiDatas) => {
    const aiDataContainer = document.getElementById('aiData-Container');
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
                    <button id="details-btn" class="btn btn-lightrounded-5" style="color:red" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                </div> 
            </div>
        </div>
        `
        aiDataContainer.appendChild(aiDataDiv);

    })
}

loadData();