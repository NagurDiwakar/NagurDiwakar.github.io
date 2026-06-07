// Theme toggle and reveal-on-scroll for a static portfolio
(function(){
  const body = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const key = 'nd-theme';

  function applyTheme(t){
    if(t === 'light') body.classList.add('light');
    else body.classList.remove('light');
  }

  // initialize theme
  const stored = localStorage.getItem(key) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(stored);

  if(toggle){
    toggle.addEventListener('click', ()=>{
      const isLight = body.classList.toggle('light');
      localStorage.setItem(key, isLight ? 'light' : 'dark');
    });
  }

  // reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('is-visible');
    });
  },{threshold:0.09});

  document.querySelectorAll('.card').forEach(el=>observer.observe(el));

  // Smooth in-page anchor focus for accessibility
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (ev)=>{
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){ ev.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); el.focus({preventScroll:true}); }
    });
  });
})();
