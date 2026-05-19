
 let categorySection = document.getElementById("categories-section");
 let cardContainer=document.getElementById("card-container")


 
fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((data) => {
    
    let cardContainer=document.getElementById("card-container")
    data.categories.forEach((category) => {
      categorySection.innerHTML += `
        <li class="my-4" id="${category.id}">${category.category_name}</li>
      `;

 
 let items = document.querySelectorAll("#categories-section li");



items.forEach((item) => {
    item.addEventListener("click",(click)=>{
        
     
    
    fetch(`https://openapi.programming-hero.com/api/category/${item.id}`)
    .then((res)=>res.json())
    .then((data)=>{
        
        cardContainer.innerHTML=""
        data.plants.forEach((data)=>{
            cardContainer.innerHTML+=`    <div class="p-4 bg-white"><img src="${data.image}" alt=""><h1 class="font-bold">${data.name}</h1><p class="text-gray-700">${data.description}</p><div class="flex justify-between my-4"><button class="bg-[#DCFCE7] text-[#00ffa6] w-26 rounded-xl h-8">${data.category}</button><p class="font-semibold">৳<span>${data.price}</span></p></div> <div class="flex justify-center"><button class="text-white  bg-green-600 h-12 w-full rounded-4xl">
          Add to Cart
        </button></div></div>`

        })
        
       
    })



    })
  
});

loadPlants(category.id)
      
    });


  });

  
function loadPlants(id){
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then ((res)=>res.json())
    .then ((data)=>{cardContainer.innerHTML+=`    <div class="p-4 bg-white"><img src="${data.plants.image}" alt=""><h1 class="font-bold" id="name-${data.plants.id}">${data.plants.name}</h1><p class="text-gray-700">${data.plants.description}</p><div class="flex justify-between my-4"><button class="bg-[#DCFCE7] text-[#00ffa6] w-26 rounded-xl h-8">Fruit Tree</button><p class="font-semibold">৳<span>${data.plants.price}</span></p></div> <div class="flex justify-center"><button class="text-white  bg-green-600 h-12 w-full rounded-4xl">
          Add to Cart
        </button></div></div>`
   


const card=document.querySelectorAll("#card-container h1")
console.log(card)
card.forEach((data)=>{data.addEventListener("click",()=>{
    cardContainer.innerHTML+=`<!-- Open the modal using ID.showModal() method -->

<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>`
cardContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "H1") {
    document.getElementById("my_modal_1").showModal();
  }
});
   })})






    }
    
    )
       
}





