// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initTypingEffect();
    initScrollAnimations();
    initNavigation();
    initAIDemo();
    initCounterAnimations();
    initFormHandling();
    initScrollToTop();
});

// 打字机效果
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const words = ['用得上', '落地快', '靠谱', '实用', '高效'];
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentWord = words[currentWordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        let typeSpeed = isDeleting ? 80 : 120;

        if (!isDeleting && currentCharIndex === currentWord.length) {
            typeSpeed = 1500; // 完成后暂停
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            typeSpeed = 300;
        }

        requestAnimationFrame(() => {
            setTimeout(typeWriter, typeSpeed);
        });
    }

    typeWriter();
}

// 导航栏功能
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // 滚动时改变导航栏样式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 移动端菜单切换
    if (hamburger && navMenu) {
        // 汉堡菜单点击事件
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // 防止页面滚动
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 点击菜单项后关闭菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // 点击外部区域关闭菜单
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // ESC键关闭菜单
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// AI演示功能
function initAIDemo() {
    // 控制聊天框高度，避免过长
    const maxMessages = 4;
    
    // 1. 智能知识库演示
    window.demoKnowledgeBase = function() {
        clearOldMessages();
        const messages = document.getElementById('chatMessages');
        addMessage('新员工小李', '我第一天上班，有客户投诉产品质量，不知道怎么处理，求助！', 'user');
        
        setTimeout(() => {
            addMessage('智能知识库', '检测到：投诉处理需求\n正在检索相关流程文档...', 'ai');
        }, 1800);
        
        setTimeout(() => {
            addMessage('智能知识库', '📚 从2847个文档中筛选出3个最相关：\n\n🎯 《投诉处理标准操作流程》v2.3\n📋 《质量问题快速响应指南》  \n⚡ 《客户关系维护策略》\n\n为您优先推荐第一个文档', 'ai');
        }, 3500);
        
        setTimeout(() => {
            addMessage('新员工小李', '客户很生气，说要退货还要投诉到消协，我该怎么安抚？', 'user');
        }, 5500);
        
        setTimeout(() => {
            addMessage('智能知识库', '🚨 识别为紧急投诉，启动应急预案：\n\n🗣️ 话术模板：\n"非常抱歉给您造成困扰，我立即为您处理"\n\n⚡ 处理步骤：\n1️⃣ 先道歉，认真倾听客户描述\n2️⃣ 记录问题：产品型号、购买时间、具体问题\n3️⃣ 拍照留存证据\n4️⃣ 联系质检部门张主管（内线8023）\n5️⃣ 承诺24小时内给出解决方案\n\n💡 安抚技巧：主动承担责任+给出明确时间节点', 'ai');
        }, 7000);
    };

    // 2. Agent智能体演示（重点）
    window.demoSmartAgent = function() {
        clearOldMessages();
        const messages = document.getElementById('chatMessages');
        addMessage('系统监控', '[自动检测] 转化率异常：14:32从2.1%突降至0.8%', 'user');
        
        setTimeout(() => {
            addMessage('运营Agent', '🚨 检测到异常，启动自主分析模式\n正在调用analytics_tool...', 'ai');
        }, 1500);
        
        setTimeout(() => {
            addMessage('运营Agent', '🔧 tool_call: analytics_tool.analyze_conversion()\n> 对比历史数据：正常值2.0-2.5%\n> 分析流量来源：发现竞品在投放相同关键词\n> 识别问题：CPC上涨40%，广告排名下降', 'ai');
        }, 3000);
        
        setTimeout(() => {
            addMessage('运营Agent', '🔧 tool_call: ad_optimizer.adjust_strategy()\n> 自动调整15个关键词出价+8%-12%\n> 新增3个长尾关键词降低竞争\n> 调整投放时段避开竞品高峰期', 'ai');
        }, 4800);
        
        setTimeout(() => {
            addMessage('运营Agent', '📊 实时监控结果：\n• 转化率已恢复至2.3%（超过基准值）\n• CPC控制在目标范围内\n• 新增长尾词转化率达3.1%\n\n🔧 准备调用report_generator汇报...', 'ai');
        }, 6500);
        
        setTimeout(() => {
            addMessage('运营Agent', '✅ 问题解决！Agent自主完成全流程：\n\n⏰ 总用时：3分12秒\n🎯 效果：转化率恢复+10%\n💰 成本：CPC仅上涨2%（vs预期15%）\n\n📄 已自动生成优化报告并发送给运营团队\n🔄 继续24/7自主监控中...', 'ai');
        }, 8000);
    };

    // 5. 文档处理演示
    window.demoDocumentAI = function() {
        clearOldMessages();
        const messages = document.getElementById('chatMessages');
        addMessage('法务经理刘总', '供应商刚发来120页采购合同，明天上午就要签，但我今晚还有个案子要处理', 'user');
        
        setTimeout(() => {
            addMessage('智能文档', '收到合同文件：XYZ_supply_contract_v2.3.pdf\n文档解析中...120页，约8万字', 'ai');
        }, 1500);
        
        setTimeout(() => {
            addMessage('智能文档', '📖 正在逐条分析：\n• 提取关键条款：进行中...\n• 识别风险点：进行中...\n• 对比行业标准模板：进行中...\n• 计算财务影响：进行中...', 'ai');
        }, 3200);
        
        setTimeout(() => {
            addMessage('智能文档', '⚠️ 重大风险预警！发现5处问题：\n\n🚨 第23条（解约条款）：\n> 对方可提前30天单方解约\n> 我方需90天通知期\n> 风险级别：高\n\n🚨 第67条（付款条件）：\n> 货到当天付款\n> 无质量验收期\n> 建议改为货到15天付款', 'ai');
        }, 5000);
        
        setTimeout(() => {
            addMessage('智能文档', '📋 完整风险评估报告已生成：\n\n✅ 分析结果：\n• 高风险条款：5处\n• 中风险条款：12处\n• 建议修改条款：17处\n• 预计谈判重点：4个\n\n📄 已生成：\n• 风险评估报告\n• 修改建议清单\n• 谈判要点提纲\n\n⏰ 用时：2分38秒（节省审核时间6小时）', 'ai');
        }, 7000);
    };

    // 3. 视觉检测演示
    window.demoVisionDetection = function() {
        clearOldMessages();
        const messages = document.getElementById('chatMessages');
        addMessage('安全主管王总', '马上要夜班了，监控人员只有2个，担心看不过来这么多摄像头', 'user');
        
        setTimeout(() => {
            addMessage('智能视觉', '启动边缘端AI监控系统...\n45个摄像头边缘计算并行处理，无需联网', 'ai');
        }, 1500);
        
        setTimeout(() => {
            addMessage('智能视觉', '🔍 夜间模式状态：\n• 边缘端延迟：8毫秒\n• 夜视增强：自动启用\n• 4K→8K超分辨率：实时处理\n• 3D定位追踪：覆盖全厂区', 'ai');
        }, 3200);
        
        setTimeout(() => {
            addMessage('智能视觉', '⚠️ 异常检测！B-3区域：\n• 目标检测：工人+安全帽缺失\n• 3D定位：X:125 Y:89 Z:1.7m\n• 移动轨迹：向危险设备区域\n\n🚨 边缘端实时处理：\n> 高光增强：夜间画面提升60%亮度\n> 超分辨率：模糊人脸变清晰可识别\n> 3D地图标记：红色预警区域', 'ai');
        }, 5000);
        
        setTimeout(() => {
            addMessage('智能视觉', '✅ 技术优势体现！\n• 边缘计算：离线处理保障数据安全\n• 实时追踪：3D地图显示完整轨迹\n• 图像增强：夜间模糊画面变8K清晰\n\n📊 边缘端处理能力：\n• 45路4K视频同时处理\n• 检测精度：99.2%\n• 响应延迟：8毫秒\n• 无需网络：完全本地化部署', 'ai');
        }, 7000);
    };

    // 4. 数据分析演示
    window.demoDataAnalysis = function() {
        clearOldMessages();
        const messages = document.getElementById('chatMessages');
        addMessage('运营总监陈总', '这次双11投了500万广告，但转化率才1.2%，老板很不满意，急需找到问题', 'user');
        
        setTimeout(() => {
            addMessage('智能分析师', '接收任务：双11营销效果诊断\n开始多维度数据分析...', 'ai');
        }, 1800);
        
        setTimeout(() => {
            addMessage('智能分析师', '📊 正在分析各渠道数据：\n• 已拉取37个广告渠道数据\n• 分析用户行为路径\n• 交叉验证支付流程数据\n• 识别异常流量模式...', 'ai');
        }, 3500);
        
        setTimeout(() => {
            addMessage('智能分析师', '🔍 发现关键问题！\n\n❌ 渠道质量问题：\n• 抖音渠道投放180万，转化率仅0.3%\n• 小红书渠道用户停留时间不足30秒\n• 45%流量为机器人或羊毛党\n\n❌ 技术问题：\n• 移动端支付成功率仅62%\n• 页面加载时间超过5秒流失用户47%', 'ai');
        }, 5200);
        
        setTimeout(() => {
            addMessage('智能分析师', '💡 优化建议（基于数据模型预测）：\n\n🎯 立即行动：\n• 暂停3个低质量渠道（节省预算180万）\n• 修复支付Bug（预计转化率提升40%）\n• 优化页面加载速度\n\n📈 预测效果：\n• 转化率：1.2% → 4.8%\n• ROI：1.2 → 3.6\n• 预计挽回损失：320万\n\n⏰ 建议24小时内执行优化', 'ai');
        }, 7000);
    };

    // 6. 流程自动化演示
    window.demoWorkflowAuto = function() {
        clearOldMessages();
        const messages = document.getElementById('chatMessages');
        addMessage('财务主管李总', '月底了，员工提交了800张报销发票，财务就3个人，肯定加班到半夜', 'user');
        
        setTimeout(() => {
            addMessage('RPA机器人', '接收任务：发票批量处理\n正在启动自动化流程...', 'ai');
        }, 1500);
        
        setTimeout(() => {
            addMessage('RPA机器人', '🔄 执行步骤1：发票识别\n• 自动扫描800张发票图像\n• OCR提取：发票号码、金额、日期、类别\n• 识别准确率：99.2%\n• 异常发票标记：12张', 'ai');
        }, 3000);
        
        setTimeout(() => {
            addMessage('RPA机器人', '🔄 执行步骤2：合规性检查\n• 核对发票真伪（税务局API）\n• 检查预算额度是否充足\n• 验证审批权限匹配\n• 发现问题发票：8张（已标记）', 'ai');
        }, 4800);
        
        setTimeout(() => {
            addMessage('RPA机器人', '🔄 执行步骤3：自动入账\n• 生成会计凭证：792张\n• 自动分类记账\n• 更新预算余额\n• 发送审批通知给部门领导', 'ai');
        }, 6500);
        
        setTimeout(() => {
            addMessage('RPA机器人', '✅ 自动化处理完成！\n\n📊 处理结果：\n• 成功处理：792张发票\n• 异常待人工处理：8张\n• 总用时：1小时47分钟\n• 准确率：99.8%\n\n💰 效益对比：\n• 人工处理预计：40小时\n• RPA处理实际：1.8小时\n• 节省人力成本：38.2小时\n• 错误率降低：从5%到0.2%', 'ai');
        }, 8000);
    };

    function clearOldMessages() {
        const messages = document.getElementById('chatMessages');
        // 保留欢迎消息，清除演示消息
        const welcomeMessage = messages.querySelector('.message');
        messages.innerHTML = '';
        if (welcomeMessage && welcomeMessage.textContent.includes('AI Demo Terminal')) {
            messages.appendChild(welcomeMessage);
        }
    }

    function addMessage(sender, content, type) {
        const messages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const icon = type === 'ai' ? '<i class="fas fa-terminal"></i>' : '<i class="fas fa-user"></i>';
        const prefix = sender === 'system' ? '' : `${sender}: `;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${icon}
                <span class="terminal-text">${prefix}${content}</span>
            </div>
        `;
        
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
        
        // 控制消息数量，避免聊天框过长
        const allMessages = messages.querySelectorAll('.message');
        if (allMessages.length > maxMessages) {
            allMessages[0].remove();
        }
    }
}

// 主要按钮功能
window.startAIDemo = function() {
    const chatBubble = document.getElementById('chatBubble');
    chatBubble.style.transform = 'scale(1.05)';
    chatBubble.style.boxShadow = '0 30px 60px rgba(37, 99, 235, 0.3)';
    
    setTimeout(() => {
        chatBubble.style.transform = 'rotateY(0deg) rotateX(0deg)';
        chatBubble.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
    }, 200);
    
    const messages = document.getElementById('chatMessages');
    messages.innerHTML = `
        <div class="message ai-message">
            <div class="message-content">
                <i class="fas fa-terminal"></i>
                <span class="terminal-text">Interactive demo mode activated. Select any module to explore AI capabilities.</span>
            </div>
        </div>
    `;
};

window.scrollToContact = function() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// 数字统计动画
function initCounterAnimations() {
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.stat-number');
                const target = parseInt(entry.target.dataset.counter);
                animateCounter(counter, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.stat-item').forEach(item => {
        counterObserver.observe(item);
    });
}

// 表单处理
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 模拟提交过程
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // 模拟提交成功
                submitBtn.innerHTML = '<i class="fas fa-check"></i> 提交成功！';
                submitBtn.style.background = 'var(--secondary-color)';
                
                // 显示成功消息
                showNotification('咨询提交成功！我们会在24小时内回复您 🎉', 'success');
                
                // 重置表单
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
                
            }, 2000);
        });
    }
}

// 通知提示
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--secondary-color)' : 'var(--primary-color)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: var(--shadow);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后自动消失
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// 添加CSS动画样式
const animationStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        margin-left: auto;
    }
`;

// 将动画样式添加到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// 页面性能优化
document.addEventListener('DOMContentLoaded', function() {
    // 预加载关键图像
    const preloadImages = [
        // 添加需要预加载的图像URL
    ];
    
    preloadImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// 错误处理
window.addEventListener('error', function(e) {
    console.log('页面错误:', e.error);
});

// 联系方式相关功能
window.copyEmail = function() {
    const email = 'hi@239.ai';
    navigator.clipboard.writeText(email).then(() => {
        showNotification('📧 邮箱地址已复制到剪贴板！', 'success');
    }).catch(() => {
        showNotification('复制失败，请手动复制：' + email, 'error');
    });
};

window.copyQQ = function() {
    const qq = '239239239';
    navigator.clipboard.writeText(qq).then(() => {
        showNotification('📱 QQ号码已复制到剪贴板！', 'success');
    }).catch(() => {
        showNotification('复制失败，请手动复制：' + qq, 'error');
    });
};

window.showQRCode = function(type) {
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h3>📱 ${type === 'wechat' ? '微信' : 'QQ'}二维码</h3>
            <div class="qr-placeholder">
                <i class="fas fa-qrcode"></i>
                <p>请扫描二维码添加${type === 'wechat' ? '微信' : 'QQ'}</p>
                <small>真实项目中，这里会显示真实的二维码图片</small>
            </div>
            <p class="qr-note">
                ${type === 'wechat' ? '微信号：239-AI' : 'QQ号：239239239'}
            </p>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
};

// 添加QR码模态框样式
const qrStyles = `
    .qr-modal-content {
        background: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        max-width: 300px;
        position: relative;
    }
    
    .qr-modal-content .close {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 24px;
        cursor: pointer;
        color: #999;
    }
    
    .qr-modal-content h3 {
        margin-bottom: 20px;
        color: var(--text-primary);
    }
    
    .qr-placeholder {
        width: 200px;
        height: 200px;
        border: 2px dashed var(--border-color);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        background: var(--bg-secondary);
    }
    
    .qr-placeholder i {
        font-size: 48px;
        color: var(--text-secondary);
        margin-bottom: 10px;
    }
    
    .qr-placeholder p {
        color: var(--text-secondary);
        margin-bottom: 10px;
    }
    
    .qr-placeholder small {
        color: var(--text-secondary);
        font-size: 12px;
    }
    
    .qr-note {
        color: var(--text-primary);
        font-weight: 600;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// 添加QR码样式到页面
const qrStyleSheet = document.createElement('style');
qrStyleSheet.textContent = qrStyles;
document.head.appendChild(qrStyleSheet);

// 案例切换功能
function initCaseTabs() {
    const tabs = document.querySelectorAll('.case-tab');
    const items = document.querySelectorAll('.case-item');
    
    if (tabs.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            items.forEach(it => it.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.case;
            const elem = document.getElementById(target);
            if (elem) {
                elem.classList.add('active');
                runCaseAnimation(target);
            }
        });
    });
    
    // 确保默认显示第一个案例
    if (tabs.length > 0 && items.length > 0) {
        tabs[0].classList.add('active');
        items[0].classList.add('active');
        runCaseAnimation(tabs[0].dataset.case);
    }
}

// 技能标签动画
function initSkillAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.animation = 'skillPop 0.5s ease-out forwards';
                    }, index * 100);
                });
            }
        });
    });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });
}

// 添加技能标签动画样式
const skillAnimationStyles = `
    .skill-tag {
        opacity: 0;
        transform: scale(0.8);
    }
    
    @keyframes skillPop {
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const skillStyleSheet = document.createElement('style');
skillStyleSheet.textContent = skillAnimationStyles;
document.head.appendChild(skillStyleSheet);

// 服务卡片交互
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}

// 案例卡片动画
function initCaseCards() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.case-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.case-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// 表单验证增强
function enhanceFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidationError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // 清除之前的错误
        clearValidationError({ target: field });
        
        if (field.required && !value) {
            showFieldError(field, '此字段为必填项');
            return false;
        }
        
        if (field.name === 'contact') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^1[3-9]\d{9}$/;
            const qqRegex = /^\d{5,11}$/;
            
            if (!emailRegex.test(value) && !phoneRegex.test(value) && !qqRegex.test(value)) {
                showFieldError(field, '请输入有效的邮箱、手机号或QQ号');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 12px;
            margin-top: 5px;
        `;
        
        field.parentElement.appendChild(errorDiv);
        field.style.borderColor = '#ef4444';
    }
    
    function clearValidationError(e) {
        const field = e.target;
        const errorDiv = field.parentElement.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.style.borderColor = '';
    }
}

// 初始化所有新功能
document.addEventListener('DOMContentLoaded', function() {
    initCaseTabs();
    initSkillAnimations();
    initServiceCards();
    initCaseCards();
    enhanceFormValidation();
});

// 添加平滑的页面滚动
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 70; // 考虑导航栏高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 用户体验增强
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '💡 想起我们了？- 239.AI';
    } else {
        document.title = '239.AI - 专注"用得上"的AI应用团队';
    }
});

// 网站性能监控
function initPerformanceMonitoring() {
    // 记录页面加载时间
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`🚀 页面加载完成！用时：${Math.round(loadTime)}ms`);
        
        // 如果加载时间过长，显示提示
        if (loadTime > 3000) {
            setTimeout(() => {
                showNotification('页面加载较慢，建议刷新或检查网络连接', 'info');
            }, 1000);
        }
    });
}

// 添加全局定时器数组，用于管理案例动画循环
let caseAnimationTimers = [];

function runCaseAnimation(caseId) {
    // 先清除之前的动画定时器，避免叠加
    caseAnimationTimers.forEach(t => clearTimeout(t));
    caseAnimationTimers = [];

    // 不同案例对应的需要动画的元素选择器
    let elems = [];
    const baseDelay = 600; // 每一步之间的间隔
    if (caseId === 'ecommerce') {
        elems = document.querySelectorAll('#ecommerce .sim-message');
    } else if (caseId === 'vision') {
        elems = document.querySelectorAll('#vision .alert-item, #vision .detection-label, #vision .confidence');
    } else if (caseId === 'agent') {
        elems = document.querySelectorAll('#agent .agent-step, #agent .output-item');
    } else if (caseId === 'automation') {
        elems = document.querySelectorAll('#automation .workflow-step');
    } else if (caseId === 'document') {
        elems = document.querySelectorAll('#document .analysis-item');
    }

    if (elems.length === 0) return; // 无元素无需动画

    // 初始化：先隐藏所有元素
    elems.forEach(el => {
        el.classList.add('hidden-msg');
        el.classList.remove('show-msg');
    });

    // 逐个显示
    elems.forEach((el, idx) => {
        caseAnimationTimers.push(setTimeout(() => {
            el.classList.remove('hidden-msg');
            el.classList.add('show-msg');
        }, idx * baseDelay));
    });

    // 计算一次完整循环所需时间（最后一步 + 额外等待）
    const loopDuration = elems.length * baseDelay + 2000;
    caseAnimationTimers.push(setTimeout(() => {
        runCaseAnimation(caseId);
    }, loopDuration));
}

// 返回顶部功能
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // 点击返回顶部
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} 