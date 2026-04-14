// === Background Service Worker ===
// Chỉ giữ lại chức năng YouTube CC + Google Translate + TTS Proxy
// Đã bỏ toàn bộ Groq Whisper API

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.target === 'background') {
        if (message.type === 'fetch_tts') {
            proxyFetchTTS(message.text, sender.tab.id);
        }
    }
});

chrome.action.onClicked.addListener((tab) => {
    if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { target: 'content', type: 'toggle_ui' }).catch(e => {});
    }
});

// Proxy Fetch Google TTS để né chặn CORS (Lỗi 403) trên trang web (VD: YouTube)
async function proxyFetchTTS(text, tabId) {
    const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi&client=gtx`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                chrome.tabs.sendMessage(tabId, {
                    target: 'content',
                    type: 'play_proxied_tts',
                    audioDataUrl: reader.result
                }).catch(e=>{});
            };
            reader.readAsDataURL(blob);
        } else {
            chrome.tabs.sendMessage(tabId, { target: 'content', type: 'tts_proxy_error' }).catch(e=>{});
        }
    } catch(e) {
        chrome.tabs.sendMessage(tabId, { target: 'content', type: 'tts_proxy_error' }).catch(e=>{});
    }
}
