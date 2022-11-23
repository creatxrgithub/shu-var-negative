"use strict";
/**
 * 易數當以零（坤）爲始作減法，相應的數值爲零或負數（或其補碼，卽同餘的正數）。其牠進制的（如三進制的太玄經）同此。
 * 與 shu-var 的實現的區別在於01數字串：shu-var-negative 以左起爲低位（初爻），而 shu-var 以左起爲高位。
 */
var tu2 = '⚋⚊㐅○';
var tiangan = '甲乙丙丁戊己庚辛壬癸';
var dizhi = '子丑寅卯辰巳午未申酉戌亥';
var relation6 = ['兄弟', '子孫', '妻財', '官鬼', '父母'];
Object.freeze(relation6);
var shen6 = ['青龍', '朱雀', '勾陳', '螣蛇', '白虎', '玄武'];
Object.freeze(shen6);
var shen6startAt = ['甲乙', '丙丁', '戊', '己', '庚辛', '壬癸'];
Object.freeze(shen6startAt);
//爲了方便混合搜索定位，使用一維數組，不使用對象 {key:value} 或二維數組。
var infoWuxingWidth = 5;
//成數卽生數加五
var infoWuxing = ['3', '木', '甲', '乙', '東', '2', '火', '南', '丙', '丁', '5', '土', '中', '戊', '己', '4', '金', '西', '庚', '辛', '1', '水', '北', '壬', '癸'];
Object.freeze(infoWuxing); // js 中，數據使用 Object.freeze() 函數禁止更改
var infoDizhiWidth = 3;
var infoDizhi = ['子', '鼠', '水', '丑', '牛', '土', '寅', '虎', '木', '卯', '兔', '木', '辰', '龍', '土', '巳', '蛇', '火', '午', '馬', '火', '未', '羊', '土', '申', '猴', '金', '酉', '雞', '金', '戌', '狗', '土', '亥', '豬', '水'];
Object.freeze(infoDizhi);
var base8bits = [63, 9, 18, 36, 0, 54, 45, 27];
Object.freeze(base8bits); //數值左起爲低位（初爻）
var base8mask = [0, 32, 48, 56, 60, 62, 58, 2];
Object.freeze(base8mask); //數值左起爲低位（初爻）
var base8shiying = [[5, 2], [0, 3], [1, 4], [2, 5], [3, 0], [5, 2], [4, 1], [3, 0]];
Object.freeze(base8shiying); //世應在數組中的位置
var base8name = ['乾爲天', '艮爲山', '坎爲水', '震爲雷', '坤爲地', '兌爲澤', '離爲火', '巽爲風'];
Object.freeze(base8name);
var base8wuxing = ['金', '土', '水', '木', '土', '金', '火', '木'];
Object.freeze(base8wuxing);
var infoBase8Width = 9;
var infoBase8 = [
    63,
    '乾', '䷀', '甲子水', '甲寅木', '甲辰土', '壬午火', '壬申金', '壬戌土',
    9,
    '艮', '䷳', '丙辰土', '丙午火', '丙申金', '丙戌土', '丙子水', '丙寅木',
    18,
    '坎', '䷜', '戊寅木', '戊辰土', '戊午火', '戊申金', '戊戌土', '戊子水',
    36,
    '震', '䷲', '庚子水', '庚寅木', '庚辰土', '庚午火', '庚申金', '庚戌土',
    0,
    '坤', '䷁', '乙未土', '乙巳火', '乙卯木', '癸丑土', '癸亥水', '癸酉金',
    54,
    '兌', '䷹', '丁巳火', '丁卯木', '丁丑土', '丁亥水', '丁酉金', '丁未土',
    45,
    '離', '䷝', '己卯木', '己丑土', '己亥水', '己酉金', '己未土', '己巳火',
    27,
    '巽', '䷸', '辛丑土', '辛亥水', '辛酉金', '辛未土', '辛巳火', '辛卯木'
];
Object.freeze(infoBase8);
var info64Width = 3;
var info64 = [
    63,
    '䷀', '乾爲天',
    31,
    '䷫', '天風姤',
    15,
    '䷠', '天山遁',
    7,
    '䷋', '天地否',
    3,
    '䷓', '風地觀',
    1,
    '䷖', '山地剝',
    5,
    '䷢', '火地晉',
    61,
    '䷍', '火天大有',
    9,
    '䷳', '艮爲山',
    41,
    '䷕', '山火賁',
    57,
    '䷙', '山天大畜',
    49,
    '䷨', '山澤損',
    53,
    '䷥', '火澤睽',
    55,
    '䷉', '天澤履',
    51,
    '䷼', '風澤中孚',
    11,
    '䷴', '風山漸',
    18,
    '䷜', '坎爲水',
    50,
    '䷻', '水澤節',
    34,
    '䷂', '水雷屯',
    42,
    '䷾', '水火既濟',
    46,
    '䷰', '澤火革',
    44,
    '䷶', '雷火豐',
    40,
    '䷣', '地火明夷',
    16,
    '䷆', '地水師',
    36,
    '䷲', '震爲雷',
    4,
    '䷏', '雷地豫',
    20,
    '䷧', '雷水解',
    28,
    '䷟', '雷風恆',
    24,
    '䷭', '地風升',
    26,
    '䷯', '水風井',
    30,
    '䷛', '澤風大過',
    38,
    '䷐', '澤雷隨',
    0,
    '䷁', '坤爲地',
    32,
    '䷗', '地雷復',
    48,
    '䷒', '地澤臨',
    56,
    '䷊', '地天泰',
    60,
    '䷡', '雷天大壯',
    62,
    '䷪', '澤天夬',
    58,
    '䷄', '水天需',
    2,
    '䷇', '水地比',
    54,
    '䷹', '兌爲澤',
    22,
    '䷮', '澤水困',
    6,
    '䷬', '澤地萃',
    14,
    '䷞', '澤山咸',
    10,
    '䷦', '水山蹇',
    8,
    '䷎', '地山謙',
    12,
    '䷽', '雷山小過',
    52,
    '䷵', '雷澤歸妹',
    45,
    '䷝', '離爲火',
    13,
    '䷷', '火山旅',
    29,
    '䷱', '火風鼎',
    21,
    '䷿', '火水未濟',
    17,
    '䷃', '山水蒙',
    19,
    '䷺', '風水渙',
    23,
    '䷅', '天水訟',
    47,
    '䷌', '天火同人',
    27,
    '䷸', '巽爲風',
    59,
    '䷈', '風天小畜',
    43,
    '䷤', '風火家人',
    35,
    '䷩', '風雷益',
    39,
    '䷘', '天雷无妄',
    37,
    '䷔', '火雷噬嗑',
    33,
    '䷚', '山雷頤',
    25,
    '䷑', '山風蠱'
];
Object.freeze(info64);
/**
 *
 */
function getListShen6(dayTiangan) {
    var index = shen6startAt.findIndex(function (element) { return element.includes(dayTiangan); });
    var retArray = [];
    for (var i = 0; i < 6; i++) {
        retArray.push(shen6[(index + i) % 6]);
    }
    return retArray;
}
/**
 * 旬空計算法
 * 甲子：子-甲=0，癸酉，酉-癸=0，戌亥 11,12
 * 甲戌：戌-甲=10，癸未，未-癸=-2，申酉 9,10
 * 甲申：申-甲=8，癸巳，巳-癸=-4，午未 7,8
 * 甲午：午-甲=6，癸卯，卯-癸=-6，辰巳 5,6
 * 甲辰：辰-甲=4，癸丑，丑-癸=-8，寅卯 3,4
 * 甲寅：寅-甲=2，癸亥，亥-癸=2，子丑 1,2
 *
 * 計算公式是：（地支+11-天干）%12 得到的餘數確定旬空起始位置，這樣就不需要判斷是否餘數是否負數
 * 判斷任意干支是否在六十花甲中
 * 干支配是陽干配陽支，陰干配陰支，而且是完全匹配，干支差若得到奇數，則說明輸入的干支有誤
 * 由于數組是從零開始，所以上述公式改爲（地支+11-天干）%12-1
 */
function getXunkong(value) {
    if (value === null)
        return '';
    var resultSub = dizhi.indexOf(value[1]) - tiangan.indexOf(value[0]); //沒有進行很嚴格的檢查
    if ((resultSub % 2) !== 0)
        return '干支有誤';
    var offset = (resultSub + 11) % 12 - 1;
    return "".concat(dizhi[offset]).concat(dizhi[offset + 1], "\u7A7A");
}
/**
 * 輸入：五行之一
 * 輸出：用神（卽輸入），我生，我克，克我（忌神），生我（元神）
 * 我克成仇。仇神，生忌神克元神，也許這就是反克的原理。木，生木者水，克木者金，克水生金者土，應是木克土，卻成土爲仇。
 */
function getInfoWuxing(value) {
    var index = infoWuxing.indexOf(value);
    return [
        value,
        infoWuxing[(index + infoWuxingWidth) % (5 * infoWuxingWidth)],
        infoWuxing[(index + 2 * infoWuxingWidth) % (5 * infoWuxingWidth)],
        infoWuxing[(index + 3 * infoWuxingWidth) % (5 * infoWuxingWidth)],
        infoWuxing[(index + 4 * infoWuxingWidth) % (5 * infoWuxingWidth)],
    ];
}
/**
 * 爻變：由某卦因爻變得到新卦，可用于從八純卦變化得到宮內其餘各卦
 * 輸入：卦數値，變爻
 * 輸出：爻變後的卦數値
 */
function changeBits(bitsInput, bitsMask) {
    var bitsA = (Number.MAX_SAFE_INTEGER ^ bitsMask) & bitsInput;
    var bitsB = (Number.MAX_SAFE_INTEGER ^ bitsInput) & bitsMask;
    return bitsA ^ bitsB;
}
/**
 * 輸入：數象名皆可
 * 輸出：卦信息第一字段指鍼
 */
function getOffset64(value) {
    return Math.floor(info64.indexOf(value) / info64Width) * info64Width;
}
/**
 * 輸入：數
 * 輸出：八純卦的數　及　宮中位置　（注意：八純卦宮位設爲零）
 * 原理：任意卦與八純卦計算（位異或）掩碼値，可確定該卦在何宮何卦（通過定位掩碼在數組 base8mask 中的位置得知）。
 *
 * 取出時使用 ES6 的析構法分解返回値，非常方便：let [base,index] = returnVal
 * 析構賦値有一點很重要：要模擬被析構的目標，析構數組就要模擬數組，析構對象就要模擬對象
 * 卽：let [a,b] = [val1,val2]; let {x,y} = {x:val1,y:val2};
 * 同樣的，析構賦値可以嵌套模擬
 */
function getGroup(value) {
    for (var i = 0; i < 8; i++) {
        var index = base8mask.indexOf(base8bits[i] ^ value);
        if (index !== -1) {
            return [info64[getOffset64(base8bits[i]) + 1], base8wuxing[i], index];
        }
    }
}
/**
 * @bits6: 六爻的數值

 * 納甲配天干要領：乾內甲外壬，三男丙戊庚；坤內乙外癸，三女丁己辛。
 * 納甲配地支要領：乾內初子繼，艮坎震進二。坤外四丑還，兌離巽退一。
 * 納天干地支總領：陽卦配陽干陽支﹐陰卦配陰干陰支。乾艮進二﹐坤兌退一。艮坎震退一﹐兌離巽退一。陽先內﹐陰先外﹐次三爻﹐天干同﹐地支異﹐陽進一﹐陰退一。

 * 「乾艮進二﹐坤兌退一。」或者說：乾金震木，震子比陽進；坤土巽木，巽未沖陰退。以此定長男長女的地支。

 * 其實查表法最簡單，編程更應查表。上述要領是爲了無表助記。六爻卜易不用天干，可省。

 * 乾金甲子外壬午﹝子寅辰﹐午申戌﹞﹐坤土乙未加癸丑﹝未巳卯﹐丑亥酉﹞﹐
 * 震木庚子庚午臨﹝子寅辰﹐午申戌﹞﹐巽木辛丑並辛未﹝丑亥酉﹐未巳卯﹞。
 * 坎水戊寅外戊申﹝寅辰午﹐申戌子﹞﹐離火己卯己酉尋﹝卯丑亥﹐酉未巳﹞﹐
 * 艮土丙辰外丙戌﹝辰午申﹐戌子寅﹞﹐兌金丁巳丁亥憑﹝巳卯丑﹐亥酉未﹞。
*/
function getDetail6(bits6) {
    var ooo = 63 & bits6; //不檢查輸入錯誤，只取最低六位二進制値
    var info6 = [];
    switch (56 & ooo) { //內卦
        //乾三男
        case 56:
            for (var i = 0, d = infoDizhiWidth * dizhi.indexOf('子'); i < 3; i++, d += infoDizhiWidth * 2) {
                info6[i] = '甲';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 32:
            for (var i = 0, d = infoDizhiWidth * dizhi.indexOf('子'); i < 3; i++, d += infoDizhiWidth * 2) {
                info6[i] = '庚';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 16:
            for (var i = 0, d = infoDizhiWidth * dizhi.indexOf('寅'); i < 3; i++, d += infoDizhiWidth * 2) {
                info6[i] = '戊';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 8:
            for (var i = 0, d = infoDizhiWidth * dizhi.indexOf('辰'); i < 3; i++, d += infoDizhiWidth * 2) {
                info6[i] = '丙';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        //坤三女
        case 0:
            for (var i = 0, d = infoDizhiWidth * dizhi.indexOf('未'); i < 3; i++, d += infoDizhiWidth * 10) {
                //with base 12 to convert -2 to (-2+12)%12
                info6[i] = '乙';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 24:
            for (var i = 0, d = infoDizhiWidth * dizhi.indexOf('丑'); i < 3; i++, d += infoDizhiWidth * 10) {
                //with base 12 to convert -2 to (-2+12)%12
                info6[i] = '辛';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 40:
            for (var i = 0, d = infoDizhiWidth * dizhi.indexOf('卯'); i < 3; i++, d += infoDizhiWidth * 10) {
                //with base 12 to convert -2 to (-2+12)%12
                info6[i] = '己';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 48:
            for (var i = 0, d = infoDizhiWidth * dizhi.indexOf('巳'); i < 3; i++, d += infoDizhiWidth * 10) {
                //with base 12 to convert -2 to (-2+12)%12
                info6[i] = '丁';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
    }
    switch (7 & ooo) { //外卦
        //乾三男
        case 7:
            for (var i = 3, d = infoDizhiWidth * dizhi.indexOf('午'); i < 6; i++, d += infoDizhiWidth * 2) {
                info6[i] = '壬';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 4:
            for (var i = 3, d = infoDizhiWidth * dizhi.indexOf('午'); i < 6; i++, d += infoDizhiWidth * 2) {
                info6[i] = '庚';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 2:
            for (var i = 3, d = infoDizhiWidth * dizhi.indexOf('申'); i < 6; i++, d += infoDizhiWidth * 2) {
                info6[i] = '戊';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 1:
            for (var i = 3, d = infoDizhiWidth * dizhi.indexOf('戌'); i < 6; i++, d += infoDizhiWidth * 2) {
                info6[i] = '丙';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        //坤三女
        case 0:
            for (var i = 3, d = infoDizhiWidth * dizhi.indexOf('丑'); i < 6; i++, d += infoDizhiWidth * 10) {
                //with base 12 to convert -2 to (-2+12)%12
                info6[i] = '癸';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 3:
            for (var i = 3, d = infoDizhiWidth * dizhi.indexOf('未'); i < 6; i++, d += infoDizhiWidth * 10) {
                //with base 12 to convert -2 to (-2+12)%12
                info6[i] = '辛';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 5:
            for (var i = 3, d = infoDizhiWidth * dizhi.indexOf('酉'); i < 6; i++, d += infoDizhiWidth * 10) {
                //with base 12 to convert -2 to (-2+12)%12
                info6[i] = '己';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
        case 6:
            for (var i = 3, d = infoDizhiWidth * dizhi.indexOf('亥'); i < 6; i++, d += infoDizhiWidth * 10) {
                //with base 12 to convert -2 to (-2+12)%12
                info6[i] = '丁';
                info6[i] += infoDizhi[d % (infoDizhiWidth * 12)];
            }
            break;
    }
    for (var i = info6.length - 1; i >= 0; i--) {
        info6[i] += infoDizhi[infoDizhi.indexOf(info6[i][1]) + 2];
    }
    return info6;
}
/**
 * 輸入：干支時間，本卦（數），變爻位置（用二進制表示），目的，備注
 * 爲減少外部依賴，時間傳入干支紀年月日時，最多八字最少六字，卽年月日的干支
 * @time8: 需包含干支時間，如「甲子月甲子日」。
 * @original: 左起低位（初爻）的六爻數值。
 * @mask: 左起低位（初爻）的變爻數值，如「0b001000」。
 * @memo: 備注，如問卜目的。
 */
var Prediction = /** @class */ (function () {
    //@original, @mask 僅接受 any 不接受 number|string
    function Prediction(time8, original, mask) {
        var memo = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            memo[_i - 3] = arguments[_i];
        }
        this.offsetInGroup = -1;
        this.shi = -1;
        this.ying = -1;
        this.time8 = time8;
        if (Number.isInteger(original)) {
            this.original = 63 & original; //only types of: any, number, bigint, enum
        }
        else {
            this.original = 63 & parseInt(original, 2); //cannot be types of: string
        }
        if (Number.isInteger(mask)) {
            this.mask = 63 & mask;
        }
        else {
            this.mask = 63 & parseInt(mask, 2);
        }
        this.memo = memo || '';
    }
    Prediction.prototype.getInfo = function () {
        var _a, _b;
        if ((typeof this.time8) === 'string') {
            //取旬空
            this.time8 += ' ' + getXunkong(this.time8.match(new RegExp("[".concat(tiangan, "][").concat(dizhi, "]\u65E5"), 'g')).toString());
            this.oooShen6 = getListShen6(this.time8.match(new RegExp("[".concat(tiangan, "][").concat(dizhi, "]\u65E5"), 'g')).toString()[0]);
        }
        _a = getGroup(this.original), this.group = _a[0], this.groupWuxing = _a[1], this.offsetInGroup = _a[2];
        _b = base8shiying[this.offsetInGroup], this.shi = _b[0], this.ying = _b[1]; //世應
        this.oooShu = info64[getOffset64(this.original)];
        this.oooTu = info64[getOffset64(this.original) + 1];
        this.oooName = info64[getOffset64(this.original) + 2];
        this.ooo6 = getDetail6(this.original);
        var w5 = getInfoWuxing(this.groupWuxing);
        for (var i = 0; i <= 5; i++) {
            switch (this.ooo6[i][2]) {
                case w5[0]:
                    this.ooo6[i] += relation6[0];
                    break;
                case w5[1]:
                    this.ooo6[i] += relation6[1];
                    break;
                case w5[2]:
                    this.ooo6[i] += relation6[2];
                    break;
                case w5[3]:
                    this.ooo6[i] += relation6[3];
                    break;
                case w5[4]:
                    this.ooo6[i] += relation6[4];
                    break;
            }
        }
        //		this.ooo6[this.shi] += '世';		this.ooo6[this.ying] += '應';
        if ((63 & this.mask) === 0)
            return this; //無變爻
        var var6 = changeBits(this.original, this.mask);
        this.oooVarShu = info64[getOffset64(var6)];
        this.oooVarTu = info64[getOffset64(var6) + 1];
        this.oooVarName = info64[getOffset64(var6) + 2];
        this.oooVar6 = getDetail6(var6);
        for (var i = 0; i <= 5; i++) {
            switch (this.oooVar6[i][2]) {
                case w5[0]:
                    this.oooVar6[i] += relation6[0];
                    break;
                case w5[1]:
                    this.oooVar6[i] += relation6[1];
                    break;
                case w5[2]:
                    this.oooVar6[i] += relation6[2];
                    break;
                case w5[3]:
                    this.oooVar6[i] += relation6[3];
                    break;
                case w5[4]:
                    this.oooVar6[i] += relation6[4];
                    break;
            }
        }
        return this;
    };
    Prediction.prototype.print = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var callback = console.log;
        if (args.length === 1) {
            if (typeof args[args.length - 1] === 'function') {
                callback = args.pop();
            }
        }
        if (this.group === undefined)
            this.getInfo();
        callback(this.time8);
        callback();
        callback(this.memo);
        callback();
        var outStr = '　　　' + this.oooName + this.oooTu;
        if (this.mask !== 0)
            outStr += '　之　' + this.oooVarName + this.oooVarTu;
        callback(outStr);
        callback();
        //從高位（右）開始打印
        for (var i = 5, varBit = 1; i >= 0; i--, varBit = varBit << 1) {
            outStr = this.oooShen6[i] + '　';
            //outStr += this.ooo6[i];  //打印天干
            outStr += this.ooo6[i].slice(1, this.ooo6[i].length); //不打印天干
            if ((this.oooShu & varBit) === 0) {
                outStr += tu2[0];
            }
            else {
                outStr += tu2[1];
            }
            if ((this.mask & varBit) !== 0) {
                switch (outStr[outStr.length - 1]) {
                    case tu2[0]:
                        outStr = outStr.replace(tu2[0], tu2[2]);
                        break;
                    case tu2[1]:
                        outStr = outStr.replace(tu2[1], tu2[3]);
                        break;
                }
            }
            if (i === this.shi)
                outStr += '世';
            if (i === this.ying)
                outStr += '應';
            if (this.mask !== 0) {
                if ((i === this.shi) || (i === this.ying)) {
                    //outStr += '　' + this.oooVar6[i];
                    outStr += '　' + this.oooVar6[i].slice(1, this.oooVar6[i].length);
                }
                else {
                    //outStr += '　　' + this.oooVar6[i];
                    outStr += '　　' + this.oooVar6[i].slice(1, this.oooVar6[i].length);
                }
                if ((this.oooVarShu & varBit) === 0) {
                    outStr += tu2[0];
                }
                else {
                    outStr += tu2[1];
                }
            }
            callback(outStr);
        }
    };
    return Prediction;
}());
module.exports = Prediction;
//export default Prediction;
