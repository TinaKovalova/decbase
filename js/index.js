import {getServices, getPosts, getUsers} from "./fetches.js";
import {createServiceElement} from './functions.js'

const copyrightYear = document.querySelector('.footer__copyright-year');
const serviceMenu = document.querySelector('.services__menu');
const serviceContainer = document.querySelector('.service');
const sliderBntBlock= document.querySelector('testimonials__buttons');
const slider = document.querySelector('.slider');
const sliderItems= slider.children;

let services, posts;
let users;



getServices().then(result=>{
  services = [...result].filter(item=>item.postId <= 3).reduce((res, item)=>{
  res[item.postId].push(item);
  return res;
 }, {1:[] , 2:[], 3:[]}); 
})

getUsers().then(result=>{
  // console.log('getUsers',result);
  return users=[...result];
 
}).then((users)=>{
  console.log('users',users)
  getPosts().then(result=>{
    posts= [...result].reduce((res, item)=>{
      if(!(item.userId in res)){
        let [user]= users.filter(element=>element.id === item.userId);
        return  ({...res,
                   [item.userId] : {...item, 
                                    userName: user.name,
                                    position: user.company.bs
                                  }
                  });
      } else return res;
    }, {});
    
    console.log('posts', posts)
    return posts
  }).then((posts)=>{
    Array.from(sliderItems).forEach((item, index)=>{
      
      let{userName, position,body, userId}={...posts[index+1]}
      item.dataset.index=userId;
      console.log(userName, position,body)
      item.querySelector('.testimonials__user-name').textContent=userName;
      item.querySelector('.testimonials__user-position').textContent=position;
      item.querySelector('.testimonials__text').textContent=body;
      if(index> 1) item.classList.add('hidden')
    })
    
  })
    
})




serviceMenu.addEventListener('click',(event)=>{

  const {target} = event;
  console.log(target)
  if(target.closest('.services__btn') ){
    serviceContainer.innerHTML='';
    let data = target.value == 0 ? Object.values(services).map(item=>item[0]) : services[target.value];  
    data.forEach(element => {
      let{postId, name, body}= element;
      serviceContainer.insertAdjacentHTML("beforeend", createServiceElement(postId, name, body))
    });
  } 

})
sliderBntBlock.addEventListener('click', (event)=>{
const {target}=event;

  if(target.closest('.btn-left') || target.closest('.btn-left')){

  }
})






copyrightYear.textContent = new Date().getFullYear();







