const modal=document.getElementById('modal');
const openBtn=document.getElementById('openForm');
const closeBtn=document.getElementById('closeForm');
const form=document.getElementById('contactForm');
const error=document.getElementById('error');
const burger=document.getElementById('burger');
const mobileMenu=document.getElementById('mobileMenu');

burger.onclick=()=>mobileMenu.classList.toggle('open');
mobileMenu.querySelectorAll('a').forEach(a=>a.onclick=()=>mobileMenu.classList.remove('open'));

openBtn.onclick=()=>{
  modal.style.display='flex';
  let o=0;
  function fade(){o+=0.05;modal.style.opacity=o;if(o<1)requestAnimationFrame(fade)}
  fade();
};

closeBtn.onclick=()=>{modal.style.display='none';modal.style.opacity=0};

form.onsubmit=async e=>{
  e.preventDefault();
  error.textContent='';
  const data={name:form.name.value,email:form.email.value};
  localStorage.setItem('formData',JSON.stringify(data));
  try{
    const r=await fetch('https://jsonplaceholder.typicode.com/posts',{method:'POST',body:JSON.stringify(data),headers:{'Content-Type':'application/json'}});
    if(!r.ok)throw '';
    alert('Заявка отправлена');
    modal.style.display='none';
  }catch{error.textContent='Ошибка отправки';}
};
