// ===== 🔑 CONFIGURATION =====
const API_KEY = 'HCBQOdBb4QoA483Dt_t53'; // Replace with your actual API key
const BIBLE_ID = '61fd76eafa1577c2-02'; // KJV Bible ID
const VERSES = [
  'JER.29.11',
  'PSA.23',
  '1COR.4.4-8',
  'PHP.4.13',
  'JHN.3.16',
  'ROM.8.28',
  'ISA.41.10',
  'PSA.46.1',
  'GAL.5.22-23',
  'HEB.11.1',
  '2TI.1.7',
  '1COR.10.13',
  'PRO.22.6',
  'ISA.40.31',
  'JOS.1.9',
  'HEB.12.2',
  'MAT.11.28',
  'ROM.10.9-10',
  'PHP.2.3-4',
  'MAT.5.43-44',
  'PSA.27.1',
  'PSA.121.1-2',
  'ISA.43.2',
  'DEU.31.6',
  'JOS.1.9',
  'PSA.34.18',
  'PSA.147.3',
  'ISA.40.29',
  'PSA.55.22',
  'PRO.3.5-6',
  'MAT.6.33'
];

// ===== 📅 GET TODAY'S VERSE (Same verse for everyone today) =====
function getTodaysVerseIndex() {
  const today = new Date();
  // Use day of month (1-31) to pick a verse
  // Everyone sees the SAME verse on the SAME day
  const dayOfMonth = today.getDate() - 1; // 0-30
  return dayOfMonth % VERSES.length;
}

// ===== 📖 FETCH VERSE FROM API.BIBLE =====
async function fetchVerse() {
  const verseIndex = getTodaysVerseIndex();
  const verseID = VERSES[verseIndex];
  const verseEl = document.getElementById('verseText');
  const refEl = document.getElementById('verseRef');
  
  // Show loading state
  verseEl.textContent = 'Loading...';
  refEl.textContent = '—';
  
  try {
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=${verseID}`,
      {
        headers: {
          'api-key': API_KEY,
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract verse text and reference
    if (data && data.data && data.data.passages && data.data.passages.length > 0) {
      const passage = data.data.passages[0];
      
      // Clean up the text (remove HTML tags if any)
      let verseText = passage.text;
      // Remove any HTML tags
      verseText = verseText.replace(/<[^>]*>/g, '');
      // Remove extra whitespace
      verseText = verseText.replace(/\s+/g, ' ').trim();
      
      // Get the reference (book, chapter, verse)
      const reference = passage.reference || verseID;
      
      verseEl.textContent = verseText;
      refEl.textContent = `— ${reference}`;
      
      // Animate
      verseEl.classList.remove('fade');
      void verseEl.offsetWidth;
      verseEl.classList.add('fade');
      
      console.log('✅ Verse loaded:', reference);
    } else {
      throw new Error('No passage found in response');
    }
  } catch (error) {
    console.error('❌ Error fetching verse:', error);
    // Fallback verses if API fails
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
      { text: "The Lord is my light and my salvation.", ref: "Psalm 27:1" },
    ];
    const fallback = fallbackVerses[verseIndex % fallbackVerses.length];
    verseEl.textContent = fallback.text;
    refEl.textContent = `— ${fallback.ref}`;
    verseEl.classList.remove('fade');
    void verseEl.offsetWidth;
    verseEl.classList.add('fade');
  }
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
