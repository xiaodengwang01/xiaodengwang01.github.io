const pieceShapes = { // 每块拼图由四颗相邻的小爱心组成
    block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
    block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
    block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
    block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
    block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
    block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
    block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]], /* 3 */
    block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
    block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
    block11: [[2, 0], [0, 0], [-1, 0], [1, 0]], /* — */
    block12: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
    block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
    block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
    block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
    block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]], /* 7 */
    block17: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
    block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
    block19: [[0, -1], [0, 0], [-1, 0], [1, 0]], /* 9 */
    block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
    block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
    block22: [[1, 1], [0, 0], [-1, 0], [1, 0]], /* 14 */
    block23: [[0, 2], [0, 0], [0, -1], [0, 1]]      /* | */
};

const heartPositions = { // 各拼图块相对大爱心中心的位置
    block1: [5, 3],
    block2: [5, 1],
    block3: [3, 4],
    block4: [3, 2],
    block5: [3, -1],
    block6: [2, 5],
    block7: [2, 1],
    block8: [1, -1],
    block9: [1, -3],
    block10: [1, 2],
    block11: [0, 3],
    block12: [0, 0], /* 【爱心中心】*/
    block13: [-1, -4],
    block14: [0, -2],
    block15: [-2, 4],
    block16: [-2, 2],
    block17: [-2, 0],
    block18: [-3, -2],
    block19: [-4, 0],
    block20: [-3, 5],
    block21: [-5, 3],
    block22: [-4, 1],
    block23: [-6, 1]    /* 因动画需要移动一个方块，故y轴坐标-1*/
};

const love = document.querySelector(".love");
const template = love.querySelector(".block");
const pieceCount = Object.keys(pieceShapes).length;
let timer;
let index = 0;

function addPiece() {
    index += 1;
    if (index > pieceCount) {
        clearInterval(timer);
        love.classList.add("is-rising");
        return;
    }

    const name = "block" + index;
    const [offsetX, offsetY] = heartPositions[name];
    const piece = template.cloneNode(true);
    piece.style.left = "calc(50% + " + offsetX + "em)";
    piece.style.top = "calc(50% - " + offsetY + "em)";
    piece.style.visibility = "visible";

    pieceShapes[name].forEach(([x, y], tileIndex) => {
        const tile = piece.children[tileIndex];
        tile.style.left = -x + "em";
        tile.style.top = -y + "em";
    });

    if (index === pieceCount) piece.children[2].hidden = true;
    love.appendChild(piece);
}

window.addEventListener("load", () => {
    // 等待左侧动画播完第一遍，再开始拼接爱心。
    setTimeout(() => {
        timer = setInterval(addPiece, 300);
    }, 12000);
});
