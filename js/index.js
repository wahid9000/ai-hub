const loadData = async aiHub =>  {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await response.json();
    // displayAllAiData = console.log(data.data.tools);
    displayAiData(data.data.tools)
}

loadData();
