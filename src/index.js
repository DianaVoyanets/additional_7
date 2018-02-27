module.exports = function solveSudoku(matrix) {

    function check(num, row, col) {
        for (var i = 0; i < 9; i++) {
            var index = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(col / 3) * 3) + (i % 3);

            if (num == matrix[(row * 9) + i] || num == matrix[col + (i * 9)] || num == matrix[index]) {
                return false;
            }
        }

        return true;
    }

    function resolve(index) {
        if (index >= matrix.length) {
            return true;
        } else if (matrix[index] != 0) {
            return resolve(index + 1);
        }

        for (var i = 1; i <= 9; i++) {
            if (check(i, Math.floor(index / 9), index % 9)) {
                matrix[index] = i;

                if (resolve(index + 1)) {
                    return true;
                }
            }
        }

        matrix[index] = 0;
        return false;
    }

    matrix = matrix.reduce((prev, curr) => prev.concat(curr));
    resolve(0);

    var result = [];
    for (var i = 0; i < matrix.length; i += 9) {
        result.push(matrix.slice(i, i + 9))
    }

    return result;
}