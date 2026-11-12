export const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const scene=document.querySelector('.hero-ribbons');
if(scene&&!reduced()){
  const observer=new IntersectionObserver(([entry])=>{
    scene.classList.toggle('motion-ready',entry.isIntersecting&&!document.hidden);
  });
  observer.observe(scene);
  document.addEventListener('visibilitychange',()=>{
    scene.classList.toggle('motion-ready',!document.hidden&&scene.getBoundingClientRect().bottom>0&&scene.getBoundingClientRect().top<innerHeight);
  });
}
