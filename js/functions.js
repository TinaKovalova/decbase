

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

 
  export  {createServiceElement, setBtnStyle};
  