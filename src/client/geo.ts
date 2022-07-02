import type { City, Province } from "@/model/model";

const PROVINCE_API_URL =
  "https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json";

const CITY_API_URL =
  "https://raw.githubusercontent.com/IagoLast/pselect/master/data/municipios.json";

type ProvinceRaw = {
  id: string;
  nm: string;
};

type CityRaw = {
  id: string;
  nm: string;
};

const provinces: Array<Province> = [];
const cities: Array<City> = [];

export const getProvinceList = async (): Promise<Array<Province>> => {
  if (provinces.length > 0) return provinces;

  const res = await fetch(PROVINCE_API_URL);

  if (!res.ok) return [{ code: "41", label: "Sevilla" }];

  const provincesRaw = JSON.parse(await res.text());
  return provincesRaw.map((province: ProvinceRaw) => ({
    code: province.id,
    label: province.nm,
  }));
};

export const getCityList = async (): Promise<Array<City>> => {
  if (cities.length > 0) return cities;

  const res = await fetch(CITY_API_URL);

  if (!res.ok) return [{ code: "41092", label: "Sevilla" }];

  const citiesRaw = JSON.parse(await res.text());
  return citiesRaw.map((city: CityRaw) => ({ code: city.id, label: city.nm }));
};

export const getCitiesForProvince = async (province: Province) => {
  const cities = await getCityList();

  return cities.filter((city) => city.code.startsWith(province.code));
};
