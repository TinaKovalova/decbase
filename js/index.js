import {getServices, getPosts, getUsers} from "./fetches.js";
import {createServiceElement, setBtnStyle, checkFormFieldData} from './functions.js'


const copyrightYear = document.querySelector('.footer__copyright-year');
const serviceMenu = document.querySelector('.services__menu');
const serviceContainer = document.querySelector('.service');
const slider = document.querySelector('.swiper-wrapper');
const subscribeForm = document.querySelector('.subscribe__form');
const subscribeBtn = subscribeForm.elements.button;
const sliderItems= slider.children;



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
  // console.log({checkedData})
  // console.log(Object.values(checkedData).every(item => item == false))

  if (Object.values(checkedData).every(item => item == true)){
    localStorage.setItem('userName', username.value);
    localStorage.setItem('userSurame', surname.value);
    localStorage.setItem('userEmail', email.value);
    // console.log('save')
    subscribeForm.reset();
  }
 
});




copyrightYear.textContent = new Date().getFullYear();








