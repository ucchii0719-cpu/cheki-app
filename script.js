let records = JSON.parse(localStorage.getItem("records")) || [];
let editIndex = -1;

// 保存
function saveData() {
  const date = document.getElementById("date").value;
  const maids = document.getElementById("maids").value;

  const cheki = Number(document.getElementById("cheki").value) || 0;
  const phone = Number(document.getElementById("phone").value) || 0;
  const online = Number(document.getElementById("online").value) || 0;
  const video = Number(document.getElementById("video").value) || 0;
  const performance = Number(document.getElementById("performance").value) || 0;

  const total = cheki + phone + online + video + performance;
  const money =
  cheki * 70 +
  phone * 70 +
  online * 70 +
  video * 75 +
  performance * 75;

  const data = {
    date,
    maids,
    cheki,
    phone,
    online,
    video,
    performance,
    total,
    money
  };

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

// 一覧表示（並び替え付き）
function renderList() {
  const list = document.getElementById("list");
  if (!list) return;

  const sortType = document.getElementById("sort")?.value || "new";

  // 🔥 元indexを保持
  let sorted = records.map((r, i) => ({
    ...r,
    originalIndex: i
  }));

  // 並び替え
  if (sortType === "new") {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortType === "old") {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortType === "high") {
    sorted.sort((a, b) => b.total - a.total);
  } else if (sortType === "low") {
    sorted.sort((a, b) => a.total - b.total);
  }

  list.innerHTML = "";

  sorted.forEach((r) => {
    const li = document.createElement("li");

    li.innerHTML = `
      📅 ${r.date}<br>
      👧 ${r.maids}<br>
      📸${r.cheki} 📱${r.phone} 🌐${r.online} 🎬${r.video} 🎤${r.performance}<br>
      💰合計：${r.total}<br>
      <span style="color:#ff69b4; font-weight:bold;">
      💰売上：${r.money} 元
      </span>
      <button onclick="editRecord(${r.originalIndex})">編集</button>
      <button onclick="deleteRecord(${r.originalIndex})">削除</button>
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

// リセット
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

function goList() {
  window.location.href = "list.html";
}

// 初期表示
renderList();
