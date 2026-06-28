// ===== 📖 NIV VERSE OF THE DAY (YouVersion API - No Key Required) =====

// ===== FETCH NIV VERSE OF THE DAY =====
async function fetchVerse() {
  const verseEl = document.getElementById('verseText');
  const refEl = document.getElementById('verseRef');
  
  // Show loading state
  verseEl.textContent = 'Loading...';
  refEl.textContent = '—';
  
  try {
    // YouVersion API - Returns NIV Verse of the Day
    const response = await fetch('https://youversion-api.glitch.me/v1/votd');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📖 API Response:', data);
    
    if (data && data.passage && data.citation) {
      // Display the verse
      verseEl.textContent = data.passage;
      refEl.textContent = `— ${data.citation}`;
      
      // Animate
      verseEl.classList.remove('fade');
      void verseEl.offsetWidth;
      verseEl.classList.add('fade');
      
      console.log('✅ NIV Verse loaded:', data.citation);
    } else {
      throw new Error('No verse data in response');
    }
    
  } catch (error) {
    console.error('❌ Error fetching verse:', error);
    useFallbackVerse();
  }
}

// ===== 📚 FALLBACK (Only used if API fails) =====
function useFallbackVerse() {
  const verseEl = document.getElementById('verseText');
  const refEl = document.getElementById('verseRef');
  
  // These are ONLY used if the API completely fails
  const fallbackVerses = [
    { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1 (NIV)" },
    { text: "For God so loved the world that He gave His only Son.", ref: "John 3:16 (NIV)" },
    { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13 (NIV)" },
    { text: "Be still, and know that I am God.", ref: "Psalm 46:10 (NIV)" },
    { text: "The Lord bless you and keep you.", ref: "Numbers 6:24 (NIV)" },
    { text: "Your word is a lamp to my feet and a light to my path.", ref: "Psalm 119:105 (NIV)" },
    { text: "Love is patient, love is kind.", ref: "1 Corinthians 13:4 (NIV)" },
    { text: "Do not fear, for I am with you.", ref: "Isaiah 41:10 (NIV)" },
    { text: "Rejoice in the Lord always.", ref: "Philippians 4:4 (NIV)" },
    { text: "The Lord is my light and my salvation.", ref: "Psalm 27:1 (NIV)" }
  ];
  
  // Use day of month to pick a fallback
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
