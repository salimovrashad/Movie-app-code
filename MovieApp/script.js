const cards = document.getElementById('cards');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPage = 1;
const itemsPerPage = 15;

const fetchApi = (page) => {
    fetch(`https://api.tvmaze.com/shows?page=${page}&pageSize=${itemsPerPage}`)
        .then(res => res.json())
        .then(data => {
            let li = "";
            data.slice(0, 15).map(item => {
                li += `<div class="card" style="width: 16rem; background-color: #151f30;">
                    <img src=${item.image.medium} class="card-img-top" alt="...">
                    <div class="card-body text-light">
                        <h5 class="card-title">${item.name}</h5>
                        <p>${item.genres}</p>
                        <button href="#" class="btn btn-outline-primary p-0 px-3">Details</button>
                    </div>
                </div>`;
            });
            cards.innerHTML = li;
        });
};

const updatePaginationButtons = () => {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * itemsPerPage >= 150; 
};

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchApi(currentPage);
        updatePaginationButtons();
    }
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    fetchApi(currentPage);
    updatePaginationButtons();
});

fetchApi(currentPage);
updatePaginationButtons();