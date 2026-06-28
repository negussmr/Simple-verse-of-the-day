// ===== 📖 REAL VERSE OF THE DAY (Forces fresh verse daily) =====

// ===== FETCH REAL VERSE OF THE DAY =====
async function fetchVerse() {
  const verseEl = document.getElementById('verseText');
  const refEl = document.getElementById('verseRef');
  
  // Show loading state
  verseEl.textContent = 'Loading...';
  refEl.textContent = '—';
  
  try {
    // Use day of year to pick a different API source each day
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    // List of FREE APIs that return different verses
    const apis = [
      {
        // OurManna - Verse of the Day
        url: 'https://beta.ourmanna.com/api/v1/get/?format=json',
        parse: (data) => {
          if (data && data.verse && data.verse.details) {
            return {
              text: data.verse.details.text,
              ref: data.verse.details.reference
            };
          }
          return null;
        }
      },
      {
        // GetBible.net - Verse of the Day (different source)
        url: 'https://getbible.net/votd/json',
        parse: (data) => {
          if (data && data.verse) {
            return {
              text: data.verse,
              ref: data.reference
            };
          }
          return null;
        }
      },
      {
        // DailyVerse - Another free API
        url: 'https://dailyverse.vercel.app/api/verse',
        parse: (data) => {
          if (data && data.verse) {
            return {
              text: data.verse,
              ref: data.reference || 'Unknown'
            };
          }
          return null;
        }
      }
    ];
    
    // Pick a different API each day (rotates through them)
    const apiIndex = dayOfYear % apis.length;
    const selectedApi = apis[apiIndex];
    
    console.log(`📖 Day ${dayOfYear}: Trying API ${apiIndex + 1} of ${apis.length}`);
    console.log('📖 URL:', selectedApi.url);
    
    const response = await fetch(selectedApi.url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const verseData = selectedApi.parse(data);
    
    if (verseData && verseData.text && verseData.text !== 'undefined' && verseData.text.length > 0) {
      // Display the verse
      verseEl.textContent = verseData.text;
      refEl.textContent = `— ${verseData.ref}`;
      
      // Animate
      verseEl.classList.remove('fade');
      void verseEl.offsetWidth;
      verseEl.classList.add('fade');
      
      console.log('✅ Displayed:', verseData.ref);
    } else {
      throw new Error('No verse data');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    useFallbackVerse();
  }
}

// ===== 📚 FALLBACK (Only used if ALL APIs fail) =====
function useFallbackVerse() {
  const verseEl = document.getElementById('verseText');
  const refEl = document.getElementById('verseRef');
  
  // These are ONLY used if the API completely fails
  const fallbackVerses = [
    { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
    { text: "For God so loved the world that He gave His only Son.", ref: "John 3:16" },
    { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
    { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
    { text: "The Lord bless you and keep you.", ref: "Numbers 6:24" },
    { text: "Your word is a lamp to my feet and a light to my path.", ref: "Psalm 119:105" },
    { text: "Love is patient, love is kind.", ref: "1 Corinthians 13:4" },
    { text: "Do not fear, for I am with you.", ref: "Isaiah 41:10" },
    { text: "Rejoice in the Lord always.", ref: "Philippians 4:4" },
    { text: "The Lord is my light and my salvation.", ref: "Psalm 27:1" }
  ];
  
  // Use the day of month to pick a fallback
  const dayOfMonth = new Date().getDate();
  const verse = fallbackVerses[(dayOfMonth - 1) % fallbackVerses.length];
  
  verseEl.textContent = verse.text;
  refEl.textContent = `— ${verse.ref}`;
  
  verseEl.classList.remove('fade');
  void verseEl.offsetWidth;
  verseEl.classList.add('fade');
  
  console.log('📖 Using fallback verse (API failed)');
}

// ===== 🔥 STREAK LOGIC =====
function updateStreak() {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('lastVisit');
  let streak = parseInt(localStorage.getItem('streak')) || 0;
  let status = '';

  if (!lastVisit) {
    streak = 1;
    status = 'First day of your journey';
    triggerCelebration();
  } else if (lastVisit === today) {
    status = 'Already checked in today';
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastVisit === yesterday.toDateString()) {
      streak++;
      status = `${streak} days strong`;
      triggerCelebration();
      triggerPop();
    } else {
      streak = 1;
      status = 'New journey begins';
      triggerCelebration();
    }
  }

  localStorage.setItem('lastVisit', today);
  localStorage.setItem('streak', streak);

  document.getElementById('streakCount').textContent = streak;
  document.getElementById('streakStatus').textContent = status;

  if (streak >= 3) {
    document.getElementById('streakStatus').classList.add('active');
  } else {
    document.getElementById('streakStatus').classList.remove('active');
  }
}

// ===== 🎉 CELEBRATION PARTICLES =====
function triggerCelebration() {
  const container = document.getElementById('celebration');
  const colors = ['#4a9aff', '#6c8cff', '#ff6b35', '#ffd700', '#ff4500', '#1a6aaa'];
  const numParticles = 25;

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const tx = (Math.random() - 0.5) * 500;
    const ty = (Math.random() - 0.5) * 500 - 250;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.width = `${4 + Math.random() * 8}px`;
    particle.style.height = particle.style.width;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    particle.style.animationDuration = `${1.2 + Math.random() * 1}s`;
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 2500);
  }
}

// ===== 💥 POP ANIMATION =====
function triggerPop() {
  const el = document.getElementById('streakCount');
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

// ===== 📅 SET DATE =====
function setDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('dateDisplay').textContent = now.toLocaleDateString('en-US', options);
}

// ===== 📤 SHARE =====
function shareVerse() {
  const verse = document.getElementById('verseText').textContent;
  const ref = document.getElementById('verseRef').textContent;
  const streak = localStorage.getItem('streak') || 0;
  const shareText = `"${verse}"\n${ref}\n\n${streak} day streak`;

  if (navigator.share) {
    navigator.share({ title: 'Verse of the Day', text: shareText }).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Copied to clipboard');
    });
  }
}

// ===== 🚀 INIT =====
async function init() {
  setDate();
  await fetchVerse();
  updateStreak();
  document.getElementById('shareBtn').addEventListener('click', shareVerse);
}

document.addEventListener('DOMContentLoaded', init);
