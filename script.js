let records = JSON.parse(localStorage.getItem("records")) || [];
let editIndex = -1;

function saveData() {
  const date = document.getElementById("date").value;
  const maids = document.getElementById("maids").value;

  const cheki = Number(document.getElementById("cheki").value) || 0;
  const phone = Number(document.getElementById("phone").value) || 0;
  const online = Number(document.getElementById("online").value) || 0;
  const video = Number(document.getElementById("video").value) || 0;
  const performance = Number(document.getElementById("performance").value) || 0;

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

function renderList() {
  const list = document.getElementById("list");
  const sortType = document.getElementById("sort")?.value || "new";

// コピーして並び替え（元データ壊さない）
let sorted = [...records];

if (sortType === "new") {
sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
} else if (sortType === "old") {
sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
} else if (sortType === "high") {
sorted.sort((a, b) => b.total - a.total);
} else if (sortType === "low") {
sorted.sort((a, b) => a.total - b.total);
}

  // 🔥 これ追加（超重要）
  if (!list) return;

  list.innerHTML = "";

  sorted.forEach((r, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      📅 ${r.date}<br>
      👧 ${r.maids}<br>
      📸${r.cheki} 📱${r.phone} 🌐${r.online} 🎬${r.video} 🎤${r.performance}<br>
      💰合計：${r.total}<br>
      <button onclick="editRecord(${index})">編集</button>
      <button onclick="deleteRecord(${index})">削除</button>
    `;

    list.appendChild(li);
  });
}
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

function deleteRecord(index) {
  if (confirm("削除しますか？")) {
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    renderList();
  }
}

function clearForm() {
  document.getElementById("date").value = "";
  document.getElementById("maids").value = "";
  document.getElementById("cheki").value = 0;
  document.getElementById("phone").value = 0;
  document.getElementById("online").value = 0;
  document.getElementById("video").value = 0;
  document.getElementById("performance").value = 0;
}

function goChart() {
  window.location.href = "chart.html";
}
function goList() {
  window.location.href = "list.html";
}

renderList();
