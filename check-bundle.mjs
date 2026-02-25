const r = await fetch('http://localhost:3000');
const html = await r.text();

const allScripts = [...html.matchAll(/src="(\/_next\/[^"]+\.js)"/g)];
let found = false;
for (const [, url] of allScripts) {
  const jsRes = await fetch('http://localhost:3000' + url);
  const js = await jsRes.text();
  if (js.includes('Intervertissez')) {
    found = true;
    console.log('FOUND in:', url.split('/').pop());
    console.log('  Has Pouvoir Ditch:', js.includes('Pouvoir Ditch'));
    console.log('  Has card.power:', js.includes('.power'));
  }
}
if (!found) console.log('Intervertissez NOT found in any bundle');
