export class Array {
    static insert(array, prevId, insertId) {
        for(let i = 0; i < array.length; i++){
            if(array[i] === prevId) {
                array.splice(i + 1, 0, insertId);
                return array;
            }
        }

        array.unshift(insertId);
        return array;
    }

    static delete(array, deleteId) {
        for(let i = 0; i < array.length; i++){
            if(array[i] === deleteId) {
                array.splice(i, 1);
                return array;
            }
        }
    }

    static update(array, updateId) {
        for(let i = 0; i < array.length; i++){
            if(array[i] === updateId) {
                array.splice(i, 1);
                return array;
            }
        }

        array.push(updateId);
        return array;
    }
}