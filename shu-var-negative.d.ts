/**
 * 輸入：干支時間，本卦（數），變爻位置（用二進制表示），目的，備注
 * 爲減少外部依賴，時間傳入干支紀年月日時，最多八字最少六字，卽年月日的干支
 * @time8: 需包含干支時間，如「甲子月甲子日」。
 * @original: 左起低位（初爻）的六爻數值。
 * @mask: 左起低位（初爻）的變爻數值，如「0b001000」。
 * @memo: 備注，如問卜目的。
 */
declare class Prediction {
    time8: string;
    original: number;
    mask: number;
    memo: string[];
    oooShu: number;
    oooTu: string;
    oooName: string;
    ooo6: string[];
    oooVarShu: number;
    oooVarTu: string;
    oooVarName: string;
    oooVar6: string[];
    oooShen6: string[];
    group: string;
    groupWuxing: string;
    offsetInGroup: number;
    shi: number;
    ying: number;
    constructor(time8: string, original: number | string, mask: number | string, ...memo: string[]);
    getInfo(): this;
    print(...args: any): void;
}
export { Prediction };
