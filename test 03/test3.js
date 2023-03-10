function groupByFirstLetter(array) {
    // start your code here
    const obj = {};
    
    for (let i = 0; i < array.length; i++) {
        if (!obj[array[i][0].toUpperCase()]) {
            obj[array[i][0].toUpperCase()] = [];
        }
        obj[array[i][0].toUpperCase()].push(array[i]);
    }

    return obj;
  }
  
  
  // some test cases
  console.log(
    groupByFirstLetter(["Alex", "john", "andy", "Mary", "hannigan", "Steve", "Jeremy", "Steve"])
  );
  // { A: ["Alex", "andy"], H: ["hannigan"], J: ["Jeremy", "john"], M: ["Mary"], S: ["Steve"] }
  