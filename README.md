# Dịch Tiếng Anh - YouTube CC Translator v3.1

Chrome Extension dịch phụ đề YouTube CC sang tiếng Việt real-time + đọc TTS.

## Tính năng
- 🎬 **YouTube CC Mode** — Tự động đọc phụ đề CC đang hiển thị trên YouTube
- 🌐 **Google Translate** — Dịch phụ đề sang tiếng Việt real-time
- 🔊 **Text-to-Speech** — Tự động đọc bản dịch tiếng Việt (Web Speech API + Google TTS fallback)
- 🎚️ **Điều chỉnh tốc độ đọc** — Từ 0.5x đến 2x
- 🖱️ **Cửa sổ nổi kéo thả** — Giao diện floating draggable

## Cách sử dụng
1. Cài extension vào Chrome (Developer Mode → Load Unpacked)
2. Mở video YouTube có phụ đề (CC)
3. Bấm icon extension trên thanh toolbar
4. Bấm nút **YouTube CC** để bắt đầu dịch phụ đề

## Cấu trúc file
| File | Mô tả |
|------|-------|
| `manifest.json` | Cấu hình extension |
| `background.js` | Service worker - proxy TTS |
| `content.js` | UI + CC Observer + TTS |
| `style.css` | Giao diện cửa sổ nổi |

## API sử dụng (miễn phí, không cần key)
- **Google Translate API** (`translate.googleapis.com`) — Dịch văn bản
- **Google TTS API** (`translate.googleapis.com/translate_tts`) — Text-to-Speech fallback
- **Web Speech API** — TTS native trên trình duyệt (ưu tiên)

## Lưu ý
- Chỉ hoạt động trên YouTube
- Cần bật phụ đề CC trên video trước khi sử dụng
- Không cần API key nào
