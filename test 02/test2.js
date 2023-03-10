function countPairs(array) {
    // your code here
    let count = 0;
    const arr = array.sort();
    for (let i = 0; i < arr.length; i+=2) {
        if (arr[i] === arr[i+1]) {
            count++;
        }
    }
    return count;
  }
  
  
  // some test cases
  console.log(countPairs([10, 20, 20, 10, 10, 30, 50, 10, 20])); // 3
  console.log(countPairs([1, 1, 3, 1, 2, 1, 3, 3, 3, 3])); // 4
  console.log(countPairs([1, 2, 3, 4])); // 0
  