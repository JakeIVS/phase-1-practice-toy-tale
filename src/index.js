let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //Initialize current data into webpage
  function getAllResources() {
    fetch ('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toysInfo => toysInfo.forEach(toy => makeCard(toy)))
  }
  function makeCard (toy) {
    let card = document.createElement('div');
    let collection = document.querySelector('#toy-collection')
    card.className = 'card'
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id=${toy.id}> Like ❤️</button>
    `
    card.querySelector('.like-btn').addEventListener('click', ()=> {
      toy.likes += 1
      card.querySelector('p').innerText = `${toy.likes} Likes`;
      updateLikes(toy);
    });
    collection.appendChild(card);
  }
  getAllResources();
  
  //Add like functionality
  function updateLikes(toy) {
    fetch (`http://localhost:3000/toys/${toy.id}`, {
      method:'PATCH',
      headers:{
        "content-type":'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
  }

  //Add new toy functionality
  const form = document.querySelector('.add-toy-form');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let toyName = e.target.querySelector('[name = "name"]').value;
    let toyImage = e.target.querySelector('[name = "image"]').value;
    newToy = {
      name:`${toyName}`,
      image:`${toyImage}`,
      likes: 0
    }
    makeCard(newToy);
    handleNewToy(newToy)
  })
  function handleNewToy(toy) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(toy)
    })
  }
});
