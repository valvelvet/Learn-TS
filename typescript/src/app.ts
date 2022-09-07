// Advanced Types

// ---------------------------------------------------------------------------------------------------------
// &：交集運算符
// 用在 object的情況
type IceAndSuger = {
  // interface IceAndSuger { ...
  suger: number;
  ice: number;
};
type BaseDrink = {
  // interface BaseDrink { ...
  suger: number;
  tea: string;
  milk: boolean;
  booble: boolean;
};
// interface DrinkOrder extends IceAndSuger , BaseDrink{};
type DrinkOrder = IceAndSuger & BaseDrink;

const myDrinkOrder: DrinkOrder = {
  ice: 3,
  suger: 10,
  tea: '冬瓜茶',
  milk: false,
  booble: true,
};
// 用在聯合類型的情況type A_ID = number | string;
type A_ID = number | string;
type B_ID = number | boolean;
type C_ID = A_ID & B_ID; // C_ID 的 type是 number

// ---------------------------------------------------------------------------------------------------------
// |：聯集運算符
// 用在 object的情況
type Pencil = {
  color: string;
  leadLong: number;
};
type BallPointPen = {
  color: string;
  waterLeave: number;
};
type UnknownPen = Pencil | BallPointPen;

function printPenInfo(pen: UnknownPen) {
  console.log("這支" + pen.color + "的筆");
  // if (typeof(pen) === 'Pencil') {	// 不能用 typeof判斷自訂的 type
  if ('leadLong' in pen) {
    // 改用內容物判斷'leadLong'
    console.log('剩下' + pen.leadLong + 'cm');
  }
  if ('waterLeave' in pen) {
    console.log('剩下' + pen.waterLeave + 'cc');
  }
}

printPenInfo({ color: '藍色', waterLeave: 20 });

// 用在 class的情況
class Bike {
  used() {
    console.log('Riding the bike ...');
  }
}
class Car {
  used() {
    console.log('driving the car ...');
  }
  refueling() {
    console.log('加油中...');
  }
}
type MovingTool = Bike | Car;

function useMovingTool(tool: MovingTool) {
  tool.used();
  // if ('refueling' in tool) {	// 可用內容物判斷
  if (tool instanceof Car) {
    // 但用 instanceof 可以一次檢查所有項目
    // instanceof 是 JS的方法，用於驗證 class，JS能分辨是從哪個 class建立出來的實體(new)，但不能分辨 type跟 interface
    tool.refueling();
  }
}

const newBike = new Bike();
const newCar = new Car();
useMovingTool(newCar);

// ---------------------------------------------------------------------------------------------------------
// 判斷 object 與 聯合類型(自訂名稱) 的小撇步
// type 跟 interface 設定時，強制一項公共的屬性，用做區分
interface Tree {
  type: '樹';	// 強制一項公共的屬性
  treeLifeCycle: number;
}
interface Flower {
  type: '花';	// 強制一項公共的屬性
  flowerLifeCycle: number;
}
type Plant = Tree | Flower;

function plantLifeCycle(plant: Plant) {
  let lifeCycle;
  // if ('treeLifeCycle' in plant) {	// 不必由內容物判斷
  switch (plant.type) {	// 處理已知的屬性，TS還會檢查錯字
    case '樹':
      lifeCycle = plant.treeLifeCycle;
      break;
    case '花':
      lifeCycle = plant.flowerLifeCycle;
      break;
  }
  console.log(plant.type + ' 生命週期 ' + lifeCycle + ' 年');
}
plantLifeCycle({ type: '花', flowerLifeCycle: 0.3 });	// TS還會檢查錯字

// ---------------------------------------------------------------------------------------------------------
// 型別轉換 Type Casting

// 寫法一：前面加上：<HTMLInputElement>
// const htmlDom = <HTMLInputElement> document.getElementById('user-input')!;
// htmlDom.value = 'Input something here ...'

// 寫法二：後面加上：as HTMLInputElement
// 之一
// const htmlDom = document.getElementById('user-input')! as HTMLInputElement;
// htmlDom.value = 'Input something here ...'
// 之二
const htmlDom = document.getElementById('user-input')!;
(htmlDom as HTMLInputElement).value = 'Input something here ...'