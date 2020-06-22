export default class ApiService {

  _apiBase = 'https://5ee1dd4030deff0016c4036d.mockapi.io/'

  getResource = async (query) => {
    const res = await fetch(`${this._apiBase}${query}`);

    if(!res.ok) {
      throw new Error(`Ошибка подключения к ${this._apiBase}${query}, статус ${res.status}`)
    }

    return await res.json();
  };

  getProducts = async () => {
    const res = await this.getResource('items');
    return res;
  }

}