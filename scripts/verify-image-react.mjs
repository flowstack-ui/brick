import { mkdtemp, cp, readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve,join } from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const [brick,brickHash,atom,atomHash]=process.argv.slice(2);
for(const [path,hash] of [[brick,brickHash],[atom,atomHash]])assert.equal(createHash('sha256').update(await readFile(path)).digest('hex'),hash);
const base=await mkdtemp(join(tmpdir(),'brick-image-react-'));
for(const react of ['18.3.1','19.2.3']){
 const cwd=join(base,react);await mkdir(cwd);
 await writeFile(join(cwd,'package.json'),JSON.stringify({private:true,type:'module',dependencies:{react,'react-dom':react,jsdom:'26.1.0','@flowstack-ui/brick':`file:${resolve(brick)}`,'@flowstack-ui/atom':`file:${resolve(atom)}`}}));
 await cp('test/fixtures/image-react.mjs',join(cwd,'image.mjs'));
 for(const [command,args] of [['npm',['install','--ignore-scripts','--no-audit','--no-fund']],['node',['image.mjs']]]){
  const result=spawnSync(command,args,{cwd,encoding:'utf8',timeout:180000});process.stdout.write(result.stdout);process.stderr.write(result.stderr);assert.equal(result.status,0);
 }
}
console.log('Packed lifecycle evidence retained at',base);
