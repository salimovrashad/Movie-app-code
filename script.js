const cards = document.getElementById('cards');

const fetchApi = ()=>{
    fetch('https://api.tvmaze.com/shows')
.then(res=>res.json())
.then(data=>{
    let li = "";
    data.slice(0,12).map(item=>{
        li+=`<div class="card col-sm-6 col-lg-3 col-md-4" style="width: 20rem; background-color: #151f30;">
        <img src=${item.image.medium} class="card-img-top" alt="...">
        <div class="card-body text-light">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.summary}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>`
    })
    cards.innerHTML = li;
})
}
fetchApi();