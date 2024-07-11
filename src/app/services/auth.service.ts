import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/users'

  getAll() {
    return this.http.get(this.apiurl).pipe(map(responseData => {
      const dataArray = []
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          const element = responseData[key];
          dataArray.push({...element})
        }
      }
      return dataArray
    }))
  }

  getByCode(key: string, data: string) {
    return this.http.get(`${this.apiurl}?${key}=${data}`);
  }
  proceedRegister(inputData: any) {
    return this.http.post(this.apiurl, inputData)
  }

  updateUser(code: any, inputData: any) {
    return this.http.put(this.apiurl + '/' + code, inputData)
  }

  deleteUser(data: string){
    return this.http.delete(this.apiurl + '/' + data)
  }

  isLoggedIn() {
    return sessionStorage.getItem('userId') !== null
  }

  isAdmin() {
    return sessionStorage.getItem('role') === 'admin'
  }
}
