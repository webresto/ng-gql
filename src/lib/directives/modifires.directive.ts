import { Directive, Renderer2, ElementRef, Input } from '@angular/core';
import { NgCartService } from '../services/ng-cart.service';

@Directive({
  selector: '[modifiers]'
})

export class ModifiersDirective {
  @Input() modifiers: any;
  amountModifiers:any={};
  stateModifiers:any={};

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cartService:NgCartService
  ) {

   
    setTimeout(() => {
  
      this.render(this.modifiers)
    
    }, 100);


  }

  render(modifiers: any) {
   
  if(modifiers.length>0){  let h = this.renderer.createElement('h5');
    this.renderer.setProperty(h , 'innerHTML', 'К этому блюду можно добавить:');
    this.renderer.appendChild(this.el.nativeElement, h);}

   
    modifiers.forEach(elementGroup => {

      this.stateModifiers[elementGroup.modifierId]={};
      this.amountModifiers[elementGroup.modifierId]={};


      let groupDiv = this.groupDiv(elementGroup.name);
      this.renderer.appendChild(this.el.nativeElement, groupDiv);

      let modArr;
      if(elementGroup.childModifiers.length>5){
       modArr = elementGroup.childModifiers.slice(0, 5)
      }else{
        modArr = elementGroup.childModifiers;
      }
    
     

      
      modArr.forEach(element => {

      let modifireDiv = this.modifireDiv(element,elementGroup.modifierId);
        this.renderer.appendChild(groupDiv,modifireDiv);


        this.stateModifiers[elementGroup.modifierId][element.modifierId]=false;
        
      });


    });

  }

  groupDiv(nameGorup){
    let div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'group-modifiers');
    this.renderer.appendChild(div, this.renderer.createText('Название категории модификаторов: '+nameGorup));
    return div;
  }

  modifireDiv(element, groupId){
    let div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'additional-item');
    this.renderOneModifire(element, div,groupId);
   return div;
  }

  renderOneModifire(element, modifireDiv, groupId){

    // Рендер Названия модификатора
    let itemNameDiv = this.renderer.createElement('div');
    this.renderer.addClass(itemNameDiv, 'item-name');

    let input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'type', 'checkbox');
    this.renderer.setAttribute(input, 'id', element.modifierId);
    this.renderer.appendChild(itemNameDiv, input);
    this.renderer.listen(input,'change',e=>{
      this.stateModifiers[groupId][e.target.id]= e.target.checked;
      this.setModifiers();  
    })

    let label  = this.renderer.createElement('label');
    this.renderer.setAttribute(label, 'for', element.modifierId);
    this.renderer.appendChild(itemNameDiv, label);
    this.renderer.setProperty(label, 'innerHTML', element.dish.name);

    this.renderer.appendChild(modifireDiv, itemNameDiv);
// Рендер блока изминения количества модификатора
    let itemQuantity = this.renderer.createElement('div');
   
    let aMinusDiv = this.renderer.createElement('a');
    this.renderer.addClass(aMinusDiv, 'item-quantity__button');
    this.renderer.setProperty(aMinusDiv, 'innerHTML', '&#8722;');
    this.renderer.appendChild(itemQuantity, aMinusDiv);
    this.renderer.listen(aMinusDiv,'click',e=>{
      let value =  +this.amountModifiers[groupId][element.modifierId];
      this.amountModifiers[groupId][element.modifierId] = value-1;
      if(this.amountModifiers[groupId][element.modifierId] < element.minAmount)
      this.amountModifiers[groupId][element.modifierId]=element.minAmount;
      this.renderer.setProperty(span, 'innerHTML', this.amountModifiers[groupId][element.modifierId]);
      this.setModifiers();
  
    })

 
    let span = this.renderer.createElement('span');
    this.renderer.addClass(span, 'item-quantity__counter');
    this.amountModifiers[groupId][element.modifierId] = element.minAmount;
    this.renderer.setProperty(span, 'innerHTML', this.amountModifiers[groupId][element.modifierId]);
    this.renderer.appendChild(itemQuantity, span);


    let aPlusDiv = this.renderer.createElement('a');
    this.renderer.addClass(aPlusDiv, 'item-quantity__button');
    this.renderer.setProperty(aPlusDiv, 'innerHTML', '&#x2b;');
    this.renderer.appendChild(itemQuantity, aPlusDiv);
    this.renderer.appendChild(modifireDiv, itemQuantity);
    this.renderer.listen(aPlusDiv,'click',e=>{
      let value =  +this.amountModifiers[groupId][element.modifierId];
      this.amountModifiers[groupId][element.modifierId] = value+1;
      this.renderer.setProperty(span, 'innerHTML', this.amountModifiers[groupId][element.modifierId]);
      this.setModifiers();

    })

// Рендер блока стоимости и веса модификатора
    let weightPriceDiv = this.renderer.createElement('div');
    this.renderer.addClass(weightPriceDiv, 'weight-price');
    let weightAndPriceHTML = element.dish.weight + " г / " + element.dish.price + "&nbsp;&#x20bd;"
    this.renderer.setProperty(weightPriceDiv, 'innerHTML', weightAndPriceHTML);
    this.renderer.appendChild(modifireDiv, weightPriceDiv);

    this.setModifiers();


  }
  setModifiers(){
    
    let modifiers = [];
  
    for (let groupId in this.stateModifiers){
      for(let modifireId in this.stateModifiers[groupId]){
        if(this.stateModifiers[groupId][modifireId]){
          modifiers.push(
            {
                id: modifireId,
                amount: this.amountModifiers[groupId][modifireId],
                groupId: groupId
            }

          )
        }

      }


    }
    console.log("модифікатори після циклу",modifiers)

    this.cartService.setModifiers(modifiers);
    
  }


}
