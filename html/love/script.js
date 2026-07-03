let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";

// 防止 `null` 变成 `"null"`
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

let clickCount = 0; // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
  "？你认真的吗…",
  "要不再想想？",
  "不许选这个！ ",
  "我会很伤心…",
  "不行:(",
];

// No 按钮点击事件
noButton.addEventListener("click", function () {
  clickCount++;

  // 让 Yes 变大，每次放大 2 倍
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  // 挤压 No 按钮，每次右移 50px
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  // 让图片和文字往上移动
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // No 文案变化（前 5 次变化）
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化（前 5 次变化）
  if (clickCount === 1) mainImage.src = "images/2.jpg"; // 震惊
  if (clickCount === 2) mainImage.src = "images/3.jpg"; // 思考
  if (clickCount === 3) mainImage.src = "images/4.jpg"; // 生气
  if (clickCount === 4) mainImage.src = "images/5.jpg"; // 哭
  if (clickCount >= 5) mainImage.src = "images/6.jpg"; // 之后一直是哭
});

// Yes 按钮点击后，进入成功页面
const loveTest = `!!!好唉!! ( >᎑<)♡︎ᐝ  ${
  username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

yesButton.addEventListener("click", function () {
  // 先创建基础 HTML 结构
  document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text" style="font-size: 2.5rem; margin: 2rem 0; color: #ff69b4;"></h1>
            <img src="images/hug.jpg" alt="拥抱" class="yes-image" style="max-width: 80%; height: auto; border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
            <div class="heart-animation" style="margin-top: 2rem; font-size: 3rem;">❤️</div>
        </div>
    `;

  // 设置页面样式
  const yesScreen = document.querySelector('.yes-screen');
  yesScreen.style.display = 'flex';
  yesScreen.style.flexDirection = 'column';
  yesScreen.style.alignItems = 'center';
  yesScreen.style.justifyContent = 'center';
  yesScreen.style.minHeight = '100vh';
  yesScreen.style.background = 'linear-gradient(135deg, #fff0f6 0%, #ffe3ef 100%)';

  // 确保用户名安全地插入
  document.querySelector(".yes-text").innerText = loveTest;

  // 添加心形动画
  const heart = document.querySelector('.heart-animation');
  heart.style.animation = 'pulse 1.5s infinite';

  // 添加动画关键帧
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  // 禁止滚动，保持页面美观
  document.body.style.overflow = "hidden";
});