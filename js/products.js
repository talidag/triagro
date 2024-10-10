// const pretMinInput = document.getElementById("pretMin");
// const pretMaxInput = document.getElementById("pretMax");

// pretMinInput.addEventListener("input", function () {
//   pretMaxInput.min = pretMinInput.value;
// });

document
  .getElementById("utilajForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const utilajInput = document.getElementById("cautaUtilaj").value;
    const categorie = document.getElementById("categorie").value;
    // const pretMin = document.getElementById("pretMin").value;
    // const pretMax = document.getElementById("pretMax").value;

    const params = new URLSearchParams();

    if (utilajInput) params.append("utilaj", utilajInput);
    if (categorie) params.append("categorie", categorie);
    // if (stare) params.append("stare", stare);
    // if (pretMin) params.append("pretMin", pretMin);
    // if (pretMax) params.append("pretMax", pretMax);

    window.location.href = `products.html?${params.toString()}`;
  });

const productsHTML = document.querySelector(".products-all");
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);

  const categorieFilter = urlParams.get("categorie");

  const utilajFilter = urlParams.get("utilaj");

  // Fetch the JSON file
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      let filteredData = [];
      if (categorieFilter === "tractoare-premium") {
        filteredData = data.filter((item) => item.ID === "C00001");
      } else if (categorieFilter === "combine-premium") {
        filteredData = data.filter((item) => item.ID === "C00002");
      } else if (categorieFilter === null) {
        filteredData = data;
      } else {
        console.log("NO RESULTS PAGE");
      }
      if (utilajFilter !== null) {
        filteredData = filteredData.filter((category) =>
          category.SUBCATEGORIES.some((subcategory) =>
            subcategory.PRODUCTS.some(
              (product) =>
                product.NAME.toLowerCase().includes(
                  utilajFilter.toLowerCase()
                ) ||
                product.PRODUCT_DETAILS.TITLE.toLowerCase().includes(
                  utilajFilter.toLowerCase()
                )
            )
          )
        );
      }
      filteredData.forEach((category) => {
        const { ID, NAME, SUBCATEGORIES } = category;
        SUBCATEGORIES.forEach((subcategory) => {
          const { ID, NAME: subName, PRODUCTS } = subcategory;
          PRODUCTS.forEach((product) => {
            const { ID, NAME, PRODUCT_DETAILS } = product;
            const { TITLE, SUBTITLE, BRAND, DETALII } = PRODUCT_DETAILS;
            const { IMAGES, MOTOR } = DETALII;
            const toAdd = `
              <div class="product-card" onclick="openPage('product.html?productId=${ID}')">
                <img src="${IMAGES[0]}" class="product-card-img"/>
                <div class="product-text">
                  <h3>${TITLE}</h3>
                  <div class="product-card-sub">
                    <p>${SUBTITLE}</p>
                    <p class="product-sub">${subName}</p> 
                  </div>
                  <p class="product-card-motor">${MOTOR}</p>
                  <img src="${BRAND}" class="product-card-brand" />
                </div>
              </div>`;
            productsHTML.innerHTML += toAdd;
          });
        });
      });
      productsHTML.innerHTML += `    <div class="pagination" id="pagination">
            <button id="prev">Pagina anterioară</button>
            <div id="page-links"></div>
            <button id="next">Pagina următoare</button>
          </div>`;
      // // Pagination
      const cards = document.querySelectorAll(".product-card");
      const cardsPerPage = 10;
      const prevButton = document.getElementById("prev");
      const nextButton = document.getElementById("next");
      const pageLinksContainer = document.getElementById("page-links");

      const noProducts = document.querySelector(".no-products");

      // Calculate the total number of pages
      const totalPages = Math.ceil(cards.length / cardsPerPage);

      if (totalPages === 0) {
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        noProducts.innerHTML += `
          <h3>Fără rezultate</h3>
          <p>Ne pare rău, dar nu am găsit produse care să corespundă filtrelor aplicate.</p>
          <p>Te rugăm să ajustezi filtrele sau să explorezi alte categorii pentru a găsi ce îți dorești.</p>
        `;
        noProducts.style.display = "flex";
      }
      let currentPage = 1;

      for (let i = 1; i <= totalPages; i++) {
        pageLinksContainer.innerHTML += `<a href="#" class="page-link-generated" data-page="${i}">${i}</a>
`;
      }

      const pageLinks = document.querySelectorAll(".page-link-generated");

      // // Function to display cards for a specific page
      function displayPage(page) {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        cards.forEach((card, index) => {
          if (index >= startIndex && index < endIndex) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      }

      // // Function to update pagination buttons and page numbers
      function updatePagination() {
        prevButton.disabled = currentPage === 1;

        nextButton.disabled = currentPage === totalPages;
        pageLinks.forEach((link) => {
          const page = parseInt(link.getAttribute("data-page"));
          link.classList.toggle("active", page === currentPage);
        });
      }

      // // Event listener for "Previous" button
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          displayPage(currentPage);
          updatePagination();
        }
      });

      // // Event listener for "Next" button
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          displayPage(currentPage);
          updatePagination();
        }
      });

      // // Event listener for page number buttons
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

      // // Initial page load
      displayPage(currentPage);
      updatePagination();

      console.log(prevButton.disabled);
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
});

function openPage(pageUrl) {
  window.location.href = pageUrl;
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

window.onload = function () {
  const categorie = getQueryParam("categorie");
  if (categorie) {
    document.getElementById("categorie").value = categorie;
  }

  const cautaUtilaj = getQueryParam("utilaj");
  if (cautaUtilaj) {
    document.getElementById("cautaUtilaj").value = cautaUtilaj;
  }
};

const filterMobile = document.querySelector(".products-mobile-filters");
const form = document.getElementById("utilajForm");
const btnX = document.querySelector(".utilaj-x");

filterMobile.addEventListener("click", () => {
  form.style.display = "flex";
  form.style.position = "fixed";
  form.style.top = "200px";
  form.style.backgroundColor = "white";
  form.style.marginLeft = "calc((100vw - 320px) / 2)";
});

btnX.addEventListener("click", (event) => {
  event.preventDefault();
  form.style.display = "none";
});
