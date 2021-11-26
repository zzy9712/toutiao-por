// 本地存储模块封装

// 获取本地缓存 name: 获取本地缓存的指定值
export const getItem = (name) => {
    // 获取本地存储数据
    const data = window.localStorage.getItem(name)
        // 为什么要把 data 放到 try ... catch 中
        // 因为获取的数据有可能不是 JSON 格式的字符串
    try {
        // 尝试把 data 转换成 JSON 字符串返回
        return JSON.parse(data)
            // 如果是JSON格式字符串，转换后返回，
            // 如果不是，抛出错误
    } catch (err) {
        // 不是 JSON 格式数据此时返回原数据
        return data
    }
}

// 存储本地缓存
export const setItem = (name, value) => {
    // 如果value 是对象，就把 value 转成 JSON 格式字符串在进行存储
    if (typeof(value) === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
}

// 删除本地缓存
export const remItem = (name) => {
    window.localStorage.removeItem(name)
}