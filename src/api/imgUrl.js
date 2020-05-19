const imageUpload = params => {
    const url = 'xxxxx'
    // 根据后台需求的数据格式确定headers
    return axios.post(url, params, { 
        headers: {"content-type": "multipart/form-data"}
    })
}
