const $ = id => document.getElementById(id);
// Deterministic synthetic readings based on the original demo's six modules.
const modules = [
 {module:'Module 1',temp:29.9,humidity:61.5,waste:27.5},
 {module:'Module 2',temp:25.9,humidity:66.3,waste:47.0},
 {module:'Module 3',temp:31.3,humidity:62.0,waste:43.0},
 {module:'Module 4',temp:31.8,humidity:64.9,waste:17.1},
 {module:'Module 5',temp:23.1,humidity:56.5,waste:39.7},
 {module:'Module 6',temp:40.0,humidity:64.1,waste:27.6}
];
// Static-hosting demo heuristic; this is not the Python Isolation Forest model.
const unusual = m => m.temp>35 || m.temp<23 || m.humidity>82 || m.humidity<42;
const alerting = m => m.temp>Number($('tempLimit').value||35)||m.humidity>Number($('humidityLimit').value||85);
const n = (v,d=1)=>Number(v).toLocaleString('en-IN',{minimumFractionDigits:d,maximumFractionDigits:d});
const money = (v,d=0)=>'₹'+Number(v).toLocaleString('en-IN',{minimumFractionDigits:d,maximumFractionDigits:d});
const pill = (text,type)=>`<span class="pill ${type}">${text}</span>`;
function renderTables(){
 $('moduleTableBody').innerHTML=modules.map(m=>`<tr><td>${m.module}</td><td>${n(m.temp)}°</td><td>${n(m.humidity)}%</td><td>${n(m.waste)} kg</td><td>${alerting(m)?pill('Review','warning'):pill('Typical','normal')}</td></tr>`).join('');
 $('aiTableBody').innerHTML=modules.map(m=>`<tr><td>${m.module}</td><td>${n(m.temp)}°C</td><td>${n(m.humidity)}%</td><td>${unusual(m)?pill('Unusual','unusual'):pill('Typical','normal')}</td></tr>`).join('');
 $('batchTableBody').innerHTML=modules.map((m,i)=>`<tr><td>MF-DEMO-${String(i+1).padStart(3,'0')}</td><td>${m.module}</td><td>${n(m.temp)}</td><td>${n(m.humidity)}</td><td>${n(m.waste)}</td><td>${unusual(m)?pill('Unusual','unusual'):pill('Typical','normal')}</td><td>Simulated</td></tr>`).join('');
}
function renderChart(id,key,max,unit){$(id).innerHTML=modules.map(m=>`<div class="bar-row"><span>${m.module}</span><div class="track"><div class="fill" style="width:${Math.max(3,Math.min(100,m[key]/max*100))}%"></div></div><span class="bar-value">${n(m[key])}${unit}</span></div>`).join('');}
function renderAlerts(){const a=[];const t=Number($('tempLimit').value||35),h=Number($('humidityLimit').value||85);modules.forEach(m=>{if(m.temp>t)a.push(`<div class="alert-item"><b>!</b> <strong>${m.module}</strong> — High temperature: ${n(m.temp)}°C (threshold ${n(t)}°C)</div>`);if(m.humidity>h)a.push(`<div class="alert-item"><b>!</b> <strong>${m.module}</strong> — High humidity: ${n(m.humidity)}% (threshold ${n(h)}%)</div>`)});$('alertsOutput').innerHTML=a.length?a.join(''):'<div class="no-alert">✓ No alerts triggered by the configured demo thresholds.</div>';}
function renderCalc(){const waste=Math.max(0,Math.min(10000,Number($('wasteInput').value||0))),yieldPct=Math.max(1,Math.min(40,Number($('yieldInput').value||15))),price=Math.max(0,Math.min(100000,Number($('priceInput').value||0))),cost=Math.max(0,Math.min(1000000,Number($('costInput').value||0)));const biomass=waste*yieldPct/100,revenue=biomass*price,margin=revenue-cost;$('yieldOutput').value=yieldPct+'%';$('kpiWaste').textContent=n(waste)+' kg';$('kpiBiomass').textContent=n(biomass)+' kg';$('kpiMargin').textContent=money(margin);$('calcWaste').textContent=n(waste)+' kg';$('calcYield').textContent=yieldPct+'%';$('calcBiomass').textContent=n(biomass)+' kg';$('calcRevenue').textContent=money(revenue,2);$('calcMargin').textContent=money(margin,2);}
function update() {renderTables();renderAlerts();$('anomalyCount').textContent=modules.filter(unusual).length;renderCalc();}
['wasteInput','yieldInput','priceInput','costInput','tempLimit','humidityLimit'].forEach(id=>$(id).addEventListener('input',update));
$('downloadCsv').addEventListener('click',()=>{const header=['Batch ID','Module','Temperature (°C)','Humidity (%)','Waste Input (kg)','AI Anomaly','Data Source'];const rows=modules.map((m,i)=>[`MF-DEMO-${String(i+1).padStart(3,'0')}`,m.module,m.temp,m.humidity,m.waste,unusual(m)?'Unusual':'Typical','Simulated']);const csv=[header,...rows].map(row=>row.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='modufly_batch_records.csv';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('nav a').forEach(x=>x.classList.remove('active'));a.classList.add('active')}));
renderChart('temperatureChart','temp',45,'°');renderChart('humidityChart','humidity',100,'%');update();
