import data_cn from "../data/ui/data_cn.json"
export const getText = (key) => {
    return (!!data_cn[key] ? data_cn[key] : key)
}