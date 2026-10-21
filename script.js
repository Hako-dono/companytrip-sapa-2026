// Dán URL Web App của Apps Script (xem README.md) vào đây sau khi deploy.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzKBxcHDfIjuc4g2n8FIg-6yNCk7Q46P7mtoz65suRWH6GOTN3r3vRQxc9Sfk-tSK1gDA/exec";

const form = document.getElementById("registerForm");
const participateRadios = document.querySelectorAll('input[name="thamGia"]');
const reasonGroup = document.getElementById("reasonGroup");
const reasonInput = document.getElementById("lyDo");
const formSection = document.getElementById("formSection");
const resultSection = document.getElementById("resultSection");

participateRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const isJoining = document.querySelector('input[name="thamGia"]:checked').value === "true";
    reasonGroup.hidden = isJoining;
    reasonInput.required = !isJoining;
    if (isJoining) reasonInput.value = "";
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const hoTen = document.getElementById("hoTen").value.trim();
  const phongBan = document.getElementById("phongBan").value.trim();
  const checkedRadio = document.querySelector('input[name="thamGia"]:checked');
  const lyDo = reasonInput.value.trim();

  if (!hoTen || !phongBan || !checkedRadio) {
    alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
    return;
  }

  const thamGia = checkedRadio.value === "true";
  if (!thamGia && !lyDo) {
    alert("Vui lòng nêu lý do không tham gia.");
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Đang gửi...";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ hoTen, phongBan, thamGia, lyDo }),
    });
    showResult(thamGia, hoTen);
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Xác nhận đăng ký";
    alert("Có lỗi khi gửi đăng ký, vui lòng thử lại.");
  }
});

function showResult(thamGia, hoTen) {
  formSection.hidden = true;
  resultSection.hidden = false;
  resultSection.innerHTML = thamGia
    ? `<h2>🎉 Xác nhận thành công!</h2><p><strong>${escapeHtml(hoTen)}</strong>, anh/chị đã có trong danh sách tham gia <strong>Company Trip 2026 - Beyond The Clouds</strong>. Hẹn gặp anh/chị tại Sapa!</p>`
    : `<h2>Đã ghi nhận</h2><p>Cảm ơn <strong>${escapeHtml(hoTen)}</strong> đã phản hồi. Lý do không tham gia của anh/chị đã được gửi tới P. HCNS.</p>`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
