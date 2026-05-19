let categorySection = document.getElementById("categories-section");
let cardContainer = document.getElementById("card-container");
let modal = document.getElementById("modal");
let cartContainer = document.getElementById("cart-container");
let totalAdded = document.getElementById("total");
let totalPrice = 0;

const loader = document.getElementById("loader");

function showLoader() {
  if (loader) loader.classList.remove("hidden");
}

function hideLoader() {
  if (loader) loader.classList.add("hidden");
}

showLoader();

fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((data) => {
    hideLoader();

    let cardContainer = document.getElementById("card-container");

    data.categories.forEach((category) => {
      categorySection.innerHTML += `
        <li class="my-4" id="${category.id}">${category.category_name}</li>
      `;
    });

    let items = document.querySelectorAll("#categories-section li");

    items.forEach((item) => {
      item.addEventListener("click", () => {
        showLoader();

        fetch(`https://openapi.programming-hero.com/api/category/${item.id}`)
          .then((res) => res.json())
          .then((data) => {
            cardContainer.innerHTML = "";

            data.plants.forEach((data) => {
              cardContainer.innerHTML += `
                <div class="p-4 bg-white">
                  <img src="${data.image}" alt="">
                  <h1 class="font-bold">${data.name}</h1>
                  <p class="text-gray-700">${data.description}</p>
                  <div class="flex justify-between my-4">
                    <button class="bg-[#DCFCE7] text-[#00ffa6] w-26 rounded-xl h-8">
                      ${data.category}
                    </button>
                    <p class="font-semibold">৳<span>${data.price}</span></p>
                  </div>
                  <div class="flex justify-center">
                    <button class="text-white bg-green-600 h-12 w-full rounded-4xl add-to-cart">
                      Add to Cart
                    </button>
                  </div>
                </div>
              `;
            });

            hideLoader();
          });
      });
    });

    if (data.categories.length > 0) {
      loadPlants(data.categories[0].id);
    }
  });

function loadPlants(id) {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      cardContainer.innerHTML += `
        <div class="p-4 bg-white">
          <img src="${data.plants.image}" alt="">
          <h1 class="font-bold" id="name-${data.plants.id}">${data.plants.name}</h1>
          <p class="text-gray-700">${data.plants.description}</p>
          <div class="flex justify-between my-4">
            <button class="bg-[#DCFCE7] text-[#00ffa6] w-26 rounded-xl h-8">
              Fruit Tree
            </button>
            <p class="font-semibold">৳<span>${data.plants.price}</span></p>
          </div>
          <div class="flex justify-center">
            <button class="text-white bg-green-600 h-12 w-full rounded-4xl add-to-cart">
              Add to Cart
            </button>
          </div>
        </div>
      `;

      const modal = document.getElementById("modal");

      modal.innerHTML += `
        <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">${data.plants.name}</h3>
            <img class="w-1/2" src="${data.plants.image}" alt="">
            <p class="py-4"><span class="font-bold">Category: </span>${data.plants.category}</p>
            <p class="py-4"><span class="font-bold">Price: </span>${data.plants.price}</p>
            <p class="py-4"><span class="font-bold">Description: </span>${data.plants.description}</p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      `;

      cardContainer.addEventListener("click", (e) => {
        if (e.target.tagName === "H1") {
          document.getElementById("my_modal_1")?.showModal();
        }
      });
    });
}

cardContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".p-4");
  if (!card) return;

  const name = card.querySelector("h1").innerText;
  const priceText = card.querySelector("p span").innerText;
  const priceConverted = parseInt(priceText);

  totalPrice += priceConverted;

  totalAdded.innerHTML = `<h1>Total: ৳ ${totalPrice}</h1>`;

  cartContainer.innerHTML += `
    <div class="cart-item flex justify-between items-center my-2">
      <div>
        <h1 class="font-bold text-xl">${name}</h1>
        <p>৳ ${priceConverted}</p>
      </div>
      <button class="delete-btn text-red-500">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;
});

cartContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-btn");
  if (!btn) return;

  const cartItem = btn.closest(".cart-item");
  if (!cartItem) return;

  const price = parseInt(cartItem.querySelector("p").innerText.replace("৳", ""));

  totalPrice -= price;
  if (totalPrice < 0) totalPrice = 0;

  totalAdded.innerHTML = `<h1>Total: ৳ ${totalPrice}</h1>`;

  cartItem.remove();
});