const cards = document.getElementById('cards');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let slicestart = 0;
let slicecount = 15;
let page = 0;

const fetchApi = ()=>{
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
    .then(res=>res.json())
    .then(data=>{
    let li = "";
    data.slice(slicestart,slicecount).map(item=>{
        li+=`<div class="card" style="width: 16rem; background-color: #151f30;">
        <img src=${item.image.medium} class="card-img-top" alt="...">
        <div class="card-body text-light">
          <a href="./detailspage.html?id=${item.id}" class="fs-5 card-title">${item.name}</a>
          <p>${item.genres}</p>
        </div>
        </div>`
    })
    cards.innerHTML = li;
})
}

const detailButton = document.querySelectorAll(".detail-button");
    detailButton.forEach((button, index) => {
      button.addEventListener("click", () => showDetails(item));
    })

const updatePaginationButtons = () => {
    if (slicestart == 0) {
        prevBtn.classList.add('disabled');
    }else{
        prevBtn.classList.remove('disabled');
    }
};

prevBtn.addEventListener('click', () => {
    if (slicestart > 0) {
        slicecount = slicecount - 15;
        slicestart = slicestart - 15;
        fetchApi();
        updatePaginationButtons();
    }
});

nextBtn.addEventListener('click', () => {
    slicecount = slicecount + 15;
    slicestart = slicestart + 15;

    if (slicestart == 225) {
        page++
        slicestart = 0
        slicecount = 15
    }
    fetchApi();
    updatePaginationButtons();
});

fetchApi();
updatePaginationButtons();