'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, LogIn, ShieldCheck } from 'lucide-react';

export default function Login(){
  const [msg,setMsg]=useState('');
  const [loading,setLoading]=useState(false);
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setLoading(true); setMsg('');
    try{const f=new FormData(e.currentTarget);const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:f.get('email'),password:f.get('password')})});const j=await r.json();if(r.ok) location.href=j.redirect; else setMsg(j.error||'Giriş yapılamadı.');}
    catch{setMsg('Sunucuya ulaşılamadı. Lütfen tekrar deneyin.');} finally{setLoading(false);}
  }
  return <><div className="auth"><section className="auth-side"><Link href="/" className="logo" style={{color:'#fff'}}><span className="pin" style={{background:'#49c98a'}}/>CateFind</Link><div style={{maxWidth:520}}><div className="eyebrow" style={{marginTop:55}}>Güvenilir catering marketplace</div><h1>İhtiyacın olan hizmete daha hızlı ulaş.</h1><p style={{color:'#c9d6d1',fontSize:17,maxWidth:500}}>Teklifleri tek yerde topla, firmaları karşılaştır ve catering sürecini güvenle yönet.</p><div className="hero-points"><span><ShieldCheck size={17}/> Güvenli hesap</span><span>✓ Doğrulanmış firmalar</span><span>★ Gerçek yorumlar</span></div></div></section><section className="auth-form"><div className="form-box"><div className="eyebrow">Hoş geldin</div><h1>Giriş yap</h1><p className="muted">Hesabına giriş yaparak kaldığın yerden devam et.</p><form onSubmit={submit} className="form-stack" style={{marginTop:26}}><div className="field"><label>E-POSTA</label><input name="email" type="email" required placeholder="ornek@email.com" autoComplete="email"/></div><div className="field"><label>ŞİFRE</label><input name="password" type="password" required placeholder="Şifren" autoComplete="current-password"/></div><button className="btn btn-green" disabled={loading}>{loading?'Giriş yapılıyor…':<>Giriş Yap <LogIn size={17}/></>}</button></form>{msg&&<p className="form-error" style={{marginTop:14}}>{msg}</p>}<p className="muted" style={{fontSize:13,marginTop:20}}>Hesabın yok mu? <Link href="/kayit" style={{color:'var(--green)',fontWeight:800}}>Kayıt ol <ArrowRight size={13} style={{display:'inline'}}/></Link></p></div></section></div></>;
}
