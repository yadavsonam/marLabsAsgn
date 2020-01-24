export function sortData(data){
    data.sort(function(a,b){
        return new Date(b.updated_at) - new Date(a.updated_at);
    });
    return data;
}

export function formatDate(date) {
        let nDate = new Date(date);
        let day = nDate.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let month = nDate.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let year = nDate.getFullYear();
        return year + "-" + month + "-" + day;
}

export function getNow() {
    let nDate = new Date();
    let dateTime =  nDate.getFullYear() + "-"
        + (nDate.getMonth()+1)  + "-"
        + nDate.getDate() + " "
        + nDate.getHours() + ":"
        + nDate.getMinutes() + ":"
        + nDate.getSeconds();
    return dateTime;
}
