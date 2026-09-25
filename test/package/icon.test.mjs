import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createElement as h} from 'react';
import {renderToString} from 'react-dom/server';
import {Icon,createIcon,IconPropsProvider} from '../../dist/icon.js';
import * as root from '../../dist/index.js';
test('Icon root/subpath and server-rendered factory/provider contracts',()=>{
  assert.equal(root.Icon,Icon);assert.equal(root.createIcon,createIcon);assert.equal(root.IconPropsProvider,IconPropsProvider);
  const Graphic=createIcon({d:'M0 0h24v24z',defaultProps:{size:'xs'}});
  const html=renderToString(h(IconPropsProvider,{value:{tone:'success'}},h(Graphic,{label:'Ready',size:{md:'xl'}})));
  assert.equal((html.match(/<svg/g)||[]).length,1);assert.ok(!html.includes('<span'));assert.ok(html.includes('data-size="md"'));assert.ok(html.includes('data-size-md="xl"'));assert.ok(html.includes('aria-label="Ready"'));assert.ok(html.includes('data-tone="success"'));
});
