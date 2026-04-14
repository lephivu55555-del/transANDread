const ICONS = {
  settings: '<svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>',
  vol: '<svg viewBox="0 0 24 24"><path d="M3,9v6h4l5,5V4L7,9H3z M16.5,12c0-1.77-1.02-3.29-2.5-4.03v8.05C15.48,15.29,16.5,13.77,16.5,12z M14,3.23v2.06c2.89,0.86,5,3.54,5,6.71s-2.11,5.85-5,6.71v2.06c4.01-0.91,7-4.49,7-8.77S18.01,4.14,14,3.23z"/></svg>',
  mic: '<svg viewBox="0 0 24 24"><path d="M12,14c1.66,0,2.99-1.34,2.99-3L15,5c0-1.66-1.34-3-3-3S9,3.34,9,5v6C9,12.66,10.34,14,12,14z M17.3,11c0,3-2.54,5.1-5.3,5.1S6.7,14,6.7,11H5c0,3.41,2.72,6.23,6,6.72V21h2v-3.28c3.28-0.48,6-3.3,6-6.72H17.3z"/></svg>',
  stopSquare: '<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="1.5" ry="1.5"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41z"/></svg>',
  caption: '<svg viewBox="0 0 24 24" width="14" height="14" style="margin-right:4px"><path d="M19,4H5C3.89,4,3,4.9,3,6v12c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,18H5V6h14V18z M7,15h3c0.55,0,1-0.45,1-1v-1H9.5v0.5h-2v-3h2V11H11v-1c0-0.55-0.45-1-1-1H7C6.45,9,6,9.45,6,10v4C6,14.55,6.45,15,7,15z M14,15h3c0.55,0,1-0.45,1-1v-1h-1.5v0.5h-2v-3h2V11H18v-1c0-0.55-0.45-1-1-1h-3c-0.55,0-1,0.45-1,1v4C13,14.55,13.45,15,14,15z"/></svg>',
  minimize: '<svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z" fill="currentColor"/></svg>',
  maximize: '<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/></svg>'
};

const MAX_SUBTITLE_LINES = 30; // Giữ tối đa 30 dòng phụ đề

function createTranslationUI() {
    if (document.getElementById("dich-main-window")) return;

    const htmlString = `
      <div id="dich-main-window">
        <div id="dich-header">
          <div id="dich-header-left">
            <span>
                <div class="dich-dot stopped" id="dich-status-dot"></div> 
                <span id="dich-status-text">Chờ lệnh</span>
            </span>
          </div>
          <div id="dich-header-center">
             <button class="dich-btn-primary" style="background:#f97316" title="Đọc Phụ đề CC từ Youtube" id="dich-btn-cc">${ICONS.caption} YouTube CC</button>
             <button class="dich-icon-btn active" id="dich-btn-stop" style="margin-left: 4px">${ICONS.stopSquare}</button>
          </div>
          <div id="dich-header-right">
             <button class="dich-icon-btn" title="Thu nhỏ" id="dich-btn-min">${ICONS.minimize}</button>
             <button class="dich-icon-btn" title="Đóng" id="dich-btn-close">${ICONS.close}</button>
          </div>
        </div>
        <div id="dich-tools" style="display: flex; gap: 8px; padding: 6px 12px; background: rgba(40,40,45,0.95); border-bottom: 1px solid rgba(255,255,255,0.06); align-items: center; font-size: 12px; color: #ccc;">
            <span>Tốc độ: <span id="dich-speed-val">1.0</span>x</span>
            <input type="range" id="dich-speed" min="0.5" max="2" value="1" step="0.1" style="width: 60px;">
            <button class="dich-btn-primary" id="dich-btn-stop-tts" style="background:#ef4444; padding: 2px 8px; margin-left: auto;">Stop Đọc</button>
        </div>
        <div id="dich-body">
          <div id="dich-subtitle-list"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', htmlString);
    
    // Thêm dòng chào mừng
    addSubtitleLine("Nhấn YouTube CC để quét phụ đề đang hiển thị.", "Welcome!");
    
    setupDraggable();
    setupControls();
    initTTS();
}

let isTtsMuted = false;

function initTTS() {
    document.getElementById("dich-speed").oninput = (e) => {
        document.getElementById("dich-speed-val").textContent = parseFloat(e.target.value).toFixed(1);
    };
    
    const btnStopTts = document.getElementById("dich-btn-stop-tts");
    btnStopTts.onclick = () => {
        // Tắt âm thanh mạng và huỷ đọc
        extAudioQueue = [];
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        isSpeakingNow = false;
        
        isTtsMuted = !isTtsMuted;
        if (isTtsMuted) {
            btnStopTts.innerHTML = "🔇 Bật Lại Đọc";
            btnStopTts.style.background = "#6b7280"; // Màu xám khi Mute
            btnStopTts.title = "Đang tắt âm. Nhấn để bật lại.";
        } else {
            btnStopTts.innerHTML = "🔊 Stop Đọc";
            btnStopTts.style.background = "#ef4444"; // Màu đỏ lại
            btnStopTts.title = "Đang tự động đọc. Nhấn để tắt miệng AI.";
        }
    };
}

// === HỆ THỐNG PHÁT ÂM THANH MẠNG TỐI ƯU =================
let extAudioQueue = [];
let isSpeakingNow = false;
let nativeVoice = null;
let currentUtterance = null; // Tránh lỗi Chrome rác garbage collection
let extCurrentAudio = null;

// Lấy danh sách giọng chuẩn Tiếng Việt
function loadNativeVoices() {
    if (!('speechSynthesis' in window)) return;
    let voices = window.speechSynthesis.getVoices();
    nativeVoice = voices.find(v => v.lang === 'vi-VN' || v.lang.includes('vi') || v.name.includes('Vietnamese') || v.name.includes('Việt'));
}

if ('speechSynthesis' in window) {
    loadNativeVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadNativeVoices;
    }
}

// Hàm chia nhỏ câu dài ra (do Google API và SpeechSynthesis bị giật/lỗi nếu quá dài)
function splitTextToChunks(text, maxLen = 150) {
    if (text.length <= maxLen) return [text];
    const chunks = [];
    const sentences = text.match(/[^.!?;,]+[.!?;,]?/g) || [text];
    let current = '';
    for (const sentence of sentences) {
        if ((current + sentence).length > maxLen && current.length > 0) {
            chunks.push(current.trim());
            current = sentence;
        } else {
            current += sentence;
        }
    }
    if (current.trim().length > 0) chunks.push(current.trim());
    return chunks;
}

function playExtAudioQueue() {
    if (isSpeakingNow || extAudioQueue.length === 0) return;
    
    let text = extAudioQueue.shift();
    if (!text || text.trim().length < 2) {
        playExtAudioQueue();
        return;
    }

    isSpeakingNow = true;

    // Ưu tiên 1: Web Speech API (Đọc chuẩn, tự nhiên, không bị limit)
    if ('speechSynthesis' in window) {
        loadNativeVoices(); // Cập nhật lại list giọng
        if (nativeVoice) {
            currentUtterance = new SpeechSynthesisUtterance(text);
            currentUtterance.lang = 'vi-VN';
            currentUtterance.voice = nativeVoice;
            currentUtterance.rate = parseFloat(document.getElementById("dich-speed").value) || 1;
            
            currentUtterance.onend = () => {
                isSpeakingNow = false;
                setTimeout(playExtAudioQueue, 50); // Mượt hơn
            };
            
            currentUtterance.onerror = (e) => {
                console.warn("SpeechSynthesis error:", e);
                isSpeakingNow = false;
                setTimeout(playExtAudioQueue, 50);
            };

            window.speechSynthesis.speak(currentUtterance);
            
            // Fix bug âm thanh tắt giữa chừng trên Chrome
            let resumeInterval = setInterval(() => {
                if (!isSpeakingNow) { clearInterval(resumeInterval); return; }
                if (window.speechSynthesis.paused) window.speechSynthesis.resume();
            }, 8000);
            return;
        }
    }
    
    // Ưu tiên 2: Cứu hộ qua Google TTS gốc thông qua Background fetch (né lỗi 403 CORS ở YouTube / Không bị Autoplay chặn cứng)
    chrome.runtime.sendMessage({
        target: 'background',
        type: 'fetch_tts',
        text: text
    });
    // Hàm này sẽ tiếp tục chạy thông qua Event Listener ở bên dưới ngay khi lấy được Audio Data.
}

// (Event Listener for proxied audio is moved to the global listener below)


function speakText(text) {
    if (isTtsMuted) return; 

    // Tẩy rác ẩn, emoji
    let cleanText = text.replace(/<[^>]*>/g, '').replace(/[🔒✅❌⏳🎤👀🛶😂🔊🎙️]/g, '').trim();
    if (cleanText.length < 2) return;

    let chunks = splitTextToChunks(cleanText);
    extAudioQueue.push(...chunks);
    playExtAudioQueue();
}

function buildHtmlFromData(viData, enData) {
    if (Array.isArray(viData)) {
        let html = '';
        viData.forEach(pair => {
            html += `<div class="dich-sub-pair" style="margin-bottom: 12px; border-bottom: 1px dotted rgba(255,255,255,0.1); padding-bottom: 8px;">
                        <div class="dich-sub-vi">${pair.vi}</div>
                        <div class="dich-sub-en" style="margin-top: 4px;">${pair.en}</div>
                     </div>`;
        });
        return html;
    } else {
        return `
            <div class="dich-sub-vi">${viData}</div>
            <div class="dich-sub-en" style="margin-top: 4px;">${enData}</div>
        `;
    }
}

// === Audio Mode Subtitles ===
// Thêm 1 dòng phụ đề mới (trôi từ dưới lên)
function addSubtitleLine(viText, enText) {
    const list = document.getElementById("dich-subtitle-list");
    if (!list) return;

    const oldLines = list.querySelectorAll('.dich-sub-line:not(.faded)');
    oldLines.forEach(line => line.classList.add('faded'));

    const lineEl = document.createElement('div');
    lineEl.className = 'dich-sub-line';
    lineEl.innerHTML = buildHtmlFromData(viText, enText);
    list.appendChild(lineEl);

    while (list.children.length > MAX_SUBTITLE_LINES) {
        list.removeChild(list.firstChild);
    }
    document.getElementById("dich-body").scrollTop = document.getElementById("dich-body").scrollHeight;
}

// Cập nhật dòng phụ đề cuối cùng (dùng khi update cùng 1 câu)
function updateLastSubtitleLine(viText, enText) {
    const list = document.getElementById("dich-subtitle-list");
    if (!list || list.children.length === 0) {
        addSubtitleLine(viText, enText);
        return;
    }
    const lastLine = list.lastElementChild;
    lastLine.innerHTML = buildHtmlFromData(viText, enText);
    
    document.getElementById("dich-body").scrollTop = document.getElementById("dich-body").scrollHeight;
}

// === CC Mode Subtitles ===
function addDomPair(id, viData, enData) {
    const list = document.getElementById("dich-subtitle-list");
    if (!list) return;

    const oldLines = list.querySelectorAll('.dich-sub-line:not(.faded)');
    oldLines.forEach(line => line.classList.add('faded'));

    const el = document.createElement('div');
    el.className = 'dich-sub-line';
    el.id = 'dich-sub-cc-' + id;
    el.style.marginBottom = '12px';
    el.style.borderBottom = '1px dotted rgba(255,255,255,0.1)';
    el.style.paddingBottom = '8px';
    
    el.innerHTML = `
        <div class="dich-sub-vi">${viData}</div>
        <div class="dich-sub-en" style="margin-top: 4px;">${enData}</div>
    `;
    list.appendChild(el);

    while (list.children.length > MAX_SUBTITLE_LINES) list.removeChild(list.firstChild);
    document.getElementById("dich-body").scrollTop = document.getElementById("dich-body").scrollHeight;
}

function updateDomPair(id, viData, enData) {
    const el = document.getElementById('dich-sub-cc-' + id);
    if (el) {
        el.querySelector('.dich-sub-vi').innerHTML = viData;
        el.querySelector('.dich-sub-en').innerHTML = enData;
        el.classList.remove('faded'); 
        document.getElementById("dich-body").scrollTop = document.getElementById("dich-body").scrollHeight;
    } else {
        addDomPair(id, viData, enData);
    }
}

function setupDraggable() {
    const elmnt = document.getElementById("dich-main-window");
    const header = document.getElementById("dich-header");
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.closest('button')) return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        let newTop = elmnt.offsetTop - pos2;
        let newLeft = elmnt.offsetLeft - pos1;
        
        // Giới hạn không cho kéo ra ngoài màn hình (đặc biệt là cạnh trên)
        const minTop = 50; // Tránh chui dưới thanh công cụ/thanh địa chỉ
        const maxTop = window.innerHeight - 42; // Chừa lại ít nhất phần header
        const maxLeft = window.innerWidth - 60; // Chừa lại ít nhất 60px để nắm
        const minLeft = -elmnt.offsetWidth + 60;
        
        newTop = Math.max(minTop, Math.min(newTop, maxTop));
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));

        elmnt.style.top = newTop + "px";
        elmnt.style.left = newLeft + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// ---------------------- Chế độ đọc CC Youtube ---------------------- //

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.target === 'content') {
        if (msg.type === 'toggle_ui') {
            const mw = document.getElementById("dich-main-window");
            if (mw) {
                if (mw.classList.contains("hidden")) mw.classList.remove("hidden");
                else mw.classList.add("hidden");
            } else {
                initDichUI();
            }
        }
        
        if (msg.type === 'play_proxied_tts') {
            extCurrentAudio = new Audio(msg.audioDataUrl);
            extCurrentAudio.playbackRate = parseFloat(document.getElementById("dich-speed").value) || 1;
            
            extCurrentAudio.onended = () => {
                isSpeakingNow = false;
                extCurrentAudio = null;
                setTimeout(playExtAudioQueue, 50);
            };
            extCurrentAudio.onerror = () => {
                isSpeakingNow = false;
                extCurrentAudio = null;
                setTimeout(playExtAudioQueue, 50);
            };
            extCurrentAudio.play().catch(e => {
                console.warn("Background proxy fetched audio but blocked by autoplay:", e);
                isSpeakingNow = false;
                extCurrentAudio = null;
                setTimeout(playExtAudioQueue, 50);
            });
        }
        if (msg.type === 'tts_proxy_error') {
            console.warn("TTS Proxy Fetch failed from background.");
            isSpeakingNow = false;
            extCurrentAudio = null;
            setTimeout(playExtAudioQueue, 50);
        }
        

    }
});
let ccObserver = null;
let isCCObserverActive = false;
let lastCCText = "";

let ccTypingTimer = null;
let lastSpokenTextVi = "";
let ccTranslateTimer = null;
let lastMutatedText = "";
let lastFetchTime = 0;
let currentCCFetchId = 0;

let ccApiHistory = []; 
let ccGlobalId = 0;

function ccRenderSentences(sentences) {
    if (sentences.length === 0) return;
    
    let overlapIdx = -1;
    if (ccApiHistory.length > 0) {
        let curEn = sentences[0].en.trim();
        let startIndex = Math.max(0, ccApiHistory.length - 3);
        for (let i = startIndex; i < ccApiHistory.length; i++) {
            let lastEn = ccApiHistory[i].en.trim();
            if (lastEn.length > 3 && curEn.length > 3) {
                if (lastEn.includes(curEn.substring(0, Math.min(curEn.length, 10))) || curEn.includes(lastEn.substring(0, Math.min(lastEn.length, 10)))) {
                    overlapIdx = i;
                    break;
                }
            }
        }
    }
    
    let nextHistory = [];
    if (overlapIdx !== -1) {
        for(let i = 0; i < overlapIdx; i++) nextHistory.push(ccApiHistory[i]);
        
        for(let j = 0; j < sentences.length; j++) {
            let existing = ccApiHistory[overlapIdx + j];
            if (existing) {
                updateDomPair(existing.id, sentences[j].vi, sentences[j].en);
                nextHistory.push({ id: existing.id, vi: sentences[j].vi, en: sentences[j].en });
            } else {
                let id = ++ccGlobalId;
                addDomPair(id, sentences[j].vi, sentences[j].en);
                nextHistory.push({ id: id, vi: sentences[j].vi, en: sentences[j].en });
            }
        }
    } else {
        nextHistory = [...ccApiHistory];
        for(let j = 0; j < sentences.length; j++) {
            let id = ++ccGlobalId;
            addDomPair(id, sentences[j].vi, sentences[j].en);
            nextHistory.push({ id: id, vi: sentences[j].vi, en: sentences[j].en });
        }
    }
    
    if (nextHistory.length > 15) {
        nextHistory = nextHistory.slice(nextHistory.length - 15);
    }
    ccApiHistory = nextHistory;
}

function initCCObserver() {
    const isYouTube = window.location.hostname.includes("youtube.com");
    if (!isYouTube) {
        addSubtitleLine("Chế độ CC chỉ hoạt động trên YouTube.", "CC mode works on YouTube only.");
        updateStatusUI('stop');
        isCCObserverActive = false;
        return;
    }
    
    let targetNode = document.querySelector('.ytp-caption-window-container') || document.querySelector('#movie_player');
    if (!targetNode) {
        addSubtitleLine("Không tìm thấy phụ đề... Bấm nút CC trên YouTube trước.", "No captions found. Enable CC first.");
        setTimeout(() => { if (isCCObserverActive) initCCObserver(); }, 2000);
        return;
    }

    ccObserver = new MutationObserver(async (mutations) => {
        let currentText = '';
        const segments = document.querySelectorAll('.ytp-caption-segment');
        segments.forEach(seg => { currentText += seg.textContent + ' '; });
        currentText = currentText.trim().replace(/\s+/g, ' ');
        
        if (currentText === lastMutatedText) return;
        if (currentText === '') return;
        lastMutatedText = currentText;

        let delay = 350;
        if (Date.now() - lastFetchTime > 1500) {
            delay = 0;
        }

        clearTimeout(ccTranslateTimer);
        ccTranslateTimer = setTimeout(async () => {
            lastFetchTime = Date.now();
            let activeFetchId = ++currentCCFetchId;

            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=${encodeURIComponent(currentText)}`;
            try {
                const response = await fetch(url);
                if (activeFetchId !== currentCCFetchId) return; // DISCARD STALE RESPONSE!
                
                if (!response.ok) {
                    if (response.status === 429) {
                        updateStatusUI('stop');
                        addSubtitleLine("❌ Lỗi 429: Bị Google chặn do lấy CC quá nhanh. Vui lòng nghỉ 30 phút hoặc đổi IP.", "Google API 429 Too Many Requests.");
                    }
                    return;
                }
                const data = await response.json();
                if (data && data[0]) {
                    let sentencesData = [];
                    data[0].forEach(item => { 
                        if (item[0] && item[1]) {
                            sentencesData.push({ vi: item[0], en: item[1] });
                        }
                    });
                    
                    ccRenderSentences(sentencesData);

                    clearTimeout(ccTypingTimer);
                    ccTypingTimer = setTimeout(() => {
                        let lastSent = sentencesData[sentencesData.length - 1];
                        if (lastSent && lastSpokenTextVi !== lastSent.vi) {
                            speakText(lastSent.vi);
                            lastSpokenTextVi = lastSent.vi;
                        }
                    }, 1000);
                }
            } catch (err) {
                console.error("Dich Error:", err);
            }
        }, delay);
    });

    ccObserver.observe(targetNode, { childList: true, subtree: true, characterData: true });
    addSubtitleLine("🔒 Đã khóa vào luồng Phụ đề YouTube...", "Locked into YouTube CC stream.");
}

function startCCMode() {
    stopAll();
    isCCObserverActive = true;
    updateStatusUI('cc', 'Reading YT CC...');
    initCCObserver();
}

// ---------------------- Điều khiển State ---------------------- //
function stopAll() {
    isCCObserverActive = false;
    
    if (ccObserver) { ccObserver.disconnect(); ccObserver = null; }
    
    updateStatusUI('stop');
}

function setupControls() {
    const btnCC = document.getElementById("dich-btn-cc");
    const btnStop = document.getElementById("dich-btn-stop");

    btnCC.onclick = () => startCCMode();
    btnStop.onclick = () => stopAll();
    
    document.getElementById("dich-btn-close").onclick = () => {
        stopAll();
        document.getElementById("dich-main-window").classList.add("hidden");
    };
    
    document.getElementById("dich-btn-min").onclick = () => {
        const mw = document.getElementById("dich-main-window");
        mw.classList.toggle("minimized");
        
        let isMin = mw.classList.contains("minimized");
        document.getElementById("dich-btn-min").title = isMin ? "Mở rộng" : "Thu nhỏ";
        document.getElementById("dich-btn-min").innerHTML = isMin ? ICONS.maximize : ICONS.minimize;
    };
}

function updateStatusUI(mode, text) {
    const btnStop = document.getElementById("dich-btn-stop");
    const dot = document.getElementById("dich-status-dot");
    const statusText = document.getElementById("dich-status-text");

    btnStop.classList.remove("active");
    if(dot) dot.classList.add("stopped");
    
    if (mode === 'cc') {
        if(dot) dot.classList.remove("stopped");
        statusText.textContent = text;
    }
    else {
        btnStop.classList.add("active");
        statusText.textContent = "Đã dừng";
    }
}

function initDichUI() {
    createTranslationUI();
}
