/**
 *
 * 数组对象 查找是否存在某元素 返回 -1或下标
 * 参数1：数组对象 arrObj
 * 参数2：属性  str
 * 参数3：值    str
 *
 * */
export function findElem(arrObj, attr, val) {
  for (let i = 0; i < arrObj.length; i++) {
    if (arrObj[i][attr] == val) {
      return i;
    }
  }
  return -1;
}

