const express = require('express');
const app = express();
app.use(express.json());

let blogs = [{ id: 1, title: '👑 THẦN ĐIỆN OMEGA // GLOBAL CHAT UPDATE', content: 'Hệ thống đã mở cổng Chat Chung toàn vũ trụ cho Admin và Member.' }];
let todos = [{ id: 1, text: 'Quản trị toàn bộ không gian và kết nối cộng đồng' }];
let globalMessages = [
    { id: 1, sender: 'tienthu', role: 'ADMIN', text: 'Chào mừng các đại đế và thành viên đến với Phòng Chat Chung Omega!', time: 'Vừa xong' }
];

let users = [
    { username: 'tienthu', password: '2012', role: 'ADMIN' }
];

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TIENTHU // OMEGA GLOBAL CHAT</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');

        :root {
            --bg-void: #000208;
            --neon-gold: #ffb700;
            --neon-cyan: #00f7ff;
            --neon-magenta: #ff0055;
            --matrix-glow: rgba(0, 247, 255, 0.4);
            --glass-card: rgba(8, 12, 24, 0.92);
        }

        * { box-sizing: border-box; }

        body {
            background-color: var(--bg-void);
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(255, 0, 85, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(0, 247, 255, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(255, 183, 0, 0.1) 0%, transparent 60%);
            color: #ffffff;
            font-family: 'Plus Jakarta Sans', sans-serif;
            margin: 0;
            padding: 30px 20px;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #authScreen {
            width: 100%;
            max-width: 500px;
            background: var(--glass-card);
            backdrop-filter: blur(35px);
            border: 2px solid var(--neon-gold);
            box-shadow: 0 0 60px rgba(255, 183, 0, 0.25), inset 0 0 20px rgba(255, 183, 0, 0.1);
            border-radius: 28px;
            padding: 40px;
            text-align: center;
            position: relative;
        }

        #mainAppScreen {
            display: none;
            width: 100%;
            max-width: 1050px;
            background: var(--glass-card);
            backdrop-filter: blur(35px);
            border: 2px solid var(--neon-cyan);
            box-shadow: 0 0 50px rgba(0, 247, 255, 0.25), 0 0 100px rgba(255, 0, 85, 0.15);
            border-radius: 28px;
            padding: 40px;
            position: relative;
        }

        .god-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 26px;
            font-weight: 900;
            letter-spacing: 3px;
            background: linear-gradient(135deg, var(--neon-gold), var(--neon-cyan), var(--neon-magenta));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 35px rgba(255, 183, 0, 0.4);
            margin-top: 0;
            margin-bottom: 25px;
            text-transform: uppercase;
        }

        .god-nav {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 8px;
            background: rgba(0, 0, 0, 0.6);
            padding: 8px;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 30px;
        }

        .god-btn {
            background: transparent;
            border: 1px solid transparent;
            color: #94a3b8;
            padding: 12px 4px;
            font-family: 'Orbitron', sans-serif;
            font-weight: 800;
            font-size: 10px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            text-align: center;
        }

        .god-btn:hover {
            color: var(--neon-cyan);
            border-color: rgba(0, 247, 255, 0.4);
            background: rgba(0, 247, 255, 0.05);
        }

        .god-btn.active {
            background: linear-gradient(135deg, rgba(0, 247, 255, 0.25), rgba(255, 0, 85, 0.25));
            border-color: var(--neon-cyan);
            color: var(--neon-cyan);
            box-shadow: 0 0 25px var(--matrix-glow);
            text-shadow: 0 0 10px var(--neon-cyan);
        }

        .god-panel {
            display: none;
            animation: supremeFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .god-panel.active {
            display: block;
        }

        @keyframes supremeFade {
            from { opacity: 0; transform: translateY(12px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        h3 {
            font-family: 'Orbitron', sans-serif;
            color: var(--neon-gold);
            font-size: 16px;
            letter-spacing: 1px;
            margin-top: 0;
            margin-bottom: 18px;
            text-shadow: 0 0 15px rgba(255, 183, 0, 0.4);
        }

        input, textarea {
            width: 100%;
            padding: 14px 18px;
            margin-bottom: 16px;
            background: rgba(2, 6, 15, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #ffffff;
            border-radius: 12px;
            box-sizing: border-box;
            font-size: 14px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            transition: all 0.3s;
        }

        input:focus, textarea:focus {
            border-color: var(--neon-cyan);
            outline: none;
            box-shadow: 0 0 25px rgba(0, 247, 255, 0.4);
        }

        textarea { resize: vertical; min-height: 100px; }

        .btn-fire {
            background: linear-gradient(135deg, var(--neon-gold), var(--neon-magenta));
            color: #000208;
            border: none;
            padding: 14px;
            font-family: 'Orbitron', sans-serif;
            font-weight: 900;
            border-radius: 12px;
            cursor: pointer;
            width: 100%;
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            transition: all 0.3s;
            box-shadow: 0 0 25px rgba(255, 183, 0, 0.4);
        }

        .btn-fire:hover {
            opacity: 0.95;
            box-shadow: 0 0 40px rgba(255, 0, 85, 0.7);
            transform: translateY(-2px);
        }

        .fire-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-left: 4px solid var(--neon-gold);
            padding: 16px;
            margin-bottom: 12px;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .fire-card b {
            font-family: 'Orbitron', sans-serif;
            color: var(--neon-cyan);
            font-size: 14px;
        }

        .fire-card p {
            color: #94a3b8;
            margin: 6px 0 0 0;
            font-size: 14px;
            line-height: 1.5;
        }

        .btn-delete {
            background: rgba(255, 0, 85, 0.2);
            border: 1px solid var(--neon-magenta);
            color: var(--neon-magenta);
            padding: 6px 12px;
            font-family: 'Orbitron', sans-serif;
            font-size: 10px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s;
        }

        .btn-delete:hover {
            background: var(--neon-magenta);
            color: #fff;
            box-shadow: 0 0 15px var(--neon-magenta);
        }

        /* KHU VỰC GLOBAL CHAT STYLING */
        .global-chat-container {
            background: rgba(2, 6, 15, 0.95);
            border: 1px solid var(--neon-gold);
            border-radius: 16px;
            height: 400px;
            overflow-y: auto;
            padding: 20px;
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            box-shadow: inset 0 0 20px rgba(255, 183, 0, 0.15);
        }

        .chat-bubble {
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 85%;
            font-size: 14px;
            line-height: 1.5;
            position: relative;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chat-bubble.admin-bubble {
            border-color: var(--neon-gold);
            background: rgba(255, 183, 0, 0.08);
            box-shadow: 0 0 15px rgba(255, 183, 0, 0.1);
        }

        .chat-sender {
            font-family: 'Orbitron', sans-serif;
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .badge-admin {
            background: var(--neon-gold);
            color: #000;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
        }

        .badge-member {
            background: var(--neon-cyan);
            color: #000;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
        }

        .portal-frame-box {
            position: relative;
            width: 100%;
            height: 500px;
            border-radius: 14px;
            overflow: hidden;
            border: 2px solid var(--neon-cyan);
            box-shadow: 0 0 35px rgba(0, 247, 255, 0.3);
            background: #000;
        }
        .portal-frame-box iframe { width: 100%; height: 100%; border: none; }

        .video-box-supreme {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%;
            height: 0;
            border-radius: 14px;
            overflow: hidden;
            border: 2px solid var(--neon-magenta);
            box-shadow: 0 0 35px rgba(255, 0, 85, 0.4);
        }
        .video-box-supreme iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }

        .auth-switch {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            background: rgba(0,0,0,0.5);
            padding: 6px;
            border-radius: 12px;
        }
        .auth-tab-btn {
            flex: 1;
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 10px;
            font-family: 'Orbitron', sans-serif;
            font-weight: 700;
            font-size: 11px;
            border-radius: 8px;
            cursor: pointer;
        }
        .auth-tab-btn.active {
            background: rgba(255, 183, 0, 0.2);
            color: var(--neon-gold);
            border: 1px solid var(--neon-gold);
        }
    </style>
</head>
<body>

    <!-- MÀN HÌNH ĐĂNG NHẬP / ĐĂNG KÝ -->
    <div id="authScreen">
        <h1 class="god-title">⚡ CỔNG OMEGA CHAT ⚡</h1>
        <p style="color: #94a3b8; font-size: 13px; margin-bottom: 25px;">Đăng nhập để tham gia phòng chat chung cùng Admin (<b style="color:var(--neon-gold)">tienthu / 2012</b>).</p>
        
        <div class="auth-switch">
            <button class="auth-tab-btn active" id="tabLogin" onclick="switchAuthMode('login')">ĐĂNG NHẬP</button>
            <button class="auth-tab-btn" id="tabRegister" onclick="switchAuthMode('register')">ĐĂNG KÝ MỚI</button>
        </div>

        <div id="loginFormSection">
            <input type="text" id="lUser" placeholder="Tên tài khoản..." value="tienthu">
            <input type="password" id="lPass" placeholder="Mật khẩu..." value="2012">
            <button class="btn-fire" onclick="loginAcc()">Vào Phòng Chat</button>
        </div>

        <div id="registerFormSection" style="display:none;">
            <input type="text" id="rUser" placeholder="Tên tài khoản mới...">
            <input type="password" id="rPass" placeholder="Mật khẩu bảo mật...">
            <button class="btn-fire" onclick="registerAcc()" style="background: linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta));">Đăng Ký Thành Viên</button>
        </div>

        <div id="authStatus" style="margin-top: 15px; font-family:'Orbitron'; font-size: 12px; color: var(--neon-gold);"></div>
    </div>

    <!-- GIAO DIỆN CHÍNH THẦN ĐIỆN OMEGA -->
    <div id="mainAppScreen">
        <h1 class="god-title" id="welcomeUserTitle">⚡ OMEGA SYSTEM // CHAT CHUNG ⚡</h1>
        
        <div class="god-nav">
            <button class="god-btn active" id="btn1" onclick="switchGodTab(1)">BẢNG TIN</button>
            <button class="god-btn" id="btn2" onclick="switchGodTab(2)">NHIỆM VỤ</button>
            <button class="god-btn" id="btn3" onclick="switchGodTab(3)">CHAT CHUNG</button>
            <button class="god-btn" id="btn4" onclick="switchGodTab(4)">TÀI KHOẢN</button>
            <button class="god-btn" id="btn5" onclick="switchGodTab(5)">TIENTHUDC</button>
            <button class="god-btn" id="btn6" onclick="switchGodTab(6)">ÂM NHẠC</button>
        </div>

        <!-- TAB 1: BẢNG TIN -->
        <div class="god-panel active" id="panel1">
            <h3>// QUẢN TRỊ BẢNG TIN & THÔNG ĐIỆP</h3>
            <input type="text" id="bTitle" placeholder="Tiêu đề thông điệp vũ trụ...">
            <textarea id="bContent" placeholder="Nhập nội dung dữ liệu thần điện..."></textarea>
            <button class="btn-fire" onclick="addBlog()">Phát Sóng Vũ Trụ</button>
            <div id="blogList" style="margin-top: 20px;"></div>
        </div>

        <!-- TAB 2: NHIỆM VỤ -->
        <div class="god-panel" id="panel2">
            <h3>// QUẢN TRỊ TÁC VỤ THẦN TỐC</h3>
            <div style="display: flex; gap: 12px;">
                <input type="text" id="tText" placeholder="Thêm quy trình/nhiệm vụ..." style="margin-bottom:0;">
                <button class="btn-fire" onclick="addTodo()" style="width: 150px; margin:0;">Thêm Task</button>
            </div>
            <div id="todoList" style="margin-top: 20px;"></div>
        </div>

        <!-- TAB 3: KHU VỰC CHAT CHUNG (GLOBAL CHAT ROOM) -->
        <div class="god-panel" id="panel3">
            <h3>// PHÒNG TRÒ CHUYỆN TOÀN CẦU (ADMIN & MEMBER)</h3>
            <div class="global-chat-container" id="globalChatHistory">
                <!-- Nội dung tin nhắn sẽ load ở đây -->
            </div>
            <div style="display: flex; gap: 10px;">
                <input type="text" id="globalChatInput" placeholder="Nhập nội dung trò chuyện cùng mọi người..." style="margin-bottom:0;" onkeypress="if(event.key==='Enter') sendGlobalMessage()">
                <button class="btn-fire" onclick="sendGlobalMessage()" style="width: 140px; margin:0;">Gửi Tin</button>
            </div>
        </div>

        <!-- TAB 4: TÀI KHOẢN -->
        <div class="god-panel" id="panel4">
            <h3>// TRUNG TÂM ĐIỀU KHIỂN TÀI KHOẢN</h3>
            <div style="background: rgba(0,0,0,0.5); padding: 25px; border-radius: 16px; border: 1px solid var(--neon-gold); text-align: center;">
                <p style="color: #94a3b8; font-size: 14px;">Tài khoản hiện tại: <span id="currentAccountBadge" style="color: var(--neon-gold); font-weight:bold;">tienthu (ADMIN)</span></p>
                <button class="btn-fire" onclick="logoutAcc()" style="background: linear-gradient(135deg, var(--neon-magenta), #ff0055); margin-top: 15px; max-width: 250px;">Đăng Xuất</button>
            </div>
        </div>

        <!-- TAB 5: TIENTHUDC PORTAL -->
        <div class="god-panel" id="panel5">
            <h3>// CỔNG KHÔNG GIAN TIENTHUDC (GITHUB PAGES)</h3>
            <div class="portal-frame-box">
                <iframe src="https://tangtienthu703-lang.github.io/tienthudc/"></iframe>
            </div>
        </div>

        <!-- TAB 6: ÂM NHẠC -->
        <div class="god-panel" id="panel6">
            <h3>// TRÌNH PHÁT NHẠC KHÁNG LỰC</h3>
            <div class="video-box-supreme">
                <iframe src="https://www.youtube.com/embed/fTXd-DpN3AI" allowfullscreen></iframe>
            </div>
        </div>
    </div>

    <script>
        let loggedInUser = '';
        let userRole = '';

        function switchAuthMode(mode) {
            if(mode === 'login') {
                document.getElementById('tabLogin').classList.add('active');
                document.getElementById('tabRegister').classList.remove('active');
                document.getElementById('loginFormSection').style.display = 'block';
                document.getElementById('registerFormSection').style.display = 'none';
            } else {
                document.getElementById('tabRegister').classList.add('active');
                document.getElementById('tabLogin').classList.remove('active');
                document.getElementById('registerFormSection').style.display = 'block';
                document.getElementById('loginFormSection').style.display = 'none';
            }
            document.getElementById('authStatus').innerText = '';
        }

        async function registerAcc() {
            let u = document.getElementById('rUser').value;
            let p = document.getElementById('rPass').value;
            if(!u || !p) return alert('Vui lòng điền đủ thông tin đăng ký!');
            let res = await fetch('/api/register', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username: u, password: p})});
            let data = await res.json();
            document.getElementById('authStatus').innerText = data.msg;
            if(data.success) {
                setTimeout(() => switchAuthMode('login'), 1000);
            }
        }

        async function loginAcc() {
            let u = document.getElementById('lUser').value;
            let p = document.getElementById('lPass').value;
            if(!u || !p) return alert('Vui lòng điền đủ thông tin đăng nhập!');
            let res = await fetch('/api/login', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username: u, password: p})});
            let data = await res.json();
            
            if(data.success) {
                loggedInUser = data.username;
                userRole = data.role;
                document.getElementById('authScreen').style.display = 'none';
                document.getElementById('mainAppScreen').style.display = 'block';
                document.getElementById('welcomeUserTitle').innerText = '⚡ OMEGA SYSTEM // ' + userRole + ': ' + loggedInUser.toUpperCase() + ' ⚡';
                document.getElementById('currentAccountBadge').innerText = loggedInUser + ' (' + userRole + ')';
                loadBlogs();
                loadGlobalChat();
            } else {
                document.getElementById('authStatus').innerText = data.msg;
            }
        }

        function logoutAcc() {
            loggedInUser = '';
            userRole = '';
            document.getElementById('mainAppScreen').style.display = 'none';
            document.getElementById('authScreen').style.display = 'block';
            document.getElementById('authStatus').innerText = 'Đã ngắt kết nối an toàn.';
        }

        function switchGodTab(index) {
            for(let i = 1; i <= 6; i++) {
                let b = document.getElementById('btn' + i);
                let p = document.getElementById('panel' + i);
                if(b) b.classList.remove('active');
                if(p) p.classList.remove('active');
            }
            document.getElementById('btn' + index).classList.add('active');
            document.getElementById('panel' + index).classList.add('active');

            if(index === 1) loadBlogs();
            if(index === 2) loadTodos();
            if(index === 3) loadGlobalChat();
        }

        async function loadBlogs() {
            let res = await fetch('/api/blogs');
            let data = await res.json();
            document.getElementById('blogList').innerHTML = data.map(b => {
                let deleteBtn = (userRole === 'ADMIN') ? '<button class="btn-delete" onclick="deleteBlog(' + b.id + ')">XÓA BÀI</button>' : '';
                return '<div class="fire-card"><div><b>' + b.title + '</b><p>' + b.content + '</p></div>' + deleteBtn + '</div>';
            }).join('');
        }

        async function addBlog() {
            let title = document.getElementById('bTitle').value;
            let content = document.getElementById('bContent').value;
            if(!title || !content) return alert('Yêu cầu nhập đầy đủ tiêu đề và nội dung!');
            await fetch('/api/blogs', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({title, content, author: loggedInUser})});
            document.getElementById('bTitle').value = '';
            document.getElementById('bContent').value = '';
            loadBlogs();
        }

        async function deleteBlog(id) {
            if(!confirm('Bạn có chắc chắn muốn xóa bài đăng này không?')) return;
            await fetch('/api/blogs/' + id, {method: 'DELETE'});
            loadBlogs();
        }

        async function loadTodos() {
            let res = await fetch('/api/todos');
            let data = await res.json();
            document.getElementById('todoList').innerHTML = data.map(t => 
                '<div class="fire-card" style="display:flex; align-items:center;"><span>🔥 ' + t.text + '</span></div>'
            ).join('');
        }

        async function addTodo() {
            let text = document.getElementById('tText').value;
            if(!text) return alert('Yêu cầu nhập tên nhiệm vụ!');
            await fetch('/api/todos', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({text})});
            document.getElementById('tText').value = '';
            loadTodos();
        }

        // --- GLOBAL CHAT FUNCTIONS ---
        async function loadGlobalChat() {
            let res = await fetch('/api/chat');
            let data = await res.json();
            let chatBox = document.getElementById('globalChatHistory');
            chatBox.innerHTML = data.map(m => {
                let isAdmin = m.role === 'ADMIN';
                let badgeClass = isAdmin ? 'badge-admin' : 'badge-member';
                let bubbleClass = isAdmin ? 'chat-bubble admin-bubble' : 'chat-bubble';
                return \`<div class="\${bubbleClass}">
                    <div class="chat-sender">\${m.sender} <span class="\${badgeClass}">\${m.role}</span> <span style="color:#64748b; font-weight:normal; font-size:10px; margin-left:auto;">\${m.time}</span></div>
                    <div style="color: #fff;">\${m.text}</div>
                </div>\`;
            }).join('');
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        async function sendGlobalMessage() {
            let input = document.getElementById('globalChatInput');
            let text = input.value.trim();
            if(!text) return;

            await fetch('/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ sender: loggedInUser, role: userRole, text })
            });

            input.value = '';
            loadGlobalChat();
        }

        // Tự động làm mới chat mỗi 3 giây để cập nhật tin nhắn từ người khác
        setInterval(() => {
            if(document.getElementById('panel3').classList.contains('active')) {
                loadGlobalChat();
            }
        }, 3000);
    </script>
</body>
</html>`);
});

app.get('/api/blogs', (req, res) => res.json(blogs));
app.post('/api/blogs', (req, res) => {
    blogs.unshift({ id: Date.now(), title: req.body.title, content: req.body.content + ' (Đăng bởi: ' + (req.body.author || 'Thành viên') + ')' });
    res.json({ success: true });
});

app.delete('/api/blogs/:id', (req, res) => {
    let id = parseInt(req.params.id);
    blogs = blogs.filter(b => b.id !== id);
    res.json({ success: true });
});

app.get('/api/todos', (req, res) => res.json(todos));
app.post('/api/todos', (req, res) => {
    todos.unshift({ id: Date.now(), text: req.body.text });
    res.json({ success: true });
});

// API Chat Chung
app.get('/api/chat', (req, res) => res.json(globalMessages));
app.post('/api/chat', (req, res) => {
    let { sender, role, text } = req.body;
    let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    globalMessages.push({ id: Date.now(), sender, role, text, time });
    res.json({ success: true });
});

app.post('/api/register', (req, res) => {
    let { username, password } = req.body;
    if(users.some(x => x.username === username)) {
        return res.json({ success: false, msg: '❌ Tài khoản đã tồn tại trong hệ thống!' });
    }
    users.push({ username, password, role: 'MEMBER' });
    res.json({ success: true, msg: '⚡ Đăng ký thành công! Hãy chuyển sang Đăng nhập.' });
});

app.post('/api/login', (req, res) => {
    let { username, password } = req.body;
    let found = users.find(x => x.username === username && x.password === password);
    if(found) {
        res.json({ success: true, username: found.username, role: found.role, msg: '👑 Đăng nhập thành công!' });
    } else {
        res.json({ success: false, msg: '❌ Sai tài khoản hoặc mật khẩu lượng tử!' });
    }
});

app.listen(3000, () => console.log('🔥 Thần Điện Omega Global Chat chạy tại http://localhost:3000'));