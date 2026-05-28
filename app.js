document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
    initSimulator();
    initCopy();
    init3DTilt();
});

// --- 工時計算器邏輯 ---
function initCalculator() {
    const hoursSlider = document.getElementById('hours-slider');
    const hoursDisplay = document.getElementById('hours-display');
    const wageInput = document.getElementById('wage-input');
    const lostTime = document.getElementById('lost-time');
    const lostMoney = document.getElementById('lost-money');

    function update() {
        const hours = parseInt(hoursSlider.value);
        const wage = parseInt(wageInput.value) || 0;
        
        hoursDisplay.textContent = hours;
        
        // 假設一年工作 260 天 (52 週 * 5 天)
        const totalHours = hours * 260;
        const totalMoney = totalHours * wage;
        
        lostTime.textContent = totalHours.toLocaleString();
        lostMoney.textContent = totalMoney.toLocaleString();
    }

    hoursSlider.addEventListener('input', update);
    wageInput.addEventListener('input', update);
}

// --- 工作流模擬器邏輯 ---
function initSimulator() {
    const startBtn = document.getElementById('start-sim');
    const consoleOutput = document.getElementById('console-output');
    const workflowSelect = document.getElementById('workflow-select');
    const nodes = {
        pm: document.getElementById('node-pm'),
        engineer: document.getElementById('node-engineer'),
        inspector: document.getElementById('node-inspector'),
        user: document.getElementById('node-user')
    };
    
    const paths = {
        pmEng: document.getElementById('path-pm-eng'),
        engIns: document.getElementById('path-eng-ins'),
        insUser: document.getElementById('path-ins-user')
    };

    const particle = document.getElementById('particle');

    // 定義工作流步驟
    const workflows = {
        dev: [
            { role: 'pm', thought: '正在解析需求：設計一個暗色魔幻風格的 MAS 教學網頁...', action: '建立任務清單於 task.md' },
            { role: 'engineer', thought: '收到需求。正在選用 Vanilla JS 與 CSS Glassmorphism 實作...', action: '撰寫 index.html 與 styles.css' },
            { role: 'inspector', thought: '檢查代碼中... 發現 SVG 路徑未正確閉合，且定時器需 unref。', action: '提交重構建議，優化資源回收機制' },
            { role: 'user', thought: '進行壓力測試。在行動裝置上的 3D Tilt 效果略顯延遲，建議優化 transform。', action: '回饋 UX 優化建議' }
        ],
        accountant: [
            { role: 'pm', thought: '審核年度財務報表需求...', action: '分配憑證核對任務' },
            { role: 'engineer', thought: '自動化抓取 API 數據並進行加總...', action: '生成初步資產負債表' },
            { role: 'inspector', thought: '查核數據準確性，確保符合會計準則...', action: '校正分錄誤差' },
            { role: 'user', thought: '檢視最終報表，確認視覺化圖表是否易懂...', action: '確認報表可用性' }
        ],
        lawyer: [
            { role: 'pm', thought: '分析保密協定草案需求...', action: '標記關鍵合規條款' },
            { role: 'engineer', thought: '檢索法律數據庫，比對相似判例...', action: '產出合約第一稿' },
            { role: 'inspector', thought: '審核法律風險，確保無損客戶利益...', action: '修訂免責聲明' },
            { role: 'user', thought: '模擬法庭詰問或對手方挑戰...', action: '確認合約強度' }
        ],
        researcher: [
            { role: 'pm', thought: '啟動量子計算領域深度研究...', action: '定義 8 個研究子題' },
            { role: 'engineer', thought: '搜集 arXiv 最新論文並總結摘要...', action: '整理技術白皮書' },
            { role: 'inspector', thought: '驗證實驗數據與邏輯嚴密性...', action: '指出研究盲點' },
            { role: 'user', thought: '對複雜概念進行白話轉譯測試...', action: '完成科普化成果報告' }
        ]
    };

    // 更新路徑座標 (RWD)
    function updatePaths() {
        const getCenter = (el) => {
            const rect = el.getBoundingClientRect();
            const parentRect = el.parentElement.getBoundingClientRect();
            return {
                x: rect.left - parentRect.left + rect.width / 2,
                y: rect.top - parentRect.top + rect.height / 2
            };
        };

        const pm = getCenter(nodes.pm);
        const eng = getCenter(nodes.engineer);
        const ins = getCenter(nodes.inspector);
        const user = getCenter(nodes.user);

        paths.pmEng.setAttribute('d', `M ${pm.x} ${pm.y} L ${eng.x} ${eng.y}`);
        paths.engIns.setAttribute('d', `M ${eng.x} ${eng.y} L ${ins.x} ${ins.y}`);
        paths.insUser.setAttribute('d', `M ${ins.x} ${ins.y} L ${user.x} ${user.y}`);
    }

    window.addEventListener('resize', updatePaths);
    setTimeout(updatePaths, 100);

    // 模擬主邏輯
    startBtn.addEventListener('click', async () => {
        if (startBtn.disabled) return;
        startBtn.disabled = true;
        consoleOutput.innerHTML = '<div class="log-entry system">> 初始化協作序列...</div>';
        
        // 重置狀態
        Object.values(nodes).forEach(n => n.classList.remove('active'));
        Object.values(paths).forEach(p => p.classList.remove('active'));

        const currentWorkflow = workflows[workflowSelect.value];
        
        for (let i = 0; i < currentWorkflow.length; i++) {
            const step = currentWorkflow[i];
            const node = nodes[step.role];
            
            // 激活節點
            node.classList.add('active');
            
            // 打印思考
            appendLog(step.thought, 'thought');
            await wait(1000);
            
            // 打印行動
            appendLog(`✅ ${step.action}`, 'action');
            
            // 流光動畫 (如果不是最後一個)
            if (i < currentWorkflow.length - 1) {
                const nextRole = currentWorkflow[i+1].role;
                const pathId = getPathId(step.role, nextRole);
                if (pathId) {
                    paths[pathId].classList.add('active');
                    await animateParticle(paths[pathId]);
                }
            }
            await wait(500);
        }

        appendLog('🏁 任務執行完畢。生成成果數據...', 'system');
        await wait(1000);
        showResult(currentWorkflow);
        startBtn.disabled = false;
    });

    function appendLog(msg, type) {
        const div = document.createElement('div');
        div.className = `log-entry ${type}`;
        div.textContent = msg;
        consoleOutput.appendChild(div);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    function getPathId(from, to) {
        if (from === 'pm' && to === 'engineer') return 'pmEng';
        if (from === 'engineer' && to === 'inspector') return 'engIns';
        if (from === 'inspector' && to === 'user') return 'insUser';
        return null;
    }

    async function animateParticle(pathEl) {
        particle.style.display = 'block';
        const length = pathEl.getTotalLength();
        return new Promise(resolve => {
            let start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = (timestamp - start) / 800; // 800ms 動畫
                if (progress < 1) {
                    const point = pathEl.getPointAtLength(progress * length);
                    particle.setAttribute('cx', point.x);
                    particle.setAttribute('cy', point.y);
                    requestAnimationFrame(step);
                } else {
                    particle.style.display = 'none';
                    resolve();
                }
            }
            requestAnimationFrame(step);
        });
    }

    function showResult(workflow) {
        const overlay = document.getElementById('result-overlay');
        const jsonBox = document.getElementById('result-json');
        const result = {
            status: 'success',
            timestamp: new Date().toISOString(),
            steps_completed: workflow.length,
            artifacts: workflow.map(w => w.action)
        };
        jsonBox.textContent = JSON.stringify(result, null, 2);
        overlay.style.display = 'flex';
        
        document.getElementById('close-overlay').onclick = () => {
            overlay.style.display = 'none';
        };
    }
}

// --- 複製功能 ---
function initCopy() {
    const copyBtn = document.getElementById('copy-btn');
    const content = document.getElementById('code-content');
    
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(content.textContent).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '已複製！';
            copyBtn.style.background = '#00f2ff';
            copyBtn.style.color = '#000';
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '#333';
                copyBtn.style.color = '#fff';
            }, 2000);
        });
    });
}

// --- 3D Tilt 效果 ---
function init3DTilt() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}
