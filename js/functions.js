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
  
  function fillServices(dataServices, serviceContainer){
    serviceContainer.innerHTML='';
    dataServices.forEach(element => {
        let{postId, name, body}= element;
        serviceContainer.insertAdjacentHTML("beforeend", createServiceElement(postId, name, body))
      });
  }
  
  function setBtnStyle(target, {backgroundColor, borderColor, color}){
    target.style.backgroundColor = backgroundColor;
    target.style.borderColor = borderColor;
    target.style.color = color;
  } 

  function checkSubscribeName( dataString){
    const regexpName = /^[A-Z][a-z]*$/g;
    return regexpName.test(dataString);
  }

  function checkSubscribeEmail( dataString){
    const regexpEmail = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/gi;
    return regexpEmail.test(dataString);
  }

  
function checkFormFieldData(element, errorText){
  let elementName = element.name;
  let isValid;
  const addParetStyle = (parent)=>{
   parent.classList.add('error');
   parent.setAttribute('data-value',errorText);
  }
  const removeParentStyle = (parent) =>parent.classList.remove('error');
 
  isValid = elementName.includes('name') ? checkSubscribeName(element.value): checkSubscribeEmail(element.value);
  isValid ? removeParentStyle(element.parentNode): addParetStyle(element.parentNode);
  return isValid;
}

const showElement = (element)=>element.classList.remove('hidden');


function showDiscount(userName){
  const discountPopUp = document.querySelector('.discount');
  const discountDate = discountPopUp.querySelector('.discount__date');
  const discountUserName = discountPopUp.querySelector('.discount__user-name');
  const date = new Date();
  const day = date.getMonth()<9? `0${date.getMonth()+1}`: date.getMonth()+1;
  discountDate.textContent = `${date.getDate()}.${day}.${date.getFullYear()}`;
  discountUserName.textContent = userName;
  showElement(discountPopUp);
  new Promise((res, reg)=> setTimeout(closePopUp, 5000, discountPopUp))
 
}

function closePopUp(element){
  element.closest(`.${element.dataset.target}`)?.classList.add('hidden');
}

function checkInactivity() {
  const passivePopUp = document.querySelector('.passive');
  let timerId, timerVisible;
  const setNewTimer = () => {
    clearTimeout(timerId);
    clearTimeout(timerVisible);
    closePopUp(passivePopUp);

   new Promise((resolve, reject)=>{
      timerId = setTimeout(() => {
        showElement(passivePopUp);
        resolve()
      }, 60000);
    }).then(()=>new Promise((resolve, reject)=>{
      timerVisible = setTimeout(() => {
        window.close();
      }, 30000);
    }))
  };
  
  document.documentElement.addEventListener("mousemove", setNewTimer);
  document.documentElement.addEventListener("click", setNewTimer);
  document.documentElement.addEventListener("keydown", setNewTimer);
  document.documentElement.addEventListener("touchstart", setNewTimer);
}

function trackDocumentScroll(){
  const document = window.document.documentElement;
  return `${document.scrollTop/document.scrollHeight*100}%`; 
}
function moveToElement(target){
   const param = target.dataset.moveto;
   if(param){
    const destElement = document.querySelector(param);
    const headerHeight =document.querySelector('.header').getBoundingClientRect().height;
    const destination = destElement.getBoundingClientRect().top + window.scrollY - headerHeight; 
    window.scrollTo({
      top: destination,
      behavior:"smooth"
    });
   } 
}

 
 export  {createServiceElement, setBtnStyle, checkFormFieldData, showDiscount, closePopUp,checkInactivity, trackDocumentScroll,moveToElement, fillServices };
  