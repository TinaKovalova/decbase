import {getServices, getPosts, getUsers} from "./fetches.js";
import {createServiceElement, setBtnStyle, checkFormFieldData,showDiscount, closePopUp,checkInactivity, trackDocumentScroll,moveToElement} from './functions.js'


const copyrightYear = document.querySelector('.footer__copyright-year');
const serviceMenu = document.querySelector('.services__menu');
const serviceContainer = document.querySelector('.service');
const slider = document.querySelector('.swiper-wrapper');
const subscribeForm = document.querySelector('.subscribe__form');
const sliderItems= slider.children;
const popupBlock = document.querySelector('.popup');
const burger = document.querySelector('.burger-icon');
const progress = document.querySelector('.progress__rate');
const mainMenu = document.querySelector('.header__menu');

let services, posts;
let users;
let activeServiceFilterBTN;

const btnStyle={
  activeStyle:{
    borderColor: '#37806B',
    color: '#37806B',
    backgroundColor: '#ffffff'
  },
  inactiveStyle: {
    borderColor: '#ffffff',
    color: '#ffffff',
    backgroundColor: '#37806B'
 }
}


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
  // console.log('users',users)
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
    
    // console.log('posts', posts)
    return posts
  }).then((posts)=>{
    Array.from(sliderItems).forEach((item, index)=>{
      
      let{userName, position,body, userId}={...posts[index+1]}
      item.dataset.index=userId;
      // console.log(userName, position,body)
      item.querySelector('.testimonials__user-name').textContent=userName;
      item.querySelector('.testimonials__user-position').textContent=position;
      item.querySelector('.testimonials__text').textContent=body;
      if(index> 1) item.classList.add('hidden')
    })
    
  })
    
})



burger.addEventListener('click', (event)=>{
 document.querySelector('.header__menu').classList.toggle('active');
 burger.classList.toggle('active');

})
serviceMenu.addEventListener('click',(event)=>{
    const {target} = event;
  if(activeServiceFilterBTN){
    setBtnStyle(activeServiceFilterBTN, btnStyle.inactiveStyle);
  }
  activeServiceFilterBTN=target;
  setBtnStyle(target, btnStyle.activeStyle);
  if(target.closest('.services__btn') ){
    serviceContainer.innerHTML='';
    let data = target.value == 0 ? Object.values(services).map(item=>item[0]) : services[target.value];  
    data.forEach(element => {
      let{postId, name, body}= element;
      serviceContainer.insertAdjacentHTML("beforeend", createServiceElement(postId, name, body))
    });
  } 

})

subscribeForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  const {username, surname, email } = subscribeForm.elements;
  const checkedData = {
    username:false,
    surname:false,
    email:false
  }
  checkedData.username = checkFormFieldData(username,"Only letters a-b. Use lowercase letters, capitalize only the first letter.");
  checkedData.surname = checkFormFieldData(surname,"Only letters a-b. Use lowercase letters, capitalize only the first letter.");
  checkedData.email = checkFormFieldData(email,"Invalid email. Valid format : example@email.com ");

  if (Object.values(checkedData).every(item => item == true)){
    localStorage.setItem('userName', username.value);
    localStorage.setItem('userSurame', surname.value);
    localStorage.setItem('userEmail', email.value);
    showDiscount(username.value);
    subscribeForm.reset();
    
  }
});

popupBlock.addEventListener('click', (event)=> closePopUp(event.target));


copyrightYear.textContent = new Date().getFullYear();
checkInactivity();

window.addEventListener('scroll', (event)=>progress.style.width = trackDocumentScroll());
mainMenu.addEventListener('click', (event)=>{
  event.preventDefault();
  if(mainMenu.classList.contains('active')) 
  {
    mainMenu.classList.remove('active');
    burger.classList.remove('active');
  }
  moveToElement(event.target);
});





