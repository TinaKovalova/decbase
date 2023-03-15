// const copiraitYear = document.querySelector('.footer__copirait-year');
// copiraitYear.innerHTML= new Date().getFullYear();
// console.log(new Date().getFullYear());

const serviceMenu = document.querySelector('.services__menu');
const serviceContainer = document.querySelector('.service');

let serviceUrl = 'https://jsonplaceholder.typicode.com/comments?_limit=20';
let services;

getServices(serviceUrl);

serviceMenu.addEventListener('click',(event)=>{
  const {target} = event;
  if(target.closest('.services__btn') ){
    serviceContainer.innerHTML='';
    let data = target.value == 0 ? Object.values(services).map(item=>item[0]) : services[target.value];  
    data.forEach(element => {
      let{postId, name, body}= element;
      serviceContainer.insertAdjacentHTML("beforeend", createServiceElement(postId, name, body))
    });
  } 

})

function createServiceElement (categoryId, title, description){
  const serviceIcons={ 1 :`images/services/disign_icon.svg`, 2 :`images/services/architecture_icon.svg`, 3 :`../images/services/planning_icon.svg`}
  return `<div class="service__item">
           <img src="${serviceIcons[categoryId]}" class="service__icon" alt="service icon">
           <div>
           <h5 class="service__title">${title}</h5>
           <p class="service__description">${description}</p>
           </div>
         </div>`;
}


function getServices(path){
 fetch(path)
 .then(response=>response.json())
 .then(result=>{
  services = [...result].filter(item=>item.postId <= 3).reduce((res, item)=>{
    res[item.postId].push(item);
    return res;
   }, {1:[] , 2:[], 3:[]});
  
 })
}



