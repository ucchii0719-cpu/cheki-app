let records = JSON.parse(localStorage.getItem("records")) || [];
let editIndex = -1;

function saveData() {
    const date = document.getElementById("date").value;
    const maids = document.getElementById("maids").value;
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

    // 編集 or 新規
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

function deleteRecord(index) {
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    renderList();
}

function renderList() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    records.forEach((r, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
      📅 ${r.date}<br>
      メイド：${r.maids}<br>
      チェキ:${r.cheki} / 手機:${r.phone} / 線上:${r.online} / 影片:${r.video} / 表演:${r.performance}<br>
      合計：${r.total}
      <br>
      <button onclick="editRecord(${index})">編集</button>
      <button class="delete-btn" onclick="deleteRecord(${index})">削除</button>
      <hr>
    `;

        list.appendChild(li);
    });
    renderChart();
}
let chart;

function renderChart() {
    // 月ごとに集計
    const monthly = {};

    records.forEach(r => {
        if (!r.date) return;

        const month = r.date.slice(0, 7); // YYYY-MM

        if (!monthly[month]) {
            monthly[month] = 0;
        }

        monthly[month] += r.total;
    });

    const labels = Object.keys(monthly);
    const data = Object.values(monthly);

    const ctx = document.getElementById("chart").getContext("2d");

    // 既存グラフ削除
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "月別売上",
                data: data
            }]
        }
    });
}
function goChart() {
    window.location.href = "chart.html";
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
function clearForm() {
    document.getElementById("date").value = "";
    document.getElementById("maids").value = "";
    document.getElementById("cheki").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("online").value = "";
    document.getElementById("video").value = "";
    document.getElementById("performance").value = "";
}
function updateValue(id) {
  const value = document.getElementById(id).value;
  document.getElementById(id + "Value").textContent = value;
}

// 初期表示
renderList();

