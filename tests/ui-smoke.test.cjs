const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const app=fs.readFileSync(path.join(root,"app.js"),"utf8");

test("all static application IDs are unique",()=>{
 const ids=[...html.matchAll(/\\bid="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(new Set(ids).size,ids.length,"Duplicate HTML IDs make controls ambiguous");
});

test("browser script references existing static controls",()=>{
 const ids=new Set([...html.matchAll(/\\bid="([^"]+)"/g)].map(x=>x[1]));
 const references=[...app.matchAll(/\\$\\("([^"]+)"\\)/g)].map(x=>x[1]);
 const missing=[...new Set(references.filter(id=>!ids.has(id)))];
 assert.deepEqual(missing,[],"Missing controls referenced by app.js");
});

test("advanced execution controls remain available in a collapsed section",()=>{
 for(const id of ["sizingMethod","fixedAllocation","riskPerTrade","trailingStop","maxHoldingBars","maxPyramidEntries","riskFreeRate","borrowRate","barsPerYear"]){
  assert.ok(html.includes('id="'+id+'"'),"Missing advanced setting "+id);
 }
 const detail=html.match(/<details class="advanced-config">([\\s\\S]*?)<\\/details>/);
 assert.ok(detail,"Advanced controls should be grouped inside a details disclosure");
 assert.ok(detail[1].includes('id="sizingMethod"'));
});

test("formula builder accurately exposes ten reusable calculation slots",()=>{
 assert.ok(html.includes("Define up to ten reusable indicators"));
 for(let i=1;i<=10;i++)assert.ok(html.includes('id="v'+i+'Formula"'),"Missing reusable formula slot v"+i);
 assert.ok(html.includes("10 slots"));
});

test("first-run quick start explains demo data, data loading and research-only mode",()=>{
 assert.ok(html.includes("synthetic demo series is loaded automatically"));
 assert.ok(html.includes("Fetch market data"));
 assert.ok(html.includes("Nothing here places live trades."));
});
