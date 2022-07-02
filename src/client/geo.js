const PROVINCE_API_URL = "https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json";
const CITY_API_URL = "https://raw.githubusercontent.com/IagoLast/pselect/master/data/municipios.json";
const provinces = [];
const cities = [];
export const getProvinceList = async () => {
    if (provinces.length > 0)
        return provinces;
    const res = await fetch(PROVINCE_API_URL);
    if (!res.ok)
        return [{ code: "41", label: "Sevilla" }];
    const provincesRaw = JSON.parse(await res.text());
    return provincesRaw.map((province) => ({
        code: province.id,
        label: province.nm,
    }));
};
export const getCityList = async () => {
    if (cities.length > 0)
        return cities;
    const res = await fetch(CITY_API_URL);
    if (!res.ok)
        return [{ code: "41092", label: "Sevilla" }];
    const citiesRaw = JSON.parse(await res.text());
    return citiesRaw.map((city) => ({ code: city.id, label: city.nm }));
};
export const getCitiesForProvince = async (province) => {
    const cities = await getCityList();
    return cities.filter((city) => city.code.startsWith(province.code));
};
//# sourceMappingURL=geo.js.map