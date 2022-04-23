const axios = require('axios');

async function getDataCovid19() {
    try {
        const DataCovid19 = await axios.get('https://api.covid19api.com/summary');
        let totalDeaths = DataCovid19.data.Global.TotalDeaths;
        let NewConfirmed = DataCovid19.data.Global.NewConfirmed;
        let NewDeaths = DataCovid19.data.Global.NewDeaths;
        console.log('Đã lấy dữ liệu thành công, đang xuất thống kê');
        console.log('Dữ liệu Covid hôm nay:');
        console.log(`Nhiễm mới: ${NewConfirmed} - Số người chết mới: ${NewDeaths} - Tổng số người chết: ${totalDeaths}`);
        let limitOfLoop = DataCovid19.data.Countries;
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
    } catch (error) {
        console.log(error);
    }
}

async function renderDataCovid19() {
    console.log('Đang lấy dữ liệu, xin vui lòng chờ...');
    await getDataCovid19()
}

renderDataCovid19()