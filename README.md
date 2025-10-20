# 🎮 Tic-Tac-Toe Multiplayer Game

Một trò chơi Tic-Tac-Toe (X-O) multiplayer real-time được xây dựng với React và WebSocket.

![Game Preview](https://i.ibb.co/7kxyMb4/Screenshot-from-2022-05-12-01-32-13.png)

## ✨ Tính năng

- 🎯 **Game 2 người chơi** - X và O
- 🌐 **Multiplayer real-time** - Chơi với bạn bè qua WebSocket
- 📱 **Responsive design** - Giao diện đẹp mắt, tương thích mọi thiết bị
- 🔄 **Tự động chuyển lượt** - Game tự động chuyển lượt giữa 2 người chơi
- 🏆 **Phát hiện thắng thua** - Tự động phát hiện người thắng cuộc hoặc hòa
- 🔁 **Nút Restart** - Chơi lại game mới bất cứ lúc nào
- 📊 **Hiển thị trạng thái** - Biết được lượt của ai và trạng thái game

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18.1.0** - UI framework
- **React Hooks** - State management (useState, useEffect, useRef, useCallback)
- **CSS3** - Styling và responsive design
- **WebSocket API** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **WebSocket (ws)** - Real-time server
- **Nodemon** - Development tool

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

### Bước 1: Clone repository
```bash
git clone <repository-url>
cd tic-tac-toe
```

### Bước 2: Cài đặt dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../tic-tac-toe
npm install
```

### Bước 3: Chạy dự án

**Terminal 1 - Khởi động Backend Server:**
```bash
cd server
npm start
```
Server sẽ chạy trên port `8081`

**Terminal 2 - Khởi động Frontend:**
```bash
cd tic-tac-toe
npm start
```
Frontend sẽ chạy trên port `3000` (mặc định)

### Bước 4: Chơi game
1. Mở trình duyệt và truy cập `http://localhost:3000`
2. Mở thêm một tab/window khác với cùng URL để tạo người chơi thứ 2
3. Bắt đầu chơi!

## 🎮 Cách chơi

1. **Người chơi đầu tiên** sẽ được gán ký hiệu **X**
2. **Người chơi thứ hai** sẽ được gán ký hiệu **O**
3. **Lần lượt click** vào các ô vuông để đánh dấu
4. **Mục tiêu:** Tạo được 3 dấu liên tiếp theo hàng ngang, dọc, hoặc chéo
5. **Thắng cuộc:** Ai có 3 dấu liên tiếp trước sẽ thắng
6. **Hòa:** Nếu tất cả 9 ô đều được đánh dấu mà không ai thắng

## 📁 Cấu trúc dự án

```
tic-tac-toe/
├── server/                 # Backend WebSocket server
│   ├── index.js           # Server chính
│   ├── package.json       # Dependencies backend
│   └── node_modules/      # Backend dependencies
├── tic-tac-toe/           # Frontend React app
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Game.js    # Component chính quản lý game
│   │   │   ├── Board.js   # Component bảng 3x3
│   │   │   └── Square.js  # Component ô vuông đơn lẻ
│   │   ├── App.js         # App component
│   │   ├── App.css        # Styles
│   │   └── index.js       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── node_modules/      # Frontend dependencies
└── README.md              # File này
```

## 🔧 API WebSocket

### Client → Server

**Kết nối:**
```javascript
{
  type: 'prepare'
}
```

**Di chuyển:**
```javascript
{
  type: 'move',
  data: {
    roomId: 'room_id',
    squares: ['X', 'O', null, ...],
    nextPlayer: 'X' // hoặc 'O'
  }
}
```

### Server → Client

**Bắt đầu game:**
```javascript
{
  type: 'start',
  data: {
    player: 'X', // hoặc 'O'
    roomId: 'room_id'
  }
}
```

**Cập nhật game:**
```javascript
{
  type: 'display',
  data: {
    squares: ['X', 'O', null, ...],
    nextPlayer: 'X' // hoặc 'O'
  }
}
```

## 🎯 Luồng hoạt động

1. **Kết nối:** Client kết nối WebSocket và gửi message `prepare`
2. **Tạo phòng:** Server tạo room và gán người chơi X hoặc O
3. **Chơi game:** 
   - Người chơi click vào ô → gửi move qua WebSocket
   - Server broadcast move cho cả 2 người chơi
   - Cập nhật UI real-time
4. **Kết thúc:** Hiển thị người thắng hoặc hòa

## 🐛 Troubleshooting

### Backend không chạy được
- Kiểm tra port 8081 có bị chiếm không: `netstat -an | findstr :8081`
- Thử chạy lại: `cd server && npm start`

### Frontend không kết nối được
- Đảm bảo backend đã chạy trước
- Kiểm tra console browser có lỗi WebSocket không
- Thử refresh trang

### Game không hoạt động
- Mở 2 tab/window khác nhau
- Kiểm tra cả 2 tab đều hiển thị "Your turn" hoặc "Please wait"

## 📝 Scripts có sẵn

### Backend
- `npm start` - Chạy server production
- `npm run dev` - Chạy server với nodemon (auto-restart)

### Frontend
- `npm start` - Chạy development server
- `npm run build` - Build production
- `npm test` - Chạy tests
- `npm run eject` - Eject CRA (không khuyến khích)

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

## 📄 License

Dự án này được phát hành dưới [MIT License](LICENSE).

## 👨‍💻 Tác giả

**Dua Tran** - [@trancaodua](https://github.com/trancaodua)

---

⭐ **Nếu dự án hữu ích, hãy cho một star!** ⭐
