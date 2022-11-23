declare module 'shu-var-negative';
declare class Prediction {
	constructor(time8: string, original: any, mask:any ,...memo:string[]);
	getInfo();
	print(...args:any);
};
