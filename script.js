// データ読み込み
let records = JSON.parse(localStorage.getItem("records")) || [];
let editIndex = -1;

// 保存処理
function saveData() {
  const date = document.getElementById("date").value;
  const maids = document.getElementById("maids").value;

  // ホイール入力（文字→数字に変換）
  const cheki = Math.max(0, Number(document.getElementById("cheki").value) || 0);
  const phone = Math.max(0, Number(document.getElementById("phone").value) || 0);
  const online = Math.max(0, Number(document.getElementById("online").value) || 0);
  const video = Math.max(0, Number(document.getElementById("video").value) || 0);
  const performance = Math.max(0, Number(document.getElementById("performance").value) || 0);

  const total = cheki + phone + online + video + performance;

  const data = {
    date,
    maids,
    cheki,
    phone,
    online,
    video,
    performance,
    total
  };

  // 新規 or 編集
  if (editIndex === -1) {
    records.push(data);
  } else {
    records[editIndex] = data;
    editIndex = -1;
  }

  localStorage.setItem("records", JSON.stringify(records));
  renderList();
  clearForm();
}

// 一覧表示
function renderList() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  records.forEach((r, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      📅 ${r.date}<br>
      👧 メイド：${r.maids}<br>
      📸 ${r.cheki} / 📱 ${r.phone} / 🌐 ${r.online} / 🎬 ${r.video} / 🎤 ${r.performance}<br>
      💰 合計：${r.total}<br>
      <button class="edit-btn" onclick="editRecord(${index})">✏️ 編集</button>
      <button class="delete-btn" onclick="deleteRecord(${index})">🗑 削除</button>
      <hr>
    `;

    list.appendChild(li);
  });
}

// 編集
function editRecord(index) {
  const r = records[index];

  document.getElementById("date").value = r.date;
  document.getElementById("maids").value = r.maids;

  document.getElementById("cheki").value = r.cheki;
  document.getElementById("phone").value = r.phone;
  document.getElementById("online").value = r.online;
  document.getElementById("video").value = r.video;
  document.getElementById("performance").value = r.performance;

  editIndex = index;
}

// 削除
function deleteRecord(index) {
  if (confirm("削除しますか？")) {
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    renderList();
  }
}

// フォームリセット
function clearForm() {
  document.getElementById("date").value = "";
  document.getElementById("maids").value = "";

  document.getElementById("cheki").value = 0;
  document.getElementById("phone").value = 0;
  document.getElementById("online").value = 0;
  document.getElementById("video").value = 0;
  document.getElementById("performance").value = 0;
}

// ページ移動
function goChart() {
  window.location.href = "chart.html";
}

// 初期表示
renderList();
