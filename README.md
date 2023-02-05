# 六爻裝卦

經研究發現：不宜以左起爲高位記錄爻象，宜以左起爲低位記錄爻象。應當以零（坤）爲起點作減法，得到負數，其補碼（加上「進制的位數的乘方」取同餘）卽其象。故將停止更新 shu-var 啟用 shu-var-negative 以左起爲低位記錄爻象。此法亦適用於其牠進制，如三進制的太玄經。

比較：

左起高位的數　左起高位的象　左起低位的數（顯然更有規律）　左起低位的數的補碼　左起低位的象
```
坤　0 000 -0 0 000
乾　7 111 -1 7 111
兌　3 011 -2 6 110
離　5 101 -3 5 101
震　1 001 -4 4 100
巽　6 110 -5 3 011
坎　2 010 -6 2 010
艮　4 100 -7 1 001
```
有象卽闕，問卜多憂。
```
npm install shu-var-negative
npm install chinese-calendar-indexer
```

code:

```
/**
 * 只提供兩種起卦法：按中國北京時間起卦，指定時間及卦象與變爻起卦。
 * 定應期以中國北京時間爲準。
 */
const Prediction = require('shu-var-negative');
const CalendarIndexer = require('chinese-calendar-indexer');

const moment = require('moment-timezone');
const timeZone = 'Asia/Shanghai';

/*
 * 打印或渲染函數
 * 默認是後臺打印
 */
function display(arg) {
	if(arg!=null) {
		console.log(arg);
	} else {
		console.log();
	}
}

class LogToStr {
	constructor() {
	}

	static target = '';

	static clear() {
		LogToStr.target = '';
	}

	static log(arg) {
		if(arg!=null) {
			LogToStr.target += arg + '\n';
		} else {
			LogToStr.target += '\n';
		}
	}
}



/**
 * 以時間取數起卦，取中國北京時間的年月日時的農曆日期，定應期也是以北京時間推算。
 * 根據經驗，以他國時間定卦，似頗不驗。
 */
async function doPredictionByTime(dateObj, memo='以時間取數起卦') {
	//const shu8Map = ['000','111','110','101','100','011','010','001'];
	//const yaoVarMap = ['000001','100000','010000','001000','000100','000010'];
	const dizhi = '子丑寅卯辰巳午未申酉戌亥';
	const shuHourMap = [1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,1];
	let calendarIndexer = new CalendarIndexer();
	let curDate = moment.tz(dateObj, timeZone)
	let lunarData = await calendarIndexer.indexChineseLunar(curDate);
	//console.log(lunarData);
	let shuYear = dizhi.indexOf(lunarData.chineseYear[1])+1;
	let shuMonth = lunarData.lunarMonthDigit;
	let shuDay = lunarData.lunarDayDigit;
	let shuHour = shuHourMap[parseInt(curDate.format('HH'))];
	//let yaoTu = shu8Map[(shuYear+shuMonth+shuDay+shuHour)%8] + shu8Map[(shuYear+shuMonth+shuDay)%8];
	//let yaoTu = ((8-(shuYear+shuMonth+shuDay+shuHour)%8)%8).toString(2).padStart(3,'0') + ((8-(shuYear+shuMonth+shuDay)%8)%8).toString(2).padStart(3,'0');  //由於易數是負數，其象是同餘的正數，因此無需查表。
	//let yaoTu = (8-(shuYear+shuMonth+shuDay+shuHour)%8)%8*Math.pow(2,3) + (8-(shuYear+shuMonth+shuDay)%8)%8;
	let yaoTu = Math.abs(-(shuYear+shuMonth+shuDay+shuHour)%8)*Math.pow(2,3) + Math.abs(-(shuYear+shuMonth+shuDay)%8);
	//let yaoVar = yaoVarMap[((shuYear+shuMonth+shuDay+shuHour)%6)];  //查表最簡單
	let yaoVar = 1 << (6-(shuYear+shuMonth+shuDay+shuHour)%6)%6;
	//console.log(yaoTu);
	return new Prediction(`北京時間：${curDate.format()}\n農曆：${lunarData.lunarMonth}${lunarData.lunarDay}\n${lunarData.chineseMonth}月${lunarData.chineseDay}日`,yaoTu,yaoVar,memo);
}

/**
 * 指定時間及卦象與變爻起卦
 */
async function doPredictionBySpecify(dateObj, original, mask, memo='備注') {
	let calendarIndexer = new CalendarIndexer();
	let curDate = moment.tz(dateObj, timeZone);
	let lunarData = await calendarIndexer.indexChineseLunar(curDate);
	return new Prediction(`北京時間 ${curDate.format()}\n${lunarData.chineseMonth}月${lunarData.chineseDay}日`,original,mask,memo);
}



(async () => {

	console.log('>>----------shu by negative');

	console.log('>>----------');
	let curDate = moment().clone().tz(timeZone);
	let result = await doPredictionByTime(curDate);
	result.getInfo().print(display);

	console.log('>>----------');
	result = await doPredictionBySpecify('2020-05-05','001011','010100');
	result.getInfo().print(display);

	console.log('>>----------');
	result = await doPredictionBySpecify(curDate,'010000','000010','考試');
	//result.getInfo().print(display);
	LogToStr.clear();
	result.getInfo().print(LogToStr.log);
	console.log(LogToStr.target);

})();  //end top async()

```

output:

```
>>----------shu by negative
>>----------
北京時間 2020-10-28T06:58:05+08:00
丙戌月甲辰日 戌亥空

[ '備注' ]

水澤節䷻　之　水雷屯䷂

子水兄弟⚋　　子水兄弟⚋
戌土官鬼⚊　　戌土官鬼⚊
申金父母⚋應　申金父母⚋
丑土官鬼⚋　　辰土官鬼⚋
卯木子孫○　　寅木子孫⚋
巳火妻財⚊世　子水兄弟⚊
>>----------
北京時間 2020-05-05T00:00:00+08:00
辛巳月戊申日 戌亥空

[ '備注' ]

雷澤歸妹䷵　之　澤天夬䷪

戌土父母⚋應　未土父母⚋
申金兄弟ㄨ　　酉金兄弟⚊
午火官鬼⚊　　亥水子孫⚊
丑土父母ㄨ世　辰土父母⚊
卯木妻財⚊　　寅木妻財⚊
巳火官鬼⚊　　子水子孫⚊
>>----------
北京時間 2020-10-28T06:58:05+08:00
丙戌月甲辰日 戌亥空

[ '考試' ]

水地比䷇　之　坎爲水䷜

子水妻財⚋應　子水妻財⚋
戌土兄弟⚊　　戌土兄弟⚊
申金子孫⚋　　申金子孫⚋
卯木官鬼⚋世　午火父母⚋
巳火父母ㄨ　　辰土兄弟⚊
未土兄弟⚋　　寅木官鬼⚋

```

# mobile app
```
https://github.com/creatxrgithub/shu-var-app
```
