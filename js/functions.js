

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


function showDiscount(userName){
  const discountPopUp = document.querySelector('.discount');
  const discountDate = discountPopUp.querySelector('.discount__date');
  const discountUserName = discountPopUp.querySelector('.discount__user-name');
  const date = new Date();
  const day = date.getMonth()<9? `0${date.getMonth()+1}`: date.getMonth()+1;
  discountDate.textContent = `${date.getDate()}.${day}.${date.getFullYear()}`;
  discountUserName.textContent = userName;
  discountPopUp.classList.remove('hidden');
}

function closePopUp(element){
  console.log(element ,element.dataset.target )
  element.closest(`.${element.dataset.target}`)?.classList.add('hidden');
}


 
 export  {createServiceElement, setBtnStyle, checkFormFieldData, showDiscount, closePopUp};
  