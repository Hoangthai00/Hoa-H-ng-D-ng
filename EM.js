// --- KHỞI TẠO CÁC BIẾN DOM ---
const btnMenu = document.getElementById('btn-menu');
const menuPanel = document.getElementById('menu-panel');
const btnReset = document.getElementById('btn-reset');
const canvas = document.getElementById('boHoaCanvas');
const ctx = canvas.getContext('2d');
const offCvs = document.createElement('canvas');
const offCtx = offCvs.getContext('2d');

if (btnMenu && menuPanel) {
    btnMenu.addEventListener('click', () => { menuPanel.classList.toggle('show'); });
}

// --- 1. TỪ ĐIỂN MÀU GIẤY GÓI ---
let mauGiayHienTai = "kem";
const mauGiayGoiDict = {
    "kem": { ngoai: "#fcfaf5", trongTrai: "rgba(247, 218, 220, 0.85)", trongPhai: "rgba(245, 222, 205, 0.85)" },
    "hong": { ngoai: "#fff0f5", trongTrai: "rgba(255, 228, 225, 0.85)", trongPhai: "rgba(255, 192, 203, 0.85)" },
    "xanh": { ngoai: "#f0fff0", trongTrai: "rgba(224, 255, 255, 0.85)", trongPhai: "rgba(175, 238, 238, 0.85)" },
    "kraft": { ngoai: "#c2a382", trongTrai: "rgba(245, 245, 245, 0.8)", trongPhai: "rgba(210, 180, 140, 0.8)" },
    "den": { ngoai: "#2c2c2c", trongTrai: "rgba(60, 60, 60, 0.9)", trongPhai: "rgba(80, 80, 80, 0.9)" },
    "vang": { ngoai: "#dcaa2a", trongTrai: "rgba(220, 58, 69, 0.85)", trongPhai: "rgba(199, 116, 58, 0.85)" },
    "do": { ngoai: "#a61747", trongTrai: "rgba(95, 22, 14, 0.85)", trongPhai: "rgba(212, 123, 138, 0.85)" },
    "tim": { ngoai: "#b852ef", trongTrai: "rgba(95, 218, 218, 0.85)", trongPhai: "rgba(195, 48, 218, 0.85)" },
    "nau dat": { ngoai: "#6c451a", trongTrai: "rgba(237, 227, 85, 0.8)", trongPhai: "rgba(213, 152, 72, 0.8)" },
    "cam": { ngoai: "#d99b1d", trongTrai: "rgba(60, 60, 60, 0.9)", trongPhai: "rgba(80, 80, 80, 0.9)" }
};

// --- 2. CÁC HÀM VẼ HOA & TRÁI TIM ---
function veHuongDuong(ctx_tam, x, y, tyLe) {
    ctx_tam.fillStyle = "#ffcc00"; ctx_tam.strokeStyle = "#e6a800"; ctx_tam.lineWidth = 1 * tyLe;
    for (let i = 0; i < 24; i++) {
        ctx_tam.beginPath(); const goc = i * Math.PI / 12;
        ctx_tam.ellipse(x + Math.cos(goc) * 20 * tyLe, y + Math.sin(goc) * 20 * tyLe, 22 * tyLe, 4 * tyLe, goc, 0, 2 * Math.PI);
        ctx_tam.fill(); ctx_tam.stroke();
    }
    ctx_tam.beginPath(); ctx_tam.arc(x, y, 13 * tyLe, 0, 2 * Math.PI); ctx_tam.fillStyle = "#3e2723"; ctx_tam.fill();
    for(let j=0; j<15; j++){
        ctx_tam.beginPath();
        ctx_tam.arc(x + (Math.random()-0.5)*18*tyLe, y + (Math.random()-0.5)*18*tyLe, 1*tyLe, 0, 2*Math.PI);
        ctx_tam.fillStyle = "#8d6e63"; ctx_tam.fill();
    }
}

function veHoaCuc(ctx_tam, x, y, tyLe) {
    ctx_tam.fillStyle = "#ffffff"; ctx_tam.strokeStyle = "#e2e8f0"; ctx_tam.lineWidth = 1.5 * tyLe;
    for (let i = 0; i < 15; i++) {
        ctx_tam.beginPath(); const goc = i * Math.PI / 7.5;
        ctx_tam.ellipse(x + Math.cos(goc) * 16 * tyLe, y + Math.sin(goc) * 16 * tyLe, 16 * tyLe, 5 * tyLe, goc, 0, 2 * Math.PI);
        ctx_tam.fill(); ctx_tam.stroke();
    }
    let nhuy = ctx_tam.createRadialGradient(x, y, 0, x, y, 8 * tyLe);
    nhuy.addColorStop(0, "#ffd700"); nhuy.addColorStop(1, "#d4af37");
    ctx_tam.beginPath(); ctx_tam.arc(x, y, 8 * tyLe, 0, 2 * Math.PI); ctx_tam.fillStyle = nhuy; ctx_tam.fill();
}

function veCamTuCau(ctx_tam, x, y, tyLe) {
    for (let i = 0; i < 50; i++) { 
        let hx = x + (Math.random() - 0.5) * 85 * tyLe; let hy = y + (Math.random() - 0.5) * 85 * tyLe;
        let shades = ["#4a90e2", "#5ba4f2", "#7cbaf8", "#357abd", "#8ab4f8", "#6495ed"];
        ctx_tam.fillStyle = shades[Math.floor(Math.random() * shades.length)];
        for(let j=0; j<4; j++) {
            let goc = j * Math.PI / 2 + (Math.random()*0.5);
            ctx_tam.beginPath(); ctx_tam.arc(hx + Math.cos(goc)*4.5*tyLe, hy + Math.sin(goc)*4.5*tyLe, 5*tyLe, 0, 2*Math.PI); ctx_tam.fill();
        }
        ctx_tam.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx_tam.beginPath(); ctx_tam.arc(hx, hy, 1.5*tyLe, 0, 2*Math.PI); ctx_tam.fill();
    }
}

function veHoaHong(ctx_tam, x, y, tyLe, mauSac) {
    ctx_tam.fillStyle = mauSac; ctx_tam.strokeStyle = "rgba(0, 0, 0, 0.2)"; ctx_tam.lineWidth = 1 * tyLe;
    let soCanh = 30; 
    for (let i = soCanh; i > 0; i--) {
        let tyLeCanh = i / soCanh; let banKinh = tyLeCanh * 30 * tyLe; let goc = i * Math.PI * 2.3; 
        let tamX = x + Math.cos(goc) * banKinh * 0.4; let tamY = y + Math.sin(goc) * banKinh * 0.4;
        ctx_tam.beginPath(); ctx_tam.arc(tamX, tamY, banKinh + (5*tyLe), goc, goc + Math.PI * 1.2);
        ctx_tam.fill(); ctx_tam.stroke();
    }
    ctx_tam.beginPath(); ctx_tam.arc(x, y, 4 * tyLe, 0, 2 * Math.PI); ctx_tam.fillStyle = "rgba(0,0,0,0.2)"; ctx_tam.fill();
}

function veTraiTim(ctx_tam, kichThuoc) {
    ctx_tam.beginPath();
    ctx_tam.moveTo(0, kichThuoc / 4);
    ctx_tam.bezierCurveTo(0, 0, -kichThuoc / 2, 0, -kichThuoc / 2, kichThuoc / 4);
    ctx_tam.bezierCurveTo(-kichThuoc / 2, kichThuoc / 2.5, 0, kichThuoc / 1.5, 0, kichThuoc);
    ctx_tam.bezierCurveTo(0, kichThuoc / 1.5, kichThuoc / 2, kichThuoc / 2.5, kichThuoc / 2, kichThuoc / 4);
    ctx_tam.bezierCurveTo(kichThuoc / 2, 0, 0, 0, 0, kichThuoc / 4);
    ctx_tam.fill();
}

// --- 3. CÁC HÀM VẼ GIẤY GÓI ---
function veGiayGoiHauCanh(ctx_tam) {
    let mau = mauGiayGoiDict[mauGiayHienTai]; 
    ctx_tam.save();
    ctx_tam.fillStyle = mau.ngoai; ctx_tam.strokeStyle = "#e8e3d8"; ctx_tam.lineWidth = 2;
    ctx_tam.beginPath(); ctx_tam.moveTo(400, 650); 
    ctx_tam.bezierCurveTo(100, 550, 0, 250, 60, 100); ctx_tam.bezierCurveTo(200, 20, 300, 60, 400, 40); 
    ctx_tam.bezierCurveTo(500, 60, 600, 20, 740, 100); ctx_tam.bezierCurveTo(800, 250, 700, 550, 400, 650); 
    ctx_tam.fill(); ctx_tam.stroke();
    
    ctx_tam.fillStyle = mau.trongTrai; ctx_tam.strokeStyle = "rgba(230, 190, 190, 0.5)"; ctx_tam.lineWidth = 1;
    ctx_tam.beginPath(); ctx_tam.moveTo(400, 600); ctx_tam.bezierCurveTo(150, 520, 80, 350, 120, 200); 
    ctx_tam.bezierCurveTo(180, 150, 300, 180, 400, 250); ctx_tam.fill(); ctx_tam.stroke();
    
    ctx_tam.fillStyle = mau.trongPhai; ctx_tam.strokeStyle = "rgba(220, 190, 170, 0.5)";
    ctx_tam.beginPath(); ctx_tam.moveTo(400, 600); ctx_tam.bezierCurveTo(650, 520, 720, 350, 680, 200); 
    ctx_tam.bezierCurveTo(620, 150, 500, 180, 400, 250); ctx_tam.fill(); ctx_tam.stroke();
    ctx_tam.restore();
}

function veGiayGoiTienCanh(ctx_tam) {
    let mau = mauGiayGoiDict[mauGiayHienTai]; 
    ctx_tam.save();
    ctx_tam.fillStyle = mau.ngoai; ctx_tam.strokeStyle = "#eed0d5"; ctx_tam.lineWidth = 1;
    ctx_tam.beginPath(); ctx_tam.moveTo(250, 480); ctx_tam.bezierCurveTo(320, 550, 380, 580, 400, 580);
    ctx_tam.bezierCurveTo(480, 580, 550, 500, 600, 450); ctx_tam.bezierCurveTo(520, 530, 450, 560, 400, 560);
    ctx_tam.bezierCurveTo(350, 560, 280, 510, 250, 480); ctx_tam.fill(); ctx_tam.stroke();
    
    ctx_tam.fillStyle = mau.ngoai; ctx_tam.strokeStyle = "#e8e5df"; ctx_tam.lineWidth = 1.5;
    ctx_tam.beginPath(); ctx_tam.moveTo(180, 450); ctx_tam.bezierCurveTo(280, 600, 320, 750, 330, 880); ctx_tam.lineTo(400, 890);
    ctx_tam.bezierCurveTo(390, 700, 320, 600, 400, 580); ctx_tam.bezierCurveTo(300, 580, 220, 520, 180, 450); ctx_tam.fill(); ctx_tam.stroke();
    ctx_tam.beginPath(); ctx_tam.moveTo(620, 450); ctx_tam.bezierCurveTo(520, 600, 480, 750, 470, 880); ctx_tam.lineTo(380, 890);
    ctx_tam.bezierCurveTo(410, 700, 480, 600, 400, 580); ctx_tam.bezierCurveTo(500, 580, 580, 520, 620, 450); ctx_tam.fill(); ctx_tam.stroke();
    ctx_tam.restore();
}

let tyLeNoHoa = 1;
function veDayRuyBang(ctx_tam, thoiGian) {
    ctx_tam.save(); 
    ctx_tam.translate(400, 600);
    let gocGioCuaNo = Math.sin(thoiGian * 1.5) * 0.06;
    ctx_tam.rotate(gocGioCuaNo);
    ctx_tam.scale(tyLeNoHoa, tyLeNoHoa);
    ctx_tam.translate(-400, -600);

    ctx_tam.fillStyle = "#ffb6c1"; ctx_tam.strokeStyle = "#ff99aa"; ctx_tam.lineWidth = 2;
    ctx_tam.beginPath(); ctx_tam.ellipse(340, 595, 55, 22, Math.PI/10, 0, 2*Math.PI); ctx_tam.fill(); ctx_tam.stroke();
    ctx_tam.beginPath(); ctx_tam.ellipse(460, 595, 55, 22, -Math.PI/10, 0, 2*Math.PI); ctx_tam.fill(); ctx_tam.stroke();
    ctx_tam.beginPath(); ctx_tam.arc(400, 600, 18, 0, 2*Math.PI); ctx_tam.fill(); ctx_tam.stroke();
    ctx_tam.beginPath(); ctx_tam.moveTo(385, 615); ctx_tam.quadraticCurveTo(330, 750, 360, 850); ctx_tam.lineTo(400, 820); ctx_tam.lineTo(395, 615); ctx_tam.fill(); ctx_tam.stroke();
    ctx_tam.beginPath(); ctx_tam.moveTo(415, 615); ctx_tam.quadraticCurveTo(470, 750, 440, 850); ctx_tam.lineTo(400, 820); ctx_tam.lineTo(405, 615); ctx_tam.fill(); ctx_tam.stroke();
    ctx_tam.restore();
}

// --- 4. HỆ THỐNG XỬ LÝ LẮC CẢM BIẾN ---
let hoSoHoa = []; 
let hoSoCanhHoaBay = []; 
let trangThaiDongDat = false;
let tienTrinhDo = 0; 
let giaTocCu = {x: 0, y: 0, z: 0};
const btnCamBien = document.getElementById('btn-cam-bien');

function hamXuLyLac(e) {
    let giaToc = e.accelerationIncludingGravity;
    if (!giaToc) return;
    let deltaX = Math.abs(giaTocCu.x - giaToc.x);
    let deltaY = Math.abs(giaTocCu.y - giaToc.y);
    let deltaZ = Math.abs(giaTocCu.z - giaToc.z);
    
    if (deltaX + deltaY + deltaZ > 15) {
        let thoiGianHienTai = Date.now();
        if (!this.lanLacCuoi || thoiGianHienTai - this.lanLacCuoi > 500) {
            this.lanLacCuoi = thoiGianHienTai;
            trangThaiDongDat = true; 
            
            tienTrinhDo += 0.35; 
            if (tienTrinhDo > 1) tienTrinhDo = 1;

            let soTim = Math.floor(Math.random() * 11) + 20; 
            for(let k = 0; k < soTim; k++) {
                hoSoCanhHoaBay.push({
                    x: Math.random() * canvas.width,
                    y: -20 - Math.random() * 100,
                    vx: (Math.random() - 0.5) * 6,
                    vy: Math.random() * 3 + 2, 
                    kichThuoc: Math.random() * 4 + 4,
                    gocQuay: Math.random() * Math.PI * 2,
                    tocDoQuay: (Math.random() - 0.5) * 0.1,
                    mauSac: ["#ff4d4d", "#ff1a1a", "#e60000", "#ff0055"][Math.floor(Math.random()*4)],
                    loai: 'traiTim'
                });
            }

            if (tienTrinhDo >= 1 && !window.thiepDaHien) {
                window.thiepDaHien = true;
                let pt = document.getElementById('phong-thu');
                if(pt) pt.classList.remove('an-phong-thu');
                btnCamBien.classList.add('an-nut'); 
            }

            let hoaTrenCanh = hoSoHoa.filter(h => !h.isFalling && !h.isDragged);
            if (hoaTrenCanh.length > 0) {
                let soHoaRung = Math.floor(Math.random() * 2) + 1; 
                for(let i = 0; i < soHoaRung; i++) {
                    if (hoaTrenCanh.length === 0) break;
                    let chiMuc = Math.floor(Math.random() * hoaTrenCanh.length);
                    let hoaTuyetMenh = hoaTrenCanh[chiMuc];
                    hoaTuyetMenh.isFalling = true; hoaTuyetMenh.vy = -3 - Math.random() * 3; 
                    hoaTuyetMenh.vx = (Math.random() - 0.5) * 10; hoaTuyetMenh.diemDungDay = 860 + Math.random() * 40;
                    hoaTuyetMenh.thoiDiemRung = thoiGianHienTai; hoaTuyetMenh.opacity = 1; 
                    hoaTuyetMenh.gocQuayRung = (Math.random() - 0.5) * Math.PI;
                    hoaTrenCanh.splice(chiMuc, 1); 
                }
            }
        }
    }
    giaTocCu = {x: giaToc.x, y: giaToc.y, z: giaToc.z};
}

btnCamBien.addEventListener('click', async () => {
    btnCamBien.classList.add('active'); 
    function hienThiHuongDan() {
        const hd = document.getElementById('huong-dan-lac');
        if(hd) {
            hd.classList.remove('an-huong-dan'); 
            setTimeout(() => { hd.classList.add('an-huong-dan'); }, 3000); 
        }
    }

    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
            const permissionState = await DeviceMotionEvent.requestPermission();
            if (permissionState === 'granted') {
                window.addEventListener('devicemotion', hamXuLyLac);
                hienThiHuongDan();
            } else alert("Vui lòng cấp quyền cảm biến để ngắm hoa rơi nhé!");
        } catch (error) { console.error(error); }
    } else {
        window.addEventListener('devicemotion', hamXuLyLac);
        hienThiHuongDan();
    }
});

// --- 5. TƯƠNG TÁC CHUỘT VÀ MÀN HÌNH CẢM ỨNG ---
let lechX = 0; let lechY = 0;
function capNhatKichThuoc() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    offCvs.width = canvas.width;
    offCvs.height = canvas.height;
    lechX = canvas.width / 2 - 400;
    lechY = canvas.height / 2 - 450;
}
window.addEventListener('resize', capNhatKichThuoc);
capNhatKichThuoc();

let toaDoChuot = { x: -1000, y: -1000 };
let thoiGianChuotCu = Date.now();
let toaDoChuotCu = { x: -1000, y: -1000 };
let thoiGianRungCu = 0;
let hoaDangGiua = null;

function xuLyToaDoDiChuyen(clientX, clientY) {
    toaDoChuot.x = clientX - lechX;
    toaDoChuot.y = clientY - lechY;
    let thoiGianHienTai = Date.now();
    let thoiGianHienTaiDelta = thoiGianHienTai - thoiGianChuotCu;

    if (thoiGianHienTaiDelta > 0) {
        let dx = clientX - toaDoChuotCu.x;
        let dy = clientY - toaDoChuotCu.y;
        let vanToc = Math.sqrt(dx * dx + dy * dy) / thoiGianHienTaiDelta;

        if (vanToc > 2.5 && (thoiGianHienTai - thoiGianRungCu > 150)) {
            kichHoatRoiHoaCucBo(toaDoChuot.x, toaDoChuot.y, thoiGianHienTai);
            thoiGianRungCu = thoiGianHienTai;
        }
    }
    toaDoChuotCu.x = clientX; toaDoChuotCu.y = clientY;
    thoiGianChuotCu = thoiGianHienTai;
}

canvas.addEventListener('mousemove', (e) => { xuLyToaDoDiChuyen(e.clientX, e.clientY); });
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); 
    xuLyToaDoDiChuyen(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: false });

function xuLyNhanGiu() {
    let khoangCachNhoNhat = 60; 
    let ungCuVien = null;
    hoSoHoa.forEach(hoa => {
        let kc = Math.hypot(hoa.currentX - toaDoChuot.x, hoa.currentY - toaDoChuot.y);
        if (kc < khoangCachNhoNhat && !hoa.isFalling && !hoa.isDragged) {
            khoangCachNhoNhat = kc; ungCuVien = hoa;
        }
    });
    if (ungCuVien) { hoaDangGiua = ungCuVien; hoaDangGiua.isDragged = true; }
}

canvas.addEventListener('mousedown', xuLyNhanGiu);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toaDoChuot.x = e.touches[0].clientX - lechX;
    toaDoChuot.y = e.touches[0].clientY - lechY;
    xuLyNhanGiu();
}, { passive: false });

function xuLyBuongTay() {
    if (hoaDangGiua) {
        hoaDangGiua.isDragged = false;
        hoaDangGiua.isFalling = true; 
        hoaDangGiua.vy = 0; 
        hoaDangGiua.diemDungDay = 860 + Math.random() * 40; 
        hoaDangGiua.thoiDiemRung = Date.now();
        hoaDangGiua.opacity = 1;
        hoaDangGiua.gocQuayRung = Math.random() * (Math.PI / 6); 
        hoaDangGiua = null;
    }
    toaDoChuot.x = -1000; toaDoChuot.y = -1000;
}

canvas.addEventListener('mouseup', xuLyBuongTay);
canvas.addEventListener('mouseleave', xuLyBuongTay);
canvas.addEventListener('touchend', (e) => { e.preventDefault(); xuLyBuongTay(); }, { passive: false });
canvas.addEventListener('touchcancel', (e) => { e.preventDefault(); xuLyBuongTay(); }, { passive: false });

function kichHoatRoiHoaCucBo(x, y, thoiGianHienTai) {
    let hoaTrongTamVuc = hoSoHoa.filter(h => !h.isFalling && !h.isDragged && Math.hypot(h.currentX - x, h.currentY - y) < 80);
    if (hoaTrongTamVuc.length > 0) {
        let soHoaRung = Math.min(Math.floor(Math.random() * 2) + 1, hoaTrongTamVuc.length);
        for(let i = 0; i < soHoaRung; i++) {
            let hoaTuyetMenh = hoaTrongTamVuc[i];
            hoaTuyetMenh.isFalling = true; hoaTuyetMenh.vy = -3; hoaTuyetMenh.vx = (Math.random() - 0.5) * 8; 
            hoaTuyetMenh.diemDungDay = 860 + Math.random() * 40; hoaTuyetMenh.thoiDiemRung = thoiGianHienTai; hoaTuyetMenh.opacity = 1;
            let huongRoi = hoaTuyetMenh.vx > 0 ? 1 : -1;
            hoaTuyetMenh.gocQuayRung = huongRoi * (Math.PI / 12 + Math.random() * (Math.PI / 6)); 
        }
    }
}

// --- 6. HỆ THỐNG KHỞI TẠO VÀ RENDER (ĐỘNG CƠ CHÍNH) ---
function khoiTaoDuLieuHeThong(isReset = false) {
    let elGiay = document.getElementById('chonGiayGoi');
    let elChuDe = document.getElementById('chonChuDeHoa');
    let elLoai = document.getElementById('chonLoaiHoa');
    let elDang = document.getElementById('chonKieuDang');
    let elPhuKien = document.getElementById('chonPhuKien');

    let mauGiay = elGiay ? elGiay.value : 'kem';
    let chuDeHoa = elChuDe ? elChuDe.value : 'pastel';
    let loaiHoa = elLoai ? elLoai.value : 'mix';
    let kieuDang = elDang ? elDang.value : 'tron';
    let phuKien = elPhuKien ? elPhuKien.value : 'full';

    mauGiayHienTai = mauGiay;

    let bangTen = document.getElementById('ui-bang-ten');
    let noHoa = document.getElementById('ui-no-hoa');
    if (bangTen) bangTen.style.opacity = (phuKien === 'full' || phuKien === 'bang') ? '1' : '0';
    if (noHoa) noHoa.style.opacity = (phuKien === 'full' || phuKien === 'no') ? '1' : '0';

    hoSoHoa = []; hoSoCanhHoaBay = []; 
    trangThaiDongDat = false; tienTrinhDo = 0; giaTocCu = {x: 0, y: 0, z: 0};
    document.body.style.background = `radial-gradient(circle at 50% 40%, #fffcfc 0%, #f7e8ec 60%, #e6d3d8 100%)`;

    window.thiepDaHien = false;
    let elPhongThu = document.getElementById('phong-thu');
    let elModalThu = document.getElementById('modal-thu');
    if (elPhongThu) elPhongThu.classList.add('an-phong-thu');
    if (elModalThu) elModalThu.classList.add('an-modal');

    let tapHopMauAm;
    if (chuDeHoa === 'pastel') tapHopMauAm = ["#ffb6c1", "#ffc2d1", "#ffe4e1", "#f0f8ff", "#e6e6fa"]; 
    else if (chuDeHoa === 'tuongphan') tapHopMauAm = ["#ff0055", "#ffaa00", "#ff4500", "#1e90ff", "#ffd700"]; 
    else tapHopMauAm = ["#ff99aa", "#ff6b81", "#ff4d6d", "#ffb3c6", "#ff809f"]; 

    let soLuongHoa = (kieuDang === 'quat') ? 350 : 300; 
    let banKinhMax = (kieuDang === 'quat') ? 400 : 320; 
    let tyLeTrucY = (kieuDang === 'quat') ? 0.70 : 0.92;

    for (let i = 0; i < soLuongHoa; i++) {
        let banKinh = Math.sqrt(Math.random()) * banKinhMax; 
        let goc = Math.random() * 2 * Math.PI;
        let toaDoX = 400 + banKinh * Math.cos(goc);
        let toaDoY = 350 + (banKinh * tyLeTrucY) * Math.sin(goc); 
        let tyLe = Math.random() * 0.7 + 0.55; 

        let chungLoaiHoa;
        if (loaiHoa === 'mix') chungLoaiHoa = Math.floor(Math.random() * 4); 
        else if (loaiHoa === 'cuc') chungLoaiHoa = 0;
        else if (loaiHoa === 'camtucau') chungLoaiHoa = 1;
        else if (loaiHoa === 'huongduong') chungLoaiHoa = 3;
        else chungLoaiHoa = 2; 

        let mauNgauNhien;
        if (kieuDang === 'cum') {
            let chiMucMau = Math.floor((goc / (Math.PI * 2)) * tapHopMauAm.length);
            mauNgauNhien = tapHopMauAm[chiMucMau];
        } else {
            mauNgauNhien = tapHopMauAm[Math.floor(Math.random() * tapHopMauAm.length)];
        }

        let laLopTran = banKinh > (banKinhMax * 0.55) || Math.random() > 0.65;
        let kichThuocCache = 180; 
        let cacheCvs = document.createElement('canvas');
        cacheCvs.width = kichThuocCache; cacheCvs.height = kichThuocCache;
        let cacheCtx = cacheCvs.getContext('2d');
        let tamX = kichThuocCache / 2; let tamY = kichThuocCache / 2;

        if (chungLoaiHoa === 0) veHoaCuc(cacheCtx, tamX, tamY, tyLe);
        else if (chungLoaiHoa === 1) veCamTuCau(cacheCtx, tamX, tamY, tyLe);
        else if (chungLoaiHoa === 3) veHuongDuong(cacheCtx, tamX, tamY, tyLe);
        else veHoaHong(cacheCtx, tamX, tamY, tyLe, mauNgauNhien);

        hoSoHoa.push({ 
            baseX: toaDoX, baseY: toaDoY, currentX: toaDoX, currentY: toaDoY,
            vx: 0, vy: 0, phaGio: Math.random() * Math.PI * 2, tanSoGio: Math.random() * 0.5 + 0.5, 
            isOverflow: laLopTran, isFalling: false, isDragged: false, diemDungDay: 0, 
            thoiDiemRung: 0, opacity: 1, gocQuayRung: 0, isDead: false, 
            hinhAnh: cacheCvs, doLechTam: tamX 
        });
    }
    hoSoHoa.sort((a, b) => a.baseY - b.baseY);
    for (let i = 0; i < 40; i++) { hoSoCanhHoaBay.push(kienTaoThucTheBay(true)); }
    
    if (isReset) {
        let pnl = document.getElementById('menu-panel');
        if (pnl) pnl.classList.remove('show');
    }
}

const nutResetThietLap = document.getElementById('btn-reset');
if (nutResetThietLap) { nutResetThietLap.onclick = function() { khoiTaoDuLieuHeThong(true); }; }

function kienTaoThucTheBay(laKhoiTaoBanDau) {
    let loaiThucThe = Math.random() > 0.4 ? 'canhHoa' : 'hoaNhi';
    if (trangThaiDongDat && Math.random() < (tienTrinhDo * 0.8)) loaiThucThe = 'traiTim'; 
    
    return {
        x: Math.random() * canvas.width,
        y: laKhoiTaoBanDau ? Math.random() * canvas.height : -20 - Math.random() * 50,
        vx: (Math.random() - 0.5) * 1.5, vy: Math.random() * 1.5 + 0.8, 
        kichThuoc: Math.random() * 4 + 3, gocQuay: Math.random() * Math.PI * 2, tocDoQuay: (Math.random() - 0.5) * 0.05,
        mauSac: loaiThucThe === 'traiTim' ? ["#ff4d4d", "#ff1a1a", "#e60000"][Math.floor(Math.random()*3)] : ["#ffffff", "#ffb6c1", "#ffc2d1", "#8ab4f8"][Math.floor(Math.random() * 4)],
        loai: loaiThucThe
    };
}

let thoiGianFrameCu = performance.now();
function thiHanhAnDongLucHoc() {
    let thoiGianHienTaiTs = performance.now();
    let dt = thoiGianHienTaiTs - thoiGianFrameCu;
    thoiGianFrameCu = thoiGianHienTaiTs;
    
    let tyLeFrame = dt / 16.666; 
    if (tyLeFrame > 3) tyLeFrame = 3; 

    offCtx.clearRect(0, 0, offCvs.width, offCvs.height); 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (trangThaiDongDat) {
        let r = Math.floor(247 + (255 - 247) * tienTrinhDo);
        let g = Math.floor(232 + (40 - 232) * tienTrinhDo);
        let b = Math.floor(236 + (80 - 236) * tienTrinhDo);
        document.body.style.background = `radial-gradient(circle at 50% 40%, #fffcfc 0%, rgb(${r},${g},${b}) 60%, #e6d3d8 100%)`;
    }

    let thoiGian = thoiGianHienTaiTs * 0.0012; 
    let DateNow = Date.now(); 

    let khoangCachChuotDenNo = Math.hypot(toaDoChuot.x - 400, toaDoChuot.y - 600);
    if (khoangCachChuotDenNo < 120) {
        tyLeNoHoa = 1.05 + Math.sin(thoiGian * 5) * 0.03;
    } else {
        tyLeNoHoa += (1 - tyLeNoHoa) * (0.1 * tyLeFrame); 
    }

    hoSoHoa.forEach(hoa => {
        if (hoa.isDragged) {
            hoa.currentX = toaDoChuot.x; hoa.currentY = toaDoChuot.y; hoa.vx = 0; hoa.vy = 0;
        } else if (hoa.isFalling) {
            let thoiGianDaTroiQua = DateNow - hoa.thoiDiemRung;
            if (thoiGianDaTroiQua > 8000) hoa.opacity = Math.max(0, 1 - (thoiGianDaTroiQua - 8000) / 2000);
            if (thoiGianDaTroiQua > 10000) hoa.isDead = true; 

            if (hoa.currentY < hoa.diemDungDay) {
                 hoa.vy += 0.4 * tyLeFrame; 
                 hoa.vx *= Math.pow(0.96, tyLeFrame); 
                 hoa.currentX += hoa.vx * tyLeFrame; 
                 hoa.currentY += hoa.vy * tyLeFrame;
                 hoa.gocQuayRung += hoa.vx * 0.02 * tyLeFrame;
            }
            if (hoa.currentY >= hoa.diemDungDay) {
                hoa.currentY = hoa.diemDungDay; hoa.vy = 0; hoa.vx = 0;
            }
        } else {
            let gioX = (Math.sin(thoiGian * hoa.tanSoGio + hoa.phaGio) + Math.cos(thoiGian * 0.5 - hoa.phaGio)) * 6; 
            let gioY = Math.sin(thoiGian * 0.8 + hoa.phaGio * 2) * 2.5; 

            let dx = hoa.currentX - toaDoChuot.x; let dy = hoa.currentY - toaDoChuot.y;
            let khoangCach = Math.sqrt(dx * dx + dy * dy); let banKinhTuongTac = 130; 

            if (khoangCach < banKinhTuongTac && khoangCach > 0.1) {
                let tiLeDay = Math.pow((banKinhTuongTac - khoangCach) / banKinhTuongTac, 2);
                let lucDay = tiLeDay * 30; 
                hoa.vx += (dx / khoangCach) * lucDay * tyLeFrame; hoa.vy += (dy / khoangCach) * lucDay * tyLeFrame;
            }

            let mucTieuX = hoa.baseX + gioX; let mucTieuY = hoa.baseY + gioY;
            hoa.vx += (mucTieuX - hoa.currentX) * 0.05 * tyLeFrame; hoa.vy += (mucTieuY - hoa.currentY) * 0.05 * tyLeFrame;
            hoa.vx *= Math.pow(0.85, tyLeFrame); hoa.vy *= Math.pow(0.85, tyLeFrame);
            hoa.currentX += hoa.vx * tyLeFrame; hoa.currentY += hoa.vy * tyLeFrame;
        }
    });

    hoSoHoa = hoSoHoa.filter(h => !h.isDead);

    offCtx.save(); offCtx.translate(lechX, lechY);
    veGiayGoiHauCanh(offCtx);
    offCtx.lineWidth = 2.5; offCtx.strokeStyle = "#7fb87f"; 
    hoSoHoa.forEach(hoa => {
        if (!hoa.isFalling && !hoa.isDragged) {
            offCtx.beginPath(); offCtx.moveTo(400, 800); 
            offCtx.quadraticCurveTo(400, (hoa.currentY + 800) / 2, hoa.currentX, hoa.currentY); offCtx.stroke();
        }
    });
    hoSoHoa.forEach(hoa => { if (!hoa.isOverflow && !hoa.isFalling && !hoa.isDragged) offCtx.drawImage(hoa.hinhAnh, hoa.currentX - hoa.doLechTam, hoa.currentY - hoa.doLechTam); });
    
    veGiayGoiTienCanh(offCtx); veDayRuyBang(offCtx, thoiGian);

    offCtx.save(); offCtx.shadowColor = "rgba(0,0,0,0.25)"; offCtx.shadowBlur = 6; offCtx.shadowOffsetY = 4;
    hoSoHoa.forEach(hoa => { if (hoa.isOverflow && !hoa.isFalling && !hoa.isDragged) offCtx.drawImage(hoa.hinhAnh, hoa.currentX - hoa.doLechTam, hoa.currentY - hoa.doLechTam); });
    offCtx.restore();
    
    hoSoHoa.forEach(hoa => {
        if (hoa.isFalling && !hoa.isDragged) {
            offCtx.save(); offCtx.translate(hoa.currentX, hoa.currentY); offCtx.rotate(hoa.gocQuayRung); offCtx.globalAlpha = hoa.opacity;
            offCtx.drawImage(hoa.hinhAnh, -hoa.doLechTam, -hoa.doLechTam); offCtx.restore();
        }
    });

    if (hoaDangGiua) {
        offCtx.save(); offCtx.translate(hoaDangGiua.currentX, hoaDangGiua.currentY);
        offCtx.shadowColor = "rgba(0,0,0,0.4)"; offCtx.shadowBlur = 15; offCtx.shadowOffsetY = 10;
        offCtx.drawImage(hoaDangGiua.hinhAnh, -hoaDangGiua.doLechTam, -hoaDangGiua.doLechTam); offCtx.restore();
    }
    offCtx.restore(); ctx.drawImage(offCvs, 0, 0);

    let gioMoiTruong = (Math.sin(thoiGian * 0.8) + Math.cos(thoiGian * 0.5)) * 2.0; 
    hoSoCanhHoaBay.forEach((thucThe, chiMuc) => {
        thucThe.x += (thucThe.vx + gioMoiTruong + Math.sin(thucThe.y * 0.02) * 0.5) * tyLeFrame;
        thucThe.y += thucThe.vy * tyLeFrame; thucThe.gocQuay += thucThe.tocDoQuay * tyLeFrame;
        if (thucThe.y > canvas.height + 50 || thucThe.x < -50 || thucThe.x > canvas.width + 50) hoSoCanhHoaBay[chiMuc] = kienTaoThucTheBay(false);
        ctx.save(); ctx.translate(thucThe.x, thucThe.y); ctx.rotate(thucThe.gocQuay); ctx.fillStyle = thucThe.mauSac;
        if (thucThe.loai === 'traiTim') veTraiTim(ctx, thucThe.kichThuoc * 3);
        else if (thucThe.loai === 'hoaNhi') {
            for(let j=0; j<4; j++) { ctx.rotate(Math.PI / 2); ctx.beginPath(); ctx.ellipse(thucThe.kichThuoc, 0, thucThe.kichThuoc, thucThe.kichThuoc/1.5, 0, 0, 2*Math.PI); ctx.fill(); }
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; ctx.beginPath(); ctx.arc(0, 0, thucThe.kichThuoc/1.5, 0, 2*Math.PI); ctx.fill();
        } else { ctx.beginPath(); ctx.ellipse(0, 0, thucThe.kichThuoc * 1.5, thucThe.kichThuoc / 1.5, 0, 0, 2*Math.PI); ctx.fill(); }
        ctx.restore();
    });

    requestAnimationFrame(thiHanhAnDongLucHoc);
}

khoiTaoDuLieuHeThong();
thiHanhAnDongLucHoc();

const phongThu = document.getElementById('phong-thu');
const modalThu = document.getElementById('modal-thu');
const btnDongThu = document.getElementById('btn-dong-thu');

if(phongThu) {
    phongThu.addEventListener('click', () => {
        modalThu.classList.remove('an-modal'); phongThu.classList.add('an-phong-thu');
    });
}
if(btnDongThu) {
    btnDongThu.addEventListener('click', () => {
        modalThu.classList.add('an-modal'); btnCamBien.classList.remove('an-nut'); 
        btnCamBien.classList.remove('active'); tienTrinhDo = 0; window.thiepDaHien = false;
    });
}