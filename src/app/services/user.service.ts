import { Injectable } from '@angular/core';
import { User } from './../model/user';

@Injectable()
export class UserService {
  private static DB_NAME : string = "database";
  private static OBJECT_STORAGE_NAME : string = "user";
  static INITIAL_USER_LIST : User[] = [
      {id:1,name:"Jeferson",email:"jr@zyos.co"},
      {id:2,name:"Miguelo",email:"mtorres@zyos.co"},
      {id:3,name:"Sergio",email:"sh@zyos.co"}
    ]; 
  constructor() { 
    this.init();
  }

  init(){
    let request : IDBOpenDBRequest = indexedDB.open(UserService.DB_NAME,10);
    return new Promise((resolve,reject)=>{
      request.onerror = function(event){
        throw new Error("Error opening database "+event);
      };
      request.onsuccess = function(){
        resolve("Done");
      };
      request.onupgradeneeded = function(event:Event){
          let target : IDBOpenDBRequest = <IDBOpenDBRequest>event.target;
          let db : IDBDatabase = target.result;
          let objectStorage = db.createObjectStore(UserService.OBJECT_STORAGE_NAME,{keyPath:"id"});
          objectStorage.transaction.oncomplete = function(event){
            let objectStorage = db.transaction(UserService.OBJECT_STORAGE_NAME,"readwrite").objectStore(UserService.OBJECT_STORAGE_NAME);
            UserService.INITIAL_USER_LIST.forEach(user=>{
              objectStorage.add(user);
            });
            resolve("Done");
          };
      };
    });
  }

  loadUserList():Promise<User[]>{
    let request : IDBOpenDBRequest = indexedDB.open(UserService.DB_NAME,10);

    return new Promise((resolve,reject)=>{
      request.onerror = function(event){
        reject(new Error("Error opening database "+event));
      }
      request.onsuccess = function(event){
        let target : IDBOpenDBRequest = <IDBOpenDBRequest>event.target;
        let db : IDBDatabase = target.result;
        let objectStorage = db.transaction(UserService.OBJECT_STORAGE_NAME).objectStore(UserService.OBJECT_STORAGE_NAME);
        let userList : User[] = [];
        let cursorRequest = objectStorage.openCursor();
        cursorRequest.onerror = function(ev){
          reject(new Error("Error opening cursor "+ev));
        }
        cursorRequest.onsuccess = function(ev){
          let target :IDBRequest<IDBCursorWithValue>= <IDBRequest>ev.target;
          let cursor = target.result;
          if(cursor){
            userList.push(cursor.value);
            cursor.continue();
          }else{
            resolve(userList);
          }
        }
      }
    });
  }

  get(id:number):Promise<User>{
    let request : IDBOpenDBRequest = indexedDB.open(UserService.DB_NAME,10);

    return new Promise((resolve,reject)=>{
      request.onerror = function(event){
        reject(new Error("Error opening database "+event));
      }
      request.onsuccess = function(event){
        let target : IDBOpenDBRequest = <IDBOpenDBRequest>event.target;
        let db : IDBDatabase = target.result;
        let objectStorage = db.transaction(UserService.OBJECT_STORAGE_NAME).objectStore(UserService.OBJECT_STORAGE_NAME);
        let request = objectStorage.get(id);
        request.onerror = function(ev){
          reject(new Error("Error opening cursor "+ev));
        }
        request.onsuccess = function(ev){
          let target :IDBRequest= <IDBRequest>ev.target;
          resolve(<User>target.result);
        }
      }
    });
  }

  add(user : User):Promise<string>{
    let request : IDBOpenDBRequest = indexedDB.open(UserService.DB_NAME,10);

    return new Promise((resolve,reject)=>{
      request.onerror = function(event){
        reject(new Error("Error opening database "+event));
      }
      request.onsuccess = function(event){
        let target : IDBOpenDBRequest = <IDBOpenDBRequest>event.target;
        let db : IDBDatabase = target.result;
        let objectStorage = db.transaction(UserService.OBJECT_STORAGE_NAME,"readwrite").objectStore(UserService.OBJECT_STORAGE_NAME);
        let request = objectStorage.add(user);
        request.onerror = function(ev){
          reject(new Error("Error saving user "+ev));
        }
        request.onsuccess = function(ev){
          let target :IDBRequest= <IDBRequest>ev.target;
          console.log(target.result);
          resolve("success");
        }
      }
    });
  }

  update(user : User):Promise<string>{
    let request : IDBOpenDBRequest = indexedDB.open(UserService.DB_NAME,10);

    return new Promise((resolve,reject)=>{
      request.onerror = function(event){
        reject(new Error("Error opening database "+event));
      }
      request.onsuccess = function(event){
        let target : IDBOpenDBRequest = <IDBOpenDBRequest>event.target;
        let db : IDBDatabase = target.result;
        let objectStorage = db.transaction(UserService.OBJECT_STORAGE_NAME,"readwrite").objectStore(UserService.OBJECT_STORAGE_NAME);
        let userList : User[] = [];
        let request = objectStorage.put(user);
        request.onerror = function(ev){
          reject(new Error("Error saving user "+ev));
        }
        request.onsuccess = function(ev){
          let target :IDBRequest= <IDBRequest>ev.target;
          console.log(target.result);
          resolve("success");
        }
      }
    });
  }

  delete(id : number):Promise<string>{
    let request : IDBOpenDBRequest = indexedDB.open(UserService.DB_NAME,10);

    return new Promise((resolve,reject)=>{
      request.onerror = function(event){
        reject(new Error("Error opening database "+event));
      }
      request.onsuccess = function(event){
        let target : IDBOpenDBRequest = <IDBOpenDBRequest>event.target;
        let db : IDBDatabase = target.result;
        let objectStorage = db.transaction(UserService.OBJECT_STORAGE_NAME,"readwrite").objectStore(UserService.OBJECT_STORAGE_NAME);
        let request = objectStorage.delete(id);
        request.onerror = function(ev){
          reject(new Error("Error saving user "+ev));
        }
        request.onsuccess = function(ev){
          resolve("success");
        }
      }
    });
  }
}