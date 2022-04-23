const axios = require('axios');
const DataCovid19 = axios.get('https://api.covid19api.com/summary');

function getDataCovid19(inforCovid19) {
    return new Promise((resolve, reject) => {
        console.log('Đang lấy dữ liệu, xin vui lòng chờ...');
        console.log('Đã lấy dữ liệu thành công, đang xuất thống kê');
        console.log('Dữ liệu Covid hôm nay:');
        resolve(inforCovid19)
    });
}

getDataCovid19(DataCovid19)
    .then((data) => {
        console.log(`Nhiễm mới: ${data.data.Global.NewConfirmed} - Số người chết mới: ${data.data.Global.NewDeaths} - Tổng số người chết: ${data.data.Global.TotalDeaths}`)
        return new Promise((resolve, reject) => {
            resolve(data)
        });
    })
    .then(((data) => {
        let limitOfLoop = data.data.Countries;
        let arrDataTotalDeaths = [];
        for (let i = 0; i < limitOfLoop.length; i++) {
            arrDataTotalDeaths.push(limitOfLoop[i].TotalDeaths);
        }
        const largesttotalDeaths = arrDataTotalDeaths.reduce((prev, curr) => prev > curr ? prev : curr)
        console.log(`Quốc Gia có số lượng tổng cộng người chết nhiều nhất là: ${ largesttotalDeaths}`);
        for (let j = 0; j < limitOfLoop.length; j++) {
            if (largesttotalDeaths === limitOfLoop[j].TotalDeaths) {
                console.log(`Quốc Gia có số lượng người mắc mới trong ngày nhiều nhất là: ${limitOfLoop[j].Country}`);
            }
        }
    }))