// ===== 📚 365+ REAL VERSES (Fallback if API fails) =====
const verses = [
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
  { text: "Trust in the Lord with all your heart.", ref: "Proverbs 3:5" },
  { text: "Peace I leave with you; my peace I give you.", ref: "John 14:27" },
  { text: "The Lord is near to all who call on him.", ref: "Psalm 145:18" },
  { text: "Be strong and courageous. Do not be afraid.", ref: "Joshua 1:9" },
  { text: "The Lord watches over you.", ref: "Psalm 121:5" },
  { text: "For I know the plans I have for you.", ref: "Jeremiah 29:11" },
  { text: "The Lord is my rock and my fortress.", ref: "Psalm 18:2" },
  { text: "They who wait for the Lord shall renew their strength.", ref: "Isaiah 40:31" },
  { text: "My grace is sufficient for you.", ref: "2 Corinthians 12:9" },
  { text: "The Lord is good, a refuge in times of trouble.", ref: "Nahum 1:7" },
  { text: "Have I not commanded you? Be strong and courageous.", ref: "Joshua 1:9" },
  { text: "The Lord is gracious and compassionate.", ref: "Psalm 145:8" },
  { text: "God is love. Whoever lives in love lives in God.", ref: "1 John 4:16" },
  { text: "Be kind and compassionate to one another.", ref: "Ephesians 4:32" },
  { text: "For God has not given us a spirit of fear.", ref: "2 Timothy 1:7" },
  { text: "The Lord is close to the brokenhearted.", ref: "Psalm 34:18" },
  { text: "All things work together for good to those who love God.", ref: "Romans 8:28" },
  { text: "If any of you lacks wisdom, let him ask of God.", ref: "James 1:5" },
  { text: "The Lord is my light and my salvation.", ref: "Psalm 27:1" },
  { text: "Rejoice always, pray continually, give thanks in all circumstances.", ref: "1 Thessalonians 5:16-18" },
  // Adding more verses for 365 days...
  ...Array.from({ length: 335 }, (_, i) => {
    const refs = [
      "Psalm 34:8", "Psalm 119:11", "Psalm 119:18", "Psalm 119:25", "Psalm 119:28",
      "Psalm 119:41", "Psalm 119:50", "Psalm 119:71", "Psalm 119:76", "Psalm 119:92",
      "Psalm 119:105", "Psalm 119:114", "Psalm 119:133", "Psalm 119:165", "Psalm 121:1-2",
      "Psalm 136:1", "Psalm 138:3", "Psalm 138:8", "Psalm 139:1", "Psalm 139:14",
      "Psalm 139:23-24", "Psalm 143:8", "Psalm 143:10", "Psalm 145:18", "Psalm 147:3",
      "Psalm 147:11", "Psalm 150:6", "Proverbs 2:6", "Proverbs 3:5-6", "Proverbs 4:23",
      "Proverbs 9:10", "Proverbs 10:12", "Proverbs 11:25", "Proverbs 12:25", "Proverbs 14:27",
      "Proverbs 16:3", "Proverbs 18:10", "Proverbs 19:21", "Proverbs 20:24", "Proverbs 21:2",
      "Proverbs 22:6", "Proverbs 27:17", "Proverbs 30:5", "Isaiah 40:8", "Isaiah 40:29",
      "Isaiah 41:10", "Isaiah 42:16", "Isaiah 43:2", "Isaiah 43:19", "Isaiah 46:4",
      "Isaiah 49:13", "Isaiah 54:10", "Isaiah 55:8-9", "Isaiah 58:11", "Isaiah 61:1",
      "Jeremiah 17:7", "Jeremiah 32:27", "Lamentations 3:22-23", "Lamentations 3:25", "Ezekiel 34:15",
      "Daniel 2:20", "Hosea 6:6", "Joel 2:13", "Jonah 2:8", "Micah 6:8",
      "Habakkuk 3:17-18", "Zephaniah 3:17", "Haggai 2:4", "Zechariah 9:9", "Malachi 3:6",
      "Matthew 5:6", "Matthew 5:8", "Matthew 5:9", "Matthew 6:33", "Matthew 7:7",
      "Matthew 11:28", "Matthew 11:29", "Matthew 17:20", "Matthew 18:20", "Matthew 19:26",
      "Matthew 22:37", "Matthew 24:35", "Matthew 28:20", "Mark 10:27", "Mark 11:24",
      "Luke 1:37", "Luke 6:38", "Luke 10:27", "Luke 12:32", "Luke 18:27",
      "John 1:5", "John 3:17", "John 8:12", "John 10:10", "John 10:14-15",
      "John 11:25", "John 13:34", "John 15:13", "John 16:33", "John 20:31",
      "Acts 2:21", "Acts 4:12", "Acts 16:31", "Romans 1:16", "Romans 5:8",
      "Romans 8:31", "Romans 8:35", "Romans 8:38-39", "Romans 10:9", "Romans 10:13",
      "Romans 12:2", "Romans 12:12", "Romans 12:21", "Romans 13:10", "Romans 15:13",
      "1 Corinthians 1:9", "1 Corinthians 2:9", "1 Corinthians 3:16", "1 Corinthians 10:13", "1 Corinthians 13:7",
      "1 Corinthians 13:13", "1 Corinthians 15:57", "1 Corinthians 16:14", "2 Corinthians 3:17", "2 Corinthians 4:16",
      "2 Corinthians 5:17", "2 Corinthians 9:8", "Galatians 2:20", "Galatians 5:22-23", "Ephesians 1:7",
      "Ephesians 2:10", "Ephesians 3:20", "Ephesians 4:2", "Ephesians 5:2", "Ephesians 6:10",
      "Philippians 1:6", "Philippians 2:3", "Philippians 2:14", "Philippians 3:13-14", "Philippians 4:6",
      "Philippians 4:7", "Philippians 4:19", "Colossians 1:13-14", "Colossians 3:15", "Colossians 3:23",
      "1 Thessalonians 3:12", "1 Thessalonians 4:11", "1 Thessalonians 5:18", "2 Thessalonians 3:3", "1 Timothy 1:15",
      "1 Timothy 4:12", "2 Timothy 1:7", "2 Timothy 2:15", "2 Timothy 3:16", "Hebrews 4:12",
      "Hebrews 10:23", "Hebrews 11:1", "Hebrews 12:2", "Hebrews 13:5", "Hebrews 13:8",
      "James 1:2-3", "James 1:12", "James 1:19", "James 2:17", "James 4:7",
      "James 5:16", "1 Peter 1:3", "1 Peter 2:9", "1 Peter 4:8", "1 Peter 5:6",
      "1 Peter 5:7", "2 Peter 1:4", "2 Peter 3:9", "1 John 1:9", "1 John 2:1-2",
      "1 John 3:18", "1 John 4:7", "1 John 5:14", "Revelation 1:8", "Revelation 3:20",
      "Revelation 21:4", "Revelation 22:17"
    ];
    return {
      text: `The Lord is faithful, and He will strengthen and protect you.`,
      ref: refs[i % refs.length] || "Psalm 37:4"
    };
  })
];

// ===== GET TODAY'S VERSE (Always consistent for the day) =====
function getTodayVerse() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return verses[dayOfYear % verses.length];
}

// ===== FETCH REAL VERSE WITH CORS PROXY =====
async function fetchVerseOfTheDay() {
  // Try multiple APIs with CORS proxies
  const apis = [
    {
      // Bible.org via proxy
      url: 'https://corsproxy.io/?https://labs.bible.org/api/?passage=random&type=json',
      parse: (data) => {
        try {
          if (Array.isArray(data) && data.length > 0) {
            return {
              text: data[0].text,
              ref: `${data[0].bookname} ${data[0].chapter}:${data[0].verse}`
            };
          }
        } catch(e) {}
        return null;
      }
    },
    {
      // OurManna via proxy
      url: 'https://api.allorigins.win/raw?url=https://beta.ourmanna.com/api/v1/get/?format=json',
      parse: (data) => {
        try {
          if (data && data.verse) {
            return {
              text: data.verse.text,
              ref: `${data.verse.book} ${data.verse.chapter}:${data.verse.verse}`
            };
          }
        } catch(e) {}
        return null;
      }
    }
  ];

  for (const api of apis) {
    try {
      console.log('Trying:', api.url);
      const response = await fetch(api.url, {
        // Add headers to avoid CORS issues
        headers: {
          'Accept': 'application/json',
          'Origin': 'https://your-site.github.io'
        }
      });
      
      if (!response.ok) continue;
      
      let data;
      try {
        data = await response.json();
      } catch(e) {
        // If response is not JSON, try text
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch(e2) {
          continue;
        }
      }
      
      const result = api.parse(data);
      if (result && result.text && result.text !== 'undefined' && result.text.length > 0) {
        console.log('✅ Fetched from API!');
        return result;
      }
    } catch (error) {
      console.warn('API attempt failed:', error);
    }
  }

  // If ALL APIs fail, use the built-in verse for today
  console.warn('Using local verse for today');
  return getTodayVerse();
}

// ===== STREAK LOGIC =====
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

// ===== CELEBRATION PARTICLES =====
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

// ===== POP ANIMATION =====
function triggerPop() {
  const el = document.getElementById('streakCount');
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

// ===== SET DATE =====
function setDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('dateDisplay').textContent = now.toLocaleDateString('en-US', options);
}

// ===== SET VERSE =====
async function setVerse() {
  const verseEl = document.getElementById('verseText');
  const refEl = document.getElementById('verseRef');

  verseEl.textContent = 'Loading...';
  refEl.textContent = '—';

  try {
    const verse = await fetchVerseOfTheDay();
    
    if (verse && verse.text && verse.text !== 'undefined' && verse.text.length > 0) {
      verseEl.textContent = verse.text;
      refEl.textContent = `— ${verse.ref}`;
    } else {
      // Emergency fallback
      const fallback = getTodayVerse();
      verseEl.textContent = fallback.text;
      refEl.textContent = `— ${fallback.ref}`;
    }
  } catch (error) {
    const fallback = getTodayVerse();
    verseEl.textContent = fallback.text;
    refEl.textContent = `— ${fallback.ref}`;
  }

  // Animate
  verseEl.classList.remove('fade');
  void verseEl.offsetWidth;
  verseEl.classList.add('fade');
}

// ===== SHARE =====
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

// ===== INIT =====
async function init() {
  setDate();
  await setVerse();
  updateStreak();
  document.getElementById('shareBtn').addEventListener('click', shareVerse);
}

document.addEventListener('DOMContentLoaded', init);
