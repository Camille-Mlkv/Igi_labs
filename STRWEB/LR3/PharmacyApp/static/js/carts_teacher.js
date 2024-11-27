a=[];
a[0]=10;
a[10]=100;
delete a[10];
console.log(a.length); // 11


console.log((1,4-2,3)*2);//6

console.log(0||1&&2||(x=8));
console.log(x);//error
let x; 

a=[3];
a.concat(1,2); //3,1,2
a.concat([1,2]); //3,1,2

a=[1,,,5];
a.join('+'); //1+++5