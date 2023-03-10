const paragraph =
  "Culpa nostrud id esse ullamco dolor eu officia qui magna nisi est et. Id id laboris exercitation eu magna eu ea in excepteur esse dolore. Excepteur voluptate ea nostrud elit incididunt id elit commodo irure.";


function checkRansomNote(note, paragraph) {
    const noteArr = note.replace(/[\s.,?!]/g, ' ').split(' ');
    const paragraphArr = paragraph.replace(/[\s.,?!]/g, ' ').split(' ');

    let count = 0;

    for (let i = 0; i < noteArr.length; i++) {
        const index = paragraphArr.indexOf(noteArr[i]);
        if (index > -1) {
            paragraphArr.splice(index, 1);
            count++;
        }

    }

    if (count === noteArr.length) {
        return true;
    }

    return false;

}


// some test cases
console.log(checkRansomNote("id exercitation officia elit", paragraph)); // true
console.log(checkRansomNote("excepteur ea laboris eu magna esse", paragraph)); // true
console.log(checkRansomNote("ullamco id id id id", paragraph)); // false (only 3 "id"s exists in the paragraph)
console.log(checkRansomNote("magnar", paragraph)); // false (non-existent word)