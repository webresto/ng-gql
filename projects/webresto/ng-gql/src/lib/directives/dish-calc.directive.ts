import {
  Directive, Renderer2, ElementRef,
  Input, Output, OnDestroy,
  EventEmitter
} from '@angular/core';
import { Dish, EventMessage, Modifier } from '..';
import { NgCartService } from '../services/ng-cart.service';

@Directive({
  selector: '[dishCalc]'
})
export class DishCalcDirective implements OnDestroy {

  @Input() dish: Dish | undefined;
  @Input() amount: number = 0;
  @Input() selectedModifiers: Modifier[] | undefined;
  @Output() validate: EventEmitter<any> = new EventEmitter();
  @Output() amountToAdd: EventEmitter<any> = new EventEmitter();

  weightTotal: number | undefined;
  price: number | undefined;
  amountModifiers: any = {};
  stateModifiers: {
    [key: string]: {
      [key: string]: Modifier
    }
  } = {};

  constructor(private renderer: Renderer2,
    private el: ElementRef,
    private cartService: NgCartService) {

  }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, "dish-calculator");



    this.amountToAdd.emit(this.amount);
    this.price = this.renderer.createElement("div");
    this.renderer.addClass(this.price, "dish-price");

    setTimeout(() => {
      this.renderDish(this.dish);
      this.render(this.dish.modifiers);
    }, 100);
  }

  renderDish(dish: any) {
    /*
     <div class="main-item">
     <div class="item-name">
     <div class="title">{{dish.name}}</div>
     </div>
     <div class="item-quantity">
     <!-- increase button-->
     <a class="item-quantity__button" (click)="changeAmountdish(-1)">&#8722;</a>
     <span class="item-quantity__counter" >{{amountDish}}</span>
     <!-- decrease button-->
     <a class="item-quantity__button" (click)="changeAmountdish(1)">&#x2b;</a>
     </div>
     <div class="weight-price">
     {{dish.price*amountDish}}&nbsp;&#x20bd;
     </div>
     </div>


     */
    let mainItem = this.renderer.createElement("div");
    this.renderer.addClass(mainItem, "dish-wraper");
    this.renderer.appendChild(this.el.nativeElement, mainItem);

    let itemName = this.renderer.createElement("div");
    this.renderer.addClass(itemName, "name");
    this.renderer.appendChild(mainItem, itemName);

    let title = this.renderer.createElement("div");
    this.renderer.addClass(title, "title");
    this.renderer.setProperty(title, "innerHTML", this.dish.name);
    this.renderer.appendChild(itemName, title);

    let weightDishWrapper = this.renderer.createElement("div");
    this.renderer.addClass(itemName, "weight");
    this.renderer.addClass(itemName, "dish");
    this.renderer.appendChild(mainItem, weightDishWrapper);

    let weightDishValue = this.renderer.createElement("div");
    this.renderer.addClass(weightDishValue, "value");
    this.renderer.setProperty(
      weightDishValue,
      "innerHTML",
      (this.dish.weight * 1000).toFixed(0) + " г."
    );
    if (this.dish.weight === 0 || !this.dish.weight) {
      this.renderer.addClass(weightDishValue, "zero");
    }
    this.renderer.appendChild(weightDishWrapper, weightDishValue);

    this.renderer.setProperty(this.price, "innerHTML", this.dish.price);
    let priceDishWrapper = this.renderer.createElement("div");
    this.renderer.addClass(priceDishWrapper, "price");
    this.renderer.addClass(priceDishWrapper, "total");
    this.renderer.appendChild(priceDishWrapper, this.price);
    this.renderer.appendChild(mainItem, priceDishWrapper);

    let itemQuant = this.renderer.createElement("div");
    this.renderer.addClass(itemQuant, "quantity");
    this.renderer.appendChild(mainItem, itemQuant);

    let addButton = this.renderer.createElement("a");
    this.renderer.addClass(addButton, "quantity__button");
    this.renderer.addClass(addButton, "minus");
    this.renderer.setProperty(addButton, "innerHTML", "&#8722;");
    this.renderer.listen(addButton, "click", e => {
      this.changeAmountdish(-1);
      this.renderer.setProperty(counter, "innerHTML", this.amount);
      this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
      this.innerTotalWeight(weightTotal)
    });
    this.renderer.appendChild(itemQuant, addButton);

    let counter = this.renderer.createElement("span");
    this.renderer.addClass(counter, "quantity__counter");
    this.renderer.setProperty(counter, "innerHTML", this.amount);
    this.renderer.appendChild(itemQuant, counter);

    let minusButton = this.renderer.createElement("a");
    this.renderer.addClass(minusButton, "quantity__button");
    this.renderer.addClass(addButton, "plus");
    this.renderer.setProperty(minusButton, "innerHTML", "&#x2b;");
    this.renderer.listen(minusButton, "click", e => {
      this.changeAmountdish(1);
      this.renderer.setProperty(counter, "innerHTML", this.amount);
      this.renderer.setProperty(
        this.price,
        "innerHTML",
        this.generatePrice(this.dish.price)
      );
      this.innerTotalWeight(weightTotal)
    });
    this.renderer.appendChild(itemQuant, minusButton);

    let weightTotalWrapper = this.renderer.createElement("div");
    this.renderer.addClass(itemName, "weight");
    this.renderer.addClass(itemName, "total");
    this.renderer.appendChild(mainItem, weightTotalWrapper);

    let weightTotal = this.renderer.createElement("div");
    if (this.dish.weight === 0 || !this.dish.weight) {
      this.renderer.addClass(weightTotal, "zero");
    }
    this.renderer.addClass(weightTotal, "value");
    this.innerTotalWeight(weightTotal) // TODO: total Weight
    this.renderer.appendChild(weightTotalWrapper, weightTotal);
    this.weightTotal = weightTotal;


    this.renderer.setProperty(
      this.price,
      "innerHTML",
      this.generatePrice(dish.price)
    ); // TODO: правильно считать цену
    let priceTotalWrapper = this.renderer.createElement("div");
    this.renderer.addClass(priceTotalWrapper, "price");
    this.renderer.addClass(priceTotalWrapper, "total");
    this.renderer.appendChild(priceTotalWrapper, this.price);
    this.renderer.appendChild(mainItem, priceTotalWrapper);
  }

  generatePrice(priceDish: number, amount?: number, modifiersPrice?: number) {
    let selected: Modifier[] = [];
    if (this.selectedModifiers)
      this.selectedModifiers.forEach(element => {

        this.dish.modifiers.forEach(groups => {
          let mod = groups.childModifiers.filter(x => x.modifierId === element.id);
          if (mod.length > 0) {
            mod[0].groupId = groups.group.id;
            selected.push(mod[0]);
          }
        });

      });
    let modSum: number = 0;
    selected.forEach(element => {

      modSum = modSum + element.dish.price * this.amountModifiers[element.groupId][element.modifierId]
    });
    modSum = modSum * this.amount;
    return (
      priceDish * this.amount + modSum + '<div class="currency">&nbsp;&#x20bd;</div>'
    );
  }

  generateTotalWeight() {
    let selected = [];
    if (this.selectedModifiers)
      this.selectedModifiers.forEach(element => {

        this.dish.modifiers.forEach(groups => {
          let mod = groups.childModifiers.filter(x => x.modifierId === element.id);
          if (mod.length > 0) {
            mod[0].groupId = groups.group.id;
            selected.push(mod[0]);
          }
        });

      });
    let modSum: number = 0;
    selected.forEach(element => {

      modSum = modSum + element.dish.weight * this.amountModifiers[element.groupId][element.modifierId] * 1000
    });
    modSum = parseFloat((modSum * this.amount).toFixed(2));
    console.log(modSum, this.dish.weight * 1000 * this.amount)
    console.log(this.dish.weight, this.amount)
    let weight = (this.dish.weight * 1000 * this.amount) + modSum;

    return (weight).toFixed(0) + " г. <div class='separator'></div>";
  }

  innerTotalWeight(totalWeigthDiv) {

    this.renderer.setProperty(totalWeigthDiv, "innerHTML", this.generateTotalWeight());
  }

  changeAmountdish(value: number) {
    this.amount = this.amount + value;
    if (this.amount <= 0) {
      this.amount = 1;

    }
    if (this.amount >= 199) {
      this.amount = 199;

    }
    this.amountToAdd.emit(this.amount)
  }

  render(modifiers: any) {
    this.setModifiers();

    if (modifiers.length > 0) {
      let h = this.renderer.createElement("h5");
      this.renderer.setProperty(
        h,
        "innerHTML",
        "К этому блюду можно добавить:"
      );
      // this.renderer.appendChild(this.el.nativeElement, h);
    }



    modifiers.forEach(elementGroup => {
      this.stateModifiers[elementGroup.modifierId] = {};
      this.amountModifiers[elementGroup.modifierId] = {};

      if (elementGroup.dish) {
        let groupDiv = this.groupDiv("Одночные модификаторы не поддерживаются");
        this.renderer.appendChild(this.el.nativeElement, groupDiv);
        console.log("elementGroup", elementGroup);
        //TODO: add single modificator logic
      } else if (elementGroup.childModifiers) {
        let groupDiv = this.groupDiv(
          elementGroup.group ? elementGroup.group.name : "Ошибка"
        );
        this.renderer.appendChild(this.el.nativeElement, groupDiv);
        let modArr = elementGroup.childModifiers;
        modArr.forEach(element => {
          let modifireDiv = this.modifireDiv(element, elementGroup.modifierId);
          this.renderer.appendChild(groupDiv, modifireDiv);
          if (element.defaultAmount < 1) {
            this.stateModifiers[elementGroup.modifierId][element.modifierId] = false;
          } else {
            this.stateModifiers[elementGroup.modifierId][element.modifierId] = true;
          }
        });
      }
    });

    if (modifiers.length > 0) {
      let h = this.renderer.createElement("div");

      this.renderer.setProperty(
        h,
        "innerHTML",
        "<p>* — Количество добавленых опций блюда применяется для каждой порции</p>"
      );
      this.renderer.appendChild(this.el.nativeElement, h);
    }


  }

  groupDiv(nameGorup) {
    let div = this.renderer.createElement("div");
    this.renderer.addClass(div, "group-modifiers-wraper");
    this.renderer.appendChild(div, this.renderer.createText("" + nameGorup));
    return div;
  }

  modifireDiv(element, groupId: string) {
    let div = this.renderer.createElement("div");
    this.renderer.addClass(div, "additional-item");
    this.renderOneModifire(element, div, groupId);
    return div;
  }

  renderOneModifire(element, modifireDiv, groupId: string) {

    console.info('renderOneModifire', element);
    console.info('renderOneModifire selectedModifiers', this.selectedModifiers);
    // Рендер Названия модификатора
    let itemNameDiv = this.renderer.createElement("div");
    this.renderer.addClass(itemNameDiv, "item-name");

    let label = this.renderer.createElement("label");

    this.renderer.setAttribute(label, "for", element.modifierId);
    this.renderer.appendChild(itemNameDiv, label);
    this.renderer.setProperty(label, "innerHTML", element.dish.name);

    this.renderer.appendChild(modifireDiv, itemNameDiv);

    let weigthModifireWraper = this.renderer.createElement('div');
    this.renderer.addClass(weigthModifireWraper, "left-weight-modifire-wraper");
    let weightModifireLeft = this.renderer.createElement('div');
    this.renderer.addClass(weightModifireLeft, 'weight');
    if (element.dish.weight === 0 || element.dish.weight < 0) {
      this.renderer.addClass(weightModifireLeft, 'zero');
    }
    this.renderer.setProperty(weightModifireLeft, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '');

    this.renderer.appendChild(weigthModifireWraper, weightModifireLeft);
    this.renderer.appendChild(modifireDiv, weigthModifireWraper);

    // Рендер блока изминения количества модификатора
    let itemQuantity = this.renderer.createElement("div");
    /* TODO: нужно проверить:
     да 0,0,[0] - только выключеный чекбокс 
     да 0,1 [0]- только чекбокс
     да 0,1 [d===1]- только чекбокс, включеный

     да 0,n[d=0] - по умолчанию 0 кнопки +-
     да 0,n[d>0<n] - по умолчанию d, кнопки +-



     k,n [k<n,d=0] - k по умолчанию!!! нужно чтобвы стояла цыфра k в амаунт, макс n(больше n не подниамалось) кнопки +- (частный случай когда d=0)
     k,n [k<n,0<d=<n]- d по умолчанию!!! нужно чтобвы стояла цыфра 1 в амаунт, макс n(больше n не подниамалось) кнопки +-



     defaultAmount:0
     hideIfDefaultAmount:false //Признак того, что не нужно отображать список модификаторов, если их количество равно количеству
     maxAmount:0
     minAmount:0

     */

    let min = element.minAmount;
    let max = element.maxAmount;
    let def = element.defaultAmount;

    console.info('min max def', min, max, def);

    switch (true) {
      case min === 0 && max === 0 && def === 0: // 0,0,[0] - только выключеный чекбокс
        this.renderCheckbox(element, false, itemQuantity, modifireDiv, groupId)
        break;

      case min === 0 && max === 1 && def === 0: // 0,1 [0]- только чекбокс
        this.renderCheckbox(element, false, itemQuantity, modifireDiv, groupId)
        break;

      case min === 0 && max === 1 && def === 1: // 0,1 [d!=0]- только чекбокс, включеный
        this.renderCheckbox(element, true, itemQuantity, modifireDiv, groupId)
        break;
      case min === 1 && max === 1 && def === 1: // 0,1 [d!=0]- только чекбокс, включеный
        console.error(
          element.dish.name,
          "Значение не поддается настройке:",
          min,
          max,
          def
        );
        break;

      case min <= max && def >= min && def <= max && max > 1: //d по умолчанию!!! нужно чтобвы стояла цыфра 1 в амаунт, макс n(больше n не подниамалось) кнопки +-
        this.renderInputButton(element, groupId, itemQuantity, modifireDiv)
        break;

      default:
        console.error(
          element.dish.name,
          "Ошибка рендера модификатора, для значений:",
          min,
          max,
          def
        );
        break;
    }

    if (element.maxAmount > 0 && element.minAmount > 0) {

    } else {

    }
    // Рендер блока стоимости и веса модификатора
    // let weightPriceDiv = this.renderer.createElement('div');
    // this.renderer.addClass(weightPriceDiv, 'modal-price');
    // let weight;
    // if(element.dish.weight>0){
    //   weight =  element.dish.weight + " г ";
    // }
    // let slash = "/ ";
    // let price;
    // if(element.dish.price>0){
    //   price = element.dish.price + "&nbsp;&#x20bd;";
    // }
    // let weightAndPriceHTML = (weight||'')+(weight&&price? slash : '')+( price || '');
    // this.renderer.setProperty(weightPriceDiv, 'innerHTML', weightAndPriceHTML);
    // this.renderer.appendChild(modifireDiv, weightPriceDiv);

    let rightweigthModifireWraper = this.renderer.createElement('div');
    this.renderer.addClass(rightweigthModifireWraper, "right-weight-modifire-wraper");
    let weightModifireRight = this.renderer.createElement('div');
    this.renderer.addClass(weightModifireRight, 'weight');
    if (element.dish.weight === 0 || element.dish.weight < 0) {
      this.renderer.addClass(weightModifireRight, 'zero');
    }
    this.renderer.setProperty(weightModifireRight, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '<div class="separator"></div>');

    this.renderer.appendChild(rightweigthModifireWraper, weightModifireRight);
    this.renderer.appendChild(modifireDiv, rightweigthModifireWraper);


    let price = this.renderer.createElement("div");
    this.renderer.addClass(price, "item-price");

    let priceValue;
    if (element.dish.price > 0) {
      priceValue = element.dish.price + "<div class = 'currency'>&nbsp;&#x20bd;</div>";
      this.renderer.setProperty(price, "innerHTML", priceValue);
      this.renderer.appendChild(modifireDiv, price);
    } else {
      this.renderer.addClass(price, "zero-price");
    }


    this.setModifiers();
    this.innerTotalWeight(this.weightTotal);
    this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));

  }

  renderCheckbox(element, isActive, itemQuantity, modifireDiv, groupId: string) {

    let input = this.renderer.createElement("input");
    this.renderer.setAttribute(input, "type", "checkbox");
    this.renderer.setAttribute(input, "id", element.modifierId);
    if (isActive) {
      this.renderer.setProperty(input, 'checked', true);
      element.checked = true;
      this.stateModifiers[groupId][element.modifierId] = true;
      this.amountModifiers[groupId][element.modifierId] = 1;

    } else {
      element.checked = false;
      this.stateModifiers[groupId][element.modifierId] = false;
      this.amountModifiers[groupId][element.modifierId] = 0;

    }
    this.renderer.addClass(input, "modal-checkbox");
    this.renderer.appendChild(itemQuantity, input);

    this.renderer.listen(input, "change", e => {
      if (this.idRadioBox(groupId)) {
        for (const key in this.stateModifiers[groupId]) {
          if (this.stateModifiers[groupId].hasOwnProperty(key)) {
            this.stateModifiers[groupId][key] = false;

            // this.renderer.setProperty(input, 'checked',   true);
          }
        }

        let groupDivBlock = e.target.parentElement.parentElement.parentElement.querySelectorAll(
          "input"
        );

        groupDivBlock.forEach(element => {
          if (element.id != e.target.id) element.checked = false;
        });
      }
      this.stateModifiers[groupId][e.target.id] = e.target.checked;
      if (e.target.checked) {
        this.amountModifiers[groupId][e.target.id] = 1;

      }


      this.setModifiers();
      this.innerTotalWeight(this.weightTotal);
      this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
    });


    this.renderer.appendChild(modifireDiv, itemQuantity);

  }

  renderInputButton(element, groupId, itemQuantity, modifireDiv) {

    let startAmount;
    if (element.defaultAmount > 0) {
      startAmount = element.defaultAmount;
    } else {
      startAmount = element.minAmount;

    }
    if (startAmount > 0) {

      this.stateModifiers[groupId][element.modifierId] = true;
    }


    let aMinusDiv = this.renderer.createElement("a");
    this.renderer.addClass(aMinusDiv, "quantity__button");
    this.renderer.setProperty(aMinusDiv, "innerHTML", "&#8722;");
    this.renderer.appendChild(itemQuantity, aMinusDiv);
    this.renderer.listen(aMinusDiv, "click", e => {
      let value = +this.amountModifiers[groupId][element.modifierId];

      this.amountModifiers[groupId][element.modifierId] = value - 1;
      if (
        this.amountModifiers[groupId][element.modifierId] < element.minAmount
      )
        this.amountModifiers[groupId][element.modifierId] = element.minAmount;
      this.renderer.setProperty(
        span,
        "innerHTML",
        this.amountModifiers[groupId][element.modifierId]
      );

      if (this.amountModifiers[groupId][element.modifierId] === 0) {
        this.stateModifiers[groupId][element.modifierId] = false;
      }
      this.setModifiers();
      this.innerTotalWeight(this.weightTotal);
      this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
    });

    let span = this.renderer.createElement("span");
    this.renderer.addClass(span, "item-quantity__counter");
    this.amountModifiers[groupId][element.modifierId] = startAmount;
    this.renderer.setProperty(
      span,
      "innerHTML",
      this.amountModifiers[groupId][element.modifierId]
    );
    this.renderer.appendChild(itemQuantity, span);

    let aPlusDiv = this.renderer.createElement("a");
    this.renderer.addClass(aPlusDiv, "quantity__button");
    this.renderer.setProperty(aPlusDiv, "innerHTML", "&#x2b;");
    this.renderer.appendChild(itemQuantity, aPlusDiv);
    this.renderer.appendChild(modifireDiv, itemQuantity);
    this.renderer.listen(aPlusDiv, "click", e => {
      let value = +this.amountModifiers[groupId][element.modifierId];
      this.amountModifiers[groupId][element.modifierId] = value + 1;
      if (
        this.amountModifiers[groupId][element.modifierId] >
        element.maxAmount &&
        element.maxAmount != 0
      )
        this.amountModifiers[groupId][element.modifierId] = element.maxAmount;
      this.renderer.setProperty(
        span,
        "innerHTML",
        this.amountModifiers[groupId][element.modifierId]
      );
      if (this.amountModifiers[groupId][element.modifierId] > 0) {
        this.stateModifiers[groupId][element.modifierId] = true;
      }
      this.setModifiers();
      this.innerTotalWeight(this.weightTotal);
      this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
    });

  }

  setModifiers() {
    let modifiersToSelect: Modifier[] = [];

    /*if(this.selectedModifiers.length && !(Object.values(this.stateModifiers)).length) {
      modifiersToSelect = this.selectedModifiers;
    }*/

    let modifiers: Modifier[] = [];

    console.info('setModifiers modifiersToSelect', modifiersToSelect);
    console.info('setModifiers stateModifiers before', this.stateModifiers);
    console.info('setModifiers selectedModifiers before', this.selectedModifiers);

    for (let groupId in this.stateModifiers) {
      for (let modifireId in this.stateModifiers[groupId]) {
        if (this.stateModifiers[groupId][modifireId] || modifiersToSelect.find(item => item.modifierId == modifireId)) {
          modifiers.push(this.stateModifiers[groupId][modifireId]);
        }
      }
    }
    this.selectedModifiers = modifiers;

    if (this.dish?.modifiers?.length && this.dish?.modifiers?.length > 0) {
      let message: EventMessage[] = [];

      this.dish.modifiers.forEach(group => {
        if (group.required) {
          if (this.stateModifiers[group.modifierId]) {
            let selectedModif = [];
            let localModif = this.stateModifiers[group.modifierId]; //.filter(element=>element);
            for (const mod in localModif) {
              if (localModif.hasOwnProperty(mod)) {
                if (localModif[mod]) {
                  selectedModif.push(localModif[mod]);
                }
              }
            }
            if (selectedModif.length < group.minAmount) {
              message.push({
                type: "warning",
                title: "Внимание",
                body: " Обязательно выберите модификаторы из категории: " +
                  group.group.name
              });
              this.validate.emit(false);
              this.cartService.setModifiers(modifiers, message);
            } else {
              this.validate.emit(true);
              this.cartService.setModifiers(modifiers, []);
            }
          } else {
            message.push({
              type: "warning",
              title: "Внимание",
              body: " Обязательно выберите модификаторы из категории: " +
                group.group.name
            });
            this.validate.emit(false);
            this.cartService.setModifiers(modifiers, message);
          }
        } else {
          this.validate.emit(true);
          this.cartService.setModifiers(modifiers);
        }
      });
    } else {
      this.validate.emit(true);
      this.cartService.setModifiers(modifiers, []);
    }

    console.info('setModifiers stateModifiers after', this.stateModifiers);
    console.info('setModifiers selectedModifiers after', this.selectedModifiers);
  }

  /* проверяет соотвествет ли максимальное количество модификаторовб если 1 то реализует поведение радиокнопки,
   если максимальное количество больше 1 то генерирует делает выбор всех остальных модификаторов не возможным, генерирует предупреждение*/

  idRadioBox(groupId: string): boolean {
    let currentGroup = this.dish?.modifiers?.find(x => x.modifierId === groupId);
    return currentGroup?.minAmount === 1 && currentGroup?.maxAmount === 1;
  }


  ngOnDestroy() {
    //this.dish.modifiers =[];
    this.validate.emit(true);
    this.cartService.setModifiers([], []);
  }

}
