export function flattenListMap(listObject, mapKey) {
    let returnList = [];
    for (const dictObj of listObject) {
        if (dictObj && dictObj[mapKey] != undefined) {
            returnList.push(dictObj[mapKey]);
        }
    }
    return returnList;
}