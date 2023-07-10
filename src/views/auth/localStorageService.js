class localStorageService {
    ls = window.localStorage
   
    setItem(key, valueArray) {
        valueArray = JSON.stringify(valueArray)
      this.ls.setItem(key, valueArray)
      return true
    }
  
    getItem(key) {
      let valueArray = this.ls.getItem(key)
      try {
        /* console.log("no",valueArray) */
        return JSON.parse(valueArray)
        
      } catch (e) {
        /* console.log("ok") */
        return null
        
      }
    }

  }
  
  export default new localStorageService();