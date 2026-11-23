import{gn as Ci,fT as Ti,MR as Pi,jU as ft,MS as Be,nj as gt,MT as Nt,fe as Ri,c5 as Di,c6 as Mi,ff as Fi,sI as Gi,bk as Xt,MU as $i,y as L,v as et,k7 as ne,oH as Ai,eF as Yt,ii as Tt,hm as zi,Ky as dt,dh as Xe,hl as Ii,ha as Zt,MV as Pt,di as Bi,b0 as Ei,MW as Oi,a1 as v,Kn as ue,lT as ki,g4 as Vi,gL as qi,i9 as Hi,dk as Kt,i7 as Li,dy as ht,oi as ji,B9 as Wi,g8 as Ui,Kx as Ni,oX as Xi,gQ as Rt,gH as ct,MX as Yi,Ay as Zi,mt as Ki,MY as Qi,Kz as We,dj as pt,K5 as l,gT as mt,Ml as Ge,K8 as Qt,KF as Ji,Lo as ea,MZ as ta,M_ as Ue,M$ as ia,KD as aa,N0 as sa,Lm as Jt,N1 as Dt,KH as ra,K4 as Z,K0 as Ee,Kb as Oe,Kc as ke,_ as Ve,Kd as qe,KJ as tt,Kh as _t,a4 as me,f$ as na,oS as vt,oT as Ae,oP as yt,a3 as K,M3 as ei,N2 as oa,K9 as Ne,N3 as la,Mu as Mt,N4 as ua,Lw as da,N5 as ha,N6 as ca,N7 as pa,N8 as fa,N9 as ga,Na as ma,wl as Ft,cZ as _e,JD as Ie,pv as Gt,fp as $t,cq as _a,Mx as va,cp as ya,KT as xa,f9 as wa,eb as At,hy as ba,uM as Sa,cM as He,uP as Ca,ja as zt,hs as Ta,k9 as Pa,k3 as Ra,u_ as Da,dG as Ma,uN as Fa,bm as Ga,c$ as Le,uQ as $a,ao as Aa,aj as za,an as Ia,uR as Ba,mJ as It,gZ as Ea,uS as Oa,bA as ka,qZ as Va,B as qa}from"./index-BfFZtmsR.js";import{T as Ha,E as Bt,S as La}from"./tiles3DUtils-DALNk2Gk.js";import{c as ja}from"./LayerView3D-Drkv_mDq.js";import{D as Wa}from"./LayerElevationProvider-o4PnzS-p.js";import{a as ti,o as $e,c as Ua,t as Na,l as Xa,e as ie,r as Et,n as Ot,i as we,b as Ya,s as kt}from"./GaussianSplatSortWorker-3iNNYRyz.js";import{h as Vt}from"./baUtils-26LSzd-I.js";import{y as Za}from"./Tiles3DBVH-B-sVbw7R.js";import{q as qt}from"./I3SUtil-BL8rMq11.js";import{b as Ka}from"./LayerView-C92GVTlg.js";import"./projectBoundingSphere-BQhp3xh3.js";import"./featurePopupQueryUtils-DErhaobT.js";import"./I3SBinaryReader-C8hK5vKD.js";let Qa=class extends Ci{constructor(e,t,a,s,r,n,o,u,d,h){super(e,0,0,0,t),this.usedMemory=e,this.nodes=t,this.usedTileMemory=a,this.cachedNodes=s,this.cacheTileMemory=r,this.textureAtlasMemory=n,this.headerTextureMemory=o,this.orderTextureMemory=u,this.fadingTextureMemory=d,this.sortBufferMemory=h}},Ja=class extends Ti{constructor(e){super("GaussianSplatSortWorker","sort",{sort:t=>[t.sortedAtlasIndices.buffer]},e,{strategy:"dedicated"})}sort(e,t){return this.invokeMethod("sort",e,t)}clear(){return this.broadcast({},"clear")}async destroyWorkerAndSelf(){await this.broadcast({},"destroy"),this.destroy()}};const es=new ft([{name:"gaussianSplatFading",type:"unorm8"}]);let ts=class{constructor(e){this._textureBackedBuffer=null,this._fadingField=null,this._rctx=e,this._createTextureBackedBuffer()}get usedMemory(){return this._textureBackedBuffer.usedMemory}ensureCapacity(e){if(this._textureBackedBuffer.itemCount>=e)return;let t=Math.max(Math.ceil(e*Be),ti);this._textureBackedBuffer.resizeToFit(t-1)}updateTexture(e){this.ensureCapacity(e),this._textureBackedBuffer.updateTexture()}updateBuffer(e,t){this.ensureCapacity(t+1),this._fadingField.set(t,e)}clear(){this._textureBackedBuffer.dispose(),this._createTextureBackedBuffer()}destroy(){this.clear()}get texture(){return this._textureBackedBuffer.texture}_createTextureBackedBuffer(){this._textureBackedBuffer=new Pi(this._rctx,es),this._fadingField=this._textureBackedBuffer.getScalarField("gaussianSplatFading")}};const is=new ft([{name:"gaussianSplatHeader",type:"vec4u32"}]);let as=class{constructor(e){this._headerTextureCapacity=0,this._textureBuffer=null,this._rctx=e}get usedMemory(){return(this._textureBuffer?.usedMemory??0)+gt(this._headerBuffer)}ensureCapacity(e){let t=this._textureBuffer;if(this._headerTextureCapacity>=e&&t?.texture.hasWebGLTextureObject)return;let a=Math.max(Math.ceil(e*Be),ti,this._headerTextureCapacity);t?.dispose();let s=new Nt(this._rctx,is,a);this._textureBuffer=s;let r=this._headerBuffer,n=new Uint32Array(s.itemCount*$e);r&&n.set(r.subarray(0,Math.min(r.length,n.length))),this._headerBuffer=n,this._headerTextureCapacity=s.itemCount,s.setSubData(n.buffer)}update(e,t,a=1){this.ensureCapacity(e+a);let s=e*$e;for(let r=0;r<a;r++)this._headerBuffer.set(t,s+r*$e);this._textureBuffer.setSubData(this._headerBuffer.buffer,e,s*Uint32Array.BYTES_PER_ELEMENT,a)}clear(){this._textureBuffer?.dispose(),this._textureBuffer=null}destroy(){this._headerBuffer=void 0,this._headerTextureCapacity=0,this.clear()}get texture(){return this._textureBuffer?.texture??null}};const ss=new ft([{name:"gaussianSplatOrder",type:"u32"}]);let rs=class{constructor(e){this._textureBuffer=null,this._rctx=e}get usedMemory(){return this._textureBuffer?.usedMemory??0}ensureCapacity(e){if(e<=0)return;let t=this._textureBuffer;if(t!=null&&t.itemCount>=e&&t.texture.hasWebGLTextureObject)return;let a=Math.max(Math.ceil(e*Be),Ua);t?.dispose(),this._textureBuffer=new Nt(this._rctx,ss,a)}setData(e,t){this.ensureCapacity(t),this._textureBuffer.setSubData(e.buffer,0,e.byteOffset,t)}clear(){this._textureBuffer?.dispose(),this._textureBuffer=null}destroy(){this.clear()}get texture(){return this._textureBuffer?.texture??null}};class ns{constructor(e,t,a,s){this._splatAtlasTextureHeight=Na,this.texture=null,this._rctx=e,this._fboCache=a,this._onCachedTextureEvicted=s,this.pageAllocator=new Xa,this._cache=t.newCache("gaussian texture cache",r=>{r.dispose(),this._onCachedTextureEvicted()})}get usedMemory(){return this.texture?.usedMemory??0}get maximumSupportedVisibleGaussians(){let e=Vt("esri-mobile")?ie*Et:ie*Ot;return Math.floor(e*.6666666666666666)}ensureTextureAtlas(){if(this.texture?.hasWebGLTextureObject)return;this.texture=null;let e=this._cache.pop("splatTextureAtlas");if(e){this.texture=e;return}let t=new Ri;t.height=this._splatAtlasTextureHeight,t.width=ie,t.pixelFormat=36249,t.dataType=Di.UNSIGNED_INT,t.internalFormat=Mi.RGBA32UI,t.samplingMode=9728,t.wrapMode=33071,t.isImmutable=!0,this.texture=new Fi(this._rctx,t),this._updatePageAllocator()}grow(){if(!this.texture)return this.ensureTextureAtlas(),!1;let e=Math.floor(this._splatAtlasTextureHeight*Be);if(e>Math.min(Vt("esri-mobile")?Et:Ot,this._rctx.parameters.maxTextureSize))return!1;let t=new Gi(this._rctx,this.texture),a=this._fboCache.acquire(ie,e,"gaussian splat atlas resize",12);return this._rctx.blitFramebuffer(t,a.fbo,16384,9728,0,0,ie,this._splatAtlasTextureHeight,0,0,ie,this._splatAtlasTextureHeight),this.texture=a.fbo?.detachColorTexture(),t.dispose(),a.dispose(),this._splatAtlasTextureHeight=e,this._updatePageAllocator(),!0}allocatePage(){let e=this.pageAllocator.findFirstFreePage();return e===null&&this.grow()&&(e=this.pageAllocator.findFirstFreePage()),e!==null&&this.pageAllocator.allocate(e),e}freePage(e){this.pageAllocator.free(e)}freePages(e){for(let t of e)this.freePage(t)}update(e,t,a,s=1){this.ensureTextureAtlas();let r=s*we,n=0;for(;r>0;){let o=Math.min(ie-e,r),u=e===0&&o===ie?Math.floor(r/ie):1;this.texture.updateData(0,e,t,o,u,a.subarray(n));let d=o*u;n+=d*$e,r-=d,e=0,t+=u}}_updatePageAllocator(){let e=ie*this._splatAtlasTextureHeight/we;this.pageAllocator.pageCount!==e&&this.pageAllocator.resize(e)}clear(){this.texture&&=(this._cache.put("splatTextureAtlas",this.texture),null)}destroy(){this._onCachedTextureEvicted=()=>{},this._cache.destroy(),this.texture?.dispose(),this.texture=null}}let os=class{constructor(e,t,a){this._updating=Xt(!1),this._useDeterministicSort=!1,this._sortBufferMemory=0,this._sortWorkerMemory=0,this.visibleGaussians=0,this._visibleTileDepthRange=new $i,this._previousVisibleTileDepthRangeEye=L(),this._previousVisibleTileDepthRangeViewForward=L(),this._previousVisibleTileDepthRangeClippingBox=et(),this._latestSortedGaussianTilesVersion=0,this._previousVisibleTileDepthRangeTilesVersion=-1,this._previousVisibleTileDepthRangeHasClippingBox=!1,this._sortBufferCapacity=0,this._requestedLyr3dVisibilityChange=0,this._latestCompletedLyr3dVisibilityChange=0,this._latestUpdatedGaussianTiles=[],this._latestSortedGaussianTiles=[],this._nextCommittedVisibleGaussianTiles=[],this._workerResidentTiles=new Map,this._cameraDirectionNormalized=L(),this._frameTask=null,this._workerHandle=null,this._sortAbortController=null,this._isSorting=!1,this._pendingSortReason=null,this._scheduledSortStartTimeout=null,this._lastSortStartTime=ne(-1/0),this._viewSortInterval=ne(80),this._dataSortInterval=ne(160),this._renderer=e,this._onSortComplete=t,this._orderTexture=new rs(this._renderer.renderingContext),this._fadingTexture=new ts(this._renderer.renderingContext),this._headerTexture=new as(this._renderer.renderingContext),this._textureAtlas=new ns(this._renderer.renderingContext,this._renderer.view.resourceController.memoryController,this._renderer.fboCache,a);let{resourceController:s}=this._renderer.view;this._workerHandle=new Ja(Ai(s)),this._frameTask=s.scheduler.registerTask(Yt.GAUSSIAN_SPLAT_SORTING)}get textureAtlas(){return this._textureAtlas}get orderTexture(){return this._orderTexture}get fadingTexture(){return this._fadingTexture}get headerTexture(){return this._headerTexture}get textureAtlasMemory(){return this._textureAtlas.usedMemory}get orderTextureMemory(){return this._orderTexture.usedMemory}get fadingTextureMemory(){return this._fadingTexture.usedMemory}get headerTextureMemory(){return this._headerTexture.usedMemory}get sortBufferMemory(){return this._sortBufferMemory}get sortWorkerMemory(){return this._sortWorkerMemory}get usedMemory(){return this.textureAtlasMemory+this.headerTextureMemory+this.orderTextureMemory+this.fadingTextureMemory+this.sortBufferMemory+this.sortWorkerMemory}queryVisibleTileDepthRange(e,t){if(this.visibleGaussians===0)return null;let{eye:a,viewForward:s}=e,r=a[0],n=a[1],o=a[2],u=s[0],d=s[1],h=s[2],m=this._visibleTileDepthRange;if(this._previousVisibleTileDepthRangeTilesVersion===this._latestSortedGaussianTilesVersion&&Tt(this._previousVisibleTileDepthRangeEye,a)&&Tt(this._previousVisibleTileDepthRangeViewForward,s)&&(t==null?!this._previousVisibleTileDepthRangeHasClippingBox:this._previousVisibleTileDepthRangeHasClippingBox&&zi(this._previousVisibleTileDepthRangeClippingBox,t)))return m.near<=m.far?m:null;let g=1/0,c=-1/0,p=this._latestSortedGaussianTiles;for(let R=0;R<p.length;R++){let b=p[R];if(t!=null){let C=b.boundingBox;if(!dt(C,t))continue}let D=u*(b.obbCenterX-r)+d*(b.obbCenterY-n)+h*(b.obbCenterZ-o),S=b.paddedMbsRadius,B=D-S;B<g&&(g=B);let A=D+S;A>c&&(c=A)}let w=g<=c;return w?m.set(g,c):m.set(1/0,-1/0),this._previousVisibleTileDepthRangeTilesVersion=this._latestSortedGaussianTilesVersion,this._previousVisibleTileDepthRangeHasClippingBox=t!=null,Xe(this._previousVisibleTileDepthRangeEye,a),Xe(this._previousVisibleTileDepthRangeViewForward,s),t!=null&&Ii(this._previousVisibleTileDepthRangeClippingBox,t),w?m:null}updateGaussianVisibility(e,t){this._latestUpdatedGaussianTiles=e,this._requestedLyr3dVisibilityChange=t,this.requestSort("data")}get updating(){return this._updating.value}destroy(){this._sortAbortController=Zt(this._sortAbortController),this._pendingSortReason=null,this._updating.value=!1,this._scheduledSortStartTimeout!=null&&(clearTimeout(this._scheduledSortStartTimeout),this._scheduledSortStartTimeout=null),this._frameTask.remove(),this._workerHandle?.destroyWorkerAndSelf(),this._sortWorkerMemory=0,this._textureAtlas.destroy(),this._headerTexture.destroy(),this._orderTexture.destroy(),this._fadingTexture.destroy()}requestSort(e="view"){this._updating.value=!0,this._pendingSortReason!=="view"&&this._pendingSortReason!==e&&(this._pendingSortReason=e,this._scheduledSortStartTimeout!=null&&(clearTimeout(this._scheduledSortStartTimeout),this._scheduledSortStartTimeout=null),this._scheduleSortStart())}_scheduleSortStart(){if(this._isSorting)return;let e=Pt()-this._lastSortStartTime,t=(this._pendingSortReason==="view"?this._viewSortInterval:this._dataSortInterval)-e;if(t<=0){this._startSortIfRequired();return}this._scheduledSortStartTimeout??=setTimeout(()=>{this._scheduledSortStartTimeout=null,this._pendingSortReason!=null&&!this._isSorting&&this._scheduleSortStart()},t)}_startSortIfRequired(){if(this._isSorting||this._pendingSortReason==null)return;let e=new AbortController;this._sortAbortController=e,this._isSorting=!0,this._pendingSortReason=null,this._lastSortStartTime=Pt(),this._sortOnWorker(e.signal).finally(()=>{this._sortAbortController===e&&(this._sortAbortController=null),this._handleSortComplete()})}_handleSortComplete(){this._isSorting=!1,this._pendingSortReason==null?this._updating.value=!1:this._scheduleSortStart()}_clearBuffersAndTextures(){this._sortedAtlasIndicesBuffer=void 0,this._sortBufferCapacity=0,this._sortBufferMemory=0,this._orderTexture.clear(),this._textureAtlas.clear(),this._headerTexture.clear()}_computeExpandedCapacity(e,t){let a=Math.max(1,e);for(;a<t;)a=Math.ceil(a*Be);return a}_ensureSortBufferCapacity(e){if(this._sortBufferCapacity<e){let t=this._computeExpandedCapacity(this._sortBufferCapacity,e);this._sortedAtlasIndicesBuffer=new Uint32Array(t),this._sortBufferMemory=gt(this._sortedAtlasIndicesBuffer),this._sortBufferCapacity=t}}_clearAllBuffersAndTextures(){this._clearBuffersAndTextures(),this._latestSortedGaussianTiles.length=0,this._nextCommittedVisibleGaussianTiles.length=0,this._workerResidentTiles.clear(),this._sortWorkerMemory=0,this._previousVisibleTileDepthRangeTilesVersion=-1,this._workerHandle?.clear()}async _sortOnWorker(e){try{if(this._latestUpdatedGaussianTiles.length===0){this.visibleGaussians=0,this._clearAllBuffersAndTextures(),this._latestCompletedLyr3dVisibilityChange=this._requestedLyr3dVisibilityChange,this._onSortComplete(this._latestSortedGaussianTiles,this._latestCompletedLyr3dVisibilityChange),this._renderer.requestRender(1);return}this._useDeterministicSort&&this._latestUpdatedGaussianTiles.sort((x,y)=>x.obb.centerX-y.obb.centerX||x.obb.centerY-y.obb.centerY||x.obb.centerZ-y.obb.centerZ);let t=this._latestUpdatedGaussianTiles,a=t.length,s=this._requestedLyr3dVisibilityChange,r=0;for(let x=0;x<a;x++)r+=t[x].gaussianCount;this._ensureSortBufferCapacity(r),this._textureAtlas.ensureTextureAtlas(),this._headerTexture.ensureCapacity(this._textureAtlas.pageAllocator.pageCount);let n=this._renderer.camera;Bi(this._cameraDirectionNormalized,n.ray.direction);let o=this._cameraDirectionNormalized[0],u=this._cameraDirectionNormalized[1],d=this._cameraDirectionNormalized[2],h=0,m=this._renderer.clippingBox,g=this._nextCommittedVisibleGaussianTiles;g.length=0;let c=0,{frustum:p}=n,w=this._renderer.tileCullingRevision,R=p[0],b=p[1],D=p[2],S=p[3],B=p[4],A=p[5];for(let x=0;x<a;x++){let y=t[x],{obbCenterX:$,obbCenterY:V,obbCenterZ:f,paddedMbsRadius:_}=y,j=y.gaussianCount;if(y.cullingRevision!==w){let P=m==null||dt(y.boundingBox,m);if(P){let z=_*1.5;P=R[0]*$+R[1]*V+R[2]*f+R[3]<z&&b[0]*$+b[1]*V+b[2]*f+b[3]<z&&D[0]*$+D[1]*V+D[2]*f+D[3]<z&&S[0]*$+S[1]*V+S[2]*f+S[3]<z&&B[0]*$+B[1]*V+B[2]*f+B[3]<z&&A[0]*$+A[1]*V+A[2]*f+A[3]<z}y.cullingRevision=w,y.cullingVisible=P}y.cullingVisible&&(g[c++]=y,h+=j)}if(g.length=c,h===0){this.visibleGaussians=0,this._clearAllBuffersAndTextures(),this._latestCompletedLyr3dVisibilityChange=s,this._onSortComplete(this._latestSortedGaussianTiles,this._latestCompletedLyr3dVisibilityChange),this._renderer.requestRender(1);return}let C=new Map,E=[],O=new Uint32Array(c);for(let x=0;x<c;x++){let y=g[x],$=y.handle;C.set($,y),O[x]=$,this._workerResidentTiles.get($)!==y&&E.push({handle:$,relativePositions:y.relativePositions,pageIds:y.pageIds,gaussianCount:y.gaussianCount,originX:y.obbCenterX,originY:y.obbCenterY,originZ:y.obbCenterZ})}let k=[];for(let x of this._workerResidentTiles.keys())C.has(x)||k.push(x);let U=new Ya(E,Uint32Array.from(k),O,this._sortedAtlasIndicesBuffer,h,o,u,d,this._useDeterministicSort),G=await this._workerHandle?.sort(U,e);if(e.aborted)return;G&&(this._sortedAtlasIndicesBuffer=G.sortedAtlasIndices,this._sortWorkerMemory=G.usedMemory,this._workerResidentTiles=C),await this._frameTask.schedule(async x=>{this._orderTexture.setData(this._sortedAtlasIndicesBuffer,h);let y=this._latestSortedGaussianTiles;this._latestSortedGaussianTiles=g,this._nextCommittedVisibleGaussianTiles=y,this._latestSortedGaussianTilesVersion++,this._latestCompletedLyr3dVisibilityChange=s,this.visibleGaussians=h,this._onSortComplete(this._latestSortedGaussianTiles,this._latestCompletedLyr3dVisibilityChange),this._renderer.requestRender(1),x.madeProgress()},e)}catch(t){if(Ei(t))return}}set useDeterministicSort(e){this._useDeterministicSort=e}},te=class extends Oi{constructor(e){super(),this.spherical=e,this.alphaCutoff=1,this.fadingEnabled=!1,this.clippingEnabled=!1,this.writeNormals=!1,this.preciseDepth=!1,this.receiveShadows=!1,this.fragmentShading=!0,this.hasShadowHighlights=!1,this.output=0,this.hasEmission=!1,this.receiveAmbientOcclusion=!1,this.receiveGlobalIllumination=!1,this.pbrMode=0,this.useCustomDTRExponentForWater=!1,this.useFillLights=!1,this.draped=!1,this.hasColorTexture=!0}};v([ue({count:3})],te.prototype,"alphaCutoff",void 0),v([ue()],te.prototype,"fadingEnabled",void 0),v([ue()],te.prototype,"clippingEnabled",void 0),v([ue()],te.prototype,"writeNormals",void 0),v([ue()],te.prototype,"preciseDepth",void 0),v([ue()],te.prototype,"receiveShadows",void 0),v([ue()],te.prototype,"fragmentShading",void 0),v([ue()],te.prototype,"hasShadowHighlights",void 0),v([ue({count:12})],te.prototype,"output",void 0),v([ue()],te.prototype,"receiveAmbientOcclusion",void 0),v([ue()],te.prototype,"receiveGlobalIllumination",void 0);function ii(i){switch(i){case 2:return .005;case 0:return .05;default:return .01}}var H;let ls=(H=class{constructor(e){this._view=e,this._numFadingTiles=Xt(0),this._tmpFullyFadedOutTiles=[],this._visibilityUpdatePending=!1,this._previousNumFadingTiles=0,this._lastStoppedFading=ne(0),this._currentFadeDuration=this.baseFadeDuration}get numFadingTiles(){return this._numFadingTiles.value}updateForFrame(e){if(e!==this._lastUpdatedFrameStart){if(this._lastUpdatedFrameStart=e,this.numFadingTiles===0)this._previousFrameStart=null;else{let t=ne(this._previousFrameStart==null?0:e-this._previousFrameStart);this.updateAllTileFading(t),this._previousFrameStart=e}this._view.updateFadingTexture()}}fadeTile(e,t,a){let s=this._getTargetOpacity(t);if(e.fadeDirection=t,!this.fadingEnabled){this._instantTileFading(e,s);return}let r=e.opacityModifier;if(r!==s){let n=this._getFadeProgressFromOpacity(r,t);this._startTileFading(e,n,a)}else this._stopTileFading(e)}updateAllTileFading(e){let t=this._tmpFullyFadedOutTiles;t.length=0,this._view.tileHandles.forEach(a=>{this._updateTileFading(a,e)&&t.push(a)}),t.length>0&&(this._view.notifyTileObbsChanged(t),this._visibilityUpdatePending=!0),this._numFadingTiles.value===0&&this._visibilityUpdatePending&&(this._visibilityUpdatePending=!1,this._view.updateGaussians()),this._numFadingTiles.value>0&&this._view.view.stage?.renderView.requestRender(2)}onFadeDurationChanged(e){e===0&&this.numFadingTiles>0&&this._instantlyFullyFadeAllTiles()}isTileFadingOut(e){return e.fadeProgress!=null&&e.fadeDirection===1}onTileDiscarded(e){e.fadeProgress!=null&&(this._numFadingTiles.value--,this._numFadingTiles.value===0&&(this._lastStoppedFading=ne(performance.now())))}updateFadeDuration(){if(this.numFadingTiles&&this.numFadingTiles>=this._previousNumFadingTiles){let e=this._currentFadeDuration*.95;this._currentFadeDuration=ne(Math.max(e,H.minimumFadeDuration))}else this.numFadingTiles===0&&performance.now()-this._lastStoppedFading>H.resetFadeDurationInterval&&(this._currentFadeDuration=this.baseFadeDuration);return this._previousNumFadingTiles=this.numFadingTiles,this._currentFadeDuration}get updating(){return this._numFadingTiles.value>0}get baseFadeDuration(){return this._view.view.qualitySettings.fadeDuration}get fadingEnabled(){return this.baseFadeDuration!==0}_startTileFading(e,t,a){e.fadeProgress??this._numFadingTiles.value++,e.fadeDuration=a,e.fadeProgress=t}_stopTileFading(e){e.fadeProgress!=null&&(e.fadeDirection===1&&this._onTileFullyFadedOut(e),this._numFadingTiles.value--,this._numFadingTiles.value===0&&(this._lastStoppedFading=ne(performance.now())),e.fadeDuration=null,e.fadeProgress=null)}_updateTileFading(e,t){let{fadeProgress:a,fadeDirection:s}=e;if(a==null)return!1;let r=this._fadeDirectionToSign(s),n=e.fadeDuration,o=this._getTargetOpacity(s),u=t/Math.abs(n||1),d=Math.min(a+u,1),h=o-r*(1-(s===0?H.fadeInEase:H.fadeOutEase)(d)),m=d===1||this._tileReachedFadeOutCutoff(e,h);if(e.opacityModifier=m?o:h,m){let g=s===1;return this._stopTileFading(e),this._updateOpacityModifier(e),g}return e.fadeProgress=d,this._updateOpacityModifier(e),!1}_updateOpacityModifier(e){for(let t=0;t<e.pageIds.length;t++){let a=e.pageIds[t];this._view.data.fadingTexture.updateBuffer(e.opacityModifier,a)}}_tileReachedFadeOutCutoff(e,t){if(e.fadeDirection!==1)return!1;let a=ii(this._view.view.qualitySettings.gaussianSplat.minimumOpacity);return t*e.maxGaussianOpacity<=a}_instantTileFading(e,t){e.fadeDuration=null,e.fadeProgress=null,e.opacityModifier=t,this._updateOpacityModifier(e),e.fadeDirection===1&&this._onTileFullyFadedOut(e)}_instantlyFullyFadeAllTiles(){let e=this._tmpFullyFadedOutTiles;e.length=0,this._view.tileHandles.forEach(a=>{if(a.fadeProgress!=null){let s=a.fadeDirection===1;this._instantTileFading(a,this._getTargetOpacity(a.fadeDirection)),s&&e.push(a)}});let t=e.length>0;t&&(this._visibilityUpdatePending=!0),this._numFadingTiles.value=0,this._visibilityUpdatePending&&(this._visibilityUpdatePending=!1,this._view.updateGaussians()),t&&this._view.notifyTileObbsChanged(e)}_onTileFullyFadedOut(e){e.lifecycleState=0,this._view.moveTileToCache(e)}_fadeDirectionToSign(e){return e===0?1:-1}_getTargetOpacity(e){return+(e===0)}_getFadeProgressFromOpacity(e,t){let a=Math.max(0,Math.min(e,1));return t===0?H.inverseFadeInEase(a):H.inverseFadeOutEase(a)}},H.fadeInEase=e=>e*(2-e),H.fadeOutEase=e=>e*e,H.inverseFadeInEase=e=>1-Math.sqrt(1-e),H.inverseFadeOutEase=e=>Math.sqrt(1-e),H.minimumFadeDuration=ne(80),H.resetFadeDurationInterval=ne(1e3),H),us=class{constructor(e){this.layerView=e,this.type=0,this.slicePlaneEnabled=!1,this.isGround=!1,this._ellipsoidLocalRayOrigin=L(),this._ellipsoidLocalRayDir=L(),this.intersectionNormal=L(),this.intersectionRayDir=L(),this.intersectionPlane=ki(),this.layerViewUid=e.uid;let t=e.view.viewingMode,a=(e.useEsriCrs?e.fullExtentInLocalViewSpatialReference:e.layer.fullExtent?Vi(e.layer.fullExtent,e.view.renderSpatialReference):void 0)??e.view.extent,s=qi(a);this._bvh=Za(t,s)}destroy(){this._bvh.destroy()}addTile(e){this._bvh.addTile(e)}removeTile(e){this._bvh.removeTile(e)}intersectRay(e,t,a,s,r,n){let{intersectionRayDir:o,intersectionPlane:u,layerViewUid:d,intersectionNormal:h}=this,m=Hi(a,s);Kt(o,s,a);let g=1/Li(o);ht(o,o,g),ji(h,o),Wi(u,o[0],o[1],o[2],-Ui(o,a));let c=new je,p=new je,w=e.options.store,R=w===0,b=w===2,D=w===1||b,S=b?[]:null,B=(f,_,j,P,z,q,T,W)=>{let I=f.point??=L();I[0]=j,I[1]=P,I[2]=z,f.dist=_,f.normal=h;let M=f.outwardDirection??=L(),F=q*q+T*T+W*W;if(F>0){let Q=1/Math.sqrt(F);M[0]=q*Q,M[1]=T*Q,M[2]=W*Q}else M[0]=h[0],M[1]=h[1],M[2]=h[2];return f.layerViewUid=d,f},A=a[0],C=a[1],E=a[2],O=o[0],k=o[1],U=o[2],G=this.layerView.clippingBox,x=f=>{let{relativePositions:_,packedRotations:j,packedOpacityScaledScales:P,gaussianCount:z,obb:q,maxSplatMbsRadiusSquared:T}=f,W=q.centerX,I=q.centerY,M=q.centerZ,F=-1,Q=G[0],ye=G[1],xe=G[2],de=G[3],oe=G[4],J=G[5];for(let N=0,X=0;N<z;N++,X+=3){let ae=_[X]+W,pe=_[X+1]+I,le=_[X+2]+M;if(ae<Q||pe<ye||le<xe||ae>de||pe>oe||le>J)continue;let Y=ae-A,ce=pe-C,he=le-E,se=Y*O+ce*k+he*U;if(se<0&&se*se>T)continue;let fe=se<0?0:se;if(Y*Y+ce*ce+he*he-fe*fe>T||R&&c.dist!=null&&(F<0&&(F=Math.sqrt(T)),Math.max(se-F,0)*g>=c.dist))continue;let ee=this._intersectGaussianEllipsoid(Y,ce,he,O,k,U,j[N],P[N]);if(ee<0)continue;let re=ee*g;if(t!=null&&!t(a,s,re))continue;let be=c.dist==null||re<c.dist,Se=D&&(p.dist==null||re>p.dist);if(!be&&!Se&&!b)continue;let Ce=O*ee,Te=k*ee,Pe=U*ee,ze=A+Ce,it=C+Te,at=E+Pe,st=Ce-Y,rt=Te-ce,nt=Pe-he;if(be&&B(c,re,ze,it,at,st,rt,nt),Se&&B(p,re,ze,it,at,st,rt,nt),b){let Si=new je;S.push(B(Si,re,ze,it,at,st,rt,nt))}}},y=f=>{let{relativePositions:_,packedRotations:j,packedOpacityScaledScales:P,gaussianCount:z,obb:q,maxSplatMbsRadiusSquared:T}=f,W=q.centerX,I=q.centerY,M=q.centerZ,F=-1,Q=A-W,ye=C-I,xe=E-M;for(let de=0,oe=0;de<z;de++,oe+=3){let J=_[oe]-Q,N=_[oe+1]-ye,X=_[oe+2]-xe,ae=J*O+N*k+X*U;if(ae<0&&ae*ae>T)continue;let pe=ae<0?0:ae;if(J*J+N*N+X*X-pe*pe>T||R&&c.dist!=null&&(F<0&&(F=Math.sqrt(T)),Math.max(ae-F,0)*g>=c.dist))continue;let le=this._intersectGaussianEllipsoid(J,N,X,O,k,U,j[de],P[de]);if(le<0)continue;let Y=le*g;if(t!=null&&!t(a,s,Y))continue;let ce=c.dist==null||Y<c.dist,he=D&&(p.dist==null||Y>p.dist);if(!ce&&!he&&!b)continue;let se=O*le,fe=k*le,ee=U*le,re=A+se,be=C+fe,Se=E+ee,Ce=se-J,Te=fe-N,Pe=ee-X;if(ce&&B(c,Y,re,be,Se,Ce,Te,Pe),he&&B(p,Y,re,be,Se,Ce,Te,Pe),b){let ze=new je;S.push(B(ze,Y,re,be,Se,Ce,Te,Pe))}}},$=(f,_)=>{let{min:j,max:P}=f.obb.signedDistanceRangePlane(u);if(P<0)return;let z=j*g;if(!(R&&c.dist!=null&&c.dist<z)){if(c.dist!=null&&p.dist!=null){let q=P*g;if(c.dist<z&&p.dist>q)return}if(_){x(f);return}y(f)}};this._bvh.forEachTileIntersectingRay(a,s,G==null?f=>{$(f,!1)}:f=>{let _=f.boundingBox;dt(_,G)&&$(f,!Ni(G,_))},n);let V=(f,_)=>{let{layerViewUid:j}=_,P=new Yi(_.point,_.outwardDirection,j);f.set(0,P,_.dist,_.dist,_.normal)};if(Ht(c)){let f=e.results.min;(f.distance==null||c.dist<f.distance)&&V(f,c)}if(Ht(p)&&D){let f=e.results.max;(f.distance==null||p.dist>f.distance)&&V(f,p)}if(b&&S?.length)for(let f of S){let _=new Xi(m);V(_,f),e.results.all.push(_)}}_intersectGaussianEllipsoid(e,t,a,s,r,n,o,u){let d=o>>>30,h=o&1023,m=o>>>10&1023,g=o>>>20&1023,c=(h&ot)*lt*(1-(h>>>9&1)*2),p=(m&ot)*lt*(1-(m>>>9&1)*2),w=(g&ot)*lt*(1-(g>>>9&1)*2),R,b,D,S,B=c*c+p*p+w*w,A=Math.sqrt(Math.max(0,1-B));switch(d){case 0:R=A,b=w,D=p,S=c;break;case 1:R=w,b=A,D=p,S=c;break;case 2:R=w,b=p,D=A,S=c;break;default:R=w,b=p,D=c,S=A}let C=this._ellipsoidLocalRayOrigin;C[0]=-e,C[1]=-t,C[2]=-a,Rt(C,C,-R,-b,-D,S);let E=this._ellipsoidLocalRayDir;E[0]=s,E[1]=r,E[2]=n,Rt(E,E,-R,-b,-D,S);let O=ut[u&255],k=ut[u>>>8&255],U=ut[u>>>16],G=C[0]*O,x=C[1]*k,y=C[2]*U,$=G*G+x*x+y*y;if($<=1)return 0;let V=E[0]*O,f=E[1]*k,_=E[2]*U,j=V*V+f*f+_*_,P=G*V+x*f+y*_;if(P>0)return Lt;let z=P*P-j*($-1);return z<0?Lt:(-P-Math.sqrt(z))/j}getElevationRange(e){return this._bvh.getElevationRangeIntersectingSphere(e)??new ct(0,0)}};function Ht(i){return i.dist!=null&&i.point!=null}let je=class{constructor(){this.point=null,this.dist=null,this.normal=null,this.outwardDirection=null,this.layerViewUid=""}};const ot=511,lt=Math.SQRT1_2/511,Lt=-1,ut=(()=>{let i=new Float64Array(256);for(let e=0;e<i.length;e++)i[e]=Math.exp(10-e/16)/3;return i})();let ds=class{constructor(e,t,a,s,r,n,o,u,d,h){this.handle=e,this.obb=t,this.pageIds=a,this.relativePositions=s,this.packedRotations=r,this.packedOpacityScaledScales=n,this.gaussianCount=o,this.maxSplatMbsRadiusSquared=u,this.maxGaussianOpacity=d,this.elevationRange=h,this.bvhIntersectionGeneration=0,this.lifecycleState=0,this.cullingRevision=-1,this.cullingVisible=!1,this.fadeDirection=0,this.opacityModifier=0,this.usedMemory=gt(this.pageIds,this.relativePositions,this.packedRotations,this.packedOpacityScaledScales);let m=L();t.getCenter(m),this.obbCenterX=m[0],this.obbCenterY=m[1],this.obbCenterZ=m[2];let g=t.radius??-1;this._mbsRadius=g;let c=g<0?-1:g*g;this._mbsRadiusSquared=c,this._obbShortestHalfsize=Math.min(t.halfSizeX,t.halfSizeY,t.halfSizeZ);let p=et();t.toAaBoundingBox(p),this.boundingBox=p;let w=g>=0?g:Zi(p)*.5;this.paddedMbsRadius=w+Math.sqrt(Math.max(0,u))}boundingVolumeIntersectsRay(e,t){if(!this.obb)return!0;let{obbCenterX:a,obbCenterY:s,obbCenterZ:r}=this,n=a-e[0],o=s-e[1],u=r-e[2],d=n*t[0]+o*t[1]+u*t[2],h=n*n+o*o+u*u-d*d;return(this._mbsRadiusSquared<0||h<=this._mbsRadiusSquared)&&this.obb.intersectRay(e,t)}boundingVolumeIntersectsSphere(e){let t=this._mbsRadius;if(t<0)return!0;let a=e.center,s=e.radius,r=t+s,n=this.obbCenterX-a[0];if(n>r)return!1;let o=this.obbCenterY-a[1];if(o>r)return!1;let u=this.obbCenterZ-a[2];if(u>r)return!1;let d=n*n+o*o+u*u;return d>r*r?!1:d<=(this._obbShortestHalfsize+s)**2||Math.sqrt(d)+t<=s?!0:this.obb?.intersectSphere(e)??!0}};function xt(i){return i.visibleGaussians>0&&i.orderTexture.texture!=null&&i.textureAtlas.texture!=null&&i.headerTexture.texture!=null}function hs(i){return i.laserlinesEnabled||i.viewshedEnabled}function cs(i){return i.viewshedEnabled}function ai(i,e,t){si(i,e,t,t.eye),i.splatFading=e.data.fadingTexture.texture;let{fullHeight:a,fullWidth:s}=t,r=Math.tan(t.fovY*.5),n=r/a*s;Ki(i.tanFov,n,r),i.focalLength=a/(2*r),Xe(i.origin,t.eye)}function si(i,e,t,a){let s=e.data;i.splatOrder=s.orderTexture.texture,i.splatAtlas=s.textureAtlas.texture,i.splatHeader=s.headerTexture.texture;let{fullHeight:r,fullWidth:n}=t;i.minSplatRadius=e.view.qualitySettings.gaussianSplat.minimumPixelRadius*Math.sqrt(n*r)/1440,ht(i.tileCameraPosition,a,1/jt),Qi(i.tileCameraPosition,i.tileCameraPosition),ht(i.cameraDelta,i.tileCameraPosition,jt),Kt(i.cameraDelta,a,i.cameraDelta),i.slicePlaneLocalOrigin=a;let[o,u,d,h,m,g]=e.clippingBox||We,[c,p,w]=a;pt(i.clipMinCameraRelative,o-c,u-p,d-w),pt(i.clipMaxCameraRelative,h-c,m-p,g-w)}const jt=2.048,wt=.25,Wt=.00122072;function ps(i){i.code.add(l`vec3 computeProjectedGaussianCovariance2D(
vec3 pixelXGradient,
vec3 pixelYGradient,
vec3 scale,
mat3 rotation,
mat4 view
) {
mat3 viewToWorld = transpose(mat3(view));
vec3 scaledAxisX = scale * (rotation * (viewToWorld * pixelXGradient));
vec3 scaledAxisY = scale * (rotation * (viewToWorld * pixelYGradient));
return vec3(dot(scaledAxisX, scaledAxisX), dot(scaledAxisX, scaledAxisY), dot(scaledAxisY, scaledAxisY));
}
float regularizeGaussianCovariance(inout vec3 covariance2D) {
float originalDeterminant = covariance2D.x * covariance2D.z - covariance2D.y * covariance2D.y;
const float covarianceRegularization = 0.3;
covariance2D.x += covarianceRegularization;
covariance2D.z += covarianceRegularization;
float regularizedDeterminant = covariance2D.x * covariance2D.z - covariance2D.y * covariance2D.y;
return sqrt(max(0.0, originalDeterminant / regularizedDeterminant));
}
vec3 computeGaussianCovariance2D(
vec3 viewSpaceCenter,
float focalLength,
vec2 tanFov,
vec3 scale,
mat3 rotation,
mat4 view
) {
vec4 viewSpacePoint = vec4(viewSpaceCenter, 1);
vec2 clampLimit = 1.3 * tanFov;
vec2 normalized = viewSpacePoint.xy / viewSpacePoint.z;
viewSpacePoint.xy = clamp(normalized, -clampLimit, clampLimit) * viewSpacePoint.z;
float invZ = 1.0 / viewSpacePoint.z;
float invZSquared = invZ * invZ;
vec3 pixelXGradient = vec3(focalLength * invZ, 0.0, -(focalLength * viewSpacePoint.x) * invZSquared);
vec3 pixelYGradient = vec3(0.0, focalLength * invZ, -(focalLength * viewSpacePoint.y) * invZSquared);
return computeProjectedGaussianCovariance2D(pixelXGradient, pixelYGradient, scale, rotation, view);
}`)}function Ut(i){i.code.add(l`float computeGaussianCovarianceDeterminant(vec3 covariance2D) {
return covariance2D.x * covariance2D.z - covariance2D.y * covariance2D.y;
}
vec2 computeGaussianCovarianceEigenvalues(vec3 covariance2D) {
float mid = 0.5 * (covariance2D.x + covariance2D.z);
float radius = length(vec2((covariance2D.x - covariance2D.z) * 0.5, covariance2D.y));
return vec2(mid + radius, mid - radius);
}
float computeGaussianEllipseThreshold(float gaussianLogAlphaCutoff) {
return max(0.0, -2.0 * gaussianLogAlphaCutoff);
}
bool rejectGaussianByMinimumRadius(float maxRadius, float opacity, float minSplatRadius) {
return minSplatRadius > 0.0 && maxRadius * opacity < minSplatRadius;
}
vec2 computeGaussianScreenRadii(vec3 covariance2D, float gaussianEllipseThreshold) {
return ceil(sqrt(covariance2D.xz * gaussianEllipseThreshold));
}
bool rejectGaussianByScreenBounds(vec2 ndcPosition, vec2 screenRadii, vec2 clipSpacePixelScale) {
vec2 radiusNDC = screenRadii * clipSpacePixelScale;
return any(greaterThan(abs(ndcPosition) - radiusNDC, vec2(1.0)));
}
vec2 computeGaussianUnitQuadCorner(int vertexID) {
return vec2((vertexID << 1) & 2, vertexID & 2) - 1.0;
}
float evaluateGaussianExponent(vec2 canonicalCoordinates) {
return -0.5 * dot(canonicalCoordinates, canonicalCoordinates);
}`)}function fs(i){i.code.add(l`
    uint fetchOrderedGaussianIndex(uint instanceID) {
      uint orderTextureWidth = uint(textureSize(splatOrderTexture, 0).x);
      uint x = instanceID % orderTextureWidth;
      uint y = instanceID / orderTextureWidth;

      return texelFetch(splatOrderTexture, ivec2(x, y), 0).r;
    }

    uvec4 fetchPackedGaussian(uint gaussianIndex) {
      uint gaussianIndexX = gaussianIndex & ${l.uint(gs)};
      uint gaussianIndexY = gaussianIndex >> ${l.uint(ms)};

      return texelFetch(splatAtlasTexture, ivec2(gaussianIndexX, gaussianIndexY), 0);
    }

    uint fetchGaussianPageIndex(uint gaussianIndex) {
      return gaussianIndex >> ${l.uint(_s)};
    }

    uvec4 fetchPackedGaussianHeader(uint gaussianIndex) {
      uint pageIndex = fetchGaussianPageIndex(gaussianIndex);
      uint headerTextureWidth = uint(textureSize(splatHeaderTexture, 0).x);
      uint headerIndexX = pageIndex % headerTextureWidth;
      uint headerIndexY = pageIndex / headerTextureWidth;

      return texelFetch(splatHeaderTexture, ivec2(headerIndexX, headerIndexY), 0);
    }

    vec3 fetchGaussianCameraRelativePosition(uint gaussianIndex, uvec4 packedGaussian) {
      uvec4 packedHeader = fetchPackedGaussianHeader(gaussianIndex);
      vec3 tileOriginRelativePosition = unpackTileOriginRelativePosition(packedGaussian);

      return unpackCameraRelativeGaussianPosition(packedHeader, tileOriginRelativePosition);
    }
  `)}const gs=ie-1,ms=Math.log2(ie),_s=Math.log2(we);let vs=class extends mt{constructor(){super(...arguments),this.tileCameraPosition=L(),this.cameraDelta=L()}};function ys(i){i.code.add(l`float unpackOpacity(uvec4 packedGaussian) {
return float((packedGaussian.w >> 24u) & 0xffu) / 255.0;
}
vec4 unpackColor(uvec4 packedGaussian) {
vec4 color;
color.r = float((packedGaussian.w >> 1u) & 0xfeu);
color.g = float((packedGaussian.w >> 9u) & 0xffu);
color.b = float((packedGaussian.w >> 16u) & 0xfeu);
color.a = float((packedGaussian.w >> 24u) & 0xffu);
return color / 255.0;
}`),i.code.add(l`vec3 unpackScale(uvec4 packedGaussian) {
uint sx = (packedGaussian.z >> 10u) & 0xffu;
uint sy = (packedGaussian.z >> 18u) & 0xffu;
uint szLow = (packedGaussian.z >> 26u) & 0x3fu;
uint szHigh = packedGaussian.a & 0x3u;
uint sz = szLow | (szHigh << 6u);
return exp(vec3(sx, sy, sz) / 16.0 - 10.0);
}`),i.code.add(l`const uint MASK_9_BITS = 0x1FFu;
const float SQRT_HALF = 0.7071067811865476;
vec4 unpackQuaternion(uvec4 packedGaussian) {
uint packedRotation = packedGaussian.x;
uint largestComponent = packedRotation >> 30u;
uvec3 bitfields = uvec3(packedRotation) >> uvec3(0u, 10u, 20u);
vec3 components = SQRT_HALF * vec3(bitfields & uvec3(MASK_9_BITS)) / float(MASK_9_BITS);
components = mix(components, -components, notEqual((bitfields >> 9u) & uvec3(1u), uvec3(0u)));
vec4 quaternion = vec4(components, sqrt(1.0 - dot(components, components)));
return largestComponent == 0u ? quaternion.wzyx :
largestComponent == 1u ? quaternion.zwyx :
largestComponent == 2u ? quaternion.zywx : quaternion.zyxw;
}`),i.code.add(l`vec3 unpackTileOriginRelativePosition(uvec4 packedGaussian) {
uint packedPositionLow = packedGaussian.y;
uint packedPositionHigh = packedGaussian.z;
uint x = packedPositionLow & 0x3FFFu;
uint y = (packedPositionLow >> 14u) & 0x3FFFu;
uint zLow = (packedPositionLow >> 28u) & 0xFu;
uint zHigh = packedPositionHigh & 0x3FFu;
uint z = zLow | (zHigh << 4u);
return vec3(float(x), float(y), float(z));
}`),i.uniforms.add(new Ge("tileCameraPosition",e=>e.tileCameraPosition),new Ge("cameraDelta",e=>e.cameraDelta)).code.add(l`vec3 unpackCameraRelativeGaussianPosition(uvec4 packedHeader, highp vec3 position) {
vec3 tileOrigin = uintBitsToFloat(packedHeader.xyz);
float invPosScale = 1.0 / exp2(float(packedHeader.w & 0xfu));
vec3 delta = tileOrigin.xyz - tileCameraPosition;
vec3 cameraRelativePosition = position * invPosScale + delta * 2.048 - cameraDelta;
return cameraRelativePosition;
}`)}function xs(i){i.code.add(l`mat3 quaternionToRotationMatrix(vec4 q) {
float x2 = q.x + q.x;
float y2 = q.y + q.y;
float z2 = q.z + q.z;
float xx = x2 * q.x;
float yy = y2 * q.y;
float zz = z2 * q.z;
float xy = x2 * q.y;
float xz = x2 * q.z;
float yz = y2 * q.z;
float wx = x2 * q.w;
float wy = y2 * q.w;
float wz = z2 * q.w;
return mat3(
1.0 - (yy + zz), xy - wz, xz + wy,
xy + wz, 1.0 - (xx + zz), yz - wx,
xz - wy, yz + wx, 1.0 - (xx + yy)
);
}`)}function ri(i,e){let{clippingEnabled:t}=e,{fragment:a,varyings:s,vertex:r}=i;s.add("gaussianCoordinates","vec2"),s.add("gaussianLogAlphaCutoff","float"),s.add("fragmentPositionCameraRelative","vec3"),r.uniforms.add(new Ue("splatOrderTexture",n=>n.splatOrder),new Ue("splatAtlasTexture",n=>n.splatAtlas),new Ue("splatHeaderTexture",n=>n.splatHeader),new Qt("minSplatRadius",n=>n.minSplatRadius),ia,aa,sa,Jt),t&&(r.uniforms.add(new Ge("clipMin",n=>n.clipMinCameraRelative),new Ge("clipMax",n=>n.clipMaxCameraRelative)),a.uniforms.add(new Ge("clipMin",n=>n.clipMinCameraRelative),new Ge("clipMax",n=>n.clipMaxCameraRelative))),r.include(ys),r.include(fs),r.include(xs),r.include(ps),r.include(Ut),r.include(Dt,e),a.include(Ut),a.include(Dt,e),a.main.add(l`
    ${bs(e)}
  `)}function ni(i,e){if(i.include(ri,e),i.vertex.uniforms.add(new Qt("focalLength",t=>t.focalLength),new Ji("tanFov",t=>t.tanFov)),!e.preciseDepth){i.fragment.code.add(l`float gaussianSplatDepth() {
return gl_FragCoord.z;
}`);return}i.include(oi),i.vertex.uniforms.add(ea),i.fragment.include(ta),i.fragment.code.add(l`float gaussianSplatDepth() {
float rayDepth = gaussianSplatRayDepth();
return delinearizeDepth(-rayDepth);
}`)}function oi(i){i.varyings.add("rayGaussianFactor","vec4"),i.vertex.code.add(l`vec3 reconstructViewRay(vec2 clipPosition, mat4 inverseProjection) {
vec3 rayViewPoint = (inverseProjection * vec4(clipPosition, -1.0, 1.0)).xyz;
return vec3(-rayViewPoint.xy / rayViewPoint.z, -1.0);
}
vec4 computeGaussianRayFactor(
vec3 rayView,
vec3 cameraRelativePosition,
vec3 gaussianScale,
mat3 gaussianRotation,
mat3 viewRotation
) {
vec3 inverseGaussianScale = 1.0 / gaussianScale;
vec3 rayGaussianFactorCenter = (gaussianRotation * cameraRelativePosition) * inverseGaussianScale;
vec3 rayGaussianFactorRay = (gaussianRotation * (transpose(viewRotation) * rayView)) * inverseGaussianScale;
return vec4(rayGaussianFactorRay, dot(rayGaussianFactorCenter, rayGaussianFactorRay));
}`);let e=l`float gaussianSplatRayDepth() {
return rayGaussianFactor.w / dot(rayGaussianFactor.xyz, rayGaussianFactor.xyz);
}`;i.vertex.code.add(e),i.fragment.code.add(e)}function li(i){i.uniforms.add(new Ue("splatFadingTexture",e=>e.splatFading)),i.code.add(l`float applyGaussianSplatFading(float opacity, uint gaussianIndex) {
uint pageIndex = fetchGaussianPageIndex(gaussianIndex);
uint fadingTextureWidth = uint(textureSize(splatFadingTexture, 0).x);
uint fadeX = pageIndex % fadingTextureWidth;
uint fadeY = pageIndex / fadingTextureWidth;
uint opacityModifier = texelFetch(splatFadingTexture, ivec2(fadeX, fadeY), 0).r;
return opacity * float(opacityModifier) / 255.0;
}`)}function ui(i,e){let{clippingEnabled:t,hasSlicePlane:a}=i;return l`
    gl_Position = ${ra};

    if (opacity < ${e}) {
      return;
    }

    vec3 cameraRelativePosition = fetchGaussianCameraRelativePosition(gaussianIndex, packedGaussian);

    ${Z(t,l`
        if (cameraRelativePosition.x < clipMin.x || cameraRelativePosition.y < clipMin.y || cameraRelativePosition.z < clipMin.z ||
          cameraRelativePosition.x > clipMax.x || cameraRelativePosition.y > clipMax.y || cameraRelativePosition.z > clipMax.z) {
          return;
        }
      `)}

    ${Z(a,l`
        if (rejectBySlice(cameraRelativePosition)) {
          return;
        }
      `)}

    vec4 viewPos = vec4(mat3(view) * cameraRelativePosition, 1.0);

    if (viewPos.z > -nearFar.x || viewPos.z < -nearFar.y) {
      return;
    }
  `}const di=l`vec3 gaussianScale = unpackScale(packedGaussian);
mat3 gaussianRotation = quaternionToRotationMatrix(unpackQuaternion(packedGaussian));`;function hi(i,e){return l`
    float determinant = computeGaussianCovarianceDeterminant(covariance2D);
    if (determinant <= 0.0) {
      return;
    }

    vec2 eigenvalues = computeGaussianCovarianceEigenvalues(covariance2D);
    gaussianLogAlphaCutoff = ${i};
    float gaussianEllipseThreshold = computeGaussianEllipseThreshold(gaussianLogAlphaCutoff);
    vec2 screenRadii = computeGaussianScreenRadii(covariance2D, gaussianEllipseThreshold);
    float maxRadius = ceil(sqrt(eigenvalues.x * gaussianEllipseThreshold));

    if (rejectGaussianByMinimumRadius(maxRadius, ${e}, minSplatRadius)) {
      return;
    }
  `}const ci=l`vec2 clipSpacePixelScale = 2.0 * inverseScreenSize;
if (rejectGaussianByScreenBounds(ndcPos.xy, screenRadii, clipSpacePixelScale)) {
return;
}
vec2 quadCorner = computeGaussianUnitQuadCorner(gl_VertexID);
gaussianCoordinates = quadCorner * sqrt(gaussianEllipseThreshold);
float inverseRadiusX = inversesqrt(covariance2D.x);
vec2 choleskyAxisX = covariance2D.xy * inverseRadiusX;
vec2 choleskyAxisY = vec2(0.0, sqrt(determinant) * inverseRadiusX);
vec2 offsetFromCenter = gaussianCoordinates.x * choleskyAxisX + gaussianCoordinates.y * choleskyAxisY;`;function pi(i,e){return l`
    ${ui(i,l.float(e))}

    ${di}
    vec3 covariance2D = computeGaussianCovariance2D(viewPos.xyz, focalLength, tanFov, gaussianScale, gaussianRotation, view);
    float minimumRadiusOpacity = opacity;
    float opacityScale = regularizeGaussianCovariance(covariance2D);
    opacity *= opacityScale;
    if (opacity < ${l.float(e)}) {
      return;
    }

    ${hi(`${l.float(Math.log(e))} - log(opacity)`,"minimumRadiusOpacity")}
    ${ws(i)}
  `}function ws(i){return l`
    vec4 projPos = proj * viewPos;
    float invW = 1.0 / (projPos.w + 1e-7);
    vec3 ndcPos = projPos.xyz * invW;
    ${ci}

    float viewSpacePixelScale = -viewPos.z / focalLength;
    vec3 fragmentViewOffset = vec3(offsetFromCenter * viewSpacePixelScale, 0.0);
    fragmentPositionCameraRelative = cameraRelativePosition + transpose(mat3(view)) * fragmentViewOffset;

    vec2 quadClipPosition = ndcPos.xy + offsetFromCenter * clipSpacePixelScale - inverseScreenSize;
    ${Z(i.preciseDepth,l`
        vec3 rayView = reconstructViewRay(quadClipPosition, inverseProjectionMatrix);
        rayGaussianFactor = computeGaussianRayFactor(
          rayView, cameraRelativePosition, gaussianScale, gaussianRotation, mat3(view)
        );
      `)}
    gl_Position = vec4(quadClipPosition, ndcPos.z, 1.0);
  `}function bs(i){let{clippingEnabled:e,hasSlicePlane:t}=i;return l`
    ${Z(e,l`
        if (fragmentPositionCameraRelative.x < clipMin.x || fragmentPositionCameraRelative.y < clipMin.y || fragmentPositionCameraRelative.z < clipMin.z ||
          fragmentPositionCameraRelative.x > clipMax.x || fragmentPositionCameraRelative.y > clipMax.y || fragmentPositionCameraRelative.z > clipMax.z) {
          discard;
        }
      `)}
    ${Z(t,l`if (rejectBySlice(fragmentPositionCameraRelative)) { discard; }`)}

    float gaussianExponent = evaluateGaussianExponent(gaussianCoordinates);
    if (gaussianExponent > 0.0 || gaussianExponent < gaussianLogAlphaCutoff) {
      discard;
    }
  `}function fi(i){let{fadingEnabled:e}=i,t=new Ee,{fragment:a,vertex:s}=t;return t.include(ni,i),i.fadingEnabled&&t.vertex.include(li),i.writeNormals&&t.outputs.add("fragNormal","vec4",0),s.main.add(l`
    uint gaussianIndex = fetchOrderedGaussianIndex(uint(gl_InstanceID));
    uvec4 packedGaussian = fetchPackedGaussian(gaussianIndex);

    float opacity = unpackOpacity(packedGaussian);

    ${Z(e,l`opacity = applyGaussianSplatFading(opacity, gaussianIndex);`)}

    ${pi(i,wt)}
  `),i.preciseDepth&&a.main.add("gl_FragDepth = gaussianSplatDepth();"),i.writeNormals&&a.main.add("fragNormal = vec4(0.0);"),t}const Ss=Object.freeze(Object.defineProperty({__proto__:null,build:fi},Symbol.toStringTag,{value:"Module"}));let Ye=class extends Oe{constructor(){super(...arguments),this.shader=new ke(Ss,()=>Ve(()=>Promise.resolve().then(()=>Gs),void 0))}initializePipeline(e){return qe({colorWrite:e.writeNormals?_t:null,depthTest:{func:515},depthWrite:tt})}};Ye=v([me("esri.views.3d.webgl-engine.shaders.GaussianSplatDepthTechnique")],Ye);let gi=class extends vs{constructor(){super(...arguments),this.clipMinCameraRelative=L(),this.clipMaxCameraRelative=L(),this.minSplatRadius=-1}};class mi extends gi{constructor(){super(...arguments),this.focalLength=-1,this.tanFov=na(),this.origin=L()}}let Re=class extends vt{constructor(i){super(i),this.consumes={required:[Ae.GAUSSIAN_SPLAT_DEPTH]},this.produces=Ae.GAUSSIAN_SPLAT_DEPTH,this.layerView=null,this._passParameters=new mi,this._configuration=new te(i.view.state.isGlobal)}precompile(){this._canRender&&(this._updateConfiguration(),this.techniques.precompile(Ye,this._configuration))}render(){let i=this.bindRenderTarget();if(this.layerView.fadeHelper.updateForFrame(this.view.stage.renderView.renderer.renderContext.time),!this._canRender)return i;this._updateConfiguration(),ai(this._passParameters,this.layerView,this.bindParameters.camera);let e=this.techniques.get(Ye,this._configuration);return this.renderingContext.bindTechnique(e,this.bindParameters,this._passParameters),this.renderingContext.drawArraysInstanced(yt.TRIANGLE_STRIP,0,4,this.layerView.data.visibleGaussians),i}get _canRender(){return xt(this.layerView.data)}_updateConfiguration(){this._configuration.preciseDepth=hs(this.bindParameters),this._configuration.fadingEnabled=this.layerView.fadeHelper.fadingEnabled,this._configuration.clippingEnabled=this.layerView.clippingBox!=null,this._configuration.hasSlicePlane=this.layerView.slicePlaneEnabled&&this.bindParameters.slicePlane!=null,this._configuration.writeNormals=this.bindParameters.output===4}};v([K()],Re.prototype,"consumes",void 0),v([K()],Re.prototype,"produces",void 0),v([K({constructOnly:!0})],Re.prototype,"layerView",void 0),Re=v([me("esri.views.3d.webgl-engine.lib.GaussianSplatDepthRenderer")],Re);let bt=class extends mt{};function _i(i){let e=new Ee;e.include(ei);let{hasEmission:t}=i,a=e.fragment;return t&&a.include(oa,i),a.uniforms.add(new Ne("colorTexture",s=>s.color),new Ne("splatOutputColor",s=>s.splatColor)),t&&a.uniforms.add(new Ne("emissionTexture",s=>s.emission)),e.outputs.add("fragColor","vec4",0),t&&e.outputs.add("fragEmission","vec4",1),e.fragment.main.add(l`
      vec4 color = texture(colorTexture, uv);
      vec4 splatColor = texture(splatOutputColor, uv);

      fragColor = splatColor + color * (1.0 - splatColor.a);
      ${Z(t,l`
          vec4 emission = texture(emissionTexture, uv);
          float srcAlpha = splatColor.a;

          if (srcAlpha == 0.0) {
            fragEmission = emission;
            return;
          }

          vec3 oitFilter = emissionFilter(splatColor.rgb, 1.0 - srcAlpha);
          float opaqueSuppression = smoothstep(0.95, 1.0, srcAlpha);
          vec3 dimming = mix(oitFilter, vec3(0.0), opaqueSuppression);

          fragEmission = vec4(emission.rgb * dimming, emission.a);
        `)}
    `),e}const Cs=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:bt,build:_i},Symbol.toStringTag,{value:"Module"}));let Ze=class extends Oe{constructor(){super(...arguments),this.shader=new ke(Cs,()=>Ve(()=>Promise.resolve().then(()=>$s),void 0))}initializePipeline(){return qe({colorWrite:_t,depthTest:null,depthWrite:tt})}};Ze=v([me("esri.views.3d.webgl-engine.shaders.GaussianSplatCompositionTechnique")],Ze);class vi extends la{constructor(){super(...arguments),this.hasEmission=!1}}v([ue()],vi.prototype,"hasEmission",void 0);function yi(i){i.code.add(l`vec3 encodeNormalizedDepthToRGB(float normalizedDepth) {
float depth24 = normalizedDepth * 16777215.0;
float high = floor(depth24 / 65536.0);
depth24 -= high * 65536.0;
float mid = floor(depth24 / 256.0);
float low = depth24 - mid * 256.0;
return vec3(high, mid, low) / 255.0;
}`),i.code.add(l`float decodeRGBToNormalizedDepth(vec3 rgb) {
rgb *= 255.0;
float depth = rgb.r * 65536.0 + rgb.g * 256.0 + rgb.b;
depth /= 16777215.0;
return depth;
}`)}class St extends mt{}function xi(){let i=new Ee;i.include(ei);let e=i.fragment;return e.uniforms.add(new Ne("splatOutputDepth",t=>t.splatDepth)),e.include(yi),e.main.add(l`vec4 splatDepth = texture(splatOutputDepth, uv);
float depth = decodeRGBToNormalizedDepth(splatDepth.xyz);
if(splatDepth.a < 1.0) {
discard;
}
gl_FragDepth = depth;`),i}const Ts=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:St,build:xi},Symbol.toStringTag,{value:"Module"}));let Ke=class extends Oe{constructor(){super(...arguments),this.shader=new ke(Ts,()=>Ve(()=>Promise.resolve().then(()=>As),void 0))}initializePipeline(){return qe({colorWrite:null,depthTest:{func:515},depthWrite:tt})}};Ke=v([me("esri.views.3d.webgl-engine.shaders.GaussianSplatDepthCompositionTechnique")],Ke);function wi(i){let{receiveShadows:e,spherical:t}=i,a=e&&i.fragmentShading,s=a&&i.preciseDepth,r=new Ee,{varyings:n,vertex:o,fragment:u,outputs:d}=r;n.add("vColor","vec4"),s&&n.add("shadowReceiverRay","vec3"),r.include(ni,i),i.fadingEnabled&&o.include(li),o.uniforms.add(new Mt("cameraPosition",w=>w.camera.eye));let h=a?u:o;h.uniforms.add(new Mt("cameraPosition",w=>w.camera.eye)),h.include(ua,i),h.include(da,i),ha(h),h.uniforms.add(ca),a?r.include(pa,i):e&&(o.include(fa),i.hasShadowHighlights&&o.code.add(l`ivec2 getShadowHighlightCoordinates() {
vec2 screenUV = gl_Position.xy / gl_Position.w * 0.5 + 0.5;
ivec2 screenPixel = ivec2(screenUV / inverseScreenSize);
return clamp(screenPixel, ivec2(0), textureSize(shadowHighlight, 0) - 1);
}`),ga(o,i.hasShadowHighlights,"getShadowHighlightCoordinates()")),d.add("fragColor","vec4",0),d.add("fragDepthColor","vec4",1);let m=ii(i.alphaCutoff),g=l`float groundLightAlignment = dot(upNormal, mainLightDirection);
float additionalAmbientScale = additionalDirectedAmbientLight(groundLightAlignment);
vec3 additionalLight = mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;`,c=l`
    vec3 viewDirection = normalize(fragmentPositionCameraRelative - cameraPosition);
    vec3 upNormal = getLocalUp(fragmentPositionCameraRelative, cameraPosition);
    ${g}
    float shadow = ${t?l`lightingGlobalFactor * (1.0 - additionalAmbientScale)`:l`0.0`};
    ${Z(e,l`
        ${i.preciseDepth?l`
                float receiverDepth = gaussianSplatRayDepth();
                vec3 receiverPosition = transpose(mat3(view)) * rayView * receiverDepth;
              `:l`
                float receiverDepth = -viewPos.z;
                vec3 receiverPosition = fragmentPositionCameraRelative;
              `}
        vec3 uvzShadow = calculateUVZShadow(receiverPosition, receiverDepth, textureSize(shadowMap, 0));
        shadow = max(shadow, readShadowMaps(uvzShadow));
      `)}
    vColor.rgb = evaluateSceneLighting(upNormal, vColor.rgb, shadow, 0.0, additionalLight, viewDirection, upNormal);
  `,p=l`
    vec3 viewDirection = normalize(fragmentPositionCameraRelative - cameraPosition);
    vec3 upNormal = getLocalUp(fragmentPositionCameraRelative, cameraPosition);
    ${g}
    ${s?l`
            float shadow = max(
              lightingGlobalFactor * (1.0 - additionalAmbientScale),
              readShadowMap(shadowReceiverRay * receiverDepth, receiverDepth)
            );
          `:"float shadow = readShadow(additionalAmbientScale, fragmentPositionCameraRelative);"}
    shadedColor = evaluateSceneLighting(upNormal, vColor.rgb, shadow, 0.0, additionalLight, viewDirection, upNormal);
  `;return o.main.add(`
    uint gaussianIndex = fetchOrderedGaussianIndex(uint(gl_InstanceID));
    uvec4 packedGaussian = fetchPackedGaussian(gaussianIndex);

    // Unpack color first so very transparent splats can discard before fetching the page header.
    vColor = unpackColor(packedGaussian);
    float opacity = vColor.a;

    // Apply per-page fading before the early alpha rejection.
    ${Z(i.fadingEnabled,l`opacity = applyGaussianSplatFading(opacity, gaussianIndex);
vColor.a = opacity;`)}

    ${pi(i,m)}
    vColor.a = opacity;
    ${Z(s,"shadowReceiverRay = transpose(mat3(view)) * rayView;")}

    // Per-fragment lighting preserves crisp shadow borders; vertex lighting reduces overdraw cost.
    ${Z(a,"forwardLinearDepth(-viewPos.z);",c)}
  `),u.include(yi),u.main.add(`
    float gaussianFalloff = exp(gaussianExponent);

    // Cap at 0.99 to avoid blending issues, such as seams between overlapping Gaussians.
    float alpha = min(.99f, vColor.a * gaussianFalloff);

    ${Z(s,l`float receiverDepth = gaussianSplatRayDepth();`)}
    vec3 shadedColor = vColor.rgb;
    ${Z(a,p)}
    fragColor = vec4(shadedColor * alpha, alpha);

    // We simulate first hit based depth using the shared opacity threshold.
    // This works because we render in front-to-back order,
    // i.e. the first hit that counts completely saturates the alpha channel
    // and further splats do not contribute.
    float depthHit = step(${l.float(wt)}, alpha);
    vec3 encodedDepth = vec3(0.0);
    if (depthHit > 0.0) {
      encodedDepth = encodeNormalizedDepthToRGB(${s?"delinearizeDepth(-receiverDepth)":"gaussianSplatDepth()"});
    }
    fragDepthColor = vec4(encodedDepth, depthHit);
  `),r}const Ps=Object.freeze(Object.defineProperty({__proto__:null,build:wi},Symbol.toStringTag,{value:"Module"}));let Qe=class extends Oe{constructor(){super(...arguments),this.shader=new ke(Ps,()=>Ve(()=>Promise.resolve().then(()=>zs),void 0))}initializePipeline(){return qe({blending:ma,depthTest:{func:515},colorWrite:_t})}};Qe=v([me("esri.views.3d.webgl-engine.shaders.GaussianSplatTechnique")],Qe);let De=class extends vt{constructor(i){super(i),this.consumes={required:[Ae.GAUSSIAN_SPLAT]},this.produces=Ae.GAUSSIAN_SPLAT,this._slicePlaneEnabled=!1,this.layerView=null,this._passParameters=new mi,this._compositionPassParameters=new bt,this._depthCompositionPassParameters=new St,this._compositionConfiguration=new vi,this._clipBox=et(),this._previousSortRequestCameraDirection=L(),this._cameraSortDirty=!1,this._tileCullingRevision=0,this._sortRequestDirectionEpsilon=.01,this._configuration=new te(i.view.state.isGlobal),Ft(this._clipBox,We)}async initialize(){this.addHandles([_e(()=>this.view.state.camera,()=>this._onCameraChange()),_e(()=>this.view.state.mode===2,i=>{i&&this._cameraSortDirty&&this._requestCameraSort(this.view.state.camera.ray.direction),this.requestRender(1)})])}precompile(){this._canRender&&(this._updateConfigurations(),this._compositionConfiguration.useFloatBlend=this.bindParameters.useFloatBlend.value,this._compositionConfiguration.hasEmission=this.bindParameters.hasOpaqueEmission,this.techniques.precompile(Qe,this._configuration),this.techniques.precompile(Ze,this._compositionConfiguration),this.techniques.precompile(Ke))}render(){let i=this.input;if(this._updateConfigurations(),this._fadeHelper.updateForFrame(this.view.stage.renderView.renderer.renderContext.time),!this._canRender)return i;let e=i.getAttachment(Ie);this._compositionConfiguration.useFloatBlend=this.bindParameters.useFloatBlend.value,this._compositionConfiguration.hasEmission=e!=null;let{fullWidth:t,fullHeight:a}=this.bindParameters.camera;this._prepareParameters();let s=this.renderingContext,r=this.fboCache,n=r.acquire(t,a,"gaussian color output"),o=i.getAttachment(Gt);n.attachDepth(o);let u=this.techniques.get(Qe,this._configuration);this._renderGaussianColorAndDepth(n,u);let d=r.acquire(t,a,this.produces);this._depthCompositionPassParameters.splatDepth=n.getTexture(Ie),d.attachDepth(i.getAttachment(Gt)),s.bindFramebuffer(d.fbo);let h=this.techniques.get(Ke);s.bindTechnique(h,this.bindParameters,this._depthCompositionPassParameters),s.screen.draw(),this._compositionPassParameters.color=i.getTexture(),this._compositionPassParameters.splatColor=n.getTexture(),e?(d.acquireColor(Ie,8,"emissive"),this._compositionPassParameters.emission=i.getTexture(Ie)):this._compositionPassParameters.emission=null,s.bindFramebuffer(d.fbo);let m=this.techniques.get(Ze,this._compositionConfiguration);return s.bindTechnique(m,this.bindParameters,this._compositionPassParameters),s.screen.draw(),n.release(),d}get slicePlaneEnabled(){return this._slicePlaneEnabled}set slicePlaneEnabled(i){this._slicePlaneEnabled!==i&&(this._slicePlaneEnabled=i,this.requestRender(1))}set clippingBox(i){let e=i||We;this._hasSameClipBox(e)||(Ft(this._clipBox,e),this._tileCullingRevision=qt(this._tileCullingRevision,1),this._data.requestSort(),this.requestRender(1))}get clippingBox(){return this._clippingEnabled?this._clipBox:null}get tileCullingRevision(){return this._tileCullingRevision}get _clippingEnabled(){return!$t(this._clipBox,We,(i,e)=>i===e)}get _isIdle(){return this.view.state.mode===2}get _data(){return this.layerView.data}get _canRender(){return xt(this._data)}get _fadeHelper(){return this.layerView.fadeHelper}_updateConfigurations(){this._configuration.alphaCutoff=this.view.qualitySettings.gaussianSplat.minimumOpacity,this._configuration.fadingEnabled=this._fadeHelper.fadingEnabled,this._configuration.receiveShadows=this.bindParameters.shadowMap.ready,this._configuration.fragmentShading=this._configuration.receiveShadows&&this.view.stage.renderer.isFeatureEnabled(12),this._configuration.preciseDepth=cs(this.bindParameters),this._configuration.hasShadowHighlights=this._configuration.receiveShadows&&this.bindParameters.hasShadowHighlights,this._configuration.clippingEnabled=this._clippingEnabled,this._configuration.hasSlicePlane=this._slicePlaneEnabled&&this.bindParameters.slicePlane!=null}_onCameraChange(){this._tileCullingRevision=qt(this._tileCullingRevision,1);let i=this.view.state.camera.ray.direction;this._cameraSortDirty=!0,(this._isIdle||this._shouldRequestSort(i))&&this._requestCameraSort(i)}_shouldRequestSort(i){return Math.abs(i[0]-this._previousSortRequestCameraDirection[0])>this._sortRequestDirectionEpsilon||Math.abs(i[1]-this._previousSortRequestCameraDirection[1])>this._sortRequestDirectionEpsilon||Math.abs(i[2]-this._previousSortRequestCameraDirection[2])>this._sortRequestDirectionEpsilon}_requestCameraSort(i){this._data.requestSort(),Xe(this._previousSortRequestCameraDirection,i),this._cameraSortDirty=!1}_prepareParameters(){ai(this._passParameters,this.layerView,this.bindParameters.camera)}_hasSameClipBox(i){return $t(this._clipBox,i,(e,t)=>e===t)}_renderGaussianColorAndDepth(i,e){let t=this.renderingContext;i.acquireColor(Ie,5,"gaussian depth output"),t.bindFramebuffer(i.fbo),t.setClearColor(0,0,0,0),t.clear(16384),this.renderingContext.bindTechnique(e,this.bindParameters,this._passParameters),this.renderingContext.drawArraysInstanced(yt.TRIANGLE_STRIP,0,4,this._data.visibleGaussians)}};v([K()],De.prototype,"consumes",void 0),v([K()],De.prototype,"produces",void 0),v([K({constructOnly:!0})],De.prototype,"layerView",void 0),De=v([me("esri.views.3d.webgl-engine.lib.GaussianSplatRenderer")],De);class Ct extends gi{constructor(){super(...arguments),this.inverseProjectionMatrix=_a()}}function bi(i){let e=new Ee,{vertex:t,fragment:a}=e,s=i.output===8;return i.preciseDepth&&(s?e.include(oi):(e.varyings.add("shadowRayDepth","vec2"),t.code.add(l`vec2 gaussianSplatPrepareParallelRayDepth(
vec2 clipPosition,
vec3 viewPosition,
vec3 gaussianScale,
mat3 gaussianRotation,
mat4 inverseProjection,
mat3 viewRotation
) {
vec4 homogeneousOrigin = inverseProjection * vec4(clipPosition, 0.0, 1.0);
mat3 viewToGaussian = gaussianRotation * transpose(viewRotation);
vec3 factorSpaceDirection = (viewToGaussian * vec3(0.0, 0.0, -1.0)) / gaussianScale;
vec3 homogeneousCenterOffset = vec3(viewPosition.xy * homogeneousOrigin.w - homogeneousOrigin.xy, 0.0);
vec3 factorSpaceOffset = (viewToGaussian * homogeneousCenterOffset) / gaussianScale;
float homogeneousPeakOffset = dot(factorSpaceDirection, factorSpaceOffset) / dot(factorSpaceDirection, factorSpaceDirection);
return vec2(-viewPosition.z * homogeneousOrigin.w + homogeneousPeakOffset, homogeneousOrigin.w);
}`)),t.uniforms.add(new va("inverseProjectionMatrix",r=>r.inverseProjectionMatrix)),a.uniforms.add(Jt),a.constants.add("depthBias","float",Wt),a.main.add(l`
      float rayDepth = ${s?"gaussianSplatRayDepth()":"shadowRayDepth.x / (shadowRayDepth.y == 0.0 ? 1.0 : shadowRayDepth.y)"};
      float linearDepth = (rayDepth - nearFar.x) / (nearFar.y - nearFar.x);
      float slopeBias = 2.0 * max(abs(dFdx(linearDepth)), abs(dFdy(linearDepth)));
      ${Z(!s,l`if (shadowRayDepth.y == 0.0) { discard; }`)}
      if (rayDepth < nearFar.x || rayDepth > nearFar.y) {
        discard;
      }
      gl_FragDepth = min(linearDepth + depthBias + slopeBias, 1.0);
    `)),e.include(ri,i),t.constants.add("alphaCutoff","float",wt),t.constants.add("depthBias","float",Wt),t.code.add(l`float safeClipW(float clipW) {
return abs(clipW) < 1e-7 ? (clipW < 0.0 ? -1e-7 : 1e-7) : clipW;
}`),t.code.add(l`vec3 computeProjectivePixelGradient(
vec3 clipGradient,
vec3 clipWGradient,
float clipValue,
float safeW,
float invWSquared,
float halfScreenSize
) {
return (clipGradient * safeW - clipValue * clipWGradient) * invWSquared * halfScreenSize;
}`),t.code.add(l`float biasDepth(float linearDepth) {
return min(linearDepth + depthBias, 1.0);
}`),t.main.add(`
    uint gaussianIndex = fetchOrderedGaussianIndex(uint(gl_InstanceID));
    uvec4 packedGaussian = fetchPackedGaussian(gaussianIndex);

    float opacity = unpackOpacity(packedGaussian);

    ${ui(i,"alphaCutoff")}

    ${di}

    vec4 projPos = proj * viewPos;
    float safeW = safeClipW(projPos.w);
    float invWSquared = 1.0 / (safeW * safeW);
    vec2 halfScreenSize = 0.5 / inverseScreenSize;
    float maxShadowSplatRadius = max(halfScreenSize.x, halfScreenSize.y);

    // Projection matrix columns are the clip-space derivatives with respect to view-space xyz.
    vec3 clipWGradient = vec3(proj[0][3], proj[1][3], proj[2][3]);
    vec3 pixelXGradient = computeProjectivePixelGradient(
      vec3(proj[0][0], proj[1][0], proj[2][0]),
      clipWGradient,
      projPos.x,
      safeW,
      invWSquared,
      halfScreenSize.x
    );
    vec3 pixelYGradient = computeProjectivePixelGradient(
      vec3(proj[0][1], proj[1][1], proj[2][1]),
      clipWGradient,
      projPos.y,
      safeW,
      invWSquared,
      halfScreenSize.y
    );
    vec3 covariance2D = computeProjectedGaussianCovariance2D(pixelXGradient, pixelYGradient, gaussianScale, gaussianRotation, view);
    float minimumRadiusOpacity = opacity;
    float opacityScale = regularizeGaussianCovariance(covariance2D);
    opacity *= opacityScale;
    if (opacity < alphaCutoff) {
      return;
    }

    ${hi("log(alphaCutoff) - log(opacity)","minimumRadiusOpacity")}

    // Avoid invalid/extremely large footprints.
    if (maxRadius < 0.0 || maxRadius > maxShadowSplatRadius) {
      return;
    }

    vec3 ndcPos = projPos.xyz / safeW;
    ${ci}
    float linearDepth = (-viewPos.z - nearFar.x) / (nearFar.y - nearFar.x);
    float biasedDepth = biasDepth(linearDepth);

    vec2 clipPos = ndcPos.xy + offsetFromCenter * clipSpacePixelScale - inverseScreenSize;
    ${Z(i.preciseDepth,s?l`vec3 rayView = reconstructViewRay(clipPos, inverseProjectionMatrix);
rayGaussianFactor = computeGaussianRayFactor(
rayView, cameraRelativePosition, gaussianScale, gaussianRotation, mat3(view)
);`:l`shadowRayDepth = gaussianSplatPrepareParallelRayDepth(
clipPos, viewPos.xyz, gaussianScale, gaussianRotation, inverseProjectionMatrix, mat3(view)
);`)}
    gl_Position = vec4(clipPos, biasedDepth * 2.0 - 1.0, 1.0);
  `),e}const Rs=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatShadowPassParameters:Ct,build:bi},Symbol.toStringTag,{value:"Module"}));let Je=class extends Oe{constructor(){super(...arguments),this.shader=new ke(Rs,()=>Ve(()=>Promise.resolve().then(()=>Is),void 0))}initializePipeline(){return qe({colorWrite:null,depthTest:{func:515},depthWrite:tt})}};Je=v([me("esri.views.3d.webgl-engine.shaders.GaussianSplatShadowTechnique")],Je);let Me=class extends vt{constructor(i){super(i),this.consumes={required:[Ae.SHADOWMAP]},this.produces=Ae.SHADOWMAP,this.layerView=null,this._passParameters=new Ct,this._cameraPosition=L(),this._configuration=new te(i.view.state.isGlobal)}precompile(){this._canRender&&(this._updateConfiguration(),this.techniques.precompile(Je,this._configuration))}render(){let i=this.bindRenderTarget();return this._canRender&&this._render(),i}queryDepthRange(i){return this.layerView.suspended?null:this._data.queryVisibleTileDepthRange(i,this.layerView.clippingBox)}get _data(){return this.layerView.data}get _clippingEnabled(){return this.layerView.clippingBox!=null}get _canRender(){return!this.layerView.suspended&&xt(this._data)}_render(){this._updateConfiguration();let i=this.techniques.get(Je,this._configuration);this._prepareShadowParameters(this.bindParameters.camera),this.renderingContext.bindTechnique(i,this.bindParameters,this._passParameters),this.renderingContext.drawArraysInstanced(yt.TRIANGLE_STRIP,0,4,this._data.visibleGaussians)}_updateConfiguration(){this._configuration.preciseDepth=this.bindParameters.output===8,this._configuration.clippingEnabled=this._clippingEnabled,this._configuration.hasSlicePlane=this.layerView.slicePlaneEnabled&&this.bindParameters.slicePlane!=null,this._configuration.output=this.bindParameters.output===8?8:5}_prepareShadowParameters(i){ya(this._passParameters.inverseProjectionMatrix,i.projectionMatrix),this._updateShadowCameraPosition(i),si(this._passParameters,this.layerView,i,this._cameraPosition)}_updateShadowCameraPosition(i){let e=i.viewInverseTransposeMatrix;pt(this._cameraPosition,e[3],e[7],e[11])}};v([K()],Me.prototype,"consumes",void 0),v([K()],Me.prototype,"produces",void 0),v([K({constructOnly:!0})],Me.prototype,"layerView",void 0),Me=v([me("esri.views.3d.webgl-engine.lib.GaussianSplatShadows")],Me);var Fe;const Ds=()=>qa.getLogger("esri.views.3d.layers.GaussianSplatLayerView3D"),Ms=(()=>{let i=new Int16Array(256);i[0]=-255;for(let e=1;e<i.length;e++)i[e]=Math.round(16*Math.log(e/255));return i})();var ve;let ge=(ve=class extends ja(Ka){constructor(e){super(e),this.type="gaussian-splat-3d",this.ignoresMemoryFactor=!1,this._tileHandles=new Map,this._pageBuffer=new Uint32Array(kt*Fe.uploadBatchPageCount),this._tmpTilesWithChangedVisibility=[],this._renderablesBeingCreated=new Set,this._currentLyr3dVisibilityChange=0,this._tileFadeInsAwaitingInitialSort=new Set,this._pendingTileFadeOuts=new Map,this._pendingFadeDuration=ne(0),this._createRenderableAbortController=new AbortController,this.skipHeightModelInfoValidation=!0,this._initializationController=null,this._wasmLayerId=-1,this._metersPerVCSUnit=1,this._usedTileMemory=0,this._cacheTileMemory=0,this._useEsriCrs=!1,this.fullExtentInLocalViewSpatialReference=null,this._suspendedHandle=null,this._conversionBuffer=new ArrayBuffer(4),this._u32View=new Uint32Array(this._conversionBuffer),this._f32View=new Float32Array(this._conversionBuffer);let t=e.view.resourceController;this._memCache=t.memoryController.newCache(`GaussianSplat-${this.uid}`,a=>this._deleteTile(a)),this._frameTask=t.scheduler.registerTask(Yt.GAUSSIAN_SPLAT_TEXTURE_ATLAS)}get _clippingBox(){if(!this.view?.clippingArea)return null;let e=et();return xa(this.view.clippingArea,e,this.view.renderSpatialReference)?e:null}get clippingBox(){return this._renderer?.clippingBox??null}initialize(){let{view:e}=this;this.addHandles([_e(()=>e.qualitySettings.fadeDuration,t=>{this.data&&(this.fadeHelper.onFadeDurationChanged(t),this.updateFadingTexture())})]),this.addResolvingPromise(this._initializeAsync(e))}async _initializeAsync(e){this._initializationController=new AbortController;let{signal:t}=this._initializationController;if(await wa(()=>e?.defaultsFromMap.heightModelInfoReady,t),At(t),!this._canProjectWithoutEngine())throw ba("layer",this.layer.spatialReference.wkid,e.renderSpatialReference?.wkid);this._wasmLayerId=await Sa(this,t),At(t),this._renderer=new De({view:e,layerView:this}),this.data=new os(this._renderer,(s,r)=>this._onSortComplete(s,r),()=>this._freeInvisibleTiles()),this._shadows=new Me({view:e,layerView:this}),this.fadeHelper=new ls(this),this._prepassDepthRenderer=new Re({view:e,layerView:this});let a=new us(this);this._intersectionHandler=a,e.sceneIntersectionHelper.addIntersectionHandler(a),this._elevationProvider=new Wa({view:e,layerElevationSource:this,intersectionHandler:a}),e.elevationProvider.register(2,this._elevationProvider),this.addHandles([_e(()=>this.layer.elevationInfo,s=>this._elevationInfoChanged(s)),_e(()=>this.slicePlaneEnabled,s=>this._slicePlaneEnabledChanged(s),He)]),this._suspendedHandle=_e(()=>this.suspended,s=>this._wasm?.setEnabled(this,!s),He),this.addHandles([_e(()=>this._clippingBox,s=>{this._renderer&&(this._renderer.clippingBox=s)},He),_e(()=>this.maximumGaussianCount,s=>this._wasm?.setMaximumGaussianSplatCount(Math.min(s,this.data.textureAtlas.maximumSupportedVisibleGaussians)),He)]),this._initializationController=null}get wasmLayerId(){return this._wasmLayerId}get metersPerVCSUnit(){return this._metersPerVCSUnit}get tileHandles(){return this._tileHandles}updateFadingTexture(){this.data.fadingTexture.updateTexture(this.data.textureAtlas.pageAllocator.pageCount)}get _wasm(){return Ca(this.view)}get usedMemory(){return this._usedTileMemory+(this.data?.usedMemory??0)}get cachedMemory(){return this._cacheTileMemory}get unloadedMemory(){return 0}get useEsriCrs(){return this._useEsriCrs}get elevationProvider(){return this._elevationProvider}get elevationOffset(){return zt(this.layer.elevationInfo)}get elevationRange(){let e=this.fullExtent;return e?.zmin&&e?.zmax?new ct(e.zmin,e.zmax):null}getElevationRange(e){return this._intersectionHandler.getElevationRange(e)}get fullExtent(){return this.layer.fullExtent}get visibleAtCurrentScale(){return Ta(this.layer.effectiveScaleRange,this.view.scale)}isUpdating(){let e=this._wasm;return this._wasmLayerId<0||e==null?!1:e.isUpdating(this._wasmLayerId)||this.data.updating||this.fadeHelper.updating}updatingFlagChanged(){this.notifyChange("updating")}async createRenderable(e){if(this.destroyed||this.destroying)throw Error("IntegratedMesh3DTilesLayerView3D: createRenderable called after destroy");let{entity3d:t}=e;if(!Ha(t))throw Error("entity3D not valid");let a=t.desc.geometry.prims[t.validPrimitiveIndices[0]].atrbs[0],s=t.assets[a.assetId];if(!s)throw Error("entity3D not valid");let r=s.count;if(r===0)return Ds().warnOnce("encountered tile with zero Gaussians"),()=>({memUsageBytes:0,numGaussians:0});let n=null;if(s.dataType==="U32"&&Pa(s.data))n=s.data;else throw Error("unexpected GaussianSplat Entity3D asset.data format");let o=this.extractHeader(n),u=2.048,d=o.tileOrigin.x*u,h=o.tileOrigin.y*u,m=o.tileOrigin.z*u,g=t.desc,c=g.obb.quaternion,p=new Ra(g.obb.center,g.obb.halfSize,Da(...c)),w=this.view.state.isGlobal,R=w?Ma(this.view.spatialReference).radius:0,b={handle:e.handle,bufferView:n,totalGaussians:r,packedHeader:o.packedHeader,tileOrigin:{x:d,y:h,z:m},invPosScale:o.invPosScale,obb:p,origin:{x:p.centerX,y:p.centerY,z:p.centerZ},isGlobal:w,ellipsoidRadius:R};this._renderablesBeingCreated.add(e.handle);let D;try{D=await this._frameTask.scheduleGenerator(S=>this._createRenderableTask(b,S),this._createRenderableAbortController.signal)}catch(S){throw this._renderablesBeingCreated.delete(e.handle),S}return this._renderablesBeingCreated.delete(e.handle),()=>D}*_createRenderableTask(e,t){let{handle:a,bufferView:s,totalGaussians:r,packedHeader:n,tileOrigin:o,invPosScale:u,obb:d,origin:h,isGlobal:m,ellipsoidRadius:g}=e,c=o.x,p=o.y,w=o.z,R=h.x,b=h.y,D=h.z,S=new Float32Array(r*3),B=new Uint32Array(r),A=new Uint32Array(r),C=[],E=Math.ceil(r/we),O=1/0,k=-1/0,U=1/0,G=-1/0,x=0,y=-1,$=0,V=0;for(let T=0;T<r;T++){let W=T*$e,I=s[W],M=s[W+1],F=s[W+2],Q=s[W+3],ye=M&16383,xe=M>>>14&16383,de=M>>>28&15|(F&1023)<<4,oe=Q>>>24,J=Ms[oe],N=(F>>>10&255)+J,X=(F>>>18&255)+J,ae=(F>>>26&63|(Q&3)<<6)+J,pe=N>0?N:0,le=X>0?X:0,Y=ae>0?ae:0,ce=pe|le<<8|Y<<16,he=Math.max(pe,le,Y),se=ye*u+c,fe=xe*u+p,ee=de*u+w;if(S[x]=se-R,S[x+1]=fe-b,S[x+2]=ee-D,m){let re=se*se+fe*fe+ee*ee;U=Math.min(U,re),G=Math.max(G,re)}else O=Math.min(O,ee),k=Math.max(k,ee);B[T]=I,A[T]=ce,he>y&&(y=he),oe>$&&($=oe),x+=3,V++,V===Fe.createRenderableBatchSize&&(V=0,t.madeProgress()&&(t=yield))}V>0&&t.madeProgress()&&(t=yield),m&&(O=Math.sqrt(U)-g,k=Math.sqrt(G)-g);let f=this._extractGaussianSplatMbsRadiusSquared(y),{fullExtent:_}=this.layer;_?.hasZ&&_.zmax&&_.zmin&&(O=Math.max(O,_.zmin),k=Math.min(k,_.zmax));let j=new ct(O,k),P=this.data.textureAtlas,z=this.data.headerTexture;try{for(let T=0;T<E;T+=Fe.uploadBatchPageCount){let W=Math.min(E,T+Fe.uploadBatchPageCount);for(let I=T;I<W;I++){let M=P.allocatePage();if(M===null&&(this._freeInvisibleTiles(),M=P.allocatePage()),M===null)throw Error("ran out of gaussian splat memory");C.push(M)}for(let I=T;I<W;){let M=C[I],F=I+1;for(;F<W&&C[F]===C[F-1]+1;)F++;let Q=F-I,ye=r-I*we,xe=Math.min(ye,Q*we),de=I*kt,oe=xe*$e;this._pageBuffer.set(s.subarray(de,de+oe));let J=M*we,N=J%ie,X=Math.floor(J/ie);P.update(N,X,this._pageBuffer,Q),z.update(M,n,Q),I=F}t.madeProgress()&&(t=yield)}}catch(T){throw P.freePages(C),T}let q=new ds(a,d,C,S,B,A,r,f,$/255,j);return this._tileHandles.set(a,q),this._cacheTileMemory+=q.usedMemory,this._memCache.put(`${q.handle}`,q),{memUsageBytes:q.usedMemory,numGaussians:r}}_extractGaussianSplatMbsRadiusSquared(e){return Math.exp(e/8-20)*9}freeRenderable(e){this._tileFadeInsAwaitingInitialSort.delete(e),this._pendingTileFadeOuts.delete(e);let t=this.data?.textureAtlas,a=!1,s=this._tileHandles.get(e);if(s){let r=!1;for(let n of this._pendingTileFadeOuts.values())n.incomingTileHandles.has(e)&&(n.visibilityChange=this._currentLyr3dVisibilityChange+1,r=!0);r&&(this._currentLyr3dVisibilityChange++,a=!0),s.lifecycleState===0?this._cacheTileMemory-=s.usedMemory:(a=!0,this.fadeHelper.onTileDiscarded(s),this._usedTileMemory-=s.usedMemory,this._intersectionHandler.removeTile(s)),t&&s.pageIds.forEach(n=>t.freePage(n)),this.freeObject(s),this._tileHandles.delete(e)}a&&this.updateGaussians()}freeObject(e){this._memCache.pop(`${e.handle}`)}notifyTileObbsChanged(e){this._elevationProvider&&this._elevationProvider.notifyObjectsChangedFunctional(e.length,t=>{for(let{obb:a}of e)if(!t(a))break})}setRenderableVisibility(e,t,a){let s=this.fadeHelper.updateFadeDuration(),r=new Fs(this._currentLyr3dVisibilityChange+1),n=new Set,o=!1;for(let u=0;u<a;u++){let d=this._tileHandles.get(e[u]);if(!d)continue;let h=t[u]?this._prepareTileFadeIn(d,s):this._prepareTileFadeOut(d,r);t[u]&&r.incomingTileHandles.add(d.handle),h&&n.add(d.handle),o||=h}if(o){if(this._currentLyr3dVisibilityChange++,this._pendingFadeDuration=s,this._updatePendingTileHandoffs(n,r),r.incomingTileHandles.size===0)for(let u of this._tileFadeInsAwaitingInitialSort)r.incomingTileHandles.add(u);this.updateGaussians()}}_updatePendingTileHandoffs(e,t){for(let a of new Set(this._pendingTileFadeOuts.values())){if(a===t)continue;let s=!1;for(let r of e)a.incomingTileHandles.has(r)&&(s=!0,t.incomingTileHandles.size>0&&a.incomingTileHandles.delete(r));if(s){a.visibilityChange=t.visibilityChange;for(let r of t.incomingTileHandles)a.incomingTileHandles.add(r)}}}_prepareTileFadeIn(e,t){let a=this._pendingTileFadeOuts.delete(e.handle);return e.lifecycleState===2?(this.fadeHelper.fadeTile(e,0,t),!1):this._tileFadeInsAwaitingInitialSort.has(e.handle)?a:(e.lifecycleState===0&&this._popTileFromCache(e),e.lifecycleState=1,this._tileFadeInsAwaitingInitialSort.add(e.handle),!0)}_prepareTileFadeOut(e,t){let a=this._tileFadeInsAwaitingInitialSort.delete(e.handle);return a&&e.lifecycleState===1&&(this.moveTileToCache(e),e.lifecycleState=0),e.lifecycleState===2?this._pendingTileFadeOuts.has(e.handle)?a:(this._pendingTileFadeOuts.set(e.handle,t),!0):a}_onSortComplete(e,t){let a=this._tmpTilesWithChangedVisibility;a.length=0,this._triggerFadeIns(e,a);let s=this._triggerFadeOuts(t,a);a.length>0&&this.notifyTileObbsChanged(a),s&&this.updateGaussians()}_triggerFadeIns(e,t){for(let a of e)this._tileHandles.get(a.handle)===a&&this._tileFadeInsAwaitingInitialSort.delete(a.handle)&&(a.lifecycleState=2,t.push(a),this.fadeHelper.fadeTile(a,0,this._pendingFadeDuration))}_triggerFadeOuts(e,t){let a=!1;for(let o of this._pendingTileFadeOuts.values())if(e>=o.visibilityChange){a=!0;break}if(!a)return!1;let s=this._pendingFadeDuration,r=this._pendingFadeDuration;for(let o of this._tileHandles.values()){let{fadeDirection:u,fadeDuration:d,fadeProgress:h}=o;if(u!==0||d==null||h==null)continue;let m=d*(1-h);s=ne(Math.max(s,m)),r=ne(Math.max(r,d))}let n=!1;for(let[o,u]of this._pendingTileFadeOuts){if(e<u.visibilityChange)continue;this._pendingTileFadeOuts.delete(o);let d=this._tileHandles.get(o);if(d){let h=d.lifecycleState===2,m=d.opacityModifier===1?s:r;this.fadeHelper.fadeTile(d,1,m),h&&d.lifecycleState===0&&(t.push(d),n=!0)}}return n}_popTileFromCache(e){this._usedTileMemory+=e.usedMemory,this._cacheTileMemory-=e.usedMemory,this._intersectionHandler.addTile(e),this._memCache.pop(Bt(e.handle))}moveTileToCache(e){this._usedTileMemory-=e.usedMemory,this._cacheTileMemory+=e.usedMemory,this._intersectionHandler.removeTile(e),this._memCache.put(Bt(e.handle),e)}destroy(){this._initializationController=Zt(this._initializationController),this._createRenderableAbortController.abort(),Fa(this),this._suspendedHandle&&=Ga(this._suspendedHandle),this._intersectionHandler&&=(this.view.sceneIntersectionHelper.removeIntersectionHandler(this._intersectionHandler),null),this._elevationProvider&&this.view.elevationProvider&&(this._elevationProvider.notifyObjectsChangedFunctional(this._tileHandles.size,e=>{for(let{obb:t}of this._tileHandles.values())if(!e(t))break}),this.view.elevationProvider.unregister(this._elevationProvider),this._elevationProvider=null),this._frameTask.remove(),this._shadows=Le(this._shadows),this._prepassDepthRenderer=Le(this._prepassDepthRenderer),this._renderer=Le(this._renderer),this._memCache.destroy(),this.data=Le(this.data)}_canProjectWithoutEngine(){if(this.view.state.viewingMode===1||$a(this.view.renderSpatialReference)||Aa(this.view.renderSpatialReference))return!0;if(this.layer.esriCrsSpatialReference&&za(this.layer.esriCrsSpatialReference,this.view.renderSpatialReference)){if(this.layer.esriCrsSpatialReference.vcsWkid===115700)return!1;let e=La(this.layer.esriCrsSpatialReference);if(!e){let a=this.layer.esriCrsSpatialReference,s=Ia(a),r="meters";!s&&a.wkid&&a.wkid!==-1&&(r=Ba(It.units[It[a.wkid]])),r&&(e=new Ea({heightModel:"gravity-related-height",heightUnit:r}))}let t=this.view.heightModelInfo;return this._useEsriCrs=Oa(e,t,!1)===0,this._useEsriCrs&&(e&&(this._metersPerVCSUnit=ka(1,e.heightUnit,"meters")),this.fullExtentInLocalViewSpatialReference=this.layer.esriCrsFullExtent),this._useEsriCrs}return!1}_elevationInfoChanged(e){if(!e?.offset)this._wasm?.setLayerOffset(this,0);else if(!this._useEsriCrs)this._wasm?.setLayerOffset(this,zt(e));else{let t=Va(e?.unit)/this._metersPerVCSUnit,a=e?.offset??0;this._wasm?.setLayerOffset(this,a*t)}}_slicePlaneEnabledChanged(e){this._renderer&&(this._renderer.slicePlaneEnabled=e),this._intersectionHandler&&(this._intersectionHandler.slicePlaneEnabled=e)}updateGaussians(){let e=[];for(let t of this._tileHandles.values())t.lifecycleState!==0&&e.push(t);this.data.updateGaussianVisibility(e,this._currentLyr3dVisibilityChange),this.notifyChange("updating")}get maximumGaussianCount(){return this.view.qualitySettings.gaussianSplat.maximumNumberOfGaussians*this.view.quality}set maximumGaussianCount(e){this._set("maximumGaussianCount",e)}_freeInvisibleTiles(){for(let e of this._tileHandles.values())e.lifecycleState===0&&!this._renderablesBeingCreated.has(e.handle)&&this._deleteTile(e)}extractHeader(e){let t=e.length-4,a=this.reinterpretU32AsFloat(e[t]),s=this.reinterpretU32AsFloat(e[t+1]),r=this.reinterpretU32AsFloat(e[t+2]),n=1/(1<<(e[t+3]&255));return{packedHeader:e.subarray(t,t+4),tileOrigin:{x:a,y:s,z:r},invPosScale:n}}_deleteTile(e){this._renderablesBeingCreated.has(e.handle)||this._wasm?.onRenderableEvicted(this,e.handle,e.usedMemory),this.freeRenderable(e.handle)}reinterpretU32AsFloat(e){return this._u32View[0]=e,this._f32View[0]}get performanceInfo(){let e=0,t=0;this._tileHandles.forEach(u=>{u.lifecycleState===0?t++:e++});let a=this.data?.textureAtlasMemory??0,s=this.data?.headerTextureMemory??0,r=this.data?.orderTextureMemory??0,n=this.data?.fadingTextureMemory??0,o=this.data?.sortBufferMemory??0;return new Qa(this.usedMemory,e,this._usedTileMemory,t,this._cacheTileMemory,a,s,r,n,o)}get test(){}},Fe=ve,ve.createRenderableBatchSize=64,ve.uploadBatchPageCount=16,ve);v([K()],ge.prototype,"layer",void 0),v([K({readOnly:!0})],ge.prototype,"_clippingBox",null),v([K()],ge.prototype,"elevationOffset",null),v([K({readOnly:!0})],ge.prototype,"visibleAtCurrentScale",null),v([K()],ge.prototype,"fullExtentInLocalViewSpatialReference",void 0),v([K()],ge.prototype,"maximumGaussianCount",null),ge=Fe=v([me("esri.views.3d.layers.GaussianSplatLayerView3D")],ge);class Fs{constructor(e){this.visibilityChange=e,this.incomingTileHandles=new Set}}const dr=ge,Gs=Object.freeze(Object.defineProperty({__proto__:null,build:fi},Symbol.toStringTag,{value:"Module"})),$s=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:bt,build:_i},Symbol.toStringTag,{value:"Module"})),As=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:St,build:xi},Symbol.toStringTag,{value:"Module"})),zs=Object.freeze(Object.defineProperty({__proto__:null,build:wi},Symbol.toStringTag,{value:"Module"})),Is=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatShadowPassParameters:Ct,build:bi},Symbol.toStringTag,{value:"Module"}));export{dr as default};
