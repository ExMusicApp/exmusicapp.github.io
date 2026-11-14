(()=>{
const R=document.documentElement,mq=matchMedia('(prefers-color-scheme:dark)');

// Цветовая схема из одного оттенка (те же тона, что в приложении); тема следует системной.
function apply(){
  const d=mq.matches,h=232,s=80;
  const p=t=>`hsl(${h} ${s}% ${t}%)`,sec=t=>`hsl(${h} ${s*.35}% ${t}%)`,
        ter=t=>`hsl(${(h+60)%360} ${s*.55}% ${t}%)`,n=t=>`hsl(${h} 8% ${t}%)`,nv=t=>`hsl(${h} 12% ${t}%)`;
  const v={
    '--bg':n(d?6:98),'--on':n(d?90:10),'--ov':nv(d?80:30),'--ol':nv(d?30:80),
    '--p':p(d?80:40),'--op':p(d?20:100),'--pc':p(d?30:90),'--opc':p(d?90:10),
    '--sc':sec(d?30:90),'--osc':sec(d?90:10),'--tc':ter(d?30:90),'--otc':ter(d?90:10),
    '--s1':n(d?10:96),'--s2':n(d?12:94),'--s3':n(d?17:92),'--s4':n(d?22:90)
  };
  for(const k in v)R.style.setProperty(k,v[k]);
  R.style.colorScheme=d?'dark':'light';
  const m=document.querySelector('meta[name=theme-color]');if(m)m.content=v['--bg'];
}
apply();
mq.addEventListener('change',apply);

document.addEventListener('DOMContentLoaded',()=>{
  // Формы «печенье» для clip-path (координаты 0..1).
  const cookie=(id,n,a)=>{let d='';for(let i=0;i<=180;i++){const t=i/180*2*Math.PI,r=.5-a+a*Math.cos(n*t);
    d+=(i?'L':'M')+(.5+r*Math.cos(t)).toFixed(4)+' '+(.5+r*Math.sin(t)).toFixed(4)}
    return `<clipPath id="${id}" clipPathUnits="objectBoundingBox"><path d="${d}Z"/></clipPath>`};
  document.getElementById('shapes').innerHTML=cookie('cookie12',12,.02)+cookie('cookie9',9,.03)+cookie('cookie6',6,.045);

  // Волнистая линия прогресса.
  let w='M0 10';for(let x=2;x<=1240;x+=2)w+=`L${x} ${(10+5*Math.sin(x/40*2*Math.PI)).toFixed(2)}`;
  document.querySelector('#wave path').setAttribute('d',w);
});
})();
