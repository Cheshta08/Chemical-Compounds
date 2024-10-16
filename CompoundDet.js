const baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async function (e) {
  const queryParams = getQueryParams();
  console.log(queryParams?.id);
  if (queryParams?.id) {
    var data = await GetCompoundDetById(queryParams?.id);
    if (data) {
      const imgsrc = data?.strImageSource == null ? "" : data?.strImageSource;
      const imgattr =
        data?.strImageAttribution == null ? "" : data?.strImageAttribution;
      const cardDes =
        data?.CompoundDescription == null ? "" : data?.CompoundDescription;
      const cardName = data?.CompoundName == null ? "" : data?.CompoundName;

      let cardhtml = "";
      cardhtml += `<div class="card">
        <img src=${imgsrc} alt="" class="card-image" onerror="this.style.display='none';">
        <div class="card-details">
            <h2 class="card-title">${cardName}</h2>
            <p class="card-description">
            ${cardDes}
            </p></div></div>`;
      var body = document.getElementById("bodycontent");
      if(body && cardhtml!=null && cardhtml!= undefined && cardhtml!=""){
      body.innerHTML = cardhtml;
      }
    }
  }
});

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return { id };
}

async function GetCompoundDetById(compId) {
  try {
    const itemId = compId;
    const url = `${baseUrl}/api/getChemicalCompoundsById/${itemId}`;
    const response = await fetch(url);
    if (!response.ok) {
        console.error("There was a problem with the fetch operation:", error);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
