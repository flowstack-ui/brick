import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DownloadTrigger,useDownload} from '../../dist/download-trigger.js';
test('download archive surface exposes hook and shared loading markup',()=>{
 assert.equal(typeof useDownload,'function');
 const html=renderToStaticMarkup(h(DownloadTrigger,{data:'x',fileName:'x.txt',mimeType:'text/plain',loading:true,loadingText:'Preparing',spinnerPlacement:'end'},'Export'));
 assert.match(html,/brick-button__loading-content/);assert.match(html,/Preparing/);
 assert.doesNotMatch(html,/loadingText=|spinnerPlacement=|spinner=/);
 const icon=renderToStaticMarkup(h(DownloadTrigger,{iconOnly:true,'aria-label':'Download',data:'x',fileName:'x.txt',mimeType:'text/plain'},h('svg')));
 assert.match(icon,/brick-icon-button/);assert.equal((icon.match(/<button/g)||[]).length,1);
 assert.match(readFileSync(new URL('../../dist/styles/download-trigger.css',import.meta.url),'utf8'),/brick-icon-button/);
});
