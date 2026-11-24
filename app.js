
{
const WA='5516990636369';
const FREE=0; /* 0 = entrega sempre grátis na área atendida */
const PIX=5; /* % de desconto no Pix, aplicado no total do pedido */
const pixP=v=>v*(1-PIX/100);
/* Dados legais exigidos pela RDC 44/2009 (art. 53) e pelo Decreto 7.962/2013: preencher antes de publicar */
const LEGAL={razao:'S. G. S. Drogaria Ltda',fantasia:'Drogaria Popular do Tiãozinho',cnpj:'67.499.754/0001-09',end:'Rua Alípio Resende de Araújo, 1647, Jardim Aeroporto II, Franca/SP, CEP 14404-095',horario:'Seg a sex 8h–21h · Sáb 8h–20h · Dom e feriados 8h–12h',tel:'(16) 3030-3696 · WhatsApp (16) 99063-6369',email:'',rt:'',crf:'',licenca:'',afe:'',ae:'Não se aplica (drogaria)'};
const GEO='-20.5758652,-47.3671077';
/* substância (DCB) e indicação dos medicamentos */
const MED={'paracetamol-750':['Paracetamol','Analgésico e antitérmico'],'dipirona-1g':['Dipirona monoidratada','Analgésico e antitérmico'],'ibuprofeno-400':['Ibuprofeno','Analgésico, antitérmico e anti-inflamatório'],'loratadina-10':['Loratadina','Antialérgico'],'losartana-50':['Losartana potássica',''],'metformina-850':['Cloridrato de metformina',''],'sinvastatina-20':['Sinvastatina',''],'omeprazol-20':['Omeprazol','']};
const advTxt=p=>(MED[p.id]?MED[p.id][0]:p.n)+' é um medicamento. Seu uso pode trazer riscos. Procure o médico e o farmacêutico. Leia a bula. Se persistirem os sintomas, o médico deverá ser consultado.';
const NA='a informar';
const HOURS=[['Domingo',8,12],['Segunda',8,21],['Terça',8,21],['Quarta',8,21],['Quinta',8,21],['Sexta',8,21],['Sábado',8,20]];
const ICON={
 med:'M7 3h10v4H7zM5 7h14v14H5zM12 10v8M8 14h8',
 rx:'M7 2h10v20H7zM9 6h6M9 10h6M9 14h3',
 dermo:'M9 3h6v4H9zM7 7h10v14H7zM10 12h4',
 cabelo:'M8 2h4v3H8zM6 5h8l1 3v13H5V8zM9 12h3',
 bebe:'M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 21a7 7 0 0 1 14 0',
 higiene:'M4 20 14 10M14 10l4-6 2 2-6 4M6 18l-2 2',
 vita:'M12 3a5 5 0 0 1 5 5v8a5 5 0 0 1-10 0V8a5 5 0 0 1 5-5zM7 12h10',
 socorro:'M3 8h18v12H3zM9 8V5h6v3M12 11v6M9 14h6'
};
const CATS=[['medicamentos','Medicamentos','med'],['receita','Com receita','rx'],['vitaminas','Vitaminas','vita'],['bebe','Infantil','bebe'],['dermo','Cuidados com a pele','dermo'],['cabelo','Cabelo e perfumaria','cabelo'],['higiene','Higiene bucal','higiene'],['socorro','Primeiros socorros','socorro']];
/* id, nome, categoria, preço, preço antigo, forma, cor1, cor2, tipo (mip|rx|''), rótulo, descrição */
const P=[
['paracetamol-750','Paracetamol 750 mg · 20 comprimidos (genérico)','medicamentos',9.9,0,'box','#ffffff','#e1131b','mip','750','Analgésico e antitérmico. Medicamento genérico, mesmo princípio ativo e dose do medicamento de referência.'],
['dipirona-1g','Dipirona monoidratada 1 g · 10 comprimidos (genérico)','medicamentos',7.49,0,'box','#ffffff','#1d6fe0','mip','1 g','Analgésico e antitérmico. Medicamento genérico.'],
['ibuprofeno-400','Ibuprofeno 400 mg · 10 cápsulas (genérico)','medicamentos',12.9,0,'box','#ffffff','#f08a00','mip','400','Anti-inflamatório não esteroidal. Medicamento genérico.'],
['loratadina-10','Loratadina 10 mg · 12 comprimidos (genérico)','medicamentos',11.9,0,'box','#ffffff','#7a3fb5','mip','10 mg','Antialérgico. Medicamento genérico.'],
['soro-500','Soro fisiológico 0,9% · 500 ml','medicamentos',6.9,0,'bottle','#e9f3ff','#1d6fe0','','0,9%','Solução de cloreto de sódio a 0,9% para limpeza nasal e de ferimentos.'],
['losartana-50','Losartana potássica 50 mg · 30 comprimidos (genérico)','receita',14.9,0,'box','#ffffff','#0b7a3e','rx','50 mg','Venda sob prescrição médica. Envie a foto da receita para conferência do farmacêutico.'],
['metformina-850','Cloridrato de metformina 850 mg · 30 comprimidos (genérico)','receita',12.5,0,'box','#ffffff','#e1131b','rx','850','Venda sob prescrição médica. Envie a foto da receita para conferência do farmacêutico.'],
['sinvastatina-20','Sinvastatina 20 mg · 30 comprimidos (genérico)','receita',15.9,0,'box','#ffffff','#f08a00','rx','20 mg','Venda sob prescrição médica. Envie a foto da receita para conferência do farmacêutico.'],
['omeprazol-20','Omeprazol 20 mg · 56 cápsulas (genérico)','receita',24.9,0,'box','#ffffff','#7a3fb5','rx','20 mg','Venda sob prescrição médica. Envie a foto da receita para conferência do farmacêutico.'],
['protetor-50','Protetor solar facial FPS 50 · 50 g','dermo',49.9,59.9,'tube','#fff4d6','#f08a00','','FPS 50','Protetor solar facial de toque seco, para uso diário.'],
['hidratante-400','Hidratante corporal pele seca · 400 ml','dermo',24.9,29.9,'bottle','#ffffff','#1d6fe0','','400 ml','Loção hidratante corporal para pele seca.'],
['gel-facial','Sabonete facial em gel pele oleosa · 150 ml','dermo',29.9,0,'tube','#e8f6ee','#0b7a3e','','150 ml','Gel de limpeza facial para pele oleosa.'],
['shampoo-350','Shampoo hidratação · 350 ml','cabelo',18.9,0,'bottle','#ffe8f0','#d6336c','','350 ml','Shampoo para cabelos secos.'],
['condicionador-350','Condicionador hidratação · 350 ml','cabelo',19.9,0,'bottle','#fff0f6','#a61e4d','','350 ml','Condicionador para cabelos secos.'],
['desodorante','Desodorante aerossol 48 h · 150 ml','cabelo',14.9,17.9,'can','#eef1f5','#1c1416','','150 ml','Desodorante antitranspirante aerossol.'],
['fralda-g','Fralda infantil tamanho G · 36 unidades','bebe',59.9,69.9,'pack','#e9f3ff','#1d6fe0','','G 36','Fralda descartável infantil, tamanho G.'],
['lenco-50','Lenço umedecido infantil · 50 unidades','bebe',9.9,0,'pack','#e8f6ee','#0b7a3e','','50 un','Lenços umedecidos para troca de fraldas.'],
['pomada-assadura','Pomada para prevenção de assaduras · 45 g','bebe',21.9,0,'tube','#ffffff','#1d6fe0','','45 g','Pomada de barreira para a área da fralda.'],
['protetor-corpo','Protetor solar corporal FPS 30 · 200 ml','dermo',39.9,0,'bottle','#fff4d6','#e8590c','','FPS 30','Protetor solar corporal resistente à água.'],
['hidratante-facial','Hidratante facial com ácido hialurônico · 50 g','dermo',44.9,52.9,'jar','#eef4ff','#1d6fe0','','50 g','Hidratante facial de textura leve, para uso diário.'],
['agua-micelar','Água micelar · 200 ml','dermo',27.9,0,'bottle','#fff0f6','#d6336c','','200 ml','Remove maquiagem e impurezas sem enxágue.'],
['fralda-m','Fralda infantil tamanho M · 40 unidades','bebe',54.9,0,'pack','#fff0f6','#d6336c','','M 40','Fralda descartável infantil, tamanho M.'],
['shampoo-infantil','Shampoo infantil sem lágrimas · 200 ml','bebe',15.9,0,'bottle','#fff9db','#f08a00','','200 ml','Shampoo suave para bebês e crianças.'],
['soro-nasal-inf','Soro fisiológico em flaconete · 20 × 5 ml','bebe',13.9,0,'box','#e9f3ff','#1d6fe0','','5 ml','Flaconetes de soro fisiológico 0,9% para lavagem nasal.'],
['polivitaminico','Polivitamínico A-Z · 60 comprimidos','vitaminas',34.9,39.9,'jar','#e8f6ee','#0b7a3e','','A-Z','Suplemento alimentar de vitaminas e minerais. Este produto não é um medicamento.'],
['magnesio','Magnésio dimalato · 60 cápsulas','vitaminas',36.9,0,'jar','#f3f0ff','#7a3fb5','','Mg','Suplemento alimentar de magnésio. Este produto não é um medicamento.'],
['creme-dental','Creme dental com flúor · 90 g','higiene',5.49,0,'tube','#ffffff','#e1131b','','90 g','Creme dental com flúor.'],
['escova-macia','Escova dental macia','higiene',6.9,0,'box','#e9f3ff','#1d6fe0','','macia','Escova dental de cerdas macias.'],
['fio-dental','Fio dental · 50 m','higiene',8.9,0,'box','#ffffff','#0b7a3e','','50 m','Fio dental encerado.'],
['vitamina-c','Vitamina C 1 g · 10 comprimidos efervescentes','vitaminas',12.9,0,'tube','#fff4d6','#f08a00','','1 g','Suplemento alimentar de vitamina C. Este produto não é um medicamento.'],
['vitamina-d','Vitamina D3 2.000 UI · 30 cápsulas','vitaminas',29.9,0,'jar','#fff9db','#e67700','','D3','Suplemento alimentar de vitamina D. Este produto não é um medicamento.'],
['omega-3','Ômega 3 · 60 cápsulas','vitaminas',39.9,46.9,'jar','#e9f3ff','#1d6fe0','','Ômega','Suplemento alimentar de óleo de peixe. Este produto não é um medicamento.'],
['curativo','Curativo adesivo · 40 unidades','socorro',7.9,0,'box','#fff4e6','#e8590c','','40 un','Curativos adesivos de tamanho único.'],
['termometro','Termômetro clínico digital','socorro',24.9,0,'box','#ffffff','#1d6fe0','','°C','Termômetro digital com aviso sonoro.'],
['alcool-70','Álcool 70% líquido · 1 litro','socorro',11.9,0,'bottle','#e9f3ff','#1d6fe0','','70%','Álcool etílico 70% para higienização.'],
['repelente','Repelente de insetos loção · 100 ml','socorro',22.9,0,'bottle','#e8f6ee','#0b7a3e','','100 ml','Repelente de insetos em loção.']
].map(a=>({id:a[0],n:a[1],c:a[2],p:a[3],o:a[4],f:a[5],c1:a[6],c2:a[7],t:a[8],l:a[9],d:a[10]}));
const BY=Object.fromEntries(P.map(p=>[p.id,p]));
const POSTS=[
{s:'generico-funciona',t:'Genérico tem o mesmo efeito do remédio de marca?',c:'Economia',col:'#0b7a3e',i:'med',e:'Entenda por que o genérico pode custar menos sem perder eficácia.',b:[
['p','O medicamento genérico tem o mesmo princípio ativo, a mesma dose e a mesma forma farmacêutica do medicamento de referência, aquele que foi lançado primeiro com marca própria.'],
['p','Antes de chegar à farmácia, o genérico passa por testes de equivalência exigidos pela Anvisa. Eles mostram que o corpo absorve o genérico da mesma forma que o de referência. Por isso ele pode substituir o de marca.'],
['h','Por que ele é mais barato?'],
['p','O fabricante do genérico não precisa repetir toda a pesquisa que criou o remédio original, nem gastar com propaganda de marca. Essa economia chega ao preço.'],
['h','Posso trocar o da receita pelo genérico?'],
['p','Na maioria dos casos, sim. O farmacêutico pode trocar o medicamento de referência pelo genérico correspondente e registra a troca na receita. Na embalagem do genérico aparece a tarja amarela com a letra G.'],
['p','Mande a foto da sua receita no WhatsApp e a gente indica o genérico equivalente, quando existir.']]},
{s:'guardar-remedios-calor',t:'Como guardar remédios em casa no calor de Franca',c:'Cuidados',col:'#e1131b',i:'socorro',e:'Banheiro e cozinha são os piores lugares. Veja onde guardar.',b:[
['p','Calor e umidade alteram muitos medicamentos antes do prazo de validade. Em cidade quente como Franca, o lugar onde você guarda faz diferença.'],
['h','Onde guardar'],
['p','Em armário fechado, longe do sol, do fogão e da umidade. Banheiro e cozinha costumam ser os piores lugares da casa. Mantenha sempre a caixa original e a bula, que trazem lote e validade.'],
['h','Remédios de geladeira'],
['p','Alguns medicamentos, como certas insulinas fechadas, ficam na geladeira, nunca no congelador. Siga sempre o que está escrito na embalagem e pergunte ao farmacêutico se tiver dúvida.'],
['h','Sobras e vencidos'],
['p','Não use remédio vencido nem guarde sobra de antibiótico para outra vez. Pergunte na loja como descartar medicamentos vencidos com segurança.']]},
{s:'protetor-solar-quantidade',t:'Protetor solar: quanto passar e de quanto em quanto tempo',c:'Pele',col:'#f08a00',i:'dermo',e:'A maioria das pessoas passa menos da metade do necessário.',b:[
['p','O fator de proteção (FPS) escrito na embalagem só vale quando você aplica a quantidade certa. A maioria das pessoas passa bem menos.'],
['h','Quanto passar'],
['p','Para o rosto e o pescoço, uma referência prática é cerca de uma colher de chá do produto. Espalhe bem, sem esquecer orelhas e nuca.'],
['h','Quando reaplicar'],
['p','Reaplique a cada duas horas de exposição e sempre depois de suar muito ou entrar na água. Use protetor mesmo em dias nublados.'],
['h','Qual FPS escolher'],
['p','Para o dia a dia, prefira FPS 30 ou mais. Pele com manchas, sensível ou com tratamento dermatológico pode precisar de orientação específica do seu dermatologista.']]},
{s:'pressao-alta-nao-parar',t:'Pressão alta: por que não parar o remédio quando a pressão normaliza',c:'Uso contínuo',col:'#1d6fe0',i:'rx',e:'Pressão boa costuma ser sinal de que o remédio está funcionando.',b:[
['p','Quando a pressão fica boa, muita gente acha que pode parar o remédio. Na maioria dos casos, a pressão está controlada justamente porque o remédio está funcionando.'],
['h','O que acontece se parar por conta própria'],
['p','A pressão pode voltar a subir sem dar sintomas. Por isso a hipertensão é chamada de doença silenciosa. Qualquer mudança no tratamento deve ser combinada com o seu médico.'],
['h','Como não esquecer'],
['p','Tome sempre no mesmo horário, junto com algum hábito do dia. E não deixe a caixa acabar: use a calculadora de recompra aqui do site para saber quando repor.'],
['h','Acompanhe seus números'],
['p','Anote as medidas de pressão e leve para a consulta. Isso ajuda o médico a ajustar o tratamento.']]}
];
const FAQ=[
['Como funciona o compre e retire?','Você escolhe os produtos no site, finaliza o pedido escolhendo Retirar na loja e a gente separa tudo com o seu nome. Quando estiver pronto, avisamos pelo WhatsApp. Você paga na retirada.'],
['Vocês entregam no meu bairro?','Informe seu CEP no topo do site para ver o prazo. A entrega é grátis, sem pedido mínimo, nos bairros atendidos de Franca.'],
['Posso comprar remédio com receita pelo site?','Pode, para medicamentos de tarja vermelha sem retenção de receita. Envie a foto da receita pelo WhatsApp e o farmacêutico confere antes de separar. Antibióticos e medicamentos controlados são vendidos somente na loja, com a receita original.'],
['Quais formas de pagamento vocês aceitam?','Pix com '+PIX+'% de desconto no total do pedido, cartão de crédito, cartão de débito e dinheiro. Cartão é passado na maquininha, na entrega ou na retirada.'],
['A farmácia abre aos domingos?','Abre. Domingos e feriados das 8h às 12h. Segunda a sexta das 8h às 21h e sábado das 8h às 20h.'],
['Tem genérico do meu remédio?','Na maioria dos casos tem. Mande o nome do remédio ou a foto da receita e a gente indica o genérico equivalente.']
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const brl=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const wa=m=>'https://wa.me/'+WA+'?text='+encodeURIComponent(m);
const ico=k=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="'+ICON[k]+'"/></svg>';
const MIP_W='Se persistirem os sintomas, o médico deverá ser consultado.';

let S={cart:{},mode:'retirada',cep:'',q:''};
try{const s=JSON.parse(localStorage.getItem('tz')||'{}');if(s.cart)S.cart=s.cart;if(s.mode)S.mode=s.mode;if(s.cep)S.cep=s.cep}catch(e){}
const save=()=>{try{localStorage.setItem('tz',JSON.stringify({cart:S.cart,mode:S.mode,cep:S.cep}))}catch(e){}};
/* leads: banco do artefato, leitura só do dono e editores */
let DB=null,UID=null,ADMIN=false;
const ready=(async()=>{try{if(!window.claude||!claude.use)return;DB=await claude.use('db');const u=await claude.use('user');if(u){UID=await u.id();ADMIN=!!((await u.isOwner())||(await u.canEdit()))}}catch(e){}})();
async function saveLead(type,data){
  const e={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),type,at:new Date().toISOString(),status:type==='pedido'?'novo':'ativo',...data};
  await ready;
  if(DB&&UID){try{const ref=DB.doc('leads/'+UID);const g=await ref.get();const list=g.exists&&Array.isArray(g.data().entries)?g.data().entries.slice():[];list.push(e);await ref.set({entries:list.slice(-200)});return true}catch(err){}}
  try{const l=JSON.parse(localStorage.getItem('tz_leads')||'[]');l.push(e);localStorage.setItem('tz_leads',JSON.stringify(l.slice(-200)))}catch(err){}
  return false;
}

/* packshots ilustrativos */
function shot(p){
  const a=p.c1,b=p.c2,l=esc(p.l);let g='';
  if(p.f==='box')g='<rect x="48" y="52" width="104" height="108" rx="6" fill="'+a+'" stroke="#0002"/><path d="M152 58l14-10v104l-14 8z" fill="'+b+'" opacity=".55"/><path d="M48 52l14-10h104l-14 10z" fill="'+b+'" opacity=".35"/><rect x="48" y="78" width="104" height="30" fill="'+b+'"/><text x="100" y="99" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="17" fill="#fff">'+l+'</text><rect x="62" y="124" width="60" height="6" rx="3" fill="'+b+'" opacity=".4"/><rect x="62" y="136" width="40" height="6" rx="3" fill="'+b+'" opacity=".3"/>'+(p.t==='rx'?'<rect x="48" y="150" width="104" height="10" fill="#e1131b"/>':'')+(/genérico/.test(p.n)?'<rect x="128" y="120" width="18" height="22" rx="2" fill="#ffc72c"/><text x="137" y="137" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="15" fill="#1d3c8f">G</text>':'');
  else if(p.f==='bottle')g='<rect x="84" y="30" width="32" height="22" rx="4" fill="'+b+'"/><path d="M70 60q0-8 10-8h40q10 0 10 8v104q0 8-8 8H78q-8 0-8-8z" fill="'+a+'" stroke="#0002"/><path d="M118 60h4q8 0 8 8v96q0 8-8 8h-4z" fill="'+b+'" opacity=".25"/><rect x="70" y="92" width="60" height="44" fill="'+b+'"/><text x="100" y="120" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="13" fill="#fff">'+l+'</text>';
  else if(p.f==='tube')g='<path d="M66 40h68l-10 120H76z" fill="'+a+'" stroke="#0002"/><rect x="84" y="160" width="32" height="16" rx="3" fill="'+b+'"/><rect x="66" y="34" width="68" height="8" fill="'+b+'" opacity=".6"/><rect x="72" y="78" width="56" height="34" rx="4" fill="'+b+'"/><text x="100" y="100" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="13" fill="#fff">'+l+'</text>';
  else if(p.f==='jar')g='<rect x="66" y="44" width="68" height="20" rx="6" fill="'+b+'"/><rect x="60" y="62" width="80" height="104" rx="14" fill="'+a+'" stroke="#0002"/><rect x="60" y="92" width="80" height="44" fill="'+b+'"/><text x="100" y="120" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="15" fill="#fff">'+l+'</text>';
  else if(p.f==='can')g='<rect x="86" y="28" width="28" height="18" rx="5" fill="#9aa3ad"/><rect x="72" y="44" width="56" height="124" rx="12" fill="'+b+'"/><rect x="72" y="80" width="56" height="40" fill="'+a+'"/><text x="100" y="105" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="12" fill="'+b+'">'+l+'</text>';
  else g='<path d="M40 64q0-12 12-12h96q12 0 12 12v92q0 12-12 12H52q-12 0-12-12z" fill="'+a+'" stroke="#0002"/><path d="M40 64q60-16 120 0" fill="none" stroke="'+b+'" stroke-width="6"/><circle cx="100" cy="110" r="30" fill="'+b+'"/><text x="100" y="115" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="13" fill="#fff">'+l+'</text>';
  return '<svg viewBox="0 0 200 200" role="img" aria-label="'+esc(p.n)+'"><ellipse cx="100" cy="176" rx="62" ry="7" fill="#0000001a"/>'+g+'</svg>';
}
function card(p){
  if(p.t==='rx')return '<article class="card"><span class="tagrx">Com receita</span><h3 style="margin-top:26px"><a href="#p-'+p.id+'">'+esc(p.n)+'</a></h3><div class="tech">'+esc(MED[p.id][0])+' · Reg. MS '+NA+'</div><div class="price"><b>'+brl(p.p)+'</b></div><button class="btn" data-add="'+p.id+'">Pedir com receita</button></article>';
  const pct=p.o?Math.round((1-p.p/p.o)*100):0;
  return '<article class="card">'+(p.t==='rx'?'<span class="tagrx">Com receita</span>':'')+(pct?'<span class="off">-'+pct+'%</span>':'')+'<a class="pic" href="#p-'+p.id+'" aria-label="Ver '+esc(p.n)+'">'+shot(p)+'</a><h3><a href="#p-'+p.id+'">'+esc(p.n)+'</a></h3><div class="price">'+(p.o?'<small style="display:block;font-size:13px;color:var(--soft)">De <s>'+brl(p.o)+'</s> por</small>':'')+'<b>'+brl(p.p)+'</b><span class="pixp">'+brl(pixP(p.p))+' no Pix</span></div>'+(p.t==='mip'?'<div class="tech">'+esc(MED[p.id][0])+' · Reg. MS '+NA+'</div><div class="adv">'+esc(advTxt(p))+'</div>':'')+'<button class="btn" data-add="'+p.id+'">Adicionar</button></article>';
}

/* entrega por CEP (regras de exemplo) */
function est(cep){
  const d=String(cep||'').replace(/\D/g,'');
  if(d.length!==8)return{err:'Digite os 8 números do CEP.'};
  const n=+d.slice(0,5);
  if(n<14400||n>14415)return{err:'Esse CEP fica fora da nossa área de entrega. Você pode comprar e retirar na loja.'};
  const k=Math.abs(n-14404);
  if(k===0)return{min:25,max:35,fee:4.99,z:'Jardim Aeroporto e vizinhança'};
  if(k<=3)return{min:35,max:50,fee:6.99,z:'bairros próximos'};
  return{min:50,max:70,fee:9.99,z:'demais bairros de Franca'};
}
const fmtCep=v=>{const d=v.replace(/\D/g,'').slice(0,8);return d.length>5?d.slice(0,5)+'-'+d.slice(5):d};
function estHtml(cep){
  const e=est(cep);
  if(e.err)return '<span class="no">'+esc(e.err)+'</span>';
  return FREE?'Entrega em <b>'+e.min+' a '+e.max+' min</b> · taxa '+brl(e.fee)+' ('+esc(e.z)+'). <b>Grátis</b> acima de '+brl(FREE)+'. Ou retire na loja em 15 min.':'Entrega <b>grátis</b> em <b>'+e.min+' a '+e.max+' min</b> ('+esc(e.z)+'). Ou retire na loja em 15 min.';
}

/* horário */
const now=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());const g=t=>p.find(x=>x.type===t).value;return{d:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(g('weekday')),h:(+g('hour')%24)+(+g('minute'))/60}};
const N=now(),TD=HOURS[N.d],OPEN=N.h>=TD[1]&&N.h<TD[2];
const openTxt=OPEN?'Aberto agora · até '+TD[2]+'h':(N.h<TD[1]?'Fechado · abre hoje às '+TD[1]+'h':'Fechado · abre amanhã às '+HOURS[(N.d+1)%7][1]+'h');
document.getElementById('status').innerHTML='<i class="dot'+(OPEN?' on':'')+'"></i>'+esc(openTxt);

/* carrinho */
const lines=()=>Object.entries(S.cart).filter(([id,q])=>BY[id]&&q>0).map(([id,q])=>({p:BY[id],q}));
const subtotal=()=>lines().reduce((s,l)=>s+l.p.p*l.q,0);
const count=()=>lines().reduce((s,l)=>s+l.q,0);
const feeNow=()=>{if(S.mode==='retirada')return 0;const e=est(S.cep);if(e.err)return null;return subtotal()>=FREE?0:e.fee};
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.k);toast.k=setTimeout(()=>t.classList.remove('on'),1800)}
function add(id,q){S.cart[id]=(S.cart[id]||0)+(q||1);if(S.cart[id]<=0)delete S.cart[id];save();paintCart();}
function paintCart(){
  document.getElementById('cartN').textContent=count();
  document.getElementById('mTot').textContent=brl(subtotal());
  document.getElementById('cepLbl').textContent=S.cep?'CEP '+S.cep:'Informe seu CEP';
  const L=lines(),dl=document.getElementById('dl'),df=document.getElementById('df');
  if(!L.length){dl.innerHTML='<div style="padding:30px 0;text-align:center"><p style="font-weight:800;font-size:18px">Seu carrinho está vazio</p><p style="color:var(--soft);margin:8px 0 16px">Que tal começar pelas ofertas?</p><a class="btn" href="#produtos" data-close>Ver produtos</a></div>';df.innerHTML='';return}
  dl.innerHTML=L.map(l=>'<div class="li"><div class="pic">'+(l.p.t==='rx'?'<div style="height:100%;display:grid;place-items:center;color:var(--red)">'+ico('rx')+'</div>':shot(l.p))+'</div><div><h4>'+esc(l.p.n)+'</h4><div style="font-weight:800;margin-top:4px">'+brl(l.p.p*l.q)+'</div>'+(l.p.t==='rx'?'<div style="color:var(--red2);font-size:13px;font-weight:700">Exige receita</div>':'')+'</div><div class="qty"><button data-q="'+l.p.id+'" data-d="-1" aria-label="Diminuir">−</button><span>'+l.q+'</span><button data-q="'+l.p.id+'" data-d="1" aria-label="Aumentar">+</button></div></div>').join('');
  const st=subtotal(),miss=Math.max(0,FREE-st);
  df.innerHTML='<div class="opts" style="grid-template-columns:1fr 1fr"><label class="opt"><input type="radio" name="dm" value="retirada" '+(S.mode==='retirada'?'checked':'')+'><span><b>Retirar</b><small>15 min · grátis</small></span></label><label class="opt"><input type="radio" name="dm" value="entrega" '+(S.mode==='entrega'?'checked':'')+'><span><b>Entrega</b><small>'+(S.cep&&!est(S.cep).err?est(S.cep).min+'–'+est(S.cep).max+' min':'informe o CEP')+'</small></span></label></div>'+
  (S.mode==='entrega'?(FREE&&miss>0?'<div style="font-size:14px">Faltam <b>'+brl(miss)+'</b> para entrega grátis</div><div class="prog"><i style="width:'+Math.min(100,st/FREE*100)+'%"></i></div>':'<div class="note g">Entrega grátis neste pedido</div>'):'')+
  '<div class="rowt"><span>Subtotal</span><b>'+brl(st)+'</b></div><a class="btn full" href="#checkout" data-close>Finalizar compra</a><a class="btn ghost full js-wa2" href="'+wa('Olá! Vim pelo site e quero pedir: '+L.map(l=>l.q+'x '+l.p.n).join('; '))+'">Pedir pelo WhatsApp</a>';
}
function openD(id,on){const d=document.getElementById(id);d.classList.toggle('on',on);d.setAttribute('aria-hidden',on?'false':'true')}

/* vistas */
const V=document.getElementById('view');
function navCats(cur){document.getElementById('catnav').innerHTML='<a href="#produtos"'+(cur==='all'?' class="on"':'')+'>Todos</a>'+CATS.map(c=>'<a href="#c-'+c[0]+'"'+(cur===c[0]?' class="on"':'')+'>'+esc(c[1])+'</a>').join('')+'<a href="#blog"'+(cur==='blog'?' class="on"':'')+'>Blog de saúde</a>'}

const SLIDES=[
 ['s-red','Entrega grátis em Franca','<em>Entrega grátis</em> na sua casa.','Sem pedido mínimo, nos bairros atendidos. Informe o CEP e veja o prazo.',['Calcular meu CEP','data-cep'],['Ver produtos','#produtos'],'fachada','Fachada da Drogaria Popular do Tiãozinho'],
 ['s-yel','Pagamento','<em>5% de desconto</em> pagando no Pix.','Desconto aplicado no total do pedido. Também aceitamos crédito, débito e dinheiro.',['Começar a comprar','#produtos'],null,'interior','Interior da loja com prateleiras organizadas'],
 ['s-ink','Compre e retire','Pronto para retirar em <em>15 minutos</em>.','Escolha no site, a gente separa e avisa no WhatsApp. Sem fila no balcão.',['Como funciona','#retirada'],['Falar no WhatsApp','wa'],'genericos','Balcão e prateleiras da drogaria'],
 ['s-pink','Beleza e cuidados','Dermocosméticos e <em>perfumaria</em>.','Protetor solar, hidratantes, cabelo e higiene, com entrega grátis.',['Ver cuidados com a pele','#c-dermo'],null,'perfumaria','Prateleiras de perfumaria e higiene']
];
function heroCar(){
  const btn=(b,cls)=>!b?'':b[1]==='data-cep'?'<button class="btn '+cls+'" data-cep>'+b[0]+'</button>':b[1]==='wa'?'<a class="btn '+cls+' js-wa" data-m="Olá! Vim pelo site." href="#">'+b[0]+'</a>':'<a class="btn '+cls+'" href="'+b[1]+'">'+b[0]+'</a>';
  return '<section class="hcar" id="hcar" aria-roledescription="carrossel" aria-label="Destaques da loja"><div class="hc-track" id="hcT" tabindex="0">'+SLIDES.map((s,i)=>{const h=i?'h2':'h1';return '<article class="hc-slide '+s[0]+(i?'':' on')+'" aria-roledescription="slide" aria-label="'+(i+1)+' de '+SLIDES.length+'"><div class="hc-txt"><span class="hc-kick">'+s[1]+'</span><'+h+'>'+s[2]+'</'+h+'><p>'+s[3]+'</p><div class="hc-cta">'+btn(s[4],s[0]==='s-yel'?'':'lt')+btn(s[5],'ghost')+'</div></div><div class="hc-pic"><img src="/img/'+s[6]+'-sl.webp" srcset="/img/'+s[6]+'-sl.webp 640w, /img/'+s[6]+'.webp 821w" sizes="(min-width:760px) 600px, 100vw" alt="'+s[7]+'" width="640" height="576"'+(i?' loading="lazy" decoding="async"':' fetchpriority="high"')+'></div></article>'}).join('')+'</div><button class="hc-nav prev" aria-label="Destaque anterior">‹</button><button class="hc-nav next" aria-label="Próximo destaque">›</button><div class="hc-dots" role="tablist">'+SLIDES.map((s,i)=>'<button role="tab" aria-label="Ir para o destaque '+(i+1)+'"'+(i?'':' class="on" aria-selected="true"')+'></button>').join('')+'</div></section>'+
  '<div class="bens">'+[['truck','Entrega <b>grátis</b> em Franca, sem pedido mínimo','#retirada'],['store','Retire na loja em <b>15 min</b>, sem fila','#retirada'],['pix','<b>5% de desconto</b> pagando no Pix','#termos'],['rx','Receita? Envie a foto pelo <b>WhatsApp</b>','#c-receita']].map(b=>'<a class="ben" href="'+b[2]+'"><i>'+BICO[b[0]]+'</i><span>'+b[1]+'</span></a>').join('')+'</div>';
}
const BICO={truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/></svg>',store:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9h16l-1-4H5zM5 9v11h14V9M10 20v-5h4v5"/></svg>',pix:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 9 9-9 9-9-9z"/><path d="M8 12h8"/></svg>',rx:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h9l3 3v15H6z"/><path d="M9 10h6M9 14h6M9 18h3"/></svg>'};
function initHero(){
  const C=document.getElementById('hcar');if(!C)return;
  const T=C.querySelector('#hcT'),S=[...T.children],D=[...C.querySelectorAll('.hc-dots button')];
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,DUR=6000;let cur=0,tm=null,paused=false;
  C.style.setProperty('--hcd',DUR+'ms');
  const set=i=>{cur=i;S.forEach((s,k)=>s.classList.toggle('on',k===i));D.forEach((d,k)=>{const on=k===i;d.classList.toggle('on',on);d.setAttribute('aria-selected',on);if(on){d.style.animation='none';void d.offsetWidth;d.style.animation=''}})};
  const go=i=>{i=(i+S.length)%S.length;T.scrollTo({left:S[i].offsetLeft-T.offsetLeft,behavior:RM?'auto':'smooth'})};
  const arm=()=>{clearTimeout(tm);if(RM||paused)return;tm=setTimeout(()=>go(cur+1),DUR)};
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.intersectionRatio>.6){set(S.indexOf(e.target));arm()}}),{root:T,threshold:[.6]});
  S.forEach(s=>io.observe(s));
  C.querySelector('.prev').onclick=()=>go(cur-1);C.querySelector('.next').onclick=()=>go(cur+1);
  D.forEach((d,i)=>d.onclick=()=>go(i));
  const pause=v=>{paused=v;C.classList.toggle('paused',v);v?clearTimeout(tm):arm()};
  C.addEventListener('mouseenter',()=>pause(true));C.addEventListener('mouseleave',()=>pause(false));
  C.addEventListener('focusin',()=>pause(true));C.addEventListener('focusout',()=>pause(false));
  T.addEventListener('touchstart',()=>clearTimeout(tm),{passive:true});T.addEventListener('touchend',()=>arm(),{passive:true});
  T.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
  document.addEventListener('visibilitychange',()=>document.hidden?clearTimeout(tm):arm());
  if(RM)C.classList.add('paused');arm();
}
function initRails(){
  V.querySelectorAll('.rail').forEach(r=>{
    if(r.parentElement.classList.contains('railw'))return;
    const w=document.createElement('div');w.className='railw';r.before(w);w.append(r);
    const p=document.createElement('button'),n=document.createElement('button');
    p.className='rnav p';n.className='rnav n';p.textContent='‹';n.textContent='›';p.setAttribute('aria-label','Anteriores');n.setAttribute('aria-label','Próximos');w.append(p,n);
    const st=()=>{p.disabled=r.scrollLeft<8;n.disabled=r.scrollLeft+r.clientWidth>=r.scrollWidth-8};
    p.onclick=()=>r.scrollBy({left:-r.clientWidth*.9});n.onclick=()=>r.scrollBy({left:r.clientWidth*.9});
    r.addEventListener('scroll',st,{passive:true});st();
  });
}
function home(){
  const offers=P.filter(p=>p.o&&p.t!=='rx');
  return heroCar()+`
<section class="band" id="loja-cep"><div class="wrap hero">
  <div>
    <h2 class="h1like">A farmácia do Tiãozinho, agora no seu celular.</h2>
    <p class="sub">Escolha online e retire em 15 minutos na loja do Jardim Aeroporto II, ou receba em casa. Genéricos com preço honesto, 5% de desconto no Pix e entrega grátis em Franca.</p>
    <div class="cepbox"><label for="cepIn">Calcule a entrega para o seu endereço</label><div class="ceprow"><input id="cepIn" inputmode="numeric" placeholder="Digite seu CEP" maxlength="9" value="${esc(S.cep)}"><button class="btn" id="cepGo">Calcular</button></div><div class="estim" id="estim">${S.cep?estHtml(S.cep):'Exemplo: 14404-095'}</div></div>
    <div class="trust"><span>${ico('dermo')}5,0 no Google</span><span>${ico('rx')}Receita pelo WhatsApp</span><span>${ico('med')}Genéricos</span><span>${ico('socorro')}Pix e cartão</span></div>
  </div>
  <div class="photo"><img src="/img/fachada.webp" srcset="/img/fachada-480.webp 480w, /img/fachada.webp 821w" sizes="(min-width:900px) 420px, 92vw" alt="Fachada vermelha da Drogaria Popular do Tiãozinho, número 1647" width="821" height="1463" loading="lazy" decoding="async"><span class="openb"><i class="dot${OPEN?' on':''}"></i>${esc(openTxt)}</span><span class="cap">Rua Alípio Resende de Araújo, 1647 · Jardim Aeroporto II</span></div>
</div></section>

<section class="band" id="retirada" style="padding-top:0"><div class="wrap modes">
  <div class="mode"><div class="t"><span class="big">15 min</span><h3>Compre e retire na loja</h3><p>Você paga na retirada e não pega fila. Avisamos no WhatsApp quando estiver pronto.</p><a class="btn" href="#produtos" style="align-self:flex-start">Comprar para retirar</a></div><img src="/img/interior.webp" alt="Corredor da loja com balcão de medicamentos ao fundo" loading="lazy"></div>
  <div class="mode"><div class="t"><span class="big">25 min</span><h3>Receba em casa</h3><p>Entrega grátis em toda a área atendida em Franca. Informe o CEP para ver o prazo.</p><button class="btn ghost" data-cep style="align-self:flex-start">Calcular meu CEP</button></div><img src="/img/genericos.webp" alt="Gôndolas de fraldas e higiene e balcão de genéricos" loading="lazy"></div>
</div></section>

<section class="band" style="padding-top:0"><div class="wrap"><div class="head"><h2>Ofertas da semana</h2><a href="#produtos">Ver todos</a></div><div class="rail">${offers.map(card).join('')}</div><p class="demo">Preços e produtos de exemplo para demonstração. Imagens ilustrativas.</p></div></section>

<section class="band" style="background:var(--panel)"><div class="wrap"><div class="head"><h2>Compre por categoria</h2></div><div class="catgrid">${CATS.map(c=>'<a href="#c-'+c[0]+'"><i>'+ico(c[2])+'</i>'+esc(c[1])+'</a>').join('')}</div></div></section>

${SECS.map(sec).join('')}

<section class="band" style="padding-top:0"><div class="wrap rx">
  <div><h2>Tem receita? Mande a foto.</h2><p>O farmacêutico confere, indica o genérico equivalente quando houver e separa para você.</p><ol><li>Mande a foto da receita no WhatsApp</li><li>Receba disponibilidade e preço</li><li>Retire na loja ou receba em casa</li></ol><a class="btn yel js-wa" data-m="Olá! Vim pelo site e quero enviar a foto da minha receita." href="#">Enviar receita pelo WhatsApp</a><p class="fine" style="margin-top:14px">Antibióticos e medicamentos controlados são vendidos somente na loja, com a receita original, conforme a Anvisa.</p></div>
  <div class="calc" id="lembrete"><h3>Lembrete de recompra</h3><p style="color:var(--soft);font-size:15px">Para remédio de uso contínuo: saiba quando a caixa acaba.</p><div class="r2"><label for="qtd">Comprimidos na caixa<input id="qtd" type="number" min="1" value="30" inputmode="numeric"></label><label for="dose">Por dia<input id="dose" type="number" min="0.5" step="0.5" value="1" inputmode="decimal"></label></div><label for="ini">Comecei a caixa em<input id="ini" type="date"></label><div><span style="font-size:14px;color:var(--soft)">Acaba por volta de</span><div class="when" id="when">--/--</div></div><a class="btn wa" id="remind" href="#">Quero o lembrete no WhatsApp</a><p style="font-size:13px;color:var(--soft)">Nada fica salvo no site. Ao enviar a mensagem, você autoriza o lembrete por WhatsApp e pode cancelar quando quiser.</p></div>
</div></section>

<section class="band" style="background:var(--panel)" id="loja"><div class="wrap"><div class="head"><h2>Conheça a loja</h2><a href="https://maps.google.com/?cid=11879859039717633354">Ver no Google Maps</a></div>
<div class="gallery"><figure><img src="/img/interior.webp" alt="Corredores da drogaria e balcão de medicamentos" loading="lazy"><figcaption>Balcão de medicamentos</figcaption></figure><figure><img src="/img/genericos.webp" alt="Setor de genéricos, fraldas e higiene" loading="lazy"><figcaption>Genéricos e bebê</figcaption></figure><figure><img src="/img/perfumaria.webp" alt="Parede de perfumaria e cuidados com o cabelo" loading="lazy"><figcaption>Perfumaria</figcaption></figure></div></div></section>

<section class="band"><div class="wrap revs"><div class="score"><b>5,0</b><div class="stars" aria-label="5 de 5 estrelas">★★★★★</div><div style="font-size:14px;color:var(--soft)">no Google</div></div><div><h3 style="font-size:22px;margin-bottom:12px">O que os clientes destacam nas avaliações</h3><div class="themes"><span>Atendimento da família do Tiãozinho</span><span>Preço honesto</span><span>Loja organizada</span></div><div class="btns" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px"><a class="btn ghost" href="https://maps.google.com/?cid=11879859039717633354">Ler as avaliações</a><a class="btn ghost" href="https://maps.google.com/?cid=11879859039717633354">Avaliar a farmácia</a></div></div></div></section>

<section class="band" style="padding-top:0"><div class="wrap"><div class="head"><h2>Blog de saúde</h2><a href="#blog">Ver todos os artigos</a></div><div class="posts">${POSTS.map(postCard).join('')}</div>${newsletter('home')}</div></section>

<section class="band" style="padding-top:0"><div class="wrap"><div class="head"><h2>Fale com a gente</h2></div><div class="social">
<a class="js-wa" data-m="Olá! Vim pelo site." href="#" style="background:var(--wa)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.2-1.3A10 10 0 1 0 12 2Z"/></svg><span>WhatsApp<small>(16) 99063-6369</small></span></a>
<a href="https://www.instagram.com/tiaozinho.drogariapopular/" style="background:#c13584"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg><span>Instagram<small>@tiaozinho.drogariapopular</small></span></a>
<a href="tel:+551630303696" style="background:var(--red)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg><span>Telefone fixo<small>(16) 3030-3696</small></span></a>
</div></div></section>

<section class="band faq" id="duvidas" style="background:var(--panel)"><div class="wrap" style="max-width:860px"><h2 style="margin-bottom:10px">Dúvidas frequentes</h2>${FAQ.map(f=>'<details><summary>'+esc(f[0])+'</summary><p>'+esc(f[1])+'</p></details>').join('')}</div></section>`;
}
const SECS=[
 ['medicamentos','Medicamentos','Genéricos e medicamentos sem receita para o dia a dia. Os de receita ficam em uma seção própria.','#e1131b','/img/interior-480.webp','Balcão de medicamentos da loja'],
 ['vitaminas','Vitaminas e suplementos','Vitamina C, D, ômega 3 e polivitamínicos.','#0b7a3e','',''],
 ['bebe','Infantil','Fraldas, lenços, higiene e cuidados para bebês e crianças.','#1d6fe0','/img/genericos-480.webp','Gôndola de fraldas e infantil da loja'],
 ['dermo','Cuidados com a pele','Protetor solar, hidratantes e limpeza facial.','#f08a00','/img/perfumaria-480.webp','Parede de perfumaria e cuidados da loja']
];
function sec(x,i){
  const items=P.filter(p=>p.c===x[0]);
  return '<section class="band sec" id="s-'+x[0]+'"'+(i%2?' style="background:var(--panel)"':'')+'><div class="wrap"><div class="shead" style="--sc:'+x[3]+'">'+(x[4]?'<img src="'+x[4]+'" alt="'+esc(x[5])+'" loading="lazy">':'<div class="sico">'+ico(CATS.find(c=>c[0]===x[0])[2])+'</div>')+'<div><h2>'+esc(x[1])+'</h2><p>'+esc(x[2])+'</p></div><a class="btn ghost" href="#c-'+x[0]+'">Ver tudo em '+esc(x[1])+'</a></div>'+(x[0]==='medicamentos'?'<p class="mipw">'+MIP_W+'</p>':'')+'<div class="rail">'+items.map(card).join('')+'</div></div></section>';
}
function newsletter(where){
  return '<section class="nl" id="newsletter"><div><h2>Receba o blog e as ofertas da semana</h2><p>Um resumo por semana no WhatsApp ou no e-mail, com dicas de saúde e ofertas de beleza, bebê e higiene. Não enviamos oferta de medicamentos.</p></div><form class="nlf" data-nl="'+where+'"><label class="fld">Seu nome<input name="nome" autocomplete="name" required></label><label class="fld">WhatsApp ou e-mail<input name="contato" autocomplete="email" required></label><label class="chk"><input type="checkbox" name="ok" required>Quero receber o blog e ofertas da Drogaria Popular do Tiãozinho. Li a <a href="#privacidade">Política de privacidade</a> e posso cancelar quando quiser.</label><button class="btn yel">Quero receber</button><p class="nlmsg" role="status"></p></form></section>';
}
const LIVE=/vercel\.app$|\.com\.br$/.test(location.hostname);
function postCard(b){return '<a class="post" href="'+(LIVE?'/saude/':'#b-')+b.s+'"><div class="cv" style="background:'+b.col+'">'+ico(b.i)+'</div><div class="in"><small>'+esc(b.c)+'</small><h3>'+esc(b.t)+'</h3><p>'+esc(b.e)+'</p></div></a>'}
function rxTable(items){
  return '<div class="scroll"><table class="tbl stack rxt"><thead><tr><th>Medicamento</th><th>Substância (DCB)</th><th>Apresentação</th><th>Registro MS</th><th>Detentor do registro</th><th>Preço</th><th></th></tr></thead><tbody>'+items.map(p=>{const m=p.n.split(' · ');return '<tr><td data-l="Medicamento">'+esc(m[0].replace(/ \d.*$/,''))+(/genérico/.test(p.n)?' (genérico)':'')+'</td><td data-l="Substância">'+esc(MED[p.id]?MED[p.id][0]:'')+'</td><td data-l="Apresentação">'+esc(p.n.replace(/\s*\(genérico\)/,''))+'</td><td data-l="Registro MS">'+NA+'</td><td data-l="Detentor">'+NA+'</td><td class="n" data-l="Preço">'+brl(p.p)+'</td><td><button class="btn" style="min-height:40px;font-size:14px" data-add="'+p.id+'">Pedir com receita</button></td></tr>'}).join('')+'</tbody></table></div>';
}
function listing(cat,q){
  let items=P,title='Todos os produtos';
  if(cat){items=P.filter(p=>p.c===cat);title=(CATS.find(c=>c[0]===cat)||[0,'Produtos'])[1]}
  if(q!=null){const k=q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');items=P.filter(p=>(p.n+' '+p.d).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').includes(k));title='Resultados para "'+q+'"'}
  const so=S.sort||'rel';
  if(so==='menor')items=[...items].sort((a,b)=>a.p-b.p);
  if(so==='maior')items=[...items].sort((a,b)=>b.p-a.p);
  return `<section class="band"><div class="wrap"><div class="crumbs"><a href="#inicio">Início</a> › ${esc(title)}</div><h1 style="font-size:clamp(28px,3vw,38px)">${esc(title)}</h1>
  ${cat==='receita'?'<div class="note r" style="margin-top:14px">Medicamentos de venda sob prescrição médica são apresentados apenas em lista de preços, sem imagens, como determina a Anvisa. Só são dispensados com a receita, avaliada pelo farmacêutico: envie a foto pelo WhatsApp depois de finalizar. Medicamentos controlados e antibióticos não são vendidos pela internet: somente na loja, com a receita original.</div>':''}
  ${cat==='medicamentos'?'<div class="note w" style="margin-top:14px">Medicamentos isentos de prescrição. Leia a bula e, em caso de dúvida, fale com o farmacêutico. '+MIP_W+'</div>':''}
  <div class="toolbar"><div class="chips">${CATS.map(c=>'<a href="#c-'+c[0]+'"'+(cat===c[0]?' class="on"':'')+'>'+esc(c[1])+'</a>').join('')}</div><label>Ordenar <select id="sort"><option value="rel">Relevância</option><option value="menor"${so==='menor'?' selected':''}>Menor preço</option><option value="maior"${so==='maior'?' selected':''}>Maior preço</option></select></label></div>
  ${(()=>{const rx=items.filter(p=>p.t==='rx'),nx=items.filter(p=>p.t!=='rx');return (nx.length?'<div class="grid">'+nx.map(card).join('')+'</div>':'')+(rx.length?(nx.length?'<h2 style="margin:30px 0 12px;font-size:24px">Medicamentos com receita</h2>':'')+rxTable(rx):'')})()}
  ${items.length?'':'<div class="note w">Não achamos esse produto no site. <a class="js-wa" data-m="Olá! Vim pelo site e procuro: '+esc(q||'')+'" href="#">Pergunte no WhatsApp</a>, a loja tem muito mais itens no balcão.</div>'}
  <p class="demo">${items.length} produtos. Preços de exemplo para demonstração. Imagens ilustrativas.</p></div></section>`;
}
function product(p){
  const cat=CATS.find(c=>c[0]===p.c);
  if(p.t==='rx')return `<section class="band"><div class="wrap"><div class="crumbs"><a href="#inicio">Início</a> › <a href="#c-receita">Com receita</a> › ${esc(MED[p.id][0])}</div><h1 style="font-size:clamp(24px,3vw,32px)">${esc(p.n)}</h1><div class="note r" style="margin:16px 0">Medicamento de venda sob prescrição médica. Dispensado somente com a receita, avaliada pelo farmacêutico.</div>${rxTable([p])}<p class="demo">Lista de preços conforme a RDC 96/2008. Preço de exemplo para demonstração.</p></div></section>`;const rel=P.filter(x=>x.c===p.c&&x.id!==p.id).slice(0,4);const e=S.cep?est(S.cep):null;
  return `<section class="band"><div class="wrap"><div class="crumbs"><a href="#inicio">Início</a> › <a href="#c-${p.c}">${esc(cat[1])}</a> › ${esc(p.n)}</div>
  <div class="pd"><div class="pic">${shot(p)}</div><div style="display:grid;gap:14px;align-content:start">
  <h1 style="font-size:clamp(26px,3vw,36px)">${esc(p.n)}</h1>
  <div class="price">${p.o?'<small style="display:block;font-size:14px;color:var(--soft)">De <s>'+brl(p.o)+'</s> por</small>':''}<b>${brl(p.p)}</b><span class="pixp" style="font-size:16px">${brl(pixP(p.p))} no Pix (${PIX}% de desconto)</span></div>
  <p style="color:var(--soft)">${esc(p.d)}</p>
  ${p.t==='rx'?'<div class="note r">Venda sob prescrição médica. Depois de finalizar, envie a foto da receita pelo WhatsApp. O farmacêutico confere antes de separar.</div>':''}
  ${p.t==='mip'?'<div class="tech" style="font-size:15px">Substância: '+esc(MED[p.id][0])+' · Indicação: '+esc(MED[p.id][1])+' · Registro MS: '+NA+' · Detentor: '+NA+'</div><div class="adv big">'+esc(advTxt(p))+'</div>':''}
  <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><div class="qty"><button id="qm" aria-label="Diminuir">−</button><span id="qv">1</span><button id="qp" aria-label="Aumentar">+</button></div><button class="btn" id="addP" style="flex:1">Adicionar ao carrinho</button></div>
  <div class="cepbox"><label for="cepIn">Quando chega?</label><div class="ceprow"><input id="cepIn" inputmode="numeric" placeholder="Digite seu CEP" maxlength="9" value="${esc(S.cep)}"><button class="btn" id="cepGo">Calcular</button></div><div class="estim" id="estim">${e?estHtml(S.cep):'Retire na loja em 15 min, grátis.'}</div></div>
  <a class="btn ghost js-wa" data-m="Olá! Vim pelo site e tenho uma dúvida sobre: ${esc(p.n)}" href="#">Tirar dúvida com o farmacêutico</a>
  </div></div>
  ${rel.length?'<div class="head" style="margin-top:40px"><h2>Da mesma categoria</h2></div><div class="grid">'+rel.map(card).join('')+'</div>':''}
  <p class="demo">Preço de exemplo para demonstração. Imagem ilustrativa.</p></div></section>`;
}
function blogList(){return `<section class="band"><div class="wrap"><div class="crumbs"><a href="#inicio">Início</a> › Blog de saúde</div><h1 style="font-size:clamp(28px,3vw,40px)">Blog de saúde</h1><p style="color:var(--soft);margin:10px 0 22px;max-width:44em">Respostas para as dúvidas que mais aparecem no balcão. Conteúdo informativo, que não substitui a orientação do seu médico ou farmacêutico.</p><div class="posts">${POSTS.map(postCard).join('')}</div>${newsletter('blog')}</div></section>`}
function post(b){
  const others=POSTS.filter(x=>x.s!==b.s).slice(0,3);
  return `<section class="band"><div class="wrap"><div class="crumbs"><a href="#inicio">Início</a> › <a href="#blog">Blog</a> › ${esc(b.c)}</div><article class="article"><h1>${esc(b.t)}</h1><div class="meta">Equipe Drogaria Popular do Tiãozinho · Leitura de 2 minutos</div>${b.b.map(x=>x[0]==='h'?'<h2>'+esc(x[1])+'</h2>':'<p>'+esc(x[1])+'</p>').join('')}<div class="note w" style="margin:20px 0">Conteúdo informativo. Não substitui a orientação do seu médico ou farmacêutico.</div><a class="btn wa js-wa" data-m="Olá! Li o artigo &quot;${esc(b.t)}&quot; no site e tenho uma dúvida." href="#">Perguntar ao farmacêutico</a></article>
  ${newsletter('artigo-'+b.s)}<div class="head" style="margin-top:44px"><h2>Leia também</h2></div><div class="posts">${others.map(postCard).join('')}</div></div></section>`;
}
/* formas de pagamento (ícones próprios, sem marcas de terceiros) */
const PAYI={
 pix:['Pix','<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="4" y="4" width="9" height="9" rx="1.5"/><rect x="19" y="4" width="9" height="9" rx="1.5"/><rect x="4" y="19" width="9" height="9" rx="1.5"/><path d="M19 19h3v3h-3zM25 19h3M19 25h3v3M25 25h3v3h-3"/></svg>'],
 credito:['Crédito','<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="7" width="26" height="18" rx="3"/><path d="M3 12h26"/><rect x="7" y="16" width="6" height="4" rx="1"/></svg>'],
 debito:['Débito','<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="7" width="26" height="18" rx="3"/><path d="M7 20h8M3 12h26"/><circle cx="23" cy="19" r="2.5"/></svg>'],
 dinheiro:['Dinheiro','<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="8" width="28" height="16" rx="2.5"/><circle cx="16" cy="16" r="4"/><path d="M6 12v0M26 20v0" stroke-linecap="round" stroke-width="3"/></svg>']
};
const payTile=k=>'<span class="ptile t-'+k+'" role="img" aria-label="'+PAYI[k][0]+'">'+PAYI[k][1]+'<small>'+PAYI[k][0]+'</small></span>';
const LOCK='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
const cpfOk=v=>{const d=v.replace(/\D/g,'');if(d.length!==11||/^(\d)\1+$/.test(d))return false;const c=n=>{let s=0;for(let i=0;i<n;i++)s+=+d[i]*(n+1-i);const r=s*10%11%10;return r===+d[n]};return c(9)&&c(10)};
const fmtCpf=v=>{const d=v.replace(/\D/g,'').slice(0,11);return d.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})\.(\d{3})(\d)/,'$1.$2.$3').replace(/\.(\d{3})(\d{1,2})$/,'.$1-$2')};
function checkout(){
  const L=lines();
  if(!L.length)return '<section class="band"><div class="wrap" style="text-align:center;padding:60px 0"><h1 style="font-size:32px">Seu carrinho está vazio</h1><p style="color:var(--soft);margin:12px 0 20px">Escolha os produtos para finalizar a compra.</p><a class="btn" href="#produtos">Ver produtos</a></div></section>';
  const hasRx=L.some(l=>l.p.t==='rx');
  const opt=(v,k,t,sm,extra)=>'<label class="opt popt"><input type="radio" name="pay" value="'+v+'"'+(k==='pix'?' checked':'')+'><span class="pico">'+PAYI[k][1]+'</span><span><b>'+t+(extra||'')+'</b><small>'+sm+'</small></span></label>';
  return `<section class="band cob"><div class="wrap">
  <ol class="stepper" id="stepper"><li class="ok"><i>1</i>Carrinho</li><li class="on"><i>2</i>Entrega e dados</li><li><i>3</i>Pagamento</li><li><i>4</i>Confirmação</li></ol>
  <h1 style="font-size:clamp(26px,3vw,34px);margin:6px 0 18px">Finalizar compra</h1>
  <form class="co" id="coForm" novalidate><div>
  <div class="step" data-s="1"><h3><i>1</i>Como você quer receber?</h3><div class="opts"><label class="opt"><input type="radio" name="mode" value="retirada" ${S.mode==='retirada'?'checked':''}><span><b>Retirar na loja</b><small>Pronto em 15 min · grátis<br>Rua Alípio Resende de Araújo, 1647</small></span></label><label class="opt"><input type="radio" name="mode" value="entrega" ${S.mode==='entrega'?'checked':''}><span><b>Receber em casa <em class="free">Grátis</em></b><small id="optEnt">${S.cep&&!est(S.cep).err?est(S.cep).min+' a '+est(S.cep).max+' min':'Prazo pelo CEP'}</small></span></label></div>
  ${hasRx?'<p class="fine" style="margin-top:10px">Medicamentos controlados e antibióticos não são vendidos pelo site: somente retirada na loja, com a receita original.</p>':''}
  <div id="addr" style="margin-top:14px;display:${S.mode==='entrega'?'block':'none'}"><div class="fg"><label class="fld s2">CEP<input id="fCep" name="cep" inputmode="numeric" maxlength="9" value="${esc(S.cep)}" autocomplete="postal-code"></label><label class="fld s4">Rua<input name="rua" autocomplete="address-line1"></label><label class="fld s2">Número<input name="num" inputmode="numeric"></label><label class="fld s4">Complemento<input name="comp" placeholder="Opcional" autocomplete="address-line2"></label><label class="fld s3">Bairro<input name="bairro"></label><label class="fld s3">Ponto de referência<input name="ref" placeholder="Opcional"></label></div><div class="estim" id="estim3">${S.cep?estHtml(S.cep):''}</div></div></div>
  <div class="step" data-s="1"><h3><i>2</i>Seus dados</h3><div class="fg"><label class="fld s6">Nome completo<input name="nome" autocomplete="name" required></label><label class="fld s3">WhatsApp<input name="tel" inputmode="tel" autocomplete="tel" placeholder="(16) 9...." required></label><label class="fld s3">CPF na nota <span style="font-weight:400;color:var(--soft)">(opcional)</span><input name="cpf" inputmode="numeric" maxlength="14" placeholder="000.000.000-00"></label></div></div>
  <div class="step" data-s="2"><h3><i>3</i>Forma de pagamento</h3><div class="opts pays">
  ${opt('Pix','pix','Pix',PIX+'% de desconto no total. Após a confirmação, a loja envia o QR Code Pix pelo WhatsApp.',' <em class="free">-'+PIX+'%</em>')}
  ${opt('Cartão de crédito','credito','Cartão de crédito','Na maquininha, na entrega ou na retirada.')}
  ${opt('Cartão de débito','debito','Cartão de débito','Na maquininha, na entrega ou na retirada.')}
  ${opt('Dinheiro','dinheiro','Dinheiro','Na entrega ou na retirada. Informe o troco.')}
  </div><label class="fld" id="trocoF" style="margin-top:12px;display:none">Troco para quanto?<input name="troco" inputmode="decimal" placeholder="Ex.: 100"></label>
  <p class="secnote">${LOCK}<span>O site nunca pede número de cartão nem senha. O cartão é passado na maquininha, na sua frente.</span></p></div>
  ${hasRx?'<div class="step" data-s="2" style="border-color:var(--red)"><h3><i>4</i>Receita médica</h3><p style="color:var(--soft);margin-bottom:12px">Seu pedido tem medicamento de venda sob prescrição. Depois de finalizar, envie a foto da receita pelo WhatsApp. O farmacêutico confere antes de separar, e a receita é apresentada na entrega ou retirada.</p><label class="chk"><input type="checkbox" name="rxok" required>Tenho a receita e vou enviar a foto pelo WhatsApp</label></div>':''}
  <div class="note w" style="margin-bottom:12px"><b>Resumo das condições:</b> o pedido é confirmado pela loja no WhatsApp, com disponibilidade e prazo. Entrega grátis nos CEPs atendidos em Franca. Medicamentos com receita só são separados após a avaliação do farmacêutico. Você pode desistir em até 7 dias após o recebimento. <a href="#termos">Termos completos</a>.</div><label class="chk" style="margin:4px 0 0"><input type="checkbox" name="lgpd" required>Li os <a href="#termos">Termos de compra</a> e a <a href="#privacidade">Política de privacidade</a>, e autorizo o uso dos meus dados só para atender este pedido.</label>
  </div>
  <aside class="sum"><h3>Resumo do pedido</h3>${L.map(l=>'<div class="rowt" style="font-size:15px"><span>'+l.q+'× '+esc(l.p.n)+'</span><b>'+brl(l.p.p*l.q)+'</b></div>').join('')}<hr style="border:0;border-top:1px solid var(--line);width:100%"><div class="rowt"><span>Subtotal</span><b>${brl(subtotal())}</b></div><div class="rowt"><span>Entrega</span><b id="sFee"></b></div><div class="rowt pixrow" id="sPixR"><span>Desconto Pix (${PIX}%)</span><b id="sPix"></b></div><div class="rowt" style="font-size:21px"><span style="font-weight:800">Total</span><b id="sTot"></b></div><p class="err" id="coErr" role="alert"></p><button class="btn full" style="min-height:56px;font-size:17px">${LOCK} Finalizar pedido</button>
  <div class="trust"><div>${LOCK}<span><b>Compra segura</b>Conexão criptografada (HTTPS). Dados usados só para o pedido.</span></div><div><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg><span><b>Farmacêutico confere</b>Todo pedido passa pela farmácia antes de sair.</span></div></div>
  <div class="payi">${['pix','credito','debito','dinheiro'].map(payTile).join('')}</div>
  <p style="font-size:12.5px;color:var(--soft)">${esc(LEGAL.razao)} · CNPJ ${esc(LEGAL.cnpj)}</p></aside>
  </form></div></section>`;
}
function done(o){
  const msg='Olá! Fiz o pedido '+o.n+' pelo site.\n'+o.items.map(l=>l.q+'x '+l.n+' — '+brl(l.v)).join('\n')+'\nSubtotal: '+brl(o.sub)+(o.dsc?'\nDesconto Pix: − '+brl(o.dsc):'')+'\nEntrega: '+(o.mode==='retirada'?'Retirar na loja':(o.fee?brl(o.fee):'Grátis')+' — '+o.addr)+'\nTotal: '+brl(o.tot)+'\nPagamento: '+o.pay+(o.troco?' (troco para '+o.troco+')':'')+'\nNome: '+o.nome+(o.cpf?'\nCPF na nota: '+o.cpf:'')+(o.rx?'\nVou enviar a foto da receita em seguida.':'');
  return `<section class="band"><div class="wrap" style="max-width:760px"><div class="note g" style="font-size:16px">Pedido ${esc(o.n)} montado. Falta um passo: enviar para a loja pelo WhatsApp.</div><h1 style="font-size:clamp(28px,3vw,38px);margin:20px 0 6px">Obrigado, ${esc(o.nome.split(' ')[0])}!</h1><p style="color:var(--soft)">Toque no botão abaixo para enviar o pedido. A loja confirma disponibilidade e prazo na conversa.</p>
  <a class="btn wa full" style="min-height:58px;font-size:18px;margin:20px 0" href="${wa(msg)}">Enviar pedido pelo WhatsApp</a>
  <ol class="tl"><li class="d"><div><b>Pedido montado no site</b><div style="color:var(--soft);font-size:14px">${o.count} itens · ${brl(o.tot)}</div></div></li><li><div><b>Conferido pelo farmacêutico</b><div style="color:var(--soft);font-size:14px">${o.rx?'Inclui a conferência da sua receita':'Disponibilidade e preço confirmados no WhatsApp'}</div></div></li><li><div><b>${o.mode==='retirada'?'Pronto para retirar':'Saiu para entrega'}</b><div style="color:var(--soft);font-size:14px">${o.mode==='retirada'?'Rua Alípio Resende de Araújo, 1647 · em cerca de 15 min':'Previsão de '+o.eta}</div></div></li></ol>
  <a class="btn ghost" href="#inicio">Voltar para a loja</a></div></section>`;
}

/* painel do parceiro */
function panelShell(){return '<section class="band"><div class="wrap"><div class="crumbs"><a href="#inicio">Início</a> › Área do parceiro</div><h1 style="font-size:clamp(28px,3vw,38px)">Painel de vendas e leads</h1><div id="pn"><p style="margin-top:16px;color:var(--soft)">Carregando...</p></div></div></section>'}
let PN={rate:10,f:'todos',rows:[]};
try{PN.rate=+(localStorage.getItem('tz_rate')||10)}catch(e){}
async function panel(){
  const el=document.getElementById('pn');if(!el)return;
  await ready;
  if(!DB||!ADMIN){el.innerHTML='<div class="note w" style="margin-top:16px">Área restrita ao parceiro responsável pela operação digital. Entre com a conta de dono ou editor deste site para ver leads e pedidos.</div>';return}
  let rows=[];
  try{const q=await DB.collection('leads').get();q.docs.forEach(d=>{const L=d.data().entries;if(Array.isArray(L))L.forEach(x=>rows.push({...x,_doc:d.id}))})}catch(e){el.innerHTML='<div class="note r" style="margin-top:16px">Não foi possível ler os dados agora. Tente de novo em instantes.</div>';return}
  rows.sort((a,b)=>String(b.at).localeCompare(String(a.at)));PN.rows=rows;drawPanel();
}
function drawPanel(){
  const el=document.getElementById('pn');if(!el)return;
  const rows=PN.rows,peds=rows.filter(r=>r.type==='pedido'),valid=peds.filter(r=>r.status==='confirmado'||r.status==='entregue');
  const fat=valid.reduce((s,r)=>s+(+r.tot||0),0),com=fat*PN.rate/100,ticket=valid.length?fat/valid.length:0;
  const vis=PN.f==='todos'?rows:rows.filter(r=>r.type===PN.f);
  const det=r=>r.type==='pedido'?(r.items||[]).map(i=>i.q+'× '+i.n).join('; ')+(r.mode==='entrega'?' · Entrega: '+(r.addr||''):' · Retirada')+' · '+(r.pay||''):r.type==='lembrete'?'Caixa acaba em '+(r.fim||'?'):'Origem: '+(r.origem||'site');
  el.innerHTML='<div class="kpis"><div class="kpi"><small>Pedidos no site</small><b>'+peds.length+'</b></div><div class="kpi"><small>Vendas confirmadas</small><b>'+brl(fat)+'</b></div><div class="kpi"><small>Ticket médio</small><b>'+brl(ticket)+'</b></div><div class="kpi hl"><small>Sua comissão ('+PN.rate+'%)</small><b>'+brl(com)+'</b></div></div>'+
  '<div class="toolbar"><div class="chips">'+[['todos','Tudo'],['pedido','Pedidos'],['newsletter','Newsletter'],['lembrete','Lembretes']].map(c=>'<a href="#painel" data-pf="'+c[0]+'"'+(PN.f===c[0]?' class="on"':'')+'>'+c[1]+' ('+(c[0]==='todos'?rows.length:rows.filter(r=>r.type===c[0]).length)+')</a>').join('')+'</div><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><label class="fld" style="grid-template-columns:auto 90px;align-items:center;gap:8px">Comissão %<input id="rate" type="number" min="0" max="100" step="0.5" value="'+PN.rate+'"></label><button class="btn ghost" id="csv">Copiar planilha (CSV)</button></div></div>'+
  (vis.length?'<div class="scroll"><table class="tbl"><thead><tr><th>Data</th><th>Tipo</th><th>Cliente</th><th>Contato</th><th>Detalhe</th><th>Valor</th><th>Status</th></tr></thead><tbody>'+vis.map((r,i)=>'<tr><td>'+esc(new Date(r.at).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}))+'</td><td><span class="pill '+esc(r.type)+'">'+esc(r.type)+'</span>'+(r.n?'<div style="font-size:12px;color:var(--soft)">'+esc(r.n)+'</div>':'')+'</td><td>'+esc(r.nome||'—')+'</td><td>'+esc(r.tel||r.contato||'via WhatsApp')+'</td><td style="max-width:360px">'+esc(det(r))+(r.rx?' · <b style="color:var(--red2)">com receita</b>':'')+'</td><td class="n">'+(r.tot?brl(+r.tot):'')+'</td><td>'+(r.type==='pedido'?'<select data-st="'+esc(r._doc)+'|'+esc(r.id)+'">'+['novo','confirmado','entregue','cancelado'].map(o=>'<option'+(r.status===o?' selected':'')+'>'+o+'</option>').join('')+'</select>':'<span class="pill">'+esc(r.status||'ativo')+'</span>')+'</td></tr>').join('')+'</tbody></table></div>':'<div class="note w">Nenhum registro ainda. Os pedidos finalizados no site, os cadastros da newsletter e os pedidos de lembrete aparecem aqui.</div>')+
  '<h2 style="margin:34px 0 12px;font-size:24px">Rotina da operação</h2><div class="ops"><div><b>1. Pedido novo</b>Confirmar estoque e preço com a loja e responder no WhatsApp em até 10 min.</div><div><b>2. Receita</b>Pedidos com receita só seguem depois da conferência do farmacêutico da loja.</div><div><b>3. Saída</b>Retirada: avisar quando estiver separado. Entrega: transporte próprio da farmácia, bolsa térmica para manter temperatura e umidade, e o cartão impresso com nome do farmacêutico, telefone e endereço da loja em cada pacote (RDC 44).</div><div><b>4. Fechamento</b>Marcar como entregue. A comissão conta só pedidos confirmados ou entregues.</div></div><p class="demo">Os dados ficam no banco deste site e só o dono e os editores podem lê-los. Clientes veem apenas o próprio cadastro.</p>';
}
document.addEventListener('click',e=>{const f=e.target.closest('[data-pf]');if(f){e.preventDefault();PN.f=f.dataset.pf;drawPanel()}
  if(e.target.closest('#csv')){const h=['data','tipo','pedido','cliente','contato','total','status'];const t=[h.join(';')].concat(PN.rows.map(r=>[r.at,r.type,r.n||'',r.nome||'',r.tel||r.contato||'',r.tot||'',r.status||''].map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(';'))).join('\n');navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>toast('Planilha copiada. Cole no Excel ou Sheets.'),()=>toast('Não foi possível copiar.'))}});
document.addEventListener('input',e=>{if(e.target.id==='rate'){PN.rate=Math.max(0,Math.min(100,+e.target.value||0));try{localStorage.setItem('tz_rate',PN.rate)}catch(x){}const k=document.querySelector('.kpi.hl');if(k){const v=PN.rows.filter(r=>r.type==='pedido'&&(r.status==='confirmado'||r.status==='entregue')).reduce((s,r)=>s+(+r.tot||0),0);k.innerHTML='<small>Sua comissão ('+PN.rate+'%)</small><b>'+brl(v*PN.rate/100)+'</b>'}}});
document.addEventListener('change',async e=>{const s=e.target.closest('[data-st]');if(!s)return;const [d,id]=s.dataset.st.split('|');try{const ref=DB.doc('leads/'+d);const g=await ref.get();if(!g.exists)return;const L=g.data().entries.map(x=>x.id===id?{...x,status:s.value}:x);await ref.set({entries:L});PN.rows.forEach(r=>{if(r.id===id)r.status=s.value});drawPanel();toast('Status atualizado')}catch(err){toast('Não foi possível salvar o status')}});

/* roteador */
function lgRows(){const v=x=>x||'a informar';return [['Razão social',v(LEGAL.razao)],['Nome fantasia',LEGAL.fantasia],['CNPJ',v(LEGAL.cnpj)],['Endereço',LEGAL.end],['Horário',LEGAL.horario],['Telefones',LEGAL.tel],['E-mail',v(LEGAL.email)],['Farmacêutico responsável',LEGAL.rt?LEGAL.rt+' · CRF-SP '+v(LEGAL.crf):'a informar'],['Licença sanitária',v(LEGAL.licenca)],['AFE Anvisa',v(LEGAL.afe)],['Autorização especial (AE)',LEGAL.ae]]}
const doc=(t,body)=>'<section class="band"><div class="wrap doc"><div class="crumbs"><a href="#inicio">Início</a> › '+t+'</div><h1 style="font-size:clamp(26px,3.4vw,36px)">'+t+'</h1>'+body+'</div></section>';
const PAGES={
 'info-farmaceutica':()=>doc('Informações farmacêuticas','<div class="lg" style="background:var(--panel);border-color:var(--line);color:var(--ink)">'+lgRows().map(r=>'<div><b style="color:var(--soft)">'+esc(r[0])+'</b>'+esc(r[1])+'</div>').join('')+'</div>'+
  '<h2>Fale com o farmacêutico</h2><p>Durante todo o horário de funcionamento há farmacêutico na loja. Tire dúvidas sobre uso, horários, interações e genéricos.</p><p><a class="btn wa js-wa" data-m="Olá! Vim pelo site e quero falar com o farmacêutico." href="#">Falar com o farmacêutico no WhatsApp</a> <a class="btn ghost" href="tel:+551630303696">Ligar (16) 3030-3696</a></p>'+
  '<h2>Alertas sanitários da Anvisa</h2><p>Recolhimentos, suspensões e alertas de medicamentos e produtos são publicados pela Anvisa. Confira antes de usar um produto que você tem em casa.</p><p><a class="btn ghost" href="https://www.gov.br/anvisa/pt-br/assuntos/fiscalizacao-e-monitoramento">Ver alertas e ações de fiscalização da Anvisa</a></p>'+
  '<h2>Medicamentos com receita</h2><ul><li>São dispensados somente mediante a receita, avaliada pelo farmacêutico. Envie a foto pelo WhatsApp e apresente a receita na entrega ou na retirada.</li><li>Antibióticos e medicamentos sujeitos a controle especial não são vendidos pela internet. Somente na loja, com a receita original, que fica retida quando a lei exige.</li><li>Os preços de medicamentos com receita aparecem apenas em lista, sem imagens ou propaganda.</li></ul>'+
  '<h2>Entrega</h2><p>A entrega é feita pela própria farmácia, com embalagem que preserva temperatura e umidade. Cada pacote leva o nome do farmacêutico, o telefone e o endereço da loja.</p>'+
  '<h2>Preços de medicamentos</h2><p>Os preços praticados respeitam o Preço Máximo ao Consumidor definido pela CMED. <a href="https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/cmed/precos">Consulte a lista oficial</a>.</p>'),
 'termos':()=>doc('Termos de compra, trocas e arrependimento','<p>Fornecedor: '+esc(LEGAL.fantasia)+' · '+esc(LEGAL.razao||'razão social a informar')+' · CNPJ '+esc(LEGAL.cnpj||'a informar')+' · '+esc(LEGAL.end)+' · '+esc(LEGAL.tel)+' · '+esc(LEGAL.email||'e-mail a informar')+'.</p>'+
  '<h2>Como funciona o pedido</h2><ul><li>Você monta o pedido no site e ele é enviado à loja pelo WhatsApp.</li><li>A loja confirma disponibilidade, preço final e prazo antes de separar. O pedido só vale depois dessa confirmação.</li><li>Pedidos com medicamento de receita dependem da avaliação do farmacêutico.</li></ul>'+
  '<h2>Prazos</h2><ul><li>Retirada: em cerca de 15 minutos após a confirmação, no horário da loja.</li><li>Entrega grátis, sem valor mínimo, nos CEPs atendidos em Franca (14400-000 a 14415-999), no horário da loja. O prazo aparece pelo CEP antes de finalizar e é confirmado pela loja. Fora da área, o pedido pode ser retirado na loja.</li><li>Medicamentos controlados e antibióticos: somente retirada na loja, com a receita original.</li></ul>'+
  '<h2>Pagamento e desconto no Pix</h2><p>Pix, cartão de crédito, cartão de débito (na maquininha, na entrega ou retirada) ou dinheiro. Pagando com Pix, você tem '+PIX+'% de desconto no total do pedido. O preço integral de cada item aparece no site e o desconto é mostrado no resumo antes de finalizar (Lei 13.455/2017). O site não pede dados de cartão.</p>'+
  '<h2>Direito de arrependimento</h2><p>Você pode desistir da compra em até 7 dias a partir do recebimento, pelo mesmo canal do pedido ou por qualquer contato acima. A loja confirma o recebimento do pedido de desistência e devolve o valor pago pelo mesmo meio. Medicamentos devolvidos não voltam à venda, por segurança.</p>'+
  '<h2>Trocas e problemas</h2><p>Produto com defeito, avariado ou diferente do pedido: fale com a loja pelo WhatsApp para troca ou devolução do valor.</p>'),
 'privacidade':()=>doc('Política de privacidade (LGPD)','<p>Controlador: '+esc(LEGAL.fantasia)+' · CNPJ '+esc(LEGAL.cnpj||'a informar')+'. Encarregado de dados: a informar · '+esc(LEGAL.email||'e-mail a informar')+'.</p>'+
  '<h2>Dados que coletamos e por quê</h2><ul><li>Pedido: nome, telefone, endereço e itens, para atender e entregar o pedido.</li><li>Receita: a foto enviada é vista só pelo farmacêutico, para a dispensação, e não é usada para nenhuma outra finalidade.</li><li>Newsletter e lembretes: só com o seu consentimento, para enviar conteúdo de saúde, ofertas de produtos que não são medicamentos e o aviso de recompra que você pediu.</li></ul>'+
  '<h2>O que não fazemos</h2><ul><li>Não usamos seu histórico de medicamentos para propaganda nem para induzir consumo.</li><li>Não enviamos dados de produtos de saúde para redes de anúncio.</li><li>Não vendemos nem compartilhamos seus dados, exceto quando a lei exige.</li></ul>'+
  '<h2>Seus direitos</h2><p>Você pode pedir acesso, correção ou exclusão dos seus dados e cancelar a newsletter a qualquer momento pelo WhatsApp ou pelo e-mail acima.</p><h2>Guarda</h2><p>Dados de pedido são mantidos pelo prazo exigido por lei. Dados de marketing são apagados quando você cancela.</p>')
};
function anim(){
  V.querySelectorAll('.card,.step,.postc').forEach((c,i)=>c.style.setProperty('--i',Math.min(i,10)));
  V.classList.remove('vin');void V.offsetWidth;V.classList.add('vin');
  const rb=document.getElementById('rbar');if(rb){rb.classList.remove('go');void rb.offsetWidth;rb.classList.add('go')}
}
function route(){
  const h=decodeURIComponent(location.hash.slice(1)||'inicio');let html,cur='',ld=null;
  if(h.startsWith('c-')&&CATS.some(c=>c[0]===h.slice(2))){cur=h.slice(2);html=listing(cur)}
  else if(h==='produtos'){cur='all';html=listing(null)}
  else if(h==='busca'){html=listing(null,S.q)}
  else if(h.startsWith('p-')&&BY[h.slice(2)]){const p=BY[h.slice(2)];cur=p.c;html=product(p);ld=p.t==='rx'?null:{'@context':'https://schema.org','@type':'Product',name:p.n,description:p.d,offers:{'@type':'Offer',price:p.p.toFixed(2),priceCurrency:'BRL',availability:'https://schema.org/InStock'}}}
  else if(h==='blog'){cur='blog';html=blogList()}
  else if(h.startsWith('b-')&&POSTS.find(b=>b.s===h.slice(2))){const b=POSTS.find(x=>x.s===h.slice(2));cur='blog';html=post(b);ld={'@context':'https://schema.org','@type':'Article',headline:b.t,author:{'@type':'Organization',name:'Drogaria Popular do Tiãozinho'}}}
  else if(h==='checkout'){html=checkout()}
  else if(h==='pedido'&&S.order){html=done(S.order)}
  else if(h==='painel'){html=panelShell();setTimeout(panel,0)}
  else if(PAGES[h]){html=PAGES[h]()}
  else{html=home();ld={'@context':'https://schema.org','@type':'FAQPage',mainEntity:FAQ.map(f=>({'@type':'Question',name:f[0],acceptedAnswer:{'@type':'Answer',text:f[1]}}))};if(['retirada','duvidas','loja','lembrete'].includes(h)){V.innerHTML=html;after();navCats('');anim();const el=document.getElementById(h);if(el)el.scrollIntoView();return}}
  const pre=V.dataset.pre===h;if(pre){V.removeAttribute('data-pre');V.querySelectorAll('.openb').forEach(e=>e.innerHTML='<i class="dot'+(OPEN?' on':'')+'"></i>'+esc(openTxt))}else{V.innerHTML=html}navCats(cur);after();if(!pre){anim();window.scrollTo(0,0)}
  document.body.classList.toggle('co-mode',h==='checkout'||h==='pedido');
  const old=document.getElementById('ldv');if(old)old.remove();
  if(ld){const s=document.createElement('script');s.type='application/ld+json';s.id='ldv';s.textContent=JSON.stringify(ld);document.head.appendChild(s)}
  document.title=(h==='inicio'||!V.querySelector('h1')||V.querySelector('.hcar')?'Drogaria Popular do Tiãozinho | Farmácia no Jardim Aeroporto, Franca/SP':V.querySelector('h1').textContent+' | Drogaria Popular do Tiãozinho');
}
function after(){
  initHero();initRails();
  document.querySelectorAll('.js-wa').forEach(a=>{a.href=wa(a.dataset.m||'Olá! Vim pelo site.');a.rel='noopener'});
  const ci=document.getElementById('cepIn');
  if(ci){ci.addEventListener('input',()=>ci.value=fmtCep(ci.value));const go=()=>{S.cep=fmtCep(ci.value);const e=est(S.cep);if(!e.err)S.mode='entrega';save();document.getElementById('estim').innerHTML=estHtml(S.cep);paintCart()};document.getElementById('cepGo').onclick=go;ci.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go()}})}
  const sort=document.getElementById('sort');if(sort)sort.onchange=()=>{S.sort=sort.value;route()};
  const qv=document.getElementById('qv');
  if(qv){let q=1;document.getElementById('qm').onclick=()=>{q=Math.max(1,q-1);qv.textContent=q};document.getElementById('qp').onclick=()=>{q++;qv.textContent=q};document.getElementById('addP').onclick=()=>{add(location.hash.slice(3),q);toast('Adicionado ao carrinho');openD('drawer',true)}}
  const ini=document.getElementById('ini');
  if(ini){ini.value=new Date(Date.now()-10*864e5).toISOString().slice(0,10);const f=()=>{const q=+document.getElementById('qtd').value,d=+document.getElementById('dose').value,w=document.getElementById('when'),r=document.getElementById('remind');if(!(q>0&&d>0&&ini.value)){w.textContent='--/--';return}const end=new Date(Date.parse(ini.value+'T00:00:00Z')+Math.floor(q/d)*864e5);const s=end.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',timeZone:'UTC'});w.textContent=s;r.href=wa('Olá! Vim pelo site. Meu remédio de uso contínuo acaba por volta de '+s+'. Pode me lembrar uns dias antes para eu repor? Autorizo receber esse lembrete pelo WhatsApp.');r.dataset.fim=s};document.getElementById('remind').addEventListener('click',ev=>{saveLead('lembrete',{fim:ev.currentTarget.dataset.fim||'',origem:'calculadora'})});['qtd','dose','ini'].forEach(i=>document.getElementById(i).addEventListener('input',f));f()}
  const fm=document.getElementById('coForm');if(fm)initCheckout(fm);
}
function initCheckout(fm){
  const isPix=()=>(fm.querySelector('input[name=pay]:checked')||{}).value==='Pix';
  const upd=()=>{const fee=feeNow(),st=subtotal(),dsc=isPix()?st*PIX/100:0;document.getElementById('sFee').textContent=S.mode==='retirada'?'Grátis (retirada)':fee==null?'Informe o CEP':fee===0?'Grátis':brl(fee);document.getElementById('sPixR').style.display=dsc?'flex':'none';document.getElementById('sPix').textContent='− '+brl(dsc);document.getElementById('sTot').textContent=brl(st-dsc+(fee||0))};
  const stp=document.getElementById('stepper').children;fm.addEventListener('focusin',e=>{const st=e.target.closest('.step');if(!st)return;const k=+st.dataset.s;[...stp].forEach((li,i)=>{li.className=i<k?'ok':i===k?'on':''})});
  const cpf=fm.querySelector('[name=cpf]');cpf.addEventListener('input',()=>cpf.value=fmtCpf(cpf.value));
  const viacep=async c=>{try{const r=await fetch('https://viacep.com.br/ws/'+c.replace(/\D/g,'')+'/json/');const j=await r.json();if(j&&!j.erro){if(!fm.rua.value)fm.rua.value=j.logradouro||'';if(!fm.bairro.value)fm.bairro.value=j.bairro||''}}catch(e){}};
  fm.querySelectorAll('input[name=mode]').forEach(r=>r.onchange=()=>{S.mode=r.value;save();document.getElementById('addr').style.display=S.mode==='entrega'?'block':'none';upd();paintCart()});
  fm.querySelectorAll('input[name=pay]').forEach(r=>r.onchange=()=>{document.getElementById('trocoF').style.display=r.value==='Dinheiro'&&r.checked?'grid':'none';upd()});
  const fc=document.getElementById('fCep');fc.addEventListener('input',()=>{fc.value=fmtCep(fc.value);if(fc.value.length===9){S.cep=fc.value;save();viacep(fc.value);document.getElementById('estim3').innerHTML=estHtml(S.cep);const e=est(S.cep);document.getElementById('optEnt').textContent=e.err?'Fora da área':e.min+' a '+e.max+' min';upd();paintCart()}});
  upd();
  fm.addEventListener('submit',e=>{
    e.preventDefault();const F=new FormData(fm),err=document.getElementById('coErr');let m='';
    const nome=(F.get('nome')||'').trim(),tel=(F.get('tel')||'').replace(/\D/g,'');
    if(nome.length<3)m='Informe seu nome.';else if(tel.length<10)m='Informe um WhatsApp com DDD.';
    else if(S.mode==='entrega'){const ee=est(S.cep);if(ee.err)m=ee.err;else if(!(F.get('rua')||'').trim()||!(F.get('num')||'').trim()||!(F.get('bairro')||'').trim())m='Preencha rua, número e bairro.'}
    if(!m&&(F.get('cpf')||'').trim()&&!cpfOk(F.get('cpf')))m='CPF inválido. Confira os números ou deixe em branco.';
    if(!m&&fm.querySelector('[name=rxok]')&&!F.get('rxok'))m='Confirme que vai enviar a foto da receita.';
    if(!m&&!F.get('lgpd'))m='Marque que leu os termos e autoriza o uso dos dados para o pedido.';
    if(m){err.textContent=m;return}
    const L=lines(),fee=feeNow()||0,ee=est(S.cep),dsc=F.get('pay')==='Pix'?subtotal()*PIX/100:0;
    S.order={n:'TZ'+String(Date.now()).slice(-5),nome,mode:S.mode,pay:F.get('pay'),troco:F.get('troco'),items:L.map(l=>({q:l.q,n:l.p.n,v:l.p.p*l.q})),count:L.reduce((s,l)=>s+l.q,0),sub:subtotal(),fee,dsc,cpf:(F.get('cpf')||'').trim(),tot:subtotal()-dsc+fee,rx:L.some(l=>l.p.t==='rx'),addr:S.mode==='entrega'?F.get('rua')+', '+F.get('num')+(F.get('comp')?' ('+F.get('comp')+')':'')+' — '+F.get('bairro')+(F.get('ref')?' — ref.: '+F.get('ref'):'')+' — CEP '+S.cep:'',eta:ee.err?'':ee.min+' a '+ee.max+' min'};
    saveLead('pedido',{n:S.order.n,nome,tel:F.get('tel'),mode:S.mode,pay:S.order.pay,items:S.order.items,sub:S.order.sub,fee:S.order.fee,tot:S.order.tot,addr:S.order.addr,rx:S.order.rx});
    S.cart={};save();paintCart();location.hash='#pedido';
  });
}

/* eventos globais */
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-add]');if(a){add(a.dataset.add,1);toast('Adicionado ao carrinho');return}
  const q=e.target.closest('[data-q]');if(q){add(q.dataset.q,+q.dataset.d);return}
  if(e.target.closest('[data-close]')){openD('drawer',false);openD('cepModal',false)}
  if(e.target.closest('[data-cep]')||e.target.closest('#cepBtn')){openD('cepModal',true);const i=document.getElementById('cepIn2');i.value=S.cep;i.focus()}
});
document.addEventListener('change',e=>{if(e.target.name==='dm'){S.mode=e.target.value;save();paintCart();if(S.mode==='entrega'&&(!S.cep||est(S.cep).err)){openD('cepModal',true)}}});
document.getElementById('cartBtn').onclick=()=>openD('drawer',true);
document.getElementById('mCart').onclick=()=>openD('drawer',true);
const c2=document.getElementById('cepIn2');c2.addEventListener('input',()=>c2.value=fmtCep(c2.value));
document.getElementById('cepGo2').onclick=()=>{S.cep=fmtCep(c2.value);const e=est(S.cep);if(!e.err)S.mode='entrega';save();document.getElementById('estim2').innerHTML=estHtml(S.cep);paintCart();const es=document.getElementById('estim');if(es)es.innerHTML=estHtml(S.cep)};
document.getElementById('sform').addEventListener('submit',e=>{e.preventDefault();S.q=document.getElementById('q').value.trim();if(!S.q)return;if(location.hash==='#busca')route();else location.hash='#busca'});
document.addEventListener('submit',async e=>{
  const f=e.target.closest('[data-nl]');if(!f)return;e.preventDefault();
  const F=new FormData(f),m=f.querySelector('.nlmsg'),nome=(F.get('nome')||'').trim(),c=(F.get('contato')||'').trim();
  if(nome.length<2||c.length<6||!F.get('ok')){m.style.color='var(--red2)';m.textContent='Preencha nome, contato e marque a autorização.';return}
  m.style.color='';m.textContent='Enviando...';
  await saveLead('newsletter',{nome,contato:c,origem:f.dataset.nl});
  f.reset();m.textContent='Pronto! Você vai receber o próximo resumo.';
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){openD('drawer',false);openD('cepModal',false)}});
window.addEventListener('hashchange',route);

const Lg=LEGAL;
document.getElementById('payi').innerHTML=['pix','credito','debito','dinheiro'].map(payTile).join('');
document.querySelectorAll('.js-route').forEach(a=>{a.href='https://www.google.com/maps/dir/?api=1&destination='+GEO;a.target='_blank';a.rel='noopener'});
const wz=document.getElementById('waze');wz.href='https://waze.com/ul?ll='+GEO+'&navigate=yes';wz.target='_blank';wz.rel='noopener';

document.getElementById('legal').innerHTML='<span>'+esc([Lg.fantasia,Lg.razao,Lg.cnpj&&'CNPJ '+Lg.cnpj,'Rua Alípio Resende de Araújo, 1647, Franca/SP',Lg.rt&&('Farmacêutico responsável: '+Lg.rt+(Lg.crf?' · CRF-SP '+Lg.crf:'')),Lg.afe&&'AFE '+Lg.afe,Lg.licenca&&'Licença sanitária '+Lg.licenca].filter(Boolean).join(' · '))+'</span><span>As informações deste site não substituem a orientação de médicos e farmacêuticos. Não se automedique: só o médico pode diagnosticar e prescrever.</span><span>Medicamentos sob prescrição exigem receita. Antibióticos e medicamentos controlados são dispensados somente na loja, com a receita original. '+esc(MIP_W)+'</span><span>*Entrega grátis, sem pedido mínimo, nos CEPs atendidos em Franca. Desconto de '+PIX+'% no Pix aplicado no total do pedido. Preços e disponibilidade confirmados pela loja antes da separação. Imagens de produtos ilustrativas.</span><span>O site não usa cookies de anúncio. <a href="#privacidade">Política de privacidade</a> · <a href="#termos">Termos de compra</a> · <a href="#info-farmaceutica">Informações farmacêuticas</a></span>';
window.TZ={POSTS,FAQ};
paintCart();route();
}
