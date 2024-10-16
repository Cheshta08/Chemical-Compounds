const baseUrl = "http://localhost:3000";

async function getChemicalCompounds() {
  try {
    const url = `${baseUrl}/api/compounds`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

//script.js
document.addEventListener("DOMContentLoaded", async function (e) {
  const cardsPerPage = 10;
  const dataContainer = document.getElementById("data-container");
  const cardContainer = document.getElementById("card-container");
  const pagination = document.getElementById("pagination");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const pageNumbers = document.getElementById("page-numbers");
  const pageLinks = document.querySelectorAll(".page-link");
  const compoundList = await getChemicalCompounds();
  if (cardContainer) {
    var htmlcode = makeHtmlOfCards(compoundList);
    cardContainer.innerHTML = htmlcode;
  }

  const cards = Array.from(dataContainer.getElementsByClassName("card"));

  // Calculate the total number of pages
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  let currentPage = 1;

  // Function to display cards for a specific page
  function displayPage(page) {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    cards.forEach((card, index) => {
      if (index >= startIndex && index < endIndex) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Function to update pagination buttons and page numbers
  function updatePagination() {
    pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    pageLinks.forEach((link) => {
      const page = parseInt(link.getAttribute("data-page"));
      link.classList.toggle("active", page === currentPage);
    });
  }

  // Event listener for "Previous" button
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
      updatePagination();
    }
  });

  // Event listener for "Next" button
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(currentPage);
      updatePagination();
    }
  });

  // Event listener for page number buttons
  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = parseInt(link.getAttribute("data-page"));
      if (page !== currentPage) {
        currentPage = page;
        displayPage(currentPage);
        updatePagination();
      }
    });
  });

  // Initial page load
  displayPage(currentPage);
  updatePagination();
});

function makeHtmlOfCards(compoundList) {
  var cardHtml = "";
  compoundList?.forEach((element) => {
    cardHtml += `<div class="card">
    <a href="CompoundDet.html?id=${element.id}">
    <img class="cimg" src=${element.strImageSource} alt="" onerror="this.style.visibility='hidden';"/>
    <h3 class="cname">${element.CompoundName} </h3></a></div>`;
  });
  return cardHtml;
}
