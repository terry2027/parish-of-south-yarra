/**
 * Parish of South Yarra - Interactive Frontend Engine (app.js)
 * Controls schedules tabs, modular overlays, side drawers, mobile headers,
 * and the dual-language Korean translation matrix.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScheduleTabs();
  initMobileNavbar();
  initDrawer();
  initModals();
  initLanguageSwitcher();
});

/* ==========================================================================
   SCHEDULE TABS CONTROLLER (ST JOSEPH'S vs ST THOMAS vs KOREAN MIN)
   ========================================================================== */
function initScheduleTabs() {
  // Tabs are controlled via switchScheduleTab function declared globally for HTML ease.
}

window.switchScheduleTab = function(targetId) {
  // Remove active state from all schedule tab buttons
  const tabButtons = document.querySelectorAll('.schedule-tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));

  // Remove active state from all schedule listing groups
  const scheduleGroups = document.querySelectorAll('.schedule-group');
  scheduleGroups.forEach(group => group.classList.remove('active'));

  // Add active state to selected tab and group
  const activeTab = document.getElementById(`tab-${targetId}`);
  const activeGroup = document.getElementById(`schedule-${targetId}`);

  if (activeTab && activeGroup) {
    activeTab.classList.add('active');
    activeGroup.classList.add('active');
  }
};

/* ==========================================================================
   MOBILE RESPONSIVE NAVBAR CONTROLLER (MERGING ELKHORN COLUMNS)
   ========================================================================== */
function initMobileNavbar() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const leftMenu = document.getElementById('left-menu-list');
  const rightMenu = document.getElementById('right-menu-list');
  const navbar = document.querySelector('.main-navbar');

  if (!toggleBtn || !leftMenu || !rightMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.classList.toggle('active');

    // On mobile, toggle active class on menus
    leftMenu.classList.toggle('active');
    
    // Create mobile slide behavior: merge right-menu items into the main mobile sliding panel if not already done
    if (window.innerWidth <= 992) {
      if (leftMenu.classList.contains('active')) {
        // Temporarily append right-menu items to left menu for a unified mobile menu
        if (!leftMenu.querySelector('.mobile-merged-item')) {
          const rightItems = rightMenu.querySelectorAll('.nav-item');
          rightItems.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add('mobile-merged-item');
            leftMenu.appendChild(clone);
          });
        }
      } else {
        // Clean up merged mobile items when menu closes
        const mergedItems = leftMenu.querySelectorAll('.mobile-merged-item');
        mergedItems.forEach(item => item.remove());
      }
    }
  });

  // Re-adjust list items if user resizes back to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      leftMenu.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      
      const mergedItems = leftMenu.querySelectorAll('.mobile-merged-item');
      mergedItems.forEach(item => item.remove());
    }
  });
}

/* ==========================================================================
   THANKSGIVING / SUPPORT DRAWER (RETRACTABLE PANEL CONTROLLER)
   ========================================================================== */
function initDrawer() {
  const toggleGivingBtn = document.getElementById('toggle-giving-btn');
  const drawer = document.getElementById('giving-drawer');
  const overlay = document.getElementById('giving-drawer-overlay');

  if (!toggleGivingBtn || !drawer || !overlay) return;

  toggleGivingBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleGivingDrawer();
  });
}

window.toggleGivingDrawer = function() {
  const drawer = document.getElementById('giving-drawer');
  const overlay = document.getElementById('giving-drawer-overlay');
  
  if (drawer && overlay) {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
  }
};

/* ==========================================================================
   DYNAMIC MODAL OVERLAYS (SUB-PAGES LOADER)
   ========================================================================== */
function initModals() {
  // Close modal when clicking outside of it
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Support escape key to close active modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal.id);
      
      const activeDrawer = document.getElementById('giving-drawer');
      if (activeDrawer && activeDrawer.classList.contains('active')) {
        toggleGivingDrawer();
      }
    }
  });
}

window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop body scrolling under modal
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    // Check if any other modal is still active before releasing scroll lock
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    if (activeModals.length === 0) {
      document.body.style.overflow = '';
    }
  }
};

/* ==========================================================================
   DUAL-LANGUAGE SWITCH MATRIX (ENGLISH / 한국어 DYNAMIC TOGGLES)
   ========================================================================== */
const translationMatrix = {
  en: {
    langBtn: "한국어",
    heroWelcomeTag: "Welcoming You in Communion & Faith",
    heroWelcomeTitle: "Parish of South Yarra",
    heroWelcomeDesc: "Served by the Augustinians (OSA), our community spans the historical churches of St Joseph's and St Thomas Aquinas, alongside our Korean Catholic Ministry Melbourne chaplaincy.",
    koreanTag: "Melbourne Korean Chaplaincy",
    koreanTitle: "천주교 멜번한인 성당",
    koreanKccmDesc: "멜번한인성당은 호주 멜버른 지역의 한인 신자 공동체로, 마운트 웨이벌리에 위치한 Holy Family 성당에서 신앙생활을 이어가고 있습니다. 멜번 아우구스티노 수도회의 보살핌 속에 매주 미사를 봉헌합니다.",
    koreanEnglishDesc: "As a key part of the Augustinian mission, we provide chaplaincy to the Korean Catholic Community located at Mount Waverley. We welcome all Korean-speaking families and visitors to our regular liturgies.",
    koreanLabelSunday: "주일 미사 / Sunday Mass",
    koreanTimeSunday: "매주 일요일 오후 1:30 PM",
    koreanLabelWeekday: "평일 미사 / Weekday Mass",
    koreanTimeWeekday: "매주 목요일 오후 7:30 PM"
  },
  ko: {
    langBtn: "English",
    heroWelcomeTag: "친교와 신앙 안에서 여러분을 환영합니다",
    heroWelcomeTitle: "사우스 야라 가톨릭 성당",
    heroWelcomeDesc: "멜버른 사우스 야라 본당은 아우구스티노 수도회(OSA)가 사목하며, 역사 깊은 세인트 조셉 성당과 세인트 토마스 아퀴나스 성당, 그리고 멜번한인천주교회가 공동체를 이루고 있습니다.",
    koreanTag: "멜번 한인 천주교회 공동체",
    koreanTitle: "Korean Catholic Ministry Melbourne",
    koreanKccmDesc: "The Korean Catholic Ministry Melbourne is a vibrant diaspora community gathered under the patronage of the Augustinians in Victoria, celebrating Holy Mass at Holy Family Church in Mount Waverley.",
    koreanEnglishDesc: "매주 일요일 마운트 웨이벌리 성당에서 봉헌하는 주일 미사와 목요일 평일 미사에 모든 신자분들과 방문객들을 사랑으로 초대하고 환영합니다.",
    koreanLabelSunday: "Sunday Mass / 주일 미사",
    koreanTimeSunday: "Every Sunday 1:30 PM",
    koreanLabelWeekday: "Weekday Mass / 목요 미사",
    koreanTimeWeekday: "Every Thursday 7:30 PM"
  }
};

let currentLanguage = 'en';

function initLanguageSwitcher() {
  const langSwitchBtn = document.getElementById('lang-switch-btn');
  if (!langSwitchBtn) return;

  langSwitchBtn.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'ko' : 'en';
    applyTranslations(currentLanguage);
  });
}

function applyTranslations(lang) {
  const strings = translationMatrix[lang];
  const langSwitchBtn = document.getElementById('lang-switch-btn');
  
  if (langSwitchBtn) {
    langSwitchBtn.querySelector('span').textContent = strings.langBtn;
  }

  // Update elements by ID with simple animations
  const elementsToTranslate = [
    'hero-welcome-tag',
    'hero-welcome-title',
    'hero-welcome-desc',
    'korean-tag',
    'korean-title',
    'korean-korean-desc',
    'korean-english-desc',
    'korean-label-sunday',
    'korean-time-sunday',
    'korean-label-weekday',
    'korean-time-weekday'
  ];

  elementsToTranslate.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      // Soft fade animation when swapping language
      el.style.opacity = '0.3';
      el.style.transform = 'translateY(2px)';
      el.style.transition = 'opacity 0.2s, transform 0.2s';
      
      setTimeout(() => {
        el.innerHTML = strings[camelize(id)];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200);
    }
  });
}

// Helper to convert kebab-case ID to camelCase string name
function camelize(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
